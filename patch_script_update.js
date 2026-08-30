const fs = require('fs');
let code = fs.readFileSync('nosso-primeiro-ano/script.js', 'utf-8');

code = code.replace(
  'galeria: data.gallery || []\n    });',
  'galeria: data.gallery || [],\n      tema: data.theme || {}\n    });\n    applyTheme();'
);

fs.writeFileSync('nosso-primeiro-ano/script.js', code);
