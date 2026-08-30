const fs = require('fs');
let code = fs.readFileSync('nosso-primeiro-ano/script.js', 'utf-8');

const applyThemeImpl = `function applyTheme() {
  if (!APP_DATA.tema) return;
  const root = document.documentElement;
  
  const hexToRgb = hex => {
    let h = hex.replace('#', '');
    if(h.length===3) h = h.split('').map(c=>c+c).join('');
    return parseInt(h.substring(0,2),16)+','+parseInt(h.substring(2,4),16)+','+parseInt(h.substring(4,6),16);
  };
  
  if (APP_DATA.tema.primaryColor) {
    root.style.setProperty('--gold', APP_DATA.tema.primaryColor);
    const rgb = hexToRgb(APP_DATA.tema.primaryColor);
    root.style.setProperty('--border', \`rgba(\${rgb},0.18)\`);
    root.style.setProperty('--shadow-gold', \`0 0 40px rgba(\${rgb},0.12)\`);
    
    // Inject dynamic CSS to override hardcoded rgba
    let style = document.getElementById('dynamic-theme');
    if (!style) { style = document.createElement('style'); style.id = 'dynamic-theme'; document.head.appendChild(style); }
    
    let secRgb = APP_DATA.tema.secondaryColor ? hexToRgb(APP_DATA.tema.secondaryColor) : '192,96,112';
    
    style.innerHTML = \`
      .btn-primary { background: linear-gradient(135deg, rgba(\${rgb},0.15), rgba(\${rgb},0.05)); }
      .btn-primary:hover { background: linear-gradient(135deg, rgba(\${rgb},0.28), rgba(\${rgb},0.1)); box-shadow: 0 0 24px rgba(\${rgb},0.2), var(--shadow); }
      .btn-ripple { background: rgba(\${rgb},0.3); }
      .screen-bg-pattern { background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(\${rgb},0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 80% 100%, rgba(\${secRgb},0.05) 0%, transparent 60%); }
      .impact-number { text-shadow: 0 0 60px rgba(\${rgb},0.25); }
      .quiz-option:hover { background: rgba(\${rgb},0.08); }
    \`;
  }
  
  if (APP_DATA.tema.secondaryColor) {
    root.style.setProperty('--rose', APP_DATA.tema.secondaryColor);
  }
  
  if (APP_DATA.tema.bgColor) {
    root.style.setProperty('--bg', APP_DATA.tema.bgColor);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', APP_DATA.tema.bgColor);
  }
  
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
}`;

// Replace the existing applyTheme
code = code.replace(/function applyTheme\(\) \{[\s\S]*?\}\n\}/, applyThemeImpl);
fs.writeFileSync('nosso-primeiro-ano/script.js', code);
