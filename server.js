require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const { retrospectiveService } = require('./dist/services/retrospective.service.js');
const multer = require('multer');
const { supabaseAdmin } = require('./dist/services/supabase.js');
const { db } = require('./dist/db/index.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));

// Ensure uploads directory exists and is statically served
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
app.use('/uploads', express.static(UPLOADS_DIR));
app.use(express.static(path.join(__dirname, '.'), { extensions: ['html'] }));

// Store published retrospectives
const DB_FILE = process.env.VERCEL ? '/tmp/published_retros.json' : path.join(__dirname, 'published_retros.json');
let publishedData = {};
try {
  if (fs.existsSync(DB_FILE)) {
    publishedData = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  }
} catch (e) {
  console.error('Error loading DB file:', e);
}

// --- AUTH MIDDLEWARE ---
const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  // If Supabase Admin is available and token is not a local token, verify token with Supabase
  if (supabaseAdmin && token && token !== 'local-guest-token') {
    try {
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
      if (error || !user) throw new Error('Invalid token');
      req.user = user;
      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized', details: err.message });
    }
  }

  // In local mode or guest mode, grant access as local-user
  req.user = { id: 'local-user', email: 'amor@retrospectiva.com' };
  next();
};

// --- API ROUTES ---

app.get('/api/test-db', async (req, res) => {
  try {
    if (!db) {
      return res.json({ success: true, message: 'Running in local JSON storage mode' });
    }
    const result = await db.select().from(require('./dist/db/schema.js').retrospectives).limit(1);
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    env_keys: Object.keys(process.env).filter(k => k.includes('SUPA') || k.includes('DATA')),
    has_db: !!db,
    has_supabase: !!supabaseAdmin,
    dirname: __dirname,
    cwd: process.cwd()
  });
});

app.get('/api/config', (req, res) => {
  res.json({
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || ''
  });
});

app.get('/api/retrospectives', requireAuth, async (req, res) => {
  try {
    const records = await retrospectiveService.getByOwner(req.user.id);
    const formatted = (records || []).map(r => ({
      ...(r.data || {}),
      id: r.id,
      slug: r.slug,
      status: r.status,
      owner_id: r.owner_id,
      updatedAt: r.updated_at || r.updatedAt
    }));
    res.json(formatted);
  } catch (err) {
    console.error('Error fetching retros:', err);
    res.status(500).json({ error: 'Failed to fetch retrospectives' });
  }
});

