const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const start = html.indexOf('// ── PUBLISH TAB');
const end = html.indexOf('// ── PREVIEW MODAL');

if (start !== -1 && end !== -1) {
  const newPublishTab = `// ── PUBLISH TAB ──────────────────────────────────────────
function PublishTab({retro,onUpdate,onSave}) {
  const [copied,setCopied]=useState(false);
  const [publishing,setPublishing]=useState(false);
  
  const SITE = window.location.origin;
  const slug = retro.slug || 'minha-retrospectiva';
  const url = \`\${SITE}/r/\${slug}\`;
  
  const copy=()=>{ navigator.clipboard?.writeText(url); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  const exportJSON=()=>{const b=new Blob([JSON.stringify(retro,null,2)],{type:'application/json'});const a=Object.assign(document.createElement('a'),{href:URL.createObjectURL(b),download:\`\${slug}.json\`});a.click();};

  const publishToServer = async () => {
    setPublishing(true);
    try {
      onSave('published');
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...retro, slug, status: 'published'})
      });
      if (!res.ok) throw new Error('Erro ao publicar');
      
      alert(\`Sucesso! Sua retrospectiva está no ar em:\\n\\n\${url}\`);
    } catch(e) {
      alert('Erro ao publicar: ' + e.message);
    }
    setPublishing(false);
  };

  const active=Object.values(retro.sections||{}).filter(Boolean).length;

  return html\`<div>
    <\${TabH} title="Publicação" sub="Sua retrospectiva online com uma URL mágica ❤️"/>

    <\${Sec} title="Link Público">
      <div style=\${{fontSize:12,color:'rgba(255,255,255,0.4)',marginBottom:8,lineHeight:1.6}}>
        Sua retrospectiva ficará acessível para qualquer pessoa que tiver este link especial.
      </div>
      <div style=\${{display:'flex',border:'1px solid rgba(255,255,255,0.09)',borderRadius:12,overflow:'hidden',background:'rgba(255,255,255,0.04)',marginBottom:10}}>
        <span style=\${{padding:'12px 14px',fontSize:12,color:'rgba(255,255,255,0.25)',borderRight:'1px solid rgba(255,255,255,0.07)',whiteSpace:'nowrap',fontFamily:'monospace'}}>
          \${SITE}/r/
        </span>
        <input value=\${slug}
          onInput=\${e=>onUpdate('slug',slugify(e.target.value))}
          placeholder="nosso-primeiro-ano"
          style=\${{flex:1,background:'transparent',border:'none',padding:'12px 14px',fontSize:13,color:'rgba(255,255,255,0.85)',outline:'none',fontFamily:'monospace'}}/>
      </div>
      <div style=\${{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:12,background:'rgba(16,185,129,0.05)',border:'1px solid rgba(16,185,129,0.15)'}}>
        <\${IC.Globe} s=\${12}/>
        <span style=\${{fontSize:12,color:'#34d399',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>\${url}</span>
        <button onClick=\${copy} style=\${{display:'flex',alignItems:'center',gap:5,fontSize:11,color:copied?'#34d399':'rgba(52,211,153,0.6)',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',flexShrink:0}}>
          \${copied?html\`<\${IC.Check} s=\${11}/> Copiado!\`:html\`<\${IC.Copy} s=\${11}/> Copiar\`}
        </button>
      </div>
    </\${Sec}>

    <\${Sec} title="Colocar no Ar">
      <div style=\${{padding:16,borderRadius:14,border:'1px solid rgba(201,169,110,0.2)',background:'rgba(201,169,110,0.05)',marginBottom:12,display:'flex',flexDirection:'column',gap:16}}>
        <div>
          <div style=\${{fontSize:13,color:'#c9a96e',fontWeight:600,marginBottom:6}}>
            🚀 Prontos para lançar?
          </div>
          <div style=\${{fontSize:12,color:'rgba(255,255,255,0.4)',lineHeight:1.8}}>
            Clique no botão abaixo para publicar sua retrospectiva no servidor.<br/>
            Com isso, o link e as tags do cartão (Open Graph) para WhatsApp/Instagram estarão ativas.
          </div>
        </div>
        <button onClick=\${publishToServer} disabled=\${publishing}
          style=\${{display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'12px 22px',background:publishing?'rgba(201,169,110,0.4)':'#c9a96e',border:'none',borderRadius:11,color:'#000',fontSize:13,fontWeight:600,cursor:publishing?'wait':'pointer',fontFamily:'inherit',transition:'opacity 0.2s',width:'100%'}}>
          <\${IC.Globe} s=\${14}/> \${publishing?'Publicando...':'Publicar Agora!'}
        </button>
      </div>
    </\${Sec}>

    <\${Sec} title="Status">
      <div style=\${{padding:16,borderRadius:14,border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.02)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
        <div><div style=\${{fontSize:12,color:'rgba(255,255,255,0.3)',marginBottom:6}}>Status do Rascunho</div><\${Badge} status=\${retro.status}/></div>
        <div style=\${{display:'flex',gap:8}}>
          <button onClick=\${()=>onSave('draft')} style=\${{display:'flex',alignItems:'center',gap:6,padding:'9px 16px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:11,color:'rgba(255,255,255,0.55)',fontSize:12,cursor:'pointer',fontFamily:'inherit'}}><\${IC.Save} s=\${12}/> Salvar Local</button>
        </div>
      </div>
    </\${Sec}>

    <\${Sec} title="Compartilhar & Acessar">
      <div style=\${{display:'flex',gap:16,alignItems:'stretch'}}>
        <div style=\${{flex:1,display:'grid',gridTemplateColumns:'1fr',gap:10}}>
          \${[
            {label:'WhatsApp',emoji:'💬',action:()=>window.open(\`https://wa.me/?text=\${encodeURIComponent('Fiz uma retrospectiva especial para a gente! Vem ver ❤️ ' + url)}\`)},
            {label:'Visualizar Online',emoji:'✨',action:()=>window.open(url)},
            {label:'Exportar JSON (Backup)',emoji:'📦',action:exportJSON},
            {label:'Compartilhar (Nativo)',emoji:'📤',action:()=>navigator.share?.({title:retro.content.title,url})},
          ].map(b=>html\`<button key=\${b.label} onClick=\${b.action}
            style=\${{display:'flex',alignItems:'center',gap:12,padding:'14px 16px',borderRadius:14,border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.02)',cursor:'pointer',fontFamily:'inherit',fontSize:13,color:'rgba(255,255,255,0.5)',transition:'all 0.15s'}}
            onMouseEnter=\${e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.14)';e.currentTarget.style.color='rgba(255,255,255,0.8)';e.currentTarget.style.background='rgba(255,255,255,0.04)';}}
            onMouseLeave=\${e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.07)';e.currentTarget.style.color='rgba(255,255,255,0.5)';e.currentTarget.style.background='rgba(255,255,255,0.02)';}}
          ><span style=\${{fontSize:20}}>\${b.emoji}</span>\${b.label}</button>\`)}
        </div>
        <div style=\${{width:140,display:'flex',flexDirection:'column',gap:8,alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,0.02)',borderRadius:14,border:'1px solid rgba(255,255,255,0.07)',padding:12}}>
          <img src=\`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=\${encodeURIComponent(url)}\` style=\${{width:'100%',borderRadius:8}} />
          <div style=\${{fontSize:10,color:'rgba(255,255,255,0.4)',textAlign:'center'}}>Leia o QR Code</div>
        </div>
      </div>
    </\${Sec}>

    <\${Sec} title="Resumo">
      <div style=\${{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
        \${[{v:retro.views||0,l:'Visitas',e:'👁'},{v:active,l:'Seções',e:'⚡'},{v:retro.timeline.length,l:'Eventos',e:'📅'},{v:retro.gallery.length,l:'Fotos',e:'🖼'},{v:retro.quiz.length,l:'Perguntas',e:'❓'},{v:retro.status==='published'?'Live':'Off',l:'Status',e:retro.status==='published'?'🟢':'⚪'}].map(s=>html\`
          <div key=\${s.l} style=\${{padding:'14px 10px',borderRadius:14,border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.02)',textAlign:'center'}}>
            <div style=\${{fontSize:20,marginBottom:4}}>\${s.e}</div>
            <div style=\${{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:300,color:'#fff'}}>\${s.v}</div>
            <div style=\${{fontSize:10,color:'rgba(255,255,255,0.3)',marginTop:2}}>\${s.l}</div>
          </div>\`)}
      </div>
    </\${Sec}>
  </div>\`;
}

`;

  const finalHtml = html.substring(0, start) + newPublishTab + html.substring(end);
  fs.writeFileSync('index.html', finalHtml);
  console.log('PublishTab replaced successfully!');
} else {
  console.log('Error: Could not find start or end markers.');
}
