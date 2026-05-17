/* ══════════════════════════════════════════════════════
   NOSSO PRIMEIRO ANO ❤️ — script.js
   Use o Admin (admin/index.html) → aba Publicar → Copiar Código
   para gerar o APP_DATA personalizado.
══════════════════════════════════════════════════════ */
const APP_DATA = window.__RETRO_DATA__ || {
  casal:  { meuNome:"Matheus", nomeDela:"Marcela", apelido:"Moi ❤️" },
  datas:  { matchDate:"27 de fevereiro de 2025", primeiroEncontro:"22 de março de 2025", primeiroBeijo:"22 de março de 2025", primeiraViajem:"01 de maio de 2025", pedidoNamoro:"01 de maio de 2025", nossoAp:"11 de março de 2026", aniversario1Ano:"01 de maio de 2026" },
  textos: { titulo:"Nosso Primeiro Ano ❤️", subtitulo:"Uma pequena experiência para a pessoa mais importante da minha vida.", mensagemInicial:"Há um ano eu fiz uma das melhores escolhas da minha vida...", introducao:"Eu escolhi você. E cada dia desde então me prova que foi a escolha mais certa que já fiz.", mensagemFinal:"Feliz 1 ano, meu amor. Que venham muitos outros, sempre ao seu lado.", localPresenteFinal:"SOU EU!!! 🌹" },
  quiz: [
    { pergunta:"Onde foi nosso primeiro encontro?", opcoes:["Magia & Bruxaria","Vassoura Quebrada","Beco Hexagonal","Casa dos Bruxos"], correta:1, acerto:"Acertou minha bruxinha! 🥰", erro:"Quase! Mas foi no Vassoura Quebrada 🪄" },
    { pergunta:"Qual foi nossa primeira viagem juntos?", opcoes:["Campos do Jordão","Ubatuba","Santos","Paraty"], correta:3, acerto:"Sim! e ainda teve pedido de namoro. 💍", erro:"Nãão! Foi quando começamos a namorar 💍" },
    { pergunta:"Qual foi nosso primeiro filme nos cinemas?", opcoes:["Lilo & Stitch","Harry Potter e o Cálice de Fogo","Um Filme Minecraft","Piratas do Caribe"], correta:2, acerto:"Um Filme Minecraft! Muito legal 🎬", erro:"Foi Um Filme Minecraft!... 😄" },
    { pergunta:"Qual é a nossa comidinha favorita?", opcoes:["Pizza","Hambúrguer","Massa","Batata Frita"], correta:1, acerto:"Essa é a nossa preferida 💛", erro:"Amamos todas ❤️" }
  ],
  timeline: [
    { titulo:"O Nosso Match",        data:"", descricao:"O dia em que demos match.", foto:"fotos/its_a_match.jpg" },
    { titulo:"Primeiro Encontro",    data:"", descricao:"Aquela noite que tudo começou. 💐🍫", foto:"fotos/primeiroEncontro.jpeg" },
    { titulo:"Primeiro Beijo",       data:"", descricao:"O beijo que selou tudo.", foto:"" },
    { titulo:"O Pedido de Namoro",   data:"", descricao:"Quando eu oficialmente te escolhi.", foto:"" },
    { titulo:"Nossa Primeira Viagem",data:"", descricao:"Descobrir novos lugares ao seu lado.", foto:"fotos/primeiraViajem.jpeg" },
    { titulo:"Nosso Apartamento",    data:"", descricao:"Naquele dia compramos nossa casinha.", foto:"fotos/nossoAp.jpeg" },
    { titulo:"Nosso Primeiro Ano ❤️",data:"", descricao:"Hoje. Um ano inteiro de você.", foto:"" }
  ],
  motivos: [
    "Porque você ri do meu jeito torto de contar histórias",
    "Porque você me abraça sem eu precisar pedir",
    "Porque seu sorriso de manhã vale mais que qualquer coisa",
    "Porque você me faz querer ser melhor todos os dias",
    "Porque você cuida de mim mesmo quando finge que não",
    "Porque sua voz é meu lugar favorito",
    "Porque você escolhe ficar, e isso significa tudo",
    "Porque você me conhece de verdade e mesmo assim me ama",
    "Porque quando estou com você, o tempo passa diferente",
    "Porque você transforma dias comuns em memórias",
    "Porque você é a pessoa mais bonita que já vi na vida",
    "Porque mesmo na distância, você está comigo",
    "Porque você me faz rir até a barriga doer",
    "Porque do seu jeito, você me salva todo dia",
    "Na verdade, faltam palavras no mundo para te descrever"
  ],
  musicas:    { ativada:true, arquivo:"" },
  fotosGerais:{ capa:"", fundo:"" }
};

