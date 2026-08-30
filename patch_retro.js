const fs = require('fs');
let code = fs.readFileSync('nosso-primeiro-ano/retro.html', 'utf-8');

code = code.replace(
  'galeria: data.gallery || [],\n            tema: data.theme || {},\n            tema: data.theme || {}',
  'galeria: data.gallery || [],\n            tema: data.theme || {}'
);

fs.writeFileSync('nosso-primeiro-ano/retro.html', code);
