// const fetch = require("node-fetch");
const colorConvert = require("color-convert");

class HueApi {

    constructor(host, username) {
        this.host = host;
        this.username = username;
        console.log(this);
        this.baseUrl = `http://${host}/api/${username}`;
    }

    light(id) {
        console.log(this.host, this.username);
        return new Light(this.host, this.username, id);
    }

    group(name) {
        return new Group(this.host, this.username, name);
    }

}

class Group {
    
    constructor(host, username, groupName) {
        return new Promise((res, rej) => {
            this.host = host;
            this.username = username;
            this.baseUrl = `http://${host}/api/${username}`;

            fetch(this.baseUrl + "/groups")
                .then(r => r.json())
                .then(groups => {
                    groups = Object.values(groups);

                    var foundGroup = groups.find(group => group.name === groupName);

                    // console.log(foundGroup);
                    if (foundGroup !== undefined) {
                        this.group = foundGroup;
                    }

                    var lights = [];

                    this.group.lights.forEach(light => {
                        lights.push(new Light(host, username, light));
                    });

                    this.lights = lights;
                    // console.log(lights);

                    res(this);
                });
        })
    }

    setState(state) {
        this.lights.forEach(light => {
            light.setState(state);
        });
    }

    randomLight() {
        var lightIndex = Math.floor(Math.random() * this.lights.length);
        return this.lights[lightIndex];
    }

}

class Light {

    constructor(host, username, lightId) {
        this.host = host;
        this.username = username;
        this.lightId = lightId;
        this.baseUrl = `http://${host}/api/${username}/`;
        this.lightUrl = this.baseUrl + `lights/${lightId}/`;
    }

    setState(state) {

        return new Promise((res, rej) => {

            function rgbToCie(red, green, blue) {
                //Apply a gamma correction to the RGB values, which makes the color more vivid and more the like the color displayed on the screen of your device
                var red = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
                var green = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
                var blue = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92);

                //RGB values to XYZ using the Wide RGB D65 conversion formula
                var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
                var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
                var Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;

                //Calculate the xy values from the XYZ values
                var x = (X / (X + Y + Z)).toFixed(4);
                var y = (Y / (X + Y + Z)).toFixed(4);

                if (isNaN(x))
                    x = 0;
                if (isNaN(y))
                    y = 0;
                return [Number(x), Number(y)];
            }

            if (state.hex !== undefined) {
                var rgbValue = colorConvert.hex.rgb(state.hex);
                delete state.hex;

                state.xy = rgbToCie(rgbValue[0], rgbValue[1], rgbValue[2]);

            }

            if (state.rgb !== undefined) {
                var rgbValue = state.rgb;
                delete state.rgb;
                state.xy = rgbToCie(rgbValue[0], rgbValue[1], rgbValue[2]);
            }

            if (state.transition !== undefined) {
                state.transitiontime = state.transition / 100;
                delete state.transition;
            }

            if (state.on === "false") {
                state.on = false;
            }

            if (state.on === "true") {
                state.on = true;
            }

            // console.log(state);

            console.log(state);

            fetch(this.lightUrl + `state`, {
                method: "PUT",
                body: JSON.stringify(state)
            }).then(a => res(a));

        });

    }

}

export default HueApi;