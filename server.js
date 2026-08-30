require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const { retrospectiveService } = require('./dist/services/retrospective.service.js');
const multer = require('multer');
const { supabaseAdmin } = require('./dist/services/supabase.js');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, '.'), { extensions: ['html'] }));

const { db } = require('./dist/db/index.js');

// Store published retrospectives
const DB_FILE = process.env.VERCEL ? '/tmp/published_retros.json' : path.join(__dirname, 'published_retros.json');
let publishedData = {};
try {
  if (fs.existsSync(DB_FILE)) {
    publishedData = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  }
} catch (e) {
  console.error('Error loading DB', e);
}



// --- AUTH MIDDLEWARE ---
const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });
  
  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) throw new Error('Invalid token');
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized', details: err.message });
  }
};

// --- NEW API ROUTES ---

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
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY
  });
});

app.get('/api/retrospectives', requireAuth, async (req, res) => {
  try {
    const records = await retrospectiveService.getByOwner(req.user.id);
    // Map them back to the frontend expected format (using the data column + db status/slug)
    const formatted = records.map(r => ({
      ...r.data,
      id: r.id,
      slug: r.slug,
      status: r.status,
      owner_id: r.owner_id,
      updatedAt: r.updated_at
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
    if (record.owner_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
    
    await retrospectiveService.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting retro:', err);
    res.status(500).json({ error: 'Failed to delete retrospective' });
  }
});

app.post('/api/upload', requireAuth, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file provided' });
  const { retroId, path: prefix } = req.body;
  if (!retroId || !prefix) return res.status(400).json({ error: 'Missing retroId or path' });
  
  try {
    const fileExt = req.file.originalname.split('.').pop() || 'png';
    const fileName = `${prefix}/${retroId}_${Date.now()}.${fileExt}`;
    const filePath = `${retroId}/${fileName}`;
    
    const { data, error } = await supabaseAdmin.storage
      .from('retrospectives')
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true
      });
      
    if (error) throw error;
    
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('retrospectives')
      .getPublicUrl(filePath);
      
    res.json({ url: publicUrlData.publicUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

app.post('/api/publish', requireAuth, async (req, res) => {
  const data = req.body;
  if (!data || !data.slug) return res.status(400).json({error: 'Missing slug'});
  
  try {
    const existing = await retrospectiveService.getBySlug(data.slug);
    
    if (existing && existing.owner_id !== req.user.id) return res.status(403).json({error: 'Forbidden: You do not own this retrospective'});
    
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
      // RULE: Only serve published retrospectives
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
      
      appData = retroRecord.data;
    } else {
      // Fallback to legacy file-based DB if not found in Postgres (during migration)
      const DB_FILE = process.env.VERCEL ? '/tmp/published_retros.json' : path.join(__dirname, 'published_retros.json');
      if (fs.existsSync(DB_FILE)) {
        const publishedData = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
        const legacyData = publishedData[slug];
        
        // Strict logic for legacy data too
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
           appData = legacyData;
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
        mensagemInicial: appData.content?.message || "",
      },
      casal: {
        meuNome: appData.couple?.name1 || "Seu Nome",
        nomeDela: appData.couple?.name2 || "Nome Dela",
        apelido: appData.couple?.nickname || "Amor",
        dataNamoro: appData.couple?.startDate || "01/01/2023"
      },
      quiz: (appData.quiz || []).map(q => ({ pergunta: q.question, opcoes: q.options, correta: q.correct, acerto: q.hitMessage, erro: q.missMessage })),
      timeline: (appData.timeline || []).map(t => ({ titulo: t.title, data: t.date, descricao: t.description, foto: t.photo })),
      motivos: (appData.cartas || []).map(c => c.texto),
      musicas: { ativada: appData.music?.autoplay, arquivo: appData.music?.url },
      fotosGerais: { capa: appData.couple?.cover||'', fundo: '' },
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

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
