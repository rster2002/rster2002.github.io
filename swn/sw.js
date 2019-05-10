// Worker version: va0.31 build

const cacheName = "swn-tools";
const toCache = [
    "/",
    "index.html",
    "style.css",
    "build/src/fonts/Roboto-Regular.ttf",
    "build/src/fonts/Roboto-Medium.ttf",
    "build/src/fonts/Roboto-Bold.ttf",
    "build/src/fonts/Roboto-Black.ttf",
    "build/src/fonts/material-icons.woff2",
    "build/src/images/construction.jpg",
    "build/src/images/characters.jpg",
    "build/src/images/groups.jpg",
    "mdi.css",
    "manifest.json",
    "polyfill.bundle.js",
    "babel-polyfill.bundle.js",
    "app.bundle.js",
    "0.bundle.js",
    "1.bundle.js",
    "2.bundle.js",
    "3.bundle.js",
    "4.bundle.js",
    "5.bundle.js",
    "6.bundle.js",
    "7.bundle.js",
    "8.bundle.js",
    "9.bundle.js",
    "10.bundle.js",
    "11.bundle.js",
    "12.bundle.js",
    "13.bundle.js",
    "14.bundle.js",
    "15.bundle.js",
    "16.bundle.js",
    "17.bundle.js",
    "18.bundle.js",
    "19.bundle.js"
]

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log("Opened cache");
                return cache.addAll(toCache);
            })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(fromNetwork(event.request, 400).catch(() => {
        return fromCache(event.request);
    }));
});

function fromNetwork(request, timeout) {
    return new Promise((fulfill, rej) => {
        var timeoutId = setTimeout(rej, timeout);

        console.log("TRYING FROM NETWORK");

        fetch(request).then(res => {
            clearTimeout(timeoutId);
            fulfill(responce);
        }, reject);
    });
}

function fromCache(request) {
    return caches.open(cacheName).then(cache => {
        return cache.match(request).then(matching => {
            console.log("TRYING FROM CACHE");
            return matching || Promise.reject("no-match");
        });
    });
}