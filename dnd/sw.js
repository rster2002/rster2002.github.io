var cacheName = 'dnd-tools';
var cacheFiles = [
	"app.html",
	"../assets/components/dnd/css/appShell.css",
	"../assets/components/dnd/css/appShell.m.css"
]

self.addEventListener('install', function(e) {
	console.log('[ServiceWorker] Install');
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(cacheFiles);
		})
	);
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
