import { fb } from "@js/firebase.js";

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
    return randomString(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        32
    );
}

function signOut() {
    console.log("SIGNING OUT");
    fb.auth()
        .signOut()
        .then(a => {
            this.$router.push({ path: "/" });
        });
}

function replaceAll(c, a, b) {
	let temp = c.split(a);
	temp = temp.join(b);
	return temp;
}

export {
	env,
	genId,
	signOut,
	replaceAll
};
