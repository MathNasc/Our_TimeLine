/* ══════════════════════════════════════════════════════
   NOSSO PRIMEIRO ANO ❤️ — script.js
   ──────────────────────────────────────────────────────
   PARA PERSONALIZAR: edite apenas o objeto APP_DATA abaixo.
   Não é necessário mexer no restante do código.
══════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════
   ██████████  APP_DATA — EDITE AQUI  ██████████
   ═══════════════════════════════════════════════════ */
const APP_DATA = {

  /* ── Nomes do casal ── */
  casal: {
    meuNome:  "Matheus",        // Seu nome
    nomeDela: "Marcela",       // Nome dela
    apelido:  "Moi ❤️"        // Apelido carinhoso
  },

  /* ── Datas importantes ── */
  datas: {
    matchDate:        "27 de fevereiro de 2025",
    primeiroEncontro: "22 de março de 2025",
    primeiroBeijo:    "22 de março de 2025",
    primeiraViajem:   "01 de maio de 2025",
    pedidoNamoro:     "01 de maio de 2025",
    nossoAp:          "11 de março de 2026",
    aniversario1Ano:  "01 de maio de 2026"
  },

  /* ── Textos personalizados ── */
  textos: {
    subtitulo:       "Uma pequena experiência para a pessoa mais importante da minha vida.",
    mensagemInicial: "Há um ano eu fiz uma das melhores escolhas da minha vida...",
    introducao:      "Eu escolhi você. E cada dia desde então me prova que foi a escolha mais certa que já fiz. Você mudou minha vida de formas que eu nem sabia que eram possíveis.",
    mensagemFinal:   "Feliz 1 ano, meu amor. Que venham muitos outros, sempre ao seu lado.",
    localPresenteFinal: "SOU EU!!! 🌹"
  },

  /* ── Quiz (adicione ou remova perguntas à vontade) ── */
  quiz: [
    {
      pergunta:  "Onde foi nosso primeiro encontro?",
      opcoes:    ["Magia & Bruxaria", "Vassoura Quebrada", "Beco Hexagonal", "Casa dos Bruxos"],
      correta:   1,                     // índice da resposta correta (0 = primeira)
      acerto:    "Isso mesmo! 🥰 Como você se lembra de tudo...",
      erro:      "Quase! Mas foi no Vassoura Quebrada, lembra? 🪄"
    },
    {
      pergunta:  "Qual foi nossa primeira viagem juntos?",
      opcoes:    ["Campos do Jordão", "Ubatuba", "Santos", "Paraty"],
      correta:   3,
      acerto:    "Sim! e ainda teve pedido de namoro. 💍",
      erro:      "Nããããão! Foi quando começamos a namorar. 💍"
    },
    {
      pergunta:  "Qual foi nossa primeiro filme nos cinemas juntos?",
      opcoes:    ["Lilo & Stitch", "Harry Potter e o Cálice de Fogo", "Um Filme Minecraft", "Piratas do Caribe"],
      correta:   2,
      acerto:    "Um Filme Minecraft! Foi muito legal. 🎬",
      erro:      "Foi Um Filme Minecraft!... 😄"
    },
    {
      pergunta:  "Qual é a nossa comidinha favorita?",
      opcoes:    ["Pizza", "Hambúrguer", "Massa", "Batata Frita"],
      correta:   1,
      acerto:    "Essa é a nossa preferida. 💛",
      erro:      "Essa era muito dificil, amamos todas ❤️"
    }
  ],

  /* ── Linha do tempo (adicione ou remova momentos) ── */
  timeline: [
    { 
      titulo:    "O Nosso Match",
      data:      APP_DATA_DATE("matchDate"), // usa datas acima
      descricao: "O dia em que demos match (eu achava que ia ser ignorado).",
      foto:      "fotos/its_a_match.jpg"   // coloque o caminho da foto ou URL, ex: "fotos/encontro.jpg"
    },
    {
      titulo:    "Primeiro Encontro",
      data:      APP_DATA_DATE("primeiroEncontro"), // usa datas acima
      descricao: "Aquela noite que tudo começou. Eu mal conseguia acreditar que estava ali com você. 💐🍫",
      foto:      "fotos/primeiroEncontro.jpeg"   // coloque o caminho da foto ou URL, ex: "fotos/encontro.jpg"
    },
    {
      titulo:    "Primeiro Beijo",
      data:      APP_DATA_DATE("primeiroBeijo"),
      descricao: "O beijo que selou tudo. Meu coração acelerou de um jeito que nunca mais parou.",
      foto:      ""
    },
    {
      titulo:    "O Pedido de Namoro",
      data:      APP_DATA_DATE("pedidoNamoro"),
      descricao: "Quando eu oficialmente te escolhi e você me escolheu de volta. Um dos momentos mais bonitos da minha vida.",
      foto:      ""
    },
    {
      titulo:    "Nossa Primeira Viagem",
      data:      APP_DATA_DATE("primeiraViajem"),
      descricao: "Descobrir novos lugares ao seu lado foi incrível. Você torna qualquer lugar especial.",
      foto:      "fotos/primeiraViajem.jpeg"
    },
    {
      titulo:    "Um Dia Comum que Virou Especial",
      data:      APP_DATA_DATE("nossoAp"),
      descricao: "Naquele dia nada especial acontecia - mas compramos nossa casinha.",
      foto:      "fotos/nossoAp.jpeg"
    },
    {
      titulo:    "Nosso Primeiro Ano ❤️",
      data:      APP_DATA_DATE("aniversario1Ano"),
      descricao: "Hoje. Um ano inteiro de você. E eu ainda escolho você todos os dias.",
      foto:      ""
    }
  ],

  /* ── Motivos (adicione quantos quiser) ── */
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
    "Porque você é a pessoa mais bonita que eu já vi na vida",
    "Porque mesmo na distância, você está comigo",
    "Porque você me faz rir até a barriga doer",
    "Porque do seu jeito, você me salva todo dia",
    "Na verdade, aqui não estão os 1000 motivos, por que falta palavras no mundo para te descrever"
  ],

  /* ── Música de fundo ── */
  musicas: {
    ativada:  true,
    arquivo:  ""   // coloque o caminho do MP3: ex: "musica.mp3"
                   // deixe vazio para desativar
  },

  /* ── Fotos gerais ── */
  fotosGerais: {
    capa:   "",    // foto da tela inicial, ex: "fotos/capa.jpg"
    fundo:  ""
  }
};

