import Store from "@root/store.js";
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

function mac(path, params) {
    console.log(`Making call to '${path}'`);
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

        var tail = "";

        if (params !== undefined) {
            var entries = Object.entries(params);

            entries.forEach(a => {
                tail += `&${a[0]}=${a[1]}`;
            });
        }

        tail += `&access_token=${sessionStorage.getItem("auth")}`;

        path += `?${tail}`;

        if (sessionStorage.getItem(path) !== null) {
            console.log("Returning data from session");
            res(JSON.parse(sessionStorage.getItem(path)));
        } else {
            fetch(`https://api.github.com${path}`)
                .then(r => r.json())
                .then(j => {
                    sessionStorage.setItem(path, JSON.stringify(j));
                    console.log("Returning data from API");
                    res(j);
                });
        }
    });
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

export { env, genId, mac, signOut, replaceAll };
