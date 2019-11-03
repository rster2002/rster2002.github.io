import fdb from "fastdb";

function genId(length = 32) {
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
        length
    );
}

const db = fdb({
    name: "hue-buttons",
    handler: localStorage
});

export {
    genId,
    db
}