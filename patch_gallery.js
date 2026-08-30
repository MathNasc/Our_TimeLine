const fs = require('fs');

// Patch script.js to just use a class and dataset for rotation
let script = fs.readFileSync('nosso-primeiro-ano/script.js', 'utf-8');
script = script.replace(
  'el.style.cssText = `background:#fff;padding:8px 8px 30px;border-radius:4px;box-shadow:0 4px 15px rgba(0,0,0,0.15);transform:rotate(${Math.random()*6-3}deg);transition:transform 0.3s ease;cursor:pointer;`;\n    el.onmouseenter = () => el.style.transform = `scale(1.05) rotate(0deg)`;\n    el.onmouseleave = () => el.style.transform = `rotate(${Math.random()*6-3}deg)`;\n    el.innerHTML = `<div style="width:100%;aspect-ratio:1;border-radius:2px;overflow:hidden;background:#eee;"><img src="${foto.url}" style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy"/></div>`;',
  `const rot = Math.random()*6-3;
    el.className = "gallery-item";
    el.style.setProperty('--rot', rot + 'deg');
    el.innerHTML = \`<div class="gallery-photo"><img src="\${foto.url}" loading="lazy"/></div>\`;`
);
fs.writeFileSync('nosso-primeiro-ano/script.js', script);

// Patch style.css to add the gallery-item styles and remove the old img override
let style = fs.readFileSync('nosso-primeiro-ano/style.css', 'utf-8');
style = style.replace(
  '/* Fix Gallery Images Aspect Ratio */\n.gallery-grid img { width: 100%; height: auto; aspect-ratio: 4/5; object-fit: cover; border-radius: 12px; border: 1px solid var(--border); box-shadow: var(--shadow-gold); }',
  `/* Gallery Polaroid Styles */
.gallery-item {
  background: var(--white);
  padding: 8px 8px 30px;
  border-radius: 4px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  transform: rotate(var(--rot, 0deg));
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
.gallery-item:hover {
  transform: scale(1.05) rotate(0deg);
  box-shadow: 0 8px 25px rgba(0,0,0,0.25);
  z-index: 10;
  position: relative;
}
.gallery-photo {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 2px;
  overflow: hidden;
  background: #eee;
}
.gallery-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}`
);
fs.writeFileSync('nosso-primeiro-ano/style.css', style);
console.log('Gallery polaroid patched');
