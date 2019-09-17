import vueChannel from "vue-channel";

import { fb, fs } from "@js/firebase.js";

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
        9
    );
}

function signOut(t) {
    console.log("SIGNING OUT");
    fb.auth()
        .signOut()
        .then(a => {
            t.$router.push({ path: "/login" });
        });
}

function replaceAll(c, a, b) {
    let temp = c.split(a);
    temp = temp.join(b);
    return temp;
}

function user() {
    let i = JSON.parse(sessionStorage.getItem("u"));
    if (i === null) {
        return "";
    } else {
        return i;
    }
}

function makeApiCall(endpoint, payload, requireNewest = false) {

    return new Promise((res, rej) => {
        vueChannel("accessToken")
            .disposable(accessTokenState => {

                vueChannel("user")
                    .disposable(userState => {

                        if (accessTokenState.token !== undefined && userState.login !== undefined) {
                            endpoint = replaceAll(endpoint, "$user", userState.login);
                            console.log(endpoint);
    
                            fetch(`https://api.github.com${endpoint}?access_token=${accessTokenState.token}`)
                                .then(r => r.json())
                                .then(j => {
                                    res(j);
                                });
                        } else {
                            return true;
                        }
                    });

                return accessTokenState.token === undefined;
            });
    });
}

window["makeApiCall"] = makeApiCall;

export {
    env,
    genId,
    signOut,
    replaceAll,
    user,
    makeApiCall
};
