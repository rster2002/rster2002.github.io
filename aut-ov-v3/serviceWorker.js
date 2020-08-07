const cacheName = "aut-ov-cache-RMYnsTzlE";
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
    "./json/stationCodes.json",
    "./json/stationCodesSearchable.json",
    "./json/stationLocations.json",
    "./json/stationsFullDetails.json",
];

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
for (var size of iconSizes) {
    assets.push(`./img/app-icons/icon-${size}x${size}.png`);
}

self.addEventListener("install", event => {
    try {
        event.waitUntil(
            caches.open(cacheName)
                .then(cache => {
                    console.log("Opened cache");
                    return cache.addAll(assets);
                })
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
            caches.match(event.request).then(response => {
                return response || fetch(event.request);
            })
        )
    } catch (err) {
        console.error(error);
    }
    
});