/* ─── Helper interno (não editar) ─── */
function APP_DATA_DATE(key) {
  return ""; // resolvido abaixo após definição completa
}

// Resolve datas na timeline após APP_DATA estar definido
(function resolveTimelineDates() {
  const map = {
    "APP_DATA_DATE(\"matchDate\")":         APP_DATA.datas.matchDate,
    "APP_DATA_DATE(\"primeiroEncontro\")":  APP_DATA.datas.primeiroEncontro,
    "APP_DATA_DATE(\"primeiroBeijo\")":     APP_DATA.datas.primeiroBeijo,
    "APP_DATA_DATE(\"primeiraViajem\")":    APP_DATA.datas.primeiraViajem,
    "APP_DATA_DATE(\"pedidoNamoro\")":      APP_DATA.datas.pedidoNamoro,
    "APP_DATA_DATE(\"nossoAp\")":           APP_DATA.datas.nossoAp,
    "APP_DATA_DATE(\"aniversario1Ano\")":   APP_DATA.datas.aniversario1Ano
  };
  APP_DATA.timeline[0].data = APP_DATA.datas.matchDate;
  APP_DATA.timeline[1].data = APP_DATA.datas.primeiroEncontro;
  APP_DATA.timeline[2].data = APP_DATA.datas.primeiroBeijo;
  APP_DATA.timeline[3].data = APP_DATA.datas.primeiraViajem;
  APP_DATA.timeline[4].data = APP_DATA.datas.pedidoNamoro;
  APP_DATA.timeline[5].data = APP_DATA.datas.nossoAp;
  APP_DATA.timeline[6].data = APP_DATA.datas.aniversario1Ano;
})();

/* ══════════════════════════════════════════════════════
   FIM DA CONFIGURAÇÃO — não editar abaixo desta linha
══════════════════════════════════════════════════════ */


/* ─── STATE ─── */
const STATE = {
  currentScreen: "screen-cover",
  quizIndex:     0,
  quizScore:     0,
  motivosVistos: new Set(),
  motivoAtual:   null,
  screenOrder: [
    "screen-cover",
    "screen-intro",
    "screen-quiz",
    "screen-timeline",
    "screen-impact",
    "screen-motivos",
    "screen-final",
    "screen-presente"
  ],
  musicPlaying: false
};

