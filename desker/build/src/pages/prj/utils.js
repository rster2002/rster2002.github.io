import { user } from "@js/global.js";
import { fs } from "@js/firebase.js";

function updatePrj(id, payload = {}) {
    fs.collection("projects").doc(id).update({
        lastActivity: Date.now(),
        lastActivityBy: user(),
        ...payload
    });
}

export {
    updatePrj
}