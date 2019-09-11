function vueChannel(name) {

    if (!("vueChannels" in window)) {
        window.vueChannels = {};
    }

    if (!(name in window.vueChannels)) {
        window.vueChannels[name] = {
            state: {},
            receivers: {},
            disposable: {},
            $setState(state) {
                this.state = state;
                this.$broadcastState();
            },
            $updateState(state) {
                this.state = Object.assign(this.state, state);
                this.$broadcastState();
            },
            $broadcastState() {
                var handelers = Object.values(this.receivers);
                handelers.forEach(handeler => handeler(this.state));

                var disposables = Object.entries(this.disposable);
                disposables.forEach(row => {
                    var handeler = row[1];

                    var keepAlive = handeler(this.state);

                    if (keepAlive === undefined || keepAlive === false) {
                        delete this.disposable[row[0]];
                    }
                });
            }
        }
    }

    function $objectEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    function $genId(length = 9) {
        var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var retn = "";
        for (var i = 0; i < length; i++) {
            var r = Math.floor(Math.random() * characters.length);
            retn += characters[r];
        }
        return retn;
    }

    var methods = {
        set(state) {
            window.vueChannels[name].$setState(state);
        },
        update(state) {
            window.vueChannels[name].$updateState(state);
        },
        receive(handeler) {
            window.vueChannels[name].disposable[$genId()] = handeler;
            
            let state = window.vueChannels[name].state;
            if (!$objectEmpty(state)) {
                handeler(state);
            }
        },
        disposable(handeler) {
            window.vueChannels[name].disposable[$genId()] = handeler;

            let state = window.vueChannels[name].state;
            if (!$objectEmpty(state)) {
                handeler(state);
            }
        }
    }

    return Object.assign(methods, {
        get state() {
            return window.vueChannels[name].state;
        }
    });
}