/* ─── ELEMENTOS ─── */
const $ = (id) => document.getElementById(id);


/* ══════════════════════════════════════════════════════
   INICIALIZAÇÃO
══════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  // Restaurar progresso
  loadProgress();

  // Popular dados
  populateCover();
  populateIntro();
  populateTimeline();
  populateMotivos();
  populateFinal();
  populatePresente();

  // Configurar quiz
  setupQuiz();
  // ✅ FIX Android: segundo render com delay para garantir que WebView pintou o DOM
  setTimeout(() => renderQuizQuestion(), 300);

  // Configurar música
  setupMusic();

  // Configurar botões principais
  setupButtons();

  // Criar partículas da capa
  createParticles("cover-particles", 18);

  // Esconder loader
  setTimeout(() => {
    $("loader").classList.add("hidden");
    showMusicBtn();
  }, 2400);

  // Configurar barra de progresso geral
  updateProgressBar();
});


/* ══════════════════════════════════════════════════════
   POPULAR TELAS COM APP_DATA
══════════════════════════════════════════════════════ */

function populateCover() {
  // Título e subtítulo
  const title = $("cover-title");
  if (title) title.textContent = "Nosso Primeiro Ano ❤️";

  const subtitle = $("cover-subtitle");
  if (subtitle) subtitle.textContent = APP_DATA.textos.subtitulo;

  const date = $("cover-date");
  if (date) date.textContent = APP_DATA.datas.aniversario1Ano;

  // Foto de capa
  const bg = $("cover-bg");
  if (bg && APP_DATA.fotosGerais.capa) {
    bg.style.backgroundImage = `url('${APP_DATA.fotosGerais.capa}')`;
    bg.style.display = "block";
  } else if (bg) {
    // Fundo gradiente romântico se não houver foto
    bg.style.background = `
      radial-gradient(ellipse 80% 80% at 50% 30%, rgba(192,96,112,0.3) 0%, transparent 60%),
      radial-gradient(ellipse 60% 60% at 80% 80%, rgba(201,169,110,0.15) 0%, transparent 60%),
      #0a0a0f
    `;
  }
}

function populateIntro() {
  const introText = $("intro-text");
  if (introText) introText.textContent = APP_DATA.textos.mensagemInicial;

  const introNames = $("intro-names");
  if (introNames) {
    introNames.textContent = `${APP_DATA.casal.meuNome} & ${APP_DATA.casal.nomeDela}`;
  }
}

