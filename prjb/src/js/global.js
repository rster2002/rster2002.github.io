import Store from "../store.js";

var env;
var base;

if (document.URL.includes("http://localhost:")) {
	env = "dev";
	base = "http://localhost:3000"
} else {
	env = "pro";
	base = "http://192.168.1.54:3000";
}

base = "https://us-central1-dewebsite-bae27.cloudfunctions.net/api1";

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
	console.log(`Making call to ${base + path}`)
	return new Promise(res => {
		fetch(base + path, {
			headers: {
				uid: Store.state.uid,
				sessiontoken: Store.state.sessiontoken
			}
		}).then(r => r.json()).then(j => res(j));
	});
}

export {
	env,
	genId,
	makeApiCall
}
