const fs = require('fs');
let code = fs.readFileSync('nosso-primeiro-ano/style.css', 'utf-8');

const safeBottom = `
@supports(padding-bottom:env(safe-area-inset-bottom)) {
  .screen-content { padding-bottom: max(100px, calc(env(safe-area-inset-bottom) + 80px)); }
}
`;

code += '\n' + safeBottom;
fs.writeFileSync('nosso-primeiro-ano/style.css', code);
