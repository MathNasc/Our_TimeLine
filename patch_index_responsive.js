const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf-8');

// Inject the <style> block right before </head>
const responsiveCSS = `
  <style>
    /* Responsive Admin CSS */
    .editor-layout { display: flex; height: 100vh; overflow: hidden; }
    .editor-sidebar { width: 210px; flex-shrink: 0; display: flex; flex-direction: column; background: #060610; border-right: 1px solid rgba(255,255,255,0.06); }
    .editor-sidebar-header { padding: 16px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .editor-sidebar-nav { flex: 1; padding: 10px 8px; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; }
    .editor-sidebar-footer { padding: 10px 10px 16px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; gap: 6px; }
    .editor-main { flex: 1; overflow-y: auto; background: #0a0a12; border-right: 1px solid rgba(255,255,255,0.06); }
    .editor-main-inner { max-width: 600px; margin: 0 auto; padding: 44px 40px; }
    .editor-preview { width: 40%; min-width: 350px; background: #000; display: flex; flex-direction: column; }
    
    .dashboard-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 48px; }
    .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
    .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .form-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    
    @media (max-width: 900px) {
      .editor-layout { flex-direction: column !important; }
      .editor-sidebar { width: 100% !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); height: auto !important; }
      .editor-sidebar-nav { flex-direction: row !important; overflow-x: auto !important; padding: 12px !important; }
      .editor-sidebar-nav button { white-space: nowrap; flex-shrink: 0; }
      .editor-sidebar-footer { flex-direction: row !important; padding: 10px !important; }
      .editor-sidebar-footer button { flex: 1; }
      .editor-main { flex: 1 !important; border-right: none !important; }
      .editor-main-inner { padding: 24px 20px !important; max-width: 100% !important; }
      .editor-preview { display: none !important; /* Hide preview panel, rely on Preview Modal */ }
      
      .dashboard-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
      .dashboard-grid { grid-template-columns: 1fr !important; }
      .form-grid-3 { grid-template-columns: 1fr 1fr !important; }
    }
    
    @media (max-width: 600px) {
      .form-grid-2 { grid-template-columns: 1fr !important; }
    }
    
    /* Global scrollbar for admin */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
    
  </style>
</head>`;
code = code.replace('</head>', responsiveCSS);

// Now apply classes and remove conflicting inline styles

// Dashboard Stats
code = code.replace(
  "style=${{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:48}}",
  "class=\"dashboard-stats\""
);

// Dashboard Grid
code = code.replace(
  "style=${{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:16}}",
  "class=\"dashboard-grid\""
);

// Editor Layout
code = code.replace(
  "style=${{display:'flex',height:'100vh',overflow:'hidden'}}",
  "class=\"editor-layout\""
);

// Editor Sidebar
code = code.replace(
  "style=${{width:210,flexShrink:0,borderRight:'1px solid rgba(255,255,255,0.06)',display:'flex',flexDirection:'column',background:'#060610',overflow:'hidden'}}",
  "class=\"editor-sidebar\""
);

// Editor Sidebar Header
code = code.replace(
  "style=${{padding:'16px 14px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}",
  "class=\"editor-sidebar-header\""
);

// Editor Sidebar Nav
code = code.replace(
  "style=${{flex:1,padding:'10px 8px',overflowY:'auto',display:'flex',flexDirection:'column',gap:2}}",
  "class=\"editor-sidebar-nav\""
);

// Editor Sidebar Footer
code = code.replace(
  "style=${{padding:'10px 10px 16px',borderTop:'1px solid rgba(255,255,255,0.06)',display:'flex',flexDirection:'column',gap:6}}",
  "class=\"editor-sidebar-footer\""
);

// Editor Main
code = code.replace(
  "style=${{flex:1,overflowY:'auto',background:'#0a0a12',borderRight:'1px solid rgba(255,255,255,0.06)'}}",
  "class=\"editor-main\""
);

// Editor Main Inner
code = code.replace(
  "style=${{maxWidth:600,margin:'0 auto',padding:'44px 40px'}} class=\"fade-in\"",
  "class=\"editor-main-inner fade-in\""
);

// Editor Preview
code = code.replace(
  "style=${{width:'40%',minWidth:350,background:'#000',display:'flex',flexDirection:'column'}}",
  "class=\"editor-preview\""
);

// Replace grid-template-columns: 1fr 1fr with form-grid-2
code = code.replaceAll(
  "style=${{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}",
  "class=\"form-grid-2\" style=${{marginBottom:12}}"
);
code = code.replaceAll(
  "style=${{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}",
  "class=\"form-grid-2\" style=${{marginTop:12}}"
);
code = code.replaceAll(
  "style=${{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}",
  "class=\"form-grid-2\""
);
code = code.replaceAll(
  "style=${{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}",
  "class=\"form-grid-2\" style=${{gap:10}}"
);

// Replace repeat(3, 1fr) with form-grid-3
code = code.replaceAll(
  "style=${{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}",
  "class=\"form-grid-3\""
);

fs.writeFileSync('index.html', code);
console.log('Admin patched');
