// ¡Atrapa a Alex! — Service Worker
// Cachea todos los archivos del juego para que funcione sin internet

const CACHE = 'atrapa-alex-v1';
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Al instalar: guarda todos los archivos en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ARCHIVOS))
  );
  self.skipWaiting();
});

// Al activar: limpia cachés viejas
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Al hacer fetch: devuelve caché si existe, si no va a la red
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
