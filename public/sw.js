// A versão tem de subir sempre que se quer forçar a limpeza da cache nos
// browsers que já visitaram o site. v11: entrada da versão inglesa (/en).
const CACHE_NAME = 'globalead-v11';
const urlsToCache = [
  '/logo.png', // Logo básico
  // ⚠️ Não cachear '/' (index.html) — causa página branca quando o cache fica desatualizado
];

// Instala o SW e adiciona os arquivos iniciais ao cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Ativa imediatamente
});

// Ativa o SW e limpa TODA a cache anterior.
//
// A limpeza é total, e não apenas das caches com outro nome: com a entrada do
// /en mudou praticamente todo o texto do site, e mais vale um primeiro
// carregamento lento do que alguém ficar com metade da página antiga.
// Como só se pré-carrega o logótipo, o custo de apagar tudo é nenhum.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName))))
      .then(() => caches.open(CACHE_NAME))
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.clients.claim()) // Assume controlo das páginas abertas
  );
});

// Intercepta as requisições
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);

  // ⚠️ Ignora Cloudflare R2 e Vídeos
  if (requestUrl.hostname.includes('r2.dev') || requestUrl.pathname.endsWith('.mp4') || requestUrl.pathname.endsWith('.webm')) {
    return; // Deixa o navegador lidar diretamente com a rede
  }

  // ⚠️ Evita interceptar arquivos com hash (como os do Vite)
  if (requestUrl.pathname.startsWith('/assets/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Se estiver no cache, retorna
      if (cachedResponse) return cachedResponse;

      // Caso contrário, tenta buscar da rede
      return fetch(event.request)
        .then((networkResponse) => {
          return networkResponse;
        })
        .catch((err) => {
          console.warn('[ServiceWorker] Erro ao buscar:', event.request.url, err);

          // Fallback se estiver offline.
          //
          // Antes devolvia caches.match('/'), mas o '/' nunca é cacheado de
          // propósito (ver urlsToCache), por isso resolvia para undefined e o
          // browser mostrava um erro de rede em vez de uma mensagem. Agora
          // devolve uma página real, no idioma do endereço pedido.
          if (event.request.mode === 'navigate') {
            const emIngles = requestUrl.pathname === '/en' || requestUrl.pathname.startsWith('/en/');
            const titulo = emIngles ? 'You are offline' : 'Está sem ligação';
            const texto = emIngles
              ? 'Check your internet connection and try again.'
              : 'Verifique a ligação à internet e tente novamente.';

            return new Response(
              `<!doctype html><html lang="${emIngles ? 'en' : 'pt-PT'}"><meta charset="utf-8">` +
                `<meta name="viewport" content="width=device-width,initial-scale=1">` +
                `<title>${titulo}</title>` +
                `<body style="font-family:system-ui,sans-serif;text-align:center;padding:4rem 1.5rem;color:#0d2233">` +
                `<h1 style="font-size:1.25rem">${titulo}</h1><p style="color:#6b7280">${texto}</p></body></html>`,
              {
                status: 503,
                statusText: 'Offline',
                headers: { 'Content-Type': 'text/html; charset=utf-8' },
              }
            );
          }

          return new Response('Offline ou erro de rede.', {
            status: 504,
            statusText: 'Offline',
            headers: { 'Content-Type': 'text/plain' }
          });
        });
    })
  );
});
