const CACHE_NAME = 'globalead-v1';
const urlsToCache = [
  '/', // Apenas o index
  '/logo.png', // Logo básico
];

// Instala o SW e adiciona os arquivos iniciais ao cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Ativa imediatamente
});

// Ativa o SW e limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Assume controle das páginas
});

// Intercepta as requisições
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);

  // ⚠️ Evita interceptar arquivos com hash (como os do Vite)
  if (requestUrl.pathname.startsWith('/assets/')) {
    return; // Deixa o navegador lidar com isso
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

          // Fallback se estiver offline
          if (event.request.mode === 'navigate') {
            return caches.match('/');
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