if(!window.__RETRO_DATA__){
(function(){
  const ds=APP_DATA.datas,order=["matchDate","primeiroEncontro","primeiroBeijo","pedidoNamoro","primeiraViajem","nossoAp","aniversario1Ano"];
  order.forEach((k,i)=>{ if(APP_DATA.timeline[i]) APP_DATA.timeline[i].data=ds[k]||""; });
})();
}

const STATE={currentScreen:"screen-cover",quizIndex:0,quizScore:0,motivosVistos:new Set(),motivoAtual:null,screenOrder:["screen-cover","screen-intro","screen-quiz","screen-timeline","screen-impact","screen-motivos","screen-final","screen-presente"],musicPlaying:false};
const $=id=>document.getElementById(id);

document.addEventListener("DOMContentLoaded",()=>{
  loadProgress(); populateCover(); populateIntro(); populateTimeline();
  populateMotivos(); populateFinal(); populatePresente();
  setupQuiz(); setupMusic(); setupButtons();
  createParticles("cover-particles",18);
  setTimeout(()=>{ $("loader").classList.add("hidden"); showMusicBtn(); },2400);
  updateProgressBar();
});

function populateCover(){ const t=$("cover-title");if(t)t.textContent=APP_DATA.textos.titulo||"Nosso Primeiro Ano ❤️"; const s=$("cover-subtitle");if(s)s.textContent=APP_DATA.textos.subtitulo; const d=$("cover-date");if(d)d.textContent=APP_DATA.datas.aniversario1Ano; const bg=$("cover-bg");if(bg&&APP_DATA.fotosGerais.capa){bg.style.backgroundImage=`url('${APP_DATA.fotosGerais.capa}')`;bg.style.display="block";} }
function populateIntro(){ const it=$("intro-text");if(it)it.textContent=APP_DATA.textos.mensagemInicial; const in_=$("intro-names");if(in_)in_.textContent=`${APP_DATA.casal.meuNome} & ${APP_DATA.casal.nomeDela}`; }
function populateTimeline(){
  const list=$("timeline-list");if(!list)return; list.innerHTML="";
  APP_DATA.timeline.forEach((item,i)=>{ const el=document.createElement("div"); el.className="timeline-item"; el.style.transitionDelay=`${i*0.08}s`;
    el.innerHTML=`<div class="timeline-dot"></div><div class="timeline-card"><div class="timeline-card-date">${item.data}</div><div class="timeline-card-title">${item.titulo}</div><p class="timeline-card-desc">${item.descricao}</p>${item.foto?`<img class="timeline-card-img" src="${item.foto}" alt="${item.titulo}" loading="lazy"/>`:""}</div>`;
    list.appendChild(el);
  });
  const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add("visible");}),{threshold:0.15});
  list.querySelectorAll(".timeline-item").forEach(el=>obs.observe(el));
}
function populateMotivos(){ const saved=localStorage.getItem("motivosVistos"); if(saved){try{JSON.parse(saved).forEach(i=>STATE.motivosVistos.add(i));}catch(_){}} updateMotivosContador(); }
function populateFinal(){ const m=$("final-mensagem");if(m)m.textContent=APP_DATA.textos.mensagemFinal; const a=$("final-assinatura");if(a)a.textContent=`— ${APP_DATA.casal.meuNome}`; }
function populatePresente(){ const t=$("presente-texto");if(t)t.textContent=APP_DATA.textos.localPresenteFinal; }

