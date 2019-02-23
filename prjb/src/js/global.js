var env;

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

export {
	env,
	genId
}
