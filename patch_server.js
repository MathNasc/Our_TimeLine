const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf-8');

code = code.replace(
  'galeria: retroData.gallery || []',
  'galeria: retroData.gallery || [],\n      tema: retroData.theme || {}'
);

fs.writeFileSync('server.js', code);
