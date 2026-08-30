const fs = require('fs');
let code = fs.readFileSync('nosso-primeiro-ano/style.css', 'utf-8');

const responsiveCSS = `
/* -- FLUID TYPOGRAPHY -- */
.section-title { font-size: clamp(2.2rem, 8vw, 3.5rem); }
.section-subtitle { font-size: clamp(0.85rem, 3vw, 1rem); }
.timeline-card-title { font-size: clamp(1.25rem, 4vw, 1.5rem); }
.motivo-texto { font-size: clamp(1.15rem, 5vw, 1.7rem); }
.final-text-grande { font-size: clamp(1.6rem, 7vw, 3rem); }
.final-mensagem { font-size: clamp(1.2rem, 5vw, 2rem); }
.presente-titulo { font-size: clamp(2rem, 8vw, 4rem); }
.presente-texto { font-size: clamp(1.25rem, 5.5vw, 2rem); }
.quiz-question { font-size: clamp(1.2rem, 5vw, 1.8rem); }

/* -- LAYOUT LIMITS -- */
.screen-content { max-width: 100%; width: 100%; margin: 0 auto; padding-left: 20px; padding-right: 20px; }

@media (min-width: 768px) {
  .screen-content { max-width: 720px; padding-left: 32px; padding-right: 32px; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
}

@media (min-width: 1024px) {
  .screen-content { max-width: 1000px; }
  .gallery-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 24px !important; }
  .motivo-card { max-width: 440px; }
  .presente-card { max-width: 440px; }
  
  /* Desktop Timeline Centered */
  .timeline-list::before { left: 50%; transform: translateX(-50%); }
  .timeline-item { width: 100%; justify-content: space-between; gap: 40px; }
  .timeline-item:nth-child(odd) { flex-direction: row-reverse; }
  .timeline-item:nth-child(odd) .timeline-card { text-align: right; }
  .timeline-dot { position: absolute; left: 50%; transform: translateX(-50%); width: auto; padding-top: 0; justify-content: center; top: 10px; }
  .timeline-dot::before { margin-left: 0; font-size: 1.2rem; }
  .timeline-card { width: calc(50% - 30px); flex: none; }
}

@media (min-width: 1440px) {
  .screen-content { max-width: 1200px; }
}

/* -- TOUCH IMPROVEMENTS -- */
.btn-primary, .btn-ghost, .music-btn, .quiz-option { min-height: 48px; }
.music-btn { width: 48px; height: 48px; font-size: 20px; }
.quiz-option { display: flex; align-items: center; }

/* Safe Areas & Prevent Overflow */
body { overflow-x: hidden; }
* { max-width: 100%; }

/* Fix Gallery Images Aspect Ratio */
.gallery-grid img { width: 100%; height: auto; aspect-ratio: 4/5; object-fit: cover; border-radius: 12px; border: 1px solid var(--border); box-shadow: var(--shadow-gold); }

/* Prevent zoom on input focus for iOS */
input, textarea { font-size: 16px !important; }
`;

// Append to style.css
code += '\n' + responsiveCSS;

// Remove old conflicting media queries
code = code.replace(/@media\(min-width:430px\)\{[\s\S]*?\}/g, '');
code = code.replace(/@media\(min-width:768px\)\{[\s\S]*?\}/g, '');

fs.writeFileSync('nosso-primeiro-ano/style.css', code);
console.log('Style CSS patched');
