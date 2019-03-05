import Store from "../store.js";

var env;
var base;

if (document.URL.includes("http://localhost:")) {
	env = "dev";
} else {
	env = "pro";
}

function genId() {
	function randomString(characters, l) {
		var retn = "";
		for (var i = 0; i < l; i++) {
			var r = Math.floor(Math.random() * characters.length);
			retn += characters[r];
		}
		return retn;
	}
	return randomString("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 32);
}

function makeApiCall(path) {
	console.log(`Making call to ${path}`)
	return new Promise(res => {
		if (sessionStorage.getItem(path) !== null) {
			res(JSON.parse(sessionStorage.getItem(path)));
		} else {
			fetch(`https://api.github.com${path}?&access_token=${sessionStorage.getItem("auth")}`)
		}
	});
}

export {
	env,
	genId,
	makeApiCall
}
