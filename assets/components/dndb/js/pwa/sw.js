// VERSION: 1b

self.addEventListener('install', function(e) {
	e.waitUntil(caches.open('dndb-cache').then(function(cache) {
		return cache.addAll([
			"/",
			"/dndb.html",
			"/dnd/appb.html"
		])
	}));
})

// importScripts('https://unpkg.com/workbox-sw@0.0.2/build/importScripts/workbox-sw.dev.v0.0.2.js');
// importScripts('https://unpkg.com/workbox-runtime-caching@1.3.0/build/importScripts/workbox-runtime-caching.prod.v1.3.0.js');
// importScripts('https://unpkg.com/workbox-routing@1.3.0/build/importScripts/workbox-routing.prod.v1.3.0.js');
//
// const assetRoute = new workbox.routing.RegExpRoute({
//     regExp: new RegExp('^http://localhost:8887/assets/components/dndb/*'),
//     handler: new workbox.runtimeCaching.CacheFirst()
// });
//
// const router = new workbox.routing.Router();
// //router.addFetchListener();
// router.registerRoutes({routes: [assetRoute]});
// router.setDefaultHandler({
//     handler: new workbox.runtimeCaching.CacheFirst()
// });
