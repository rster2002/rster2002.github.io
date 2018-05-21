const cache = [
	"./",
	"../assets/components/dnd/css/appShell.css",
	"../assets/components/dnd/css/appShell.m.css",
	"../assets/components/dnd/js/misc.js"
];

self.addEventListener("install", async event => {
	const cache = await caches.open("dndtools");
	cache.addAll(cache);
});

self.addEventListener("fetch", event => {
	console.log("fetch");
});
