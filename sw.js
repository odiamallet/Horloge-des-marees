// Service worker minimal : met en cache le "coquille" de l'app (le HTML,
// qui contient déjà tout le CSS/JS/images en inline) pour qu'elle puisse se
// lancer même sans connexion. Les données de marée elles-mêmes sont mises en
// cache séparément par l'app via localStorage (voir TIDE_CACHE_TTL_MS dans
// index.html) — ce service worker ne s'occupe que de pouvoir OUVRIR l'app.

const CACHE_NAME = 'maree-horloge-shell-v1';
const SHELL_FILES = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // seuls les fichiers de l'app elle-même passent par le cache ; les appels
  // vers api-maree.fr / open-meteo.com restent en direct (l'app gère déjà
  // son propre repli hors-ligne pour ces données-là)
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
