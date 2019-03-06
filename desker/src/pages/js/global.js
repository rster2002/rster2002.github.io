import Store from "../../store.js";

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

function mac(path) {
	console.log(`Making call to ${path}`);
	return new Promise(res => {
		var u;
		if (sessionStorage.getItem("gitUser") !== null) {
			u = JSON.parse(sessionStorage.getItem("gitUser"));
			if (path.includes("$user")) {
				let i = path.split("$user");
				i = i.join(u.login);
				path = i;
			}
		}

		if (sessionStorage.getItem(path) !== null) {
			res(JSON.parse(sessionStorage.getItem(path)));
		} else {
			fetch(`https://api.github.com${path}?&access_token=${sessionStorage.getItem("auth")}`)
				.then(r => r.json())
				.then(j => {
					sessionStorage.setItem(path, JSON.stringify(j));
					res(j)
				});
		}
	});
}

export {
	env,
	genId,
	mac
}
