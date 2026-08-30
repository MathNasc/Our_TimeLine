const fs = require('fs');
let code = fs.readFileSync('nosso-primeiro-ano/style.css', 'utf-8');

const responsiveCSS = `
/* -- MORE RESPONSIVE FIXES -- */
.cover-subtitle { max-width: 600px; font-size: clamp(1rem, 3.5vw, 1.5rem); }
.final-mensagem { max-width: 600px; }
.presente-card { max-width: 100%; width: 100%; }
.motivo-card { max-width: 100%; width: 100%; }

@media (min-width: 768px) {
  .motivo-card { max-width: 80%; }
  .presente-card { max-width: 80%; }
}

@media (min-width: 1024px) {
  .motivo-card { max-width: 60%; margin: 0 auto; }
  .presente-card { max-width: 60%; margin: 0 auto; }
}

/* Ensure no overlap */
.timeline-card { z-index: 2; position: relative; }
`;

code += '\n' + responsiveCSS;

fs.writeFileSync('nosso-primeiro-ano/style.css', code);
console.log('Style CSS patched again');
