const cacheName = "aut-ov-cache-3.0.0-Beta.2";
const assets = [
    "./",
    "./index.html",
    "./manifest.json",
    "./global.css",
    "./favicon.png",
    "./icons-ripped.css",
    "./build/bundle.css",
    "./build/bundle.css.map",
    "./build/bundle.js",
    "./build/bundle.js.map",
    "./img/header-image.png",
    "./img/icon-black.png",
    "./fonts/materialdesignicons-webfont.ttf",
    "./fonts/materialdesignicons-webfont.eot",
    "./fonts/materialdesignicons-webfont.woff",
    "./fonts/materialdesignicons-webfont.woff2",
    "./fonts/Roboto-Regular.ttf",
    "./fonts/Roboto-Bold.ttf",
];

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
for (var size of iconSizes) {
    assets.push(`./img/app-icons/icon-${size}x${size}.png`);
}

self.addEventListener("install", event => {
    try {
        event.waitUntil(
            (async () => {
                let keys = await caches.keys();
                for (let key in keys) {
                    if (key.includes("aut-ov-cache-") && key !== cacheName) {
                        await caches.delete(key);
                    }
                }

                let cache = await caches.open(cacheName);
                cache.addAll(assets);
            })()
        );
    } catch (err) {
        console.error(error);
    }
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            for (var cacheKey of cacheNames) {
                if (cacheKey !== cacheName) {
                    caches.delete(cacheKey);
                }
            }
        })
    )
});

self.addEventListener("fetch", event => {
    try {
        event.respondWith(
            (async () => {
                let networkResponse = await fetch(event.request);

                if (networkResponse.ok) {
                    return networkResponse;
                }

                let cacheResponse = await caches.match(event.request);

                if (cacheResponse) {
                    return cacheResponse;
                }

                return networkResponse;
            })()
        )
    } catch (err) {
        console.error(error);
    }
});

self.addEventListener("periodicsync", event => {
    if (event.tag == 'test') {
        event.waitUntil(new Promise(res => {
            console.log("Notification?");

            if (Notification.permission === "granted") {
                self.registration.showNotification('Vibration Sample', {
                    body: 'Buzz! Buzz!',
                    icon: './img/icon-black.png',
                    vibrate: [200, 100, 200, 100, 200, 100, 200],
                    tag: 'vibration-sample'
                });
            }

            res();
        }));
    }
});