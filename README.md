# Nosso Primeiro Ano ❤️

## Estrutura do Projeto

```
nosso-primeiro-ano/
├── index.html            ← Site da retrospectiva (experiência final)
├── style.css             ← Estilos do site
├── script.js             ← JavaScript do site
├── manifest.json         ← Configuração PWA
├── sw.js                 ← Service Worker (offline)
├── admin/
│   └── index.html        ← Painel Administrativo (abrir no navegador)
├── fotos/                ← Coloque suas fotos aqui
│   └── README.txt
├── icons/                ← Ícones do PWA
│   └── README.txt
└── .well-known/
    └── assetlinks.json   ← Config Android TWA
```

## ⚡ Início Rápido

### 1. Abrir o Admin
Abra `admin/index.html` no seu navegador.
O admin funciona localmente — sem servidor necessário.

### 2. Criar sua Retrospectiva
- Clique em **Nova Retrospectiva**
- Preencha todos os dados nas abas
- Clique em **Publicar**
- Clique em **Exportar APP_DATA** para gerar o código

### 3. Aplicar ao Site
- Cole o APP_DATA exportado no `script.js`
- Adicione suas fotos na pasta `fotos/`
- Abra `index.html` no navegador

## 🌐 Deploy (Netlify)

1. Acesse https://netlify.com
2. Arraste a pasta inteira para o Netlify Drop
3. Seu site estará online em segundos!

## 🛠️ Servidor Local

```bash
# Python (recomendado)
python -m http.server 8080
# Abra: http://localhost:8080

# Node.js
npx serve .
```

## 📁 Fotos

Coloque suas fotos na pasta `fotos/` e referencie no script:
```js
foto: "fotos/nome-da-foto.jpg"
```

Formatos suportados: JPG, PNG, WEBP, GIF

## 🎵 Música

- **Link externo**: Cole uma URL do Spotify, YouTube ou MP3 direto
- **Arquivo local**: Coloque o MP3 na raiz e use `musica.mp3`

## 📱 PWA (Instalar no Celular)

O site já é um PWA. No celular:
1. Abra no Chrome
2. Toque nos 3 pontos → "Adicionar à tela inicial"
3. O app aparecerá como ícone na home

---
Feito com ❤️