function populateTimeline() {
  const list = $("timeline-list");
  if (!list) return;
  list.innerHTML = "";

  APP_DATA.timeline.forEach((item, i) => {
    const el = document.createElement("div");
    el.className = "timeline-item";
    el.style.transitionDelay = `${i * 0.08}s`;

    const imgHtml = item.foto
      ? `<img class="timeline-card-img" src="${item.foto}" alt="${item.titulo}" loading="lazy" />`
      : "";

    el.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-card-date">${item.data}</div>
        <div class="timeline-card-title">${item.titulo}</div>
        <p class="timeline-card-desc">${item.descricao}</p>
        ${imgHtml}
      </div>
    `;
    list.appendChild(el);
  });

  // Observer para animação ao scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  }, { threshold: 0.15 });

  list.querySelectorAll(".timeline-item").forEach(el => observer.observe(el));
}

function populateMotivos() {
  // Carrega motivos vistos do localStorage
  const saved = localStorage.getItem("motivosVistos");
  if (saved) {
    try {
      const arr = JSON.parse(saved);
      arr.forEach(i => STATE.motivosVistos.add(i));
    } catch (_) {}
  }

  updateMotivosContador();
}

function populateFinal() {
  const msg = $("final-mensagem");
  if (msg) msg.textContent = APP_DATA.textos.mensagemFinal;

  const assin = $("final-assinatura");
  if (assin) assin.textContent = `— ${APP_DATA.casal.meuNome}`;
}

function populatePresente() {
  const texto = $("presente-texto");
  if (texto) texto.textContent = APP_DATA.textos.localPresenteFinal;
}


/* ══════════════════════════════════════════════════════
   QUIZ
══════════════════════════════════════════════════════ */
function setupQuiz() {
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = APP_DATA.quiz[STATE.quizIndex];

  // ✅ FIX: se quiz já foi concluído, mostra tela de fim em vez de card vazio
  if (!q) {
    const card   = $("quiz-card");
    const pfwrap = $("quiz-progress-wrap");
    const end    = $("quiz-end");
    if (card)   card.classList.add("hidden");
    if (pfwrap) pfwrap.classList.add("hidden");
    if (end)    end.classList.remove("hidden");
    return;
  }

  const questionEl = $("quiz-question");
  const optionsEl  = $("quiz-options");
  const card       = $("quiz-card");
  const feedback   = $("quiz-feedback");
  const progress   = $("quiz-progress-bar");
  const label      = $("quiz-progress-label");

  if (questionEl) questionEl.textContent = q.pergunta;
  if (feedback)   feedback.textContent   = "";

  // Progresso
  const pct = (STATE.quizIndex / APP_DATA.quiz.length) * 100;
  if (progress) progress.style.setProperty("--progress", `${pct}%`);
  if (label)    label.textContent = `${STATE.quizIndex + 1} / ${APP_DATA.quiz.length}`;

  // Opções
  if (optionsEl) {
    optionsEl.innerHTML = "";
    q.opcoes.forEach((op, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = op;
      btn.addEventListener("click", () => handleQuizAnswer(i, btn));
      optionsEl.appendChild(btn);
    });
  }
}

function handleQuizAnswer(chosen, btnEl) {
  const q = APP_DATA.quiz[STATE.quizIndex];
  const opts = $("quiz-options").querySelectorAll(".quiz-option");
  const feedback = $("quiz-feedback");

  // Desabilita todos
  opts.forEach(b => b.setAttribute("disabled", "true"));

  const acertou = chosen === q.correta;
  if (acertou) STATE.quizScore++;

  // Marca correto/errado
  opts[q.correta].classList.add("correct");
  if (!acertou) btnEl.classList.add("wrong");

  // Feedback
  if (feedback) {
    feedback.textContent = acertou
      ? (q.acerto || "Acertou! 🥰")
      : (q.erro   || "Quase! Mas erramos juntos também. 😄");
    feedback.style.opacity = "1";
  }

  // Próxima pergunta após 1.8s
  setTimeout(() => {
    STATE.quizIndex++;

    if (STATE.quizIndex >= APP_DATA.quiz.length) {
      // Quiz terminou
      const card  = $("quiz-card");
      const end   = $("quiz-end");
      const pfwrap = $("quiz-progress-wrap");

      if (card)   { card.classList.add("flip-out"); setTimeout(() => card.classList.add("hidden"), 400); }
      if (pfwrap) pfwrap.classList.add("hidden");
      setTimeout(() => {
        if (end) end.classList.remove("hidden");
      }, 500);

      saveProgress();
    } else {
      // Anima saída do card
      const card = $("quiz-card");
      if (card) {
        card.classList.add("flip-out");
        setTimeout(() => {
          card.classList.remove("flip-out");
          if (feedback) feedback.textContent = "";
          renderQuizQuestion();
        }, 400);
      } else {
        renderQuizQuestion();
      }
    }
  }, 1800);
}


/* ══════════════════════════════════════════════════════
   TIMELINE — SCROLL ANIMATION
══════════════════════════════════════════════════════ */
// Já configurado no populateTimeline via IntersectionObserver


/* ══════════════════════════════════════════════════════
   TELA IMPACTO — Animação sequencial
══════════════════════════════════════════════════════ */
function startImpactAnimation() {
  const block1   = $("impact-block-1");
  const divider  = $("impact-divider");
  const block2   = $("impact-block-2");
  const btnMotiv = $("btn-open-motivos");

  if (block1) block1.style.animation = "impact-reveal 0.8s cubic-bezier(0,0,0.2,1) forwards";

  // Após 2s: expande divisor
  setTimeout(() => {
    if (divider) divider.classList.add("expanded");
  }, 2000);

  // Após 3s: bloco 2
  setTimeout(() => {
    if (block2) block2.classList.remove("hidden");
    block2 && (block2.style.animation = "impact-reveal 1s cubic-bezier(0,0,0.2,1) forwards");
  }, 3000);

  // Após 4.5s: botão
  setTimeout(() => {
    if (btnMotiv) btnMotiv.classList.remove("hidden");
    btnMotiv && (btnMotiv.style.animation = "fade-up 0.7s cubic-bezier(0,0,0.2,1) forwards");
  }, 4500);
}


/* ══════════════════════════════════════════════════════
   MOTIVOS
══════════════════════════════════════════════════════ */
function showNextMotivo() {
  const motivos = APP_DATA.motivos;
  const card    = $("motivo-card");
  const numEl   = $("motivo-numero");
  const textoEl = $("motivo-texto");
  const btnDone = $("btn-motivos-done");

  // Pega um motivo aleatório não repetido
  const disponiveis = motivos
    .map((_, i) => i)
    .filter(i => !STATE.motivosVistos.has(i));

  if (disponiveis.length === 0) {
    // Reinicia lista
    STATE.motivosVistos.clear();
    localStorage.removeItem("motivosVistos");
  }

  const pool = disponiveis.length > 0 ? disponiveis : motivos.map((_, i) => i);
  const idx  = pool[Math.floor(Math.random() * pool.length)];
  STATE.motivosVistos.add(idx);
  STATE.motivoAtual = idx;

  // Salva progresso
  localStorage.setItem("motivosVistos", JSON.stringify([...STATE.motivosVistos]));

  // Animação
  card.classList.add("fade-out");
  setTimeout(() => {
    if (numEl)   numEl.textContent   = `#${STATE.motivosVistos.size}`;
    if (textoEl) textoEl.textContent = motivos[idx];
    card.classList.remove("fade-out");
    card.classList.add("fade-in");
    updateMotivosContador();
    setTimeout(() => card.classList.remove("fade-in"), 400);
  }, 380);

  // Habilita botão "já vi o suficiente" após ver 3+
  if (btnDone && STATE.motivosVistos.size >= 3) {
    btnDone.style.opacity = "1";
    btnDone.style.pointerEvents = "all";
  }
}

