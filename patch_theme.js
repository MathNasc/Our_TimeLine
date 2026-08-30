const fs = require('fs');
let code = fs.readFileSync('nosso-primeiro-ano/script.js', 'utf-8');

const applyThemeCode = `
function applyTheme() {
  if (!APP_DATA.tema) return;
  const root = document.documentElement;
  if (APP_DATA.tema.primaryColor) root.style.setProperty('--gold', APP_DATA.tema.primaryColor);
  if (APP_DATA.tema.secondaryColor) root.style.setProperty('--rose', APP_DATA.tema.secondaryColor);
  if (APP_DATA.tema.bgColor) root.style.setProperty('--bg', APP_DATA.tema.bgColor);
  if (APP_DATA.tema.font) {
    const fonts = {
      'cormorant': "'Cormorant Garamond', Georgia, serif",
      'inter': "system-ui, sans-serif",
      'playfair': "'Playfair Display', Georgia, serif"
    };
    if (fonts[APP_DATA.tema.font]) {
      root.style.setProperty('--font-display', fonts[APP_DATA.tema.font]);
    }
  }
}
`;

code = code.replace('const $=id=>document.getElementById(id);', 'const $=id=>document.getElementById(id);\n' + applyThemeCode);
code = code.replace('loadProgress(); populateCover();', 'applyTheme(); loadProgress(); populateCover();');
code = code.replace('populateCover(); populateIntro();', 'applyTheme(); populateCover(); populateIntro();');

fs.writeFileSync('nosso-primeiro-ano/script.js', code);
console.log('Theme function injected');