app.delete('/api/retrospectives/:id', requireAuth, async (req, res) => {
  try {
    const record = await retrospectiveService.getById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Not found' });
    if (record.owner_id && record.owner_id !== req.user.id && req.user.id !== 'local-user') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await retrospectiveService.delete(req.params.id);

    // Sync with local memory cache if present
    if (record.slug && publishedData[record.slug]) {
      delete publishedData[record.slug];
      try {
        fs.writeFileSync(DB_FILE, JSON.stringify(publishedData, null, 2), 'utf-8');
      } catch (e) {}
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting retro:', err);
    res.status(500).json({ error: 'Failed to delete retrospective' });
  }
});

app.post('/api/upload-base64', requireAuth, async (req, res) => {
  const { fileData, fileName, contentType, retroId, path: prefix } = req.body;

  if (!fileData || !retroId || !prefix) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const base64Content = fileData.includes(',') ? fileData.split(',')[1] : fileData;
    const buffer = Buffer.from(base64Content, 'base64');
    const fileExt = fileName ? (fileName.split('.').pop() || 'jpg') : 'jpg';
    const storageFileName = `${prefix}_${Date.now()}.${fileExt}`;

    // If Supabase storage is configured, try Supabase first
    if (supabaseAdmin) {
      try {
        const filePath = `${retroId}/${storageFileName}`;
        const { error } = await supabaseAdmin.storage
          .from('retrospectives')
          .upload(filePath, buffer, {
            contentType: contentType || 'image/jpeg',
            upsert: true
          });

        if (!error) {
          const { data: publicUrlData } = supabaseAdmin.storage
            .from('retrospectives')
            .getPublicUrl(filePath);
          return res.json({ url: publicUrlData.publicUrl });
        }
        console.warn('Supabase storage upload error, using local fallback:', error.message);
      } catch (sbErr) {
        console.warn('Supabase storage exception, using local fallback:', sbErr.message);
      }
    }

    // Local file fallback
    const retroUploadDir = path.join(UPLOADS_DIR, String(retroId));
    if (!fs.existsSync(retroUploadDir)) {
      fs.mkdirSync(retroUploadDir, { recursive: true });
    }
    const localFilePath = path.join(retroUploadDir, storageFileName);
    fs.writeFileSync(localFilePath, buffer);
    const localUrl = `/uploads/${retroId}/${storageFileName}`;
    res.json({ url: localUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

app.post('/api/publish', requireAuth, async (req, res) => {
  const data = req.body;
  if (!data || !data.slug) return res.status(400).json({ error: 'Missing slug' });

  try {
    const existing = await retrospectiveService.getBySlug(data.slug);

    if (existing && existing.owner_id && existing.owner_id !== req.user.id && req.user.id !== 'local-user') {
      return res.status(403).json({ error: 'Forbidden: You do not own this retrospective' });
    }

    const dbData = {
      id: existing?.id || data.id,
      owner_id: req.user.id,
      slug: data.slug,
      status: data.status || 'published',
      title: data.content?.title || 'Nova Retrospectiva',
      couple_name: data.couple?.nickname || '',
      person_1: data.couple?.name1 || '',
      person_2: data.couple?.name2 || '',
      cover_image: data.couple?.cover || '',
      data: data,
      theme: data.theme || {},
    };

    if (existing) {
      await retrospectiveService.update(existing.id, dbData);
      if (data.status === 'published') await retrospectiveService.publish(existing.id);
      else await retrospectiveService.unpublish(existing.id);
    } else {
      await retrospectiveService.create(dbData);
      if (data.status === 'published') await retrospectiveService.publish(dbData.id);
    }

    // Keep publishedData in sync for /r/:slug
    publishedData[data.slug] = dbData;
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(publishedData, null, 2), 'utf-8');
    } catch (e) {}

    res.json({ success: true, url: `/r/${data.slug}` });
  } catch (error) {
    console.error('Error publishing:', error);
    res.status(500).json({ error: 'Failed to publish to database', details: error.message });
  }
});

app.get('/r/:slug', async (req, res) => {
  const slug = req.params.slug;
  const templatePath = path.join(__dirname, 'nosso-primeiro-ano', 'retro.html');
  if (!fs.existsSync(templatePath)) return res.status(404).send('Template not found');

  let html = fs.readFileSync(templatePath, 'utf-8');
  let appData = null;

  try {
    const retroRecord = await retrospectiveService.getBySlug(slug);

    if (retroRecord) {
      if (retroRecord.status !== 'published') {
        return res.status(403).send(`
          <!DOCTYPE html><html><head><meta charset="utf-8"><title>Indisponível</title>
          <style>body{background:#08080f;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center;} h1{color:#c9a96e;font-size:2rem;margin-bottom:1rem;} p{color:rgba(255,255,255,0.7);}</style>
          </head><body>
          <h1>Essa história está guardada por enquanto ❤️</h1>
          <p>Essa retrospectiva não está disponível no momento.</p>
          </body></html>
        `);
      }
      appData = retroRecord.data || retroRecord;
    } else {
      // Fallback to legacy file-based DB
      if (fs.existsSync(DB_FILE)) {
        const fileData = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
        const legacyData = fileData[slug];

        if (legacyData) {
          if (legacyData.status !== 'published') {
            return res.status(403).send(`
              <!DOCTYPE html><html><head><meta charset="utf-8"><title>Indisponível</title>
              <style>body{background:#08080f;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center;} h1{color:#c9a96e;font-size:2rem;margin-bottom:1rem;} p{color:rgba(255,255,255,0.7);}</style>
              </head><body>
              <h1>Essa história está guardada por enquanto ❤️</h1>
              <p>Essa retrospectiva não está disponível no momento.</p>
              </body></html>
            `);
          }
          appData = legacyData.data || legacyData;
        }
      }
    }

    if (!appData) {
      return res.status(404).send('Retrospectiva não encontrada');
    }

    const couple = [appData.couple?.name1, appData.couple?.name2].filter(Boolean).join(' & ') || 'Nossa Retrospectiva';
    const title = `${couple} ❤️`;
    const desc = appData.content?.subtitle || 'Venha ver nossa retrospectiva especial!';
    const cover = appData.couple?.cover || '';

    // Inject Open Graph tags
    const ogTags = `
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${desc}">
      <meta property="og:image" content="${cover}">
      <meta property="og:url" content="https://${req.get('host')}/r/${slug}">
      <meta name="twitter:card" content="summary_large_image">
    `;
    html = html.replace('</head>', `${ogTags}</head>`);

    // Inject Data
    const mappedData = {
      textos: {
        titulo: appData.content?.title || "Nosso Primeiro Ano ❤️",
        subtitulo: appData.content?.subtitle || "",
        mensagemInicial: appData.content?.intro || appData.content?.message || "",
        mensagemFinal: appData.content?.finalMessage || "",
        localPresenteFinal: appData.content?.surpriseText || ""
      },
      casal: {
        meuNome: appData.couple?.name1 || "Seu Nome",
        nomeDela: appData.couple?.name2 || "Nome Dela",
        apelido: appData.couple?.nickname || "Amor",
        dataNamoro: appData.couple?.startDate || "01/01/2023"
      },
      quiz: (appData.quiz || []).map(q => ({
        pergunta: q.question,
        opcoes: q.options,
        correta: q.correct,
        acerto: q.hitMessage,
        erro: q.missMessage
      })),
      timeline: (appData.timeline || []).map(t => ({
        titulo: t.title,
        data: t.date,
        descricao: t.description,
        foto: t.photo
      })),
      motivos: (appData.cartas || []).map(c => typeof c === 'string' ? c : c.texto),
      musicas: {
        ativada: appData.music?.autoplay,
        arquivo: appData.music?.url
      },
      fotosGerais: {
        capa: appData.couple?.cover || '',
        fundo: ''
      },
      galeria: appData.gallery || [],
      tema: appData.theme || {}
    };

    const scriptTag = `<script>window.__RETRO_DATA__ = ${JSON.stringify(mappedData)};</script>`;
    html = html.replace('<!-- INJECT_DATA -->', scriptTag);

    res.send(html);
  } catch (error) {
    console.error('Error fetching retrospective:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

module.exports = app;
