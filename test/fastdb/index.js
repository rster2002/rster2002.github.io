function fdb(a) {

    // '_' for internal use, '$' for external use
    var configObject = {
        name: "fdb",
        handler: sessionStorage,
        usePromises: false,
        dbRefId: $genId(),
        events: {
            create: {}
        }
    }

    if (typeof a === "string") {
         configObject.name = a;
    }

    if (typeof a === "object") {
        Object.assign(configObject, a);
    }

    if ("_fdb" in window === false) {
        window["_fdb"] = {
            $setState(newState) {
                this.state = newState;
                this.$broadcastState("set");
            },
            $updateState(newState) {
                this.state = Object.assign(this.state, newState);
                this.$broadcastState("update");
            },
            $broadcastState(type) {
                function handleBroadcastListeners(type) {
                    var listeners = Object.values(window["_fdb"].listeners[type]);
                    listeners.forEach(listener => listener(window["_fdb"].state));
                }
                
                handleBroadcastListeners("all");
                handleBroadcastListeners(type);
            },
            state: {},
            listeners: {
                all: {},
                set: {},
                update: {}
            }
        }
    }

    var events = {};

    // Shorthand for 'defaultObj'
    var dO = {
        "_": configObject,
        query(prop, value) {
            var dbArray = this.getAll([]);

            if (typeof prop === "function") {
                return dbArray.filter(prop);
            } else if (typeof prop === "string") {
                return dbArray.filter(doc => {
                    return doc[prop] == value;
                });
            } else if (typeof prop === "object") {
                return dbArray.filter(doc => {
                    let shouldReturn = true;

                    let entries = Object.entries(prop);
                    entries.forEach(query => {
                        if (shouldReturn) {
                            shouldReturn = doc[query[0]] == query[1];
                        }
                    });

                    return shouldReturn;
                });
            }
        },
        getAll(type = {}) {
            var index = $getIndex();

            var keys = Object.keys(index);

            if (Array.isArray(type)) {
                var dbArray = [];

                keys.forEach(key => {
                    let doc = dO._.handler.getItem(dO._.name + "_" + key);

                    if (doc !== null) {
                        dbArray.push(JSON.parse(doc))
                    }
                });

                return [...type, ...dbArray];
            } else if (typeof type === "object") {
                var dbObj = {};

                keys.forEach(key => {
                    let doc = dO._.handler.getItem(dO._.name + "_" + key);

                    if (doc !== null) {
                        dbObj[key] = JSON.parse(doc);
                    }
                });

                return { ...type, ...dbObj };
            } else {
                throw new Error("Type: expected an array or object, but was " + typeof type);
            }
        },
        on(event, handler) {
            if (event in events === false) {
                events[event] = {};
            }

            let eventHandlerId = $genId();
            events[event][eventHandlerId] = handler;

            return function() {
                delete events[event][eventHandlerId];
            };
        },
        removeEvent(eventType, id) {
            delete events[eventType][id];
        },
        events() {
            return events;
        },
        setState(state) {
            window._fdb.$setState(state);
        },
        updateState(state) {
            window._fdb.$updateState(state);
        },
        onState() {
            if (arguments.length === 1) {
                this.$addStateHandler("all", arguments[0]);
            } else {
                this.$addStateHandler(arguments[0], arguments[1]);
            }
        },
        onStateUpdate(handler) {
            this.$addStateHandler("update", handler);
        },
        onStateSet(handler) {
            this.$addStateHandler("set", handler);
        },
        $addStateHandler(type, handler) {
            window._fdb.listeners[type][configObject.dbRefId] = handler;
            return handler(window._fdb.state);
        }
    }

    var frozenObject = dO;

    function $genId(length = 9) {
        var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var retn = "";
        for (var i = 0; i < length; i++) {
            var r = Math.floor(Math.random() * characters.length);
            retn += characters[r];
        }
        return retn;
    }

    function $updateIndex(obj, prop) {
        var index = dO._.handler.getItem(obj._.name + "__index");

        if (index === null) {
            let indexObj = {};

            indexObj[prop] = true;

            dO._.handler.setItem(obj._.name + "__index", JSON.stringify(indexObj));
        } else {
            let indexObj = JSON.parse(dO._.handler.getItem(obj._.name + "__index"));

            indexObj[prop] = true;

            dO._.handler.setItem(obj._.name + "__index", JSON.stringify(indexObj));
        }
    }

    function $setIndex(index) {
        dO._.handler.setItem(dO._.name + "__index", JSON.stringify(index));
    }

    function $getIndex() {
        var index = dO._.handler.getItem(dO._.name + "__index");

        return index === null ? {} : JSON.parse(index);
    }

    function $deleteFromIndex(prop) {
        var index = $getIndex();
        delete index[prop];
        $setIndex(index);
    }

    if (configObject.usePromises) {
        return new Proxy(dO, {
            set: (obj, prop, value) => {
                if (value === null || value === undefined) {
                    $deleteFromIndex(prop);
                    dO._.handler.removeItem(dO._.name + "_" + prop);
                } else {
                    $updateIndex(obj, prop);
                    dO._.handler.setItem(dO._.name + "_" + prop, JSON.stringify(value));
                }

                return true;
            },
            get: async (obj, prop) => {
                if (!(prop in frozenObject)) {
                    return await JSON.parse(dO._.handler.getItem(dO._.name + "_" + prop));
                } else {
                    return obj[prop];
                }
            }
        });
    } else {
        return new Proxy(dO, {
            set: (obj, prop, value) => {
                if (value === null || value === undefined) {
                    $deleteFromIndex(prop);
                    dO._.handler.removeItem(dO._.name + "_" + prop);
                } else {
                    $updateIndex(obj, prop);
                    dO._.handler.setItem(dO._.name + "_" + prop, JSON.stringify(value));
                }

                return true;
            },
            get: (obj, prop) => {
                if (!(prop in frozenObject)) {
                    return JSON.parse(dO._.handler.getItem(dO._.name + "_" + prop));
                } else {
                    return obj[prop];
                }
            }
        });
    }

}

export default fdb;