function setupQuiz(){ STATE.quizReady=false; }
function renderQuizQuestion(){
  const q=APP_DATA.quiz[STATE.quizIndex]; if(!q){showQuizEnd();return;}
  const pct=Math.round((STATE.quizIndex/APP_DATA.quiz.length)*100),label=`${STATE.quizIndex+1} / ${APP_DATA.quiz.length}`;
  const opcoesHTML=q.opcoes.map((op,i)=>`<button class="quiz-option" data-idx="${i}">${op}</button>`).join("");
  const cc=$("quiz-card-container");
  if(cc){ cc.innerHTML=`<div class="quiz-progress-wrap"><div class="quiz-progress-bar" style="--progress:${pct}%"></div><span class="quiz-progress-label">${label}</span></div><div class="quiz-card" id="quiz-card"><p class="quiz-question">${q.pergunta}</p><div class="quiz-options">${opcoesHTML}</div></div><div class="quiz-feedback" id="quiz-feedback"></div>`;
    cc.querySelectorAll(".quiz-option").forEach(btn=>btn.addEventListener("click",()=>handleQuizAnswer(parseInt(btn.dataset.idx),btn,cc)));
  }
}
function showQuizEnd(){ const cc=$("quiz-card-container");if(cc)cc.innerHTML=""; const end=$("quiz-end");if(end)end.classList.remove("hidden"); const hdr=document.querySelector("#screen-quiz .quiz-header");if(hdr)hdr.classList.add("hidden"); }
function handleQuizAnswer(chosen,btnEl,container){
  const q=APP_DATA.quiz[STATE.quizIndex],opts=(container||document).querySelectorAll(".quiz-option"),fb=(container||document).querySelector("#quiz-feedback");
  opts.forEach(b=>b.setAttribute("disabled","true"));
  const acertou=chosen===q.correta; if(acertou)STATE.quizScore++;
  if(opts[q.correta])opts[q.correta].classList.add("correct"); if(!acertou)btnEl.classList.add("wrong");
  if(fb){fb.textContent=acertou?(q.acerto||"Acertou! 🥰"):(q.erro||"Quase! 😄");fb.style.opacity="1";}
  setTimeout(()=>{ STATE.quizIndex++;
    if(STATE.quizIndex>=APP_DATA.quiz.length){ const card=$("quiz-card"),end=$("quiz-end"); if(card){card.classList.add("flip-out");setTimeout(()=>card.classList.add("hidden"),400);} setTimeout(()=>{if(end)end.classList.remove("hidden");},500); saveProgress(); }
    else{ const card=$("quiz-card"); if(card){card.classList.add("flip-out");setTimeout(()=>{card.classList.remove("flip-out");if(fb)fb.textContent="";renderQuizQuestion();},400);}else renderQuizQuestion(); }
  },1800);
}
function startImpactAnimation(){
  const b1=$("impact-block-1"),div=$("impact-divider"),b2=$("impact-block-2"),btn=$("btn-open-motivos");
  if(b1)b1.style.animation="impact-reveal 0.8s cubic-bezier(0,0,0.2,1) forwards";
  setTimeout(()=>{if(div)div.classList.add("expanded");},2000);
  setTimeout(()=>{if(b2){b2.classList.remove("hidden");b2.style.animation="impact-reveal 1s cubic-bezier(0,0,0.2,1) forwards";}},3000);
  setTimeout(()=>{if(btn){btn.classList.remove("hidden");btn.style.animation="fade-up 0.7s cubic-bezier(0,0,0.2,1) forwards";}},4500);
}
function showNextMotivo(){
  const motivos=APP_DATA.motivos;
  if(!motivos||motivos.length===0){const bd=$("btn-motivos-done");if(bd){bd.style.opacity="1";bd.style.pointerEvents="all";}return;}

  const motivos=APP_DATA.motivos,card=$("motivo-card"),numEl=$("motivo-numero"),textoEl=$("motivo-texto"),btnDone=$("btn-motivos-done");
  const disp=motivos.map((_,i)=>i).filter(i=>!STATE.motivosVistos.has(i));
  if(disp.length===0){STATE.motivosVistos.clear();localStorage.removeItem("motivosVistos");}
  const pool=disp.length>0?disp:motivos.map((_,i)=>i),idx=pool[Math.floor(Math.random()*pool.length)];
  STATE.motivosVistos.add(idx);STATE.motivoAtual=idx;localStorage.setItem("motivosVistos",JSON.stringify([...STATE.motivosVistos]));
  card.classList.add("fade-out");
  setTimeout(()=>{ if(numEl)numEl.textContent=`#${STATE.motivosVistos.size}`; if(textoEl)textoEl.textContent=motivos[idx]; card.classList.remove("fade-out");card.classList.add("fade-in"); updateMotivosContador(); setTimeout(()=>card.classList.remove("fade-in"),400); },380);
  if(btnDone){const thr=Math.min(3,Math.max(1,motivos.length));if(STATE.motivosVistos.size>=thr){btnDone.style.opacity="1";btnDone.style.pointerEvents="all";}}
}
function updateMotivosContador(){ const el=$("motivo-contador"),t=STATE.motivosVistos.size; if(el)el.textContent=t===0?"Pressione para abrir a primeira":`${t} aberta${t>1?"s":""} de ${APP_DATA.motivos.length}`; }
function launchConfetti(){ const container=$("confetti-container");if(!container)return; const colors=["#c9a96e","#e8a0a0","#f5f0eb","#e8c99a","#c06070","#ffffff"]; for(let i=0;i<80;i++){const p=document.createElement("div");p.className="confetti-piece";const size=Math.random()*8+5,color=colors[Math.floor(Math.random()*colors.length)];p.style.cssText=`left:${Math.random()*100}%;width:${size}px;height:${size}px;background:${color};border-radius:${Math.random()>0.5?"50%":"2px"};animation-duration:${Math.random()*2+2.5}s;animation-delay:${Math.random()*2}s;transform:rotate(${Math.random()*360}deg);`;container.appendChild(p);}setTimeout(()=>{container.innerHTML="";},6000); }
function launchHearts(){ const container=$("hearts-container");if(!container)return;container.innerHTML=""; const symbols=["❤","🩷","💕","💗","💓","🌹"],launch=()=>{const h=document.createElement("div");h.className="floating-heart";h.textContent=symbols[Math.floor(Math.random()*symbols.length)];h.style.cssText=`left:${Math.random()*90+5}%;font-size:${Math.random()*1.2+0.8}rem;animation-duration:${Math.random()*4+5}s;animation-delay:${Math.random()*2}s;`;container.appendChild(h);setTimeout(()=>h.remove(),9000);}; for(let i=0;i<12;i++)setTimeout(launch,i*400); const iv=setInterval(launch,1200);setTimeout(()=>clearInterval(iv),20000); }
function createParticles(cid,count){ const container=$(cid);if(!container)return; for(let i=0;i<count;i++){const p=document.createElement("div");p.className="particle";const isHeart=Math.random()>0.65;p.style.cssText=`left:${Math.random()*100}%;bottom:-10px;width:${isHeart?"auto":Math.random()*3+1+"px"};height:${isHeart?"auto":Math.random()*3+1+"px"};background:${isHeart?"transparent":`rgba(201,169,110,${Math.random()*0.5+0.2})`};font-size:${isHeart?Math.random()*0.6+0.5+"rem":"0"};color:rgba(232,160,160,0.6);animation-duration:${Math.random()*8+6}s;animation-delay:${Math.random()*8}s;`;if(isHeart)p.textContent="❤";container.appendChild(p);} }
function setupMusic(){ const audio=$("bg-music"),btn=$("music-btn");if(!audio||!btn)return;if(APP_DATA.musicas.arquivo){audio.src=APP_DATA.musicas.arquivo;audio.volume=0.35;}btn.addEventListener("click",toggleMusic); }
function showMusicBtn(){ const btn=$("music-btn");if(btn&&APP_DATA.musicas.arquivo){btn.classList.add("visible");if(APP_DATA.musicas.ativada)setTimeout(()=>tryPlayMusic(),500);} }
function tryPlayMusic(){ const audio=$("bg-music");if(!audio||!APP_DATA.musicas.arquivo)return;audio.play().then(()=>{STATE.musicPlaying=true;$("music-btn").classList.add("playing");}).catch(()=>{}); }
function toggleMusic(){ const audio=$("bg-music"),btn=$("music-btn");if(!audio||!APP_DATA.musicas.arquivo)return;if(STATE.musicPlaying){audio.pause();STATE.musicPlaying=false;btn.classList.remove("playing");}else{audio.play().catch(()=>{});STATE.musicPlaying=true;btn.classList.add("playing");} }
function goToScreen(screenId){ const current=document.querySelector(".screen.active"),next=$(screenId);if(!next||current===next)return;if(current){current.classList.add("exit");setTimeout(()=>current.classList.remove("active","exit"),650);}setTimeout(()=>{next.classList.add("active");next.scrollTop=0;STATE.currentScreen=screenId;updateProgressBar();saveProgress();onScreenEnter(screenId);},current?300:0); }
function onScreenEnter(screenId){ switch(screenId){case"screen-quiz":renderQuizQuestion();setTimeout(()=>renderQuizQuestion(),150);setTimeout(()=>renderQuizQuestion(),500);break;case"screen-impact":startImpactAnimation();break;case"screen-motivos":if(STATE.motivoAtual===null)showNextMotivo();break;case"screen-final":setTimeout(launchConfetti,600);break;case"screen-presente":setTimeout(launchHearts,400);break;} }
function setupButtons(){
  const pairs=[["btn-start",()=>{ripple($("btn-start"));setTimeout(()=>goToScreen("screen-intro"),150);}],["btn-intro-next",()=>goToScreen("screen-quiz")],["btn-quiz-done",()=>{ripple($("btn-quiz-done"));setTimeout(()=>goToScreen("screen-timeline"),150);}],["btn-timeline-next",()=>{ripple($("btn-timeline-next"));setTimeout(()=>goToScreen("screen-impact"),150);}],["btn-open-motivos",()=>{ripple($("btn-open-motivos"));setTimeout(()=>goToScreen("screen-motivos"),150);}],["btn-next-motivo",()=>showNextMotivo()],["btn-motivos-done",()=>goToScreen("screen-final")],["btn-reveal",()=>{ripple($("btn-reveal"));setTimeout(()=>goToScreen("screen-presente"),150);}],["btn-restart",()=>{if(confirm("Recomeçar?"))resetApp();}]];
  pairs.forEach(([id,fn])=>{const el=$(id);if(el)el.addEventListener("click",fn);});
  const btnDone=$("btn-motivos-done");if(btnDone){btnDone.style.opacity="0";btnDone.style.pointerEvents="none";}
}
function ripple(btn){ const r=btn&&btn.querySelector(".btn-ripple");if(!r)return;r.style.width=r.style.height="200px";r.style.opacity="1";r.style.transition="width 0.5s ease,height 0.5s ease,opacity 0.5s ease";setTimeout(()=>{r.style.width=r.style.height="0";r.style.opacity="0";},500); }
function updateProgressBar(){ const idx=STATE.screenOrder.indexOf(STATE.currentScreen),pct=idx<0?0:Math.round((idx/(STATE.screenOrder.length-1))*100),bar=$("progress-bar");if(bar)bar.style.width=`${pct}%`; }
function saveProgress(){ try{localStorage.setItem("nossoPrimeiroAno_progress",JSON.stringify({currentScreen:STATE.currentScreen,quizIndex:STATE.quizIndex,quizScore:STATE.quizScore,motivoAtual:STATE.motivoAtual}));}catch(_){} }
function loadProgress(){ try{const raw=localStorage.getItem("nossoPrimeiroAno_progress");if(!raw)return;const data=JSON.parse(raw);if(typeof data.quizIndex==="number")STATE.quizIndex=data.quizIndex>=APP_DATA.quiz.length?0:data.quizIndex;if(typeof data.quizScore==="number")STATE.quizScore=data.quizScore;if(typeof data.motivoAtual==="number")STATE.motivoAtual=data.motivoAtual;}catch(_){} }
function resetApp(){ localStorage.removeItem("nossoPrimeiroAno_progress");localStorage.removeItem("motivosVistos");STATE.quizIndex=0;STATE.quizScore=0;STATE.motivosVistos.clear();STATE.motivoAtual=null;["quiz-end","impact-block-2","btn-open-motivos"].forEach(id=>{const el=$(id);if(el)el.classList.add("hidden");});const bd=$("btn-motivos-done");if(bd){bd.style.opacity="0";bd.style.pointerEvents="none";}renderQuizQuestion();updateMotivosContador();document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active","exit"));const cover=$("screen-cover");if(cover)cover.classList.add("active");STATE.currentScreen="screen-cover";updateProgressBar(); }
document.addEventListener("DOMContentLoaded",()=>{ const introScreen=$("screen-intro");if(!introScreen)return;const obs=new MutationObserver(mutations=>{mutations.forEach(m=>{if(m.target.classList.contains("active")&&!introScreen.dataset.typed){introScreen.dataset.typed="1";const el=$("intro-text");if(el){el.textContent="";let i=0;const t=APP_DATA.textos.mensagemInicial;const timer=setInterval(()=>{el.textContent+=t[i];i++;if(i>=t.length)clearInterval(timer);},40);}}});});obs.observe(introScreen,{attributes:true,attributeFilter:["class"]}); });
(function setupSwipe(){let ty=0,tx=0;document.addEventListener("touchstart",e=>{ty=e.touches[0].clientY;tx=e.touches[0].clientX;},{passive:true});document.addEventListener("touchend",e=>{const dy=ty-e.changedTouches[0].clientY,dx=tx-e.changedTouches[0].clientX;if(Math.abs(dy)<60||Math.abs(dx)>Math.abs(dy))return;const map={"screen-intro":"screen-quiz","screen-final":"screen-presente"};if(dy>0&&map[STATE.currentScreen])goToScreen(map[STATE.currentScreen]);},{passive:true});})();
(function preloadImages(){const imgs=[APP_DATA.fotosGerais.capa,...APP_DATA.timeline.map(t=>t.foto)].filter(Boolean);imgs.forEach(src=>{const img=new Image();img.src=src;});})();
