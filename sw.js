/* ══════════════════════════════════════════════
   SERVICE WORKER — Nosso Primeiro Ano ❤️
   Permite uso offline e instalação como app
══════════════════════════════════════════════ */

const CACHE_NAME = "nosso-primeiro-ano-v1";

// Arquivos que ficam salvos offline
const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json"
];

/* ─── Instalação: salva arquivos no cache ─── */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

/* ─── Ativação: limpa caches antigos ─── */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

/* ─── Fetch: serve do cache quando offline ─── */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Retorna cache se disponível, senão busca na rede
      return cached || fetch(event.request).catch(() => {
        // Se offline e não tem cache, retorna index.html
        return caches.match("/index.html");
      });
    })
  );
});
