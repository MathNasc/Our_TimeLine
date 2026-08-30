const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf-8');

code = code.replace(
  "const DB_FILE = path.join(__dirname, 'published_retros.json');",
  "const DB_FILE = process.env.VERCEL ? '/tmp/published_retros.json' : path.join(__dirname, 'published_retros.json');"
);

// Also need to export the app for Vercel
if (!code.includes('module.exports = app')) {
  code = code.replace(
    "app.listen(PORT, '0.0.0.0', () => {",
    "if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {\n  app.listen(PORT, '0.0.0.0', () => {"
  );
  code = code.replace(
    "  console.log(`Server is running on port ${PORT}`);\n});",
    "    console.log(`Server is running on port ${PORT}`);\n  });\n}\n\nmodule.exports = app;"
  );
}

fs.writeFileSync('server.js', code);
