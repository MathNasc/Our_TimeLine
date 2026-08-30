const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf-8');

const additionalCSS = `
    @media (max-width: 600px) {
      .dashboard-main { padding: 24px 16px !important; }
      .editor-main-inner { padding: 24px 16px !important; }
    }
`;

code = code.replace('</style>', additionalCSS + '</style>');
code = code.replace("style=${{maxWidth:1100,margin:'0 auto',padding:'40px 32px'}}", "class=\"dashboard-main\" style=${{maxWidth:1100,margin:'0 auto',padding:'40px 32px'}}");

fs.writeFileSync('index.html', code);
