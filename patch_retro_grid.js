const fs = require('fs');
let code = fs.readFileSync('nosso-primeiro-ano/retro.html', 'utf-8');

code = code.replace(
  '<div class="gallery-grid" id="gallery-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:20px;padding:10px;"></div>',
  '<div class="gallery-grid" id="gallery-grid"></div>'
);

fs.writeFileSync('nosso-primeiro-ano/retro.html', code);

// Also add default gallery-grid to style.css
let style = fs.readFileSync('nosso-primeiro-ano/style.css', 'utf-8');
if (!style.includes('.gallery-grid { display: grid')) {
  style += '\n.gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 16px; padding: 10px; width: 100%; }\n';
  fs.writeFileSync('nosso-primeiro-ano/style.css', style);
}
console.log('Retro grid patched');
