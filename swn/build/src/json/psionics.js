var biopsionics = import("./psionics/biopsionics.json").then(a => a.default);
var metapsionics = import("./psionics/metapsionics.json").then(a => a.default);
var precognition = import("./psionics/precognition.json").then(a => a.default);
var telekinesis = import("./psionics/telekinesis.json").then(a => a.default);
var telepathy = import("./psionics/telepathy.json").then(a => a.default);
var teleportation = import("./psionics/teleportation.json").then(a => a.default);

var obj = {
    biopsionics,
    metapsionics,
    precognition,
    telekinesis,
    telepathy,
    teleportation
}

console.log(obj);

export default obj;
