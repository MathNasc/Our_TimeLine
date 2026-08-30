const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, '.'), { extensions: ['html'] }));

// Store published retrospectives
const DB_FILE = path.join(__dirname, 'published_retros.json');
let publishedData = {};
try {
  if (fs.existsSync(DB_FILE)) {
    publishedData = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  }
} catch (e) {
  console.error('Error loading DB', e);
}

app.post('/api/publish', (req, res) => {
  const data = req.body;
  if (!data || !data.slug) return res.status(400).json({error: 'Missing slug'});
  
  // Preserve views if already exists
  const existingViews = publishedData[data.slug]?.views || 0;
  data.views = existingViews;
  
  publishedData[data.slug] = data;
  fs.writeFileSync(DB_FILE, JSON.stringify(publishedData));
  res.json({ success: true, url: `/r/${data.slug}` });
});

app.get('/r/:slug', (req, res) => {
  const slug = req.params.slug;
  const retroData = publishedData[slug];
  
  const templatePath = path.join(__dirname, 'nosso-primeiro-ano', 'retro.html');
  if (!fs.existsSync(templatePath)) return res.status(404).send('Template not found');
  
  let html = fs.readFileSync(templatePath, 'utf-8');
  
  if (retroData) {
    // Increment views
    retroData.views = (retroData.views || 0) + 1;
    fs.writeFileSync(DB_FILE, JSON.stringify(publishedData));

    const couple = [retroData.couple?.name1, retroData.couple?.name2].filter(Boolean).join(' & ') || 'Nossa Retrospectiva';
    const title = `${couple} ❤️`;
    const desc = retroData.content?.subtitle || 'Venha ver nossa retrospectiva especial!';
    const cover = retroData.couple?.cover || '';

    // Inject Open Graph tags
    const ogTags = `
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${desc}">
      <meta property="og:image" content="${cover}">
      <meta name="twitter:card" content="summary_large_image">
      <title>${title}</title>
    `;
    html = html.replace('<title>Nosso Primeiro Ano ❤️</title>', ogTags);

    // Format data for the frontend
    const fmt = iso => { if(!iso)return''; try{return new Date(iso).toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});}catch{return iso;} };
    const appData = {
      casal: { meuNome: retroData.couple?.name1||'', nomeDela: retroData.couple?.name2||'', apelido: retroData.couple?.nickname||'' },
      datas: { matchDate: fmt(retroData.couple?.matchDate), primeiroEncontro: '', primeiroBeijo: '', primeiraViajem: '', pedidoNamoro: fmt(retroData.couple?.startDate), nossoAp: '', aniversario1Ano: fmt(retroData.couple?.startDate) },
      textos: { titulo: retroData.content?.title||'Nosso Primeiro Ano ❤️', subtitulo: retroData.content?.subtitle||'', mensagemInicial: retroData.content?.intro||'', introducao: retroData.content?.intro||'', mensagemFinal: retroData.content?.finalMessage||'', localPresenteFinal: retroData.content?.surpriseText||'' },
      quiz: (retroData.quiz||[]).map(q => ({ pergunta: q.question, opcoes: q.options, correta: q.correct, acerto: q.hitMessage, erro: q.missMessage })),
      timeline: (retroData.timeline||[]).map(t => ({ titulo: t.title, data: t.date, descricao: t.description, foto: t.photo||'' })),
      motivos: (retroData.cartas||[]).map(c => c.texto||'').filter(Boolean),
      musicas: { ativada: retroData.music?.autoplay, arquivo: retroData.music?.url||'' },
      fotosGerais: { capa: retroData.couple?.cover||'', fundo: '' },
      galeria: retroData.gallery || [],
      tema: retroData.theme || {},
      tema: retroData.theme || {}
    };

    // Inject data script
    const scriptTag = `<script>window.__RETRO_DATA__ = ${JSON.stringify(appData)};</script>`;
    html = html.replace('<!-- INJECT_DATA -->', scriptTag);
  }

  res.send(html);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
