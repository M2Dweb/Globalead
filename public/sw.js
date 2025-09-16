const CACHE_NAME = 'globalead-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/logo.png'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Activate immediately
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim(); // Take control of all clients
});

// Fetch event - serve from cache or fetch from network
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) return response;

        return fetch(event.request)
          .then((fetchRes) => {
            return fetchRes;
          })
          .catch((err) => {
            console.warn('[ServiceWorker] Fetch failed:', event.request.url, err);

            // Optional fallback
            return new Response('Offline ou erro de rede.', {
              status: 504,
              statusText: 'Offline',
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});
