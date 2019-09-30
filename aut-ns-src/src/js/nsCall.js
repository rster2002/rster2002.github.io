import vueChannel from "vue-channel";

function nsCall(endpoint) {
    return new Promise((res, rej) => {
        vueChannel("apiKey")
            .disposable(state => {
                if (state.apiKey !== undefined) {
                    
                    endpoint = "https://aut-ns-backend.rster2002.now.sh" + endpoint + "?apiToken=" + state.apiKey;

                    fetch(endpoint)
                        .then(r => {
                            return r.json()
                        })
                        .then(json => res(json))
                        .catch(err => rej(err));
                } else {
                    return true;
                }
            });
    });
}

export default nsCall;