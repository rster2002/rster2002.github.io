import { db } from "./global.js";
import HueApi from "./apiWrapper.js";

export default function(actions) {
    var username = db.bridge.token;
    var ip = db.bridge.ip;
    ip = ip.replace("http://", "");

    var api = new HueApi(ip, username);

    actions.forEach(action => {
        var state = {};

        action.attributes.forEach(attr => {
            switch (attr.attribute) {
                case "powerState":
                    state.on = attr.value === "on";
                    break;

                case "color":
                    state.hex = attr.value;
                    break;

                case "brightness":
                    state.bri = attr.value;
                    break;

                case "transition":
                    state.transition = attr.value;
                    break;
            }
        });

        if (action.type === "light") {
            var light = api.light(action.hardwareId);

            light.setState(state);
        }
    });
}