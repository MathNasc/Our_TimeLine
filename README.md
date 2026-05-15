# Nosso Primeiro Ano ❤️

## Estrutura
```
nosso-primeiro-ano/
├── index.html          ← Site da retrospectiva
├── style.css           ← Estilos
├── script.js           ← JavaScript + APP_DATA
├── manifest.json       ← PWA
├── sw.js               ← Service Worker
├── vercel.json         ← Config Vercel
├── admin/
│   └── index.html      ← Painel Admin (Preact + htm, sem Babel)
├── fotos/
└── icons/
```

## Como usar

### 1. Admin Panel
Abra `admin/index.html` no navegador — funciona local **e** no Vercel.

> ✅ Reescrito com **Preact + htm** (sem Babel, sem eval)
> Compatível com Vercel, Netlify, GitHub Pages e qualquer CDN.

### 2. Editar Dados
- No Admin → aba **Publicar** → **Copiar Código**
- Cole no `script.js` substituindo `APP_DATA`

### 3. Deploy Vercel
1. Faça upload da pasta no https://vercel.com
2. Admin estará em `/admin/index.html`

## Servidor Local
```bash
python -m http.server 8080
# Acesse: http://localhost:8080/admin/index.html
```