function updateMotivosContador() {
  const el = $("motivo-contador");
  const total = STATE.motivosVistos.size;
  if (el) el.textContent = total === 0
    ? "Pressione para descobrir o primeiro"
    : `${total} descoberto${total > 1 ? "s" : ""} de ${APP_DATA.motivos.length}`;
}


/* ══════════════════════════════════════════════════════
   CONFETES
══════════════════════════════════════════════════════ */
function launchConfetti() {
  const container = $("confetti-container");
  if (!container) return;
  const colors = ["#c9a96e", "#e8a0a0", "#f5f0eb", "#e8c99a", "#c06070", "#ffffff"];

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";

    const size = Math.random() * 8 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left  = Math.random() * 100;
    const delay = Math.random() * 2;
    const dur   = Math.random() * 2 + 2.5;
    const rot   = Math.random() * 360;

    piece.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      transform: rotate(${rot}deg);
    `;
    container.appendChild(piece);
  }

  // Limpa após 6s
  setTimeout(() => { container.innerHTML = ""; }, 6000);
}


/* ══════════════════════════════════════════════════════
   CORAÇÕES FLUTUANTES
══════════════════════════════════════════════════════ */
function launchHearts() {
  const container = $("hearts-container");
  if (!container) return;
  container.innerHTML = "";

  const symbols = ["❤", "🩷", "💕", "💗", "💓", "🌹"];

  const launch = () => {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.cssText = `
      left: ${Math.random() * 90 + 5}%;
      font-size: ${Math.random() * 1.2 + 0.8}rem;
      animation-duration: ${Math.random() * 4 + 5}s;
      animation-delay: ${Math.random() * 2}s;
    `;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 9000);
  };

  // Lança corações continuamente
  for (let i = 0; i < 12; i++) setTimeout(launch, i * 400);
  const interval = setInterval(launch, 1200);
  setTimeout(() => clearInterval(interval), 20000);
}


/* ══════════════════════════════════════════════════════
   PARTÍCULAS DA CAPA
══════════════════════════════════════════════════════ */
function createParticles(containerId, count) {
  const container = $(containerId);
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";

    const size  = Math.random() * 3 + 1;
    const left  = Math.random() * 100;
    const delay = Math.random() * 8;
    const dur   = Math.random() * 8 + 6;
    const isHeart = Math.random() > 0.65;

    p.style.cssText = `
      left: ${left}%;
      bottom: -10px;
      width: ${isHeart ? "auto" : size + "px"};
      height: ${isHeart ? "auto" : size + "px"};
      background: ${isHeart ? "transparent" : `rgba(201,169,110,${Math.random() * 0.5 + 0.2})`};
      font-size: ${isHeart ? (Math.random() * 0.6 + 0.5) + "rem" : "0"};
      color: rgba(232,160,160,0.6);
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
    `;
    if (isHeart) p.textContent = "❤";
    container.appendChild(p);
  }
}


/* ══════════════════════════════════════════════════════
   MÚSICA
══════════════════════════════════════════════════════ */
function setupMusic() {
  const audio  = $("bg-music");
  const btn    = $("music-btn");
  if (!audio || !btn) return;

  if (APP_DATA.musicas.arquivo) {
    audio.src = APP_DATA.musicas.arquivo;
    audio.volume = 0.35;
  }

  btn.addEventListener("click", toggleMusic);
}

function showMusicBtn() {
  const btn = $("music-btn");
  if (btn && APP_DATA.musicas.arquivo) {
    btn.classList.add("visible");
    // Autoplay ao abrir se habilitado
    if (APP_DATA.musicas.ativada) {
      setTimeout(() => tryPlayMusic(), 500);
    }
  }
}

function tryPlayMusic() {
  const audio = $("bg-music");
  if (!audio || !APP_DATA.musicas.arquivo) return;
  audio.play().then(() => {
    STATE.musicPlaying = true;
    $("music-btn").classList.add("playing");
  }).catch(() => {
    // Autoplay bloqueado pelo browser — usuário precisa interagir primeiro
  });
}

function toggleMusic() {
  const audio = $("bg-music");
  const btn   = $("music-btn");
  if (!audio || !APP_DATA.musicas.arquivo) return;

  if (STATE.musicPlaying) {
    audio.pause();
    STATE.musicPlaying = false;
    btn.classList.remove("playing");
  } else {
    audio.play().catch(() => {});
    STATE.musicPlaying = true;
    btn.classList.add("playing");
  }
}


/* ══════════════════════════════════════════════════════
   NAVEGAÇÃO ENTRE TELAS
══════════════════════════════════════════════════════ */
function goToScreen(screenId) {
  const current = document.querySelector(".screen.active");
  const next    = $(screenId);
  if (!next || current === next) return;

  // Saída
  if (current) {
    current.classList.add("exit");
    setTimeout(() => {
      current.classList.remove("active", "exit");
    }, 650);
  }

  // Entrada
  setTimeout(() => {
    next.classList.add("active");
    next.scrollTop = 0;

    STATE.currentScreen = screenId;
    updateProgressBar();
    saveProgress();

    // Ações especiais ao entrar em certas telas
    onScreenEnter(screenId);
  }, current ? 300 : 0);
}

function onScreenEnter(screenId) {
  switch (screenId) {
    case "screen-quiz":
      // ✅ FIX Android: re-renderiza quiz ao entrar na tela
      setTimeout(() => renderQuizQuestion(), 80);
      break;

    case "screen-impact":
      startImpactAnimation();
      break;

    case "screen-motivos":
      // Mostra primeiro motivo
      if (STATE.motivoAtual === null) {
        showNextMotivo();
      } else {
        // ✅ FIX Android: garante que motivo atual é visível
        const textoEl = document.getElementById("motivo-texto");
        if (textoEl && !textoEl.textContent) showNextMotivo();
      }
      break;

    case "screen-final":
      setTimeout(launchConfetti, 600);
      break;

    case "screen-presente":
      setTimeout(launchHearts, 400);
      break;
  }
}


/* ══════════════════════════════════════════════════════
   BOTÕES
══════════════════════════════════════════════════════ */
function setupButtons() {
  // Tela 1 → Tela 2
  const btnStart = $("btn-start");
  if (btnStart) {
    btnStart.addEventListener("click", () => {
      ripple(btnStart);
      setTimeout(() => goToScreen("screen-intro"), 150);
    });
  }

  // Tela 2 → Tela 3 (Quiz)
  const btnIntroNext = $("btn-intro-next");
  if (btnIntroNext) {
    btnIntroNext.addEventListener("click", () => goToScreen("screen-quiz"));
  }

  // Quiz concluído → Tela 4 (Timeline)
  const btnQuizDone = $("btn-quiz-done");
  if (btnQuizDone) {
    btnQuizDone.addEventListener("click", () => {
      ripple(btnQuizDone);
      setTimeout(() => goToScreen("screen-timeline"), 150);
    });
  }

  // Timeline → Tela 5 (Impacto)
  const btnTimelineNext = $("btn-timeline-next");
  if (btnTimelineNext) {
    btnTimelineNext.addEventListener("click", () => {
      ripple(btnTimelineNext);
      setTimeout(() => goToScreen("screen-impact"), 150);
    });
  }

  // Impacto → Tela 6 (Motivos)
  const btnOpenMotivos = $("btn-open-motivos");
  if (btnOpenMotivos) {
    btnOpenMotivos.addEventListener("click", () => {
      ripple(btnOpenMotivos);
      setTimeout(() => goToScreen("screen-motivos"), 150);
    });
  }

  // Próximo motivo
  const btnNextMotivo = $("btn-next-motivo");
  if (btnNextMotivo) {
    btnNextMotivo.addEventListener("click", () => showNextMotivo());
  }

  // Ir para final (motivos)
  const btnMotivosDone = $("btn-motivos-done");
  if (btnMotivosDone) {
    btnMotivosDone.style.opacity = "0";
    btnMotivosDone.style.pointerEvents = "none";
    btnMotivosDone.addEventListener("click", () => goToScreen("screen-final"));
  }

  // Revelar surpresa
  const btnReveal = $("btn-reveal");
  if (btnReveal) {
    btnReveal.addEventListener("click", () => {
      ripple(btnReveal);
      setTimeout(() => goToScreen("screen-presente"), 150);
    });
  }

  // Reiniciar
  const btnRestart = $("btn-restart");
  if (btnRestart) {
    btnRestart.addEventListener("click", () => {
      if (confirm("Recomeçar a experiência do início?")) {
        resetApp();
      }
    });
  }
}


/* ══════════════════════════════════════════════════════
   RIPPLE (efeito de clique no botão)
══════════════════════════════════════════════════════ */
function ripple(btn) {
  const rippleEl = btn.querySelector(".btn-ripple");
  if (!rippleEl) return;
  rippleEl.style.width  = "200px";
  rippleEl.style.height = "200px";
  rippleEl.style.opacity = "1";
  rippleEl.style.transition = "width 0.5s ease, height 0.5s ease, opacity 0.5s ease";
  setTimeout(() => {
    rippleEl.style.width   = "0";
    rippleEl.style.height  = "0";
    rippleEl.style.opacity = "0";
  }, 500);
}


/* ══════════════════════════════════════════════════════
   BARRA DE PROGRESSO GERAL
══════════════════════════════════════════════════════ */
function updateProgressBar() {
  const idx = STATE.screenOrder.indexOf(STATE.currentScreen);
  const pct = idx < 0 ? 0 : Math.round((idx / (STATE.screenOrder.length - 1)) * 100);
  const bar = $("progress-bar");
  if (bar) bar.style.width = `${pct}%`;
}


/* ══════════════════════════════════════════════════════
   LOCALSTORE — SALVAR / CARREGAR PROGRESSO
══════════════════════════════════════════════════════ */
function saveProgress() {
  try {
    const data = {
      currentScreen: STATE.currentScreen,
      quizIndex:     STATE.quizIndex,
      quizScore:     STATE.quizScore,
      motivoAtual:   STATE.motivoAtual
    };
    localStorage.setItem("nossoPrimeiroAno_progress", JSON.stringify(data));
  } catch (_) {}
}

function loadProgress() {
  try {
    // ✅ FIX: versão do cache — se mudar, limpa tudo automaticamente
    const APP_VERSION = "v1.2";
    const savedVersion = localStorage.getItem("nossoPrimeiroAno_version");
    if (savedVersion !== APP_VERSION) {
      localStorage.removeItem("nossoPrimeiroAno_progress");
      localStorage.removeItem("motivosVistos");
      localStorage.setItem("nossoPrimeiroAno_version", APP_VERSION);
      return; // começa do zero
    }

    const raw = localStorage.getItem("nossoPrimeiroAno_progress");
    if (!raw) return;
    const data = JSON.parse(raw);

    // Restaurar tela (começa sempre da capa para manter a emoção)
    // Descomente abaixo para restaurar posição:
    // if (data.currentScreen) STATE.currentScreen = data.currentScreen;

    // ✅ FIX: reseta quiz se estava concluído (evita card vazio)
    if (typeof data.quizIndex === "number") {
      STATE.quizIndex = data.quizIndex >= APP_DATA.quiz.length ? 0 : data.quizIndex;
    }
    if (typeof data.quizScore === "number")   STATE.quizScore   = data.quizScore;
    if (typeof data.motivoAtual === "number") STATE.motivoAtual = data.motivoAtual;
  } catch (_) {}
}

function resetApp() {
  localStorage.removeItem("nossoPrimeiroAno_progress");
  localStorage.removeItem("motivosVistos");

  // Reset state
  STATE.quizIndex    = 0;
  STATE.quizScore    = 0;
  STATE.motivosVistos.clear();
  STATE.motivoAtual  = null;

  // Reset quiz UI
  const quizEnd     = $("quiz-end");
  const quizCard    = $("quiz-card");
  const quizPfWrap  = $("quiz-progress-wrap");
  const block2      = $("impact-block-2");
  const btnMotivos  = $("btn-open-motivos");
  const btnDone     = $("btn-motivos-done");

  if (quizEnd)    quizEnd.classList.add("hidden");
  if (quizCard)   { quizCard.classList.remove("hidden", "flip-out"); }
  if (quizPfWrap) quizPfWrap.classList.remove("hidden");
  if (block2)     block2.classList.add("hidden");
  if (btnMotivos) btnMotivos.classList.add("hidden");
  if (btnDone)    { btnDone.style.opacity = "0"; btnDone.style.pointerEvents = "none"; }

  renderQuizQuestion();
  updateMotivosContador();

  // Volta para capa
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active", "exit"));
  const cover = $("screen-cover");
  if (cover) cover.classList.add("active");

  STATE.currentScreen = "screen-cover";
  updateProgressBar();
}


/* ══════════════════════════════════════════════════════
   INTRO TEXT — animação de texto letra a letra
══════════════════════════════════════════════════════ */
function typewriterEffect(el, text, speed = 35) {
  if (!el) return;
  el.textContent = "";
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

// Ativa typewriter quando intro aparecer
document.addEventListener("DOMContentLoaded", () => {
  const introScreen = $("screen-intro");
  if (!introScreen) return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(m => {
      if (m.target.classList.contains("active") && !introScreen.dataset.typed) {
        introScreen.dataset.typed = "1";
        const introEl = $("intro-text");
        if (introEl) {
          typewriterEffect(introEl, APP_DATA.textos.mensagemInicial, 40);
        }
      }
    });
  });
  observer.observe(introScreen, { attributes: true, attributeFilter: ["class"] });
});


/* ══════════════════════════════════════════════════════
   SWIPE (navegação por arraste nas telas simples)
══════════════════════════════════════════════════════ */
(function setupSwipe() {
  let touchStartY = 0;
  let touchStartX = 0;

  document.addEventListener("touchstart", e => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  document.addEventListener("touchend", e => {
    const dy = touchStartY - e.changedTouches[0].clientY;
    const dx = touchStartX - e.changedTouches[0].clientX;

    // Só reage a swipe vertical significativo (> 60px) em telas simples
    if (Math.abs(dy) < 60 || Math.abs(dx) > Math.abs(dy)) return;

    // Telas onde swipe up avança
    const swipeScreens = {
      "screen-intro":    "screen-quiz",
      "screen-final":    "screen-presente"
    };

    if (dy > 0 && swipeScreens[STATE.currentScreen]) {
      goToScreen(swipeScreens[STATE.currentScreen]);
    }
  }, { passive: true });
})();


/* ══════════════════════════════════════════════════════
   PRELOAD DE IMAGENS
══════════════════════════════════════════════════════ */
(function preloadImages() {
  const imgs = [
    APP_DATA.fotosGerais.capa,
    ...APP_DATA.timeline.map(t => t.foto)
  ].filter(Boolean);

  imgs.forEach(src => {
    const img = new Image();
    img.src = src;
  });
})();

/* ── FIM DO SCRIPT ── */
