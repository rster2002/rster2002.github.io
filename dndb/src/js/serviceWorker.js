c = [
	"../../app.html",
	"../fonts/Roboto-Black.ttf",
	"../fonts/Roboto-Regular.ttf",
	"../json/monsters.json"
]

function addCacheCss(css) {
	for (var i = 0; i < css.length; ++i) {
		c.push("../css/" + css[i] + ".css");
	}
}

function addCacheJs(js) {
	for (var i = 0; i < js.length; ++i) {
		c.push("../js/" + js[i] + ".js");
	}
}

addCacheCss([
	"about",
	"appShell",
	"appShell.m"
]);

addCacheJs([
	"characterLoader",
	"firebase",
	"init",
	"misc",
	"userInfo",
	"wave"
]);

self.addEventListener('install', function(e) {
	e.waitUntil(caches.open('dnd').then(function(cache) {
		return cache.addAll(c);
	}));
});
