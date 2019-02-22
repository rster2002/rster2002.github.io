class sdb {

    constructor(name) {

        if (typeof name !== "string") {
            throw new Error("Invalid database name!");
            return;
        }

        if (window["_sdb"] === undefined) {

            var dbi = {
                dbs: [],
                db: {}
            }

            window["_sdb"] = dbi;

        }

        window["_sdb"].dbs.push(name);

        let i = this;
        window["_sdb"].db[name] = {
            created: true,
            ref: i,
            keepAlive: false
        }

        this.name = name;
        this.devValue = false;
        this.processors = {};
        this.documentCount = 0;
        this.onChange = {};
        this.computable = {};
		this.snapshot = {};

        window.addEventListener("unload", function() {
            window["_sdb"].dbs.forEach(r => {
                var db = window["_sdb"].db[r];
                if (db.keepAlive === false) {
                    db.ref.del();
                }
            });
        });

    }

    log(val) {
        if (this.dev) {
            console.log(val);
        }
    }

    keepAlive() {
        window["_sdb"].db[this.name].keepAlive = true;
        return this;
    }

    put(data, c) {
        var ci = {};

        if (typeof data !== "object") {
            data = {
                __value: data
            }
        }

        // Ensures an id
        if (data.__id === undefined) {
            data.__id = this.$genId();
        }

        ci.__id = data.__id;

        if (this.processors !== {}) {
            var values = Object.values(this.processors);
            values.forEach(a => {
                this.log("Processing '" + data.__id + "' using processor: '" + a.name + "'");
                data = a.fn(data);
            });
        }

        this.onChange[data.__id] = data.onChange;

        sessionStorage.setItem(this.name + "_" + ci.__id, JSON.stringify(data));
        this.$updateIndex(ci.__id);
        this.documentCount++;

        // Call backs
        if (c !== undefined) {
            c(ci);
        }

        this.$updateComputed();
		this.$onSnapshowEvent();

        return new Promise((r, c) => {
            r(ci);
        });

    }

    get(key, value) {
        var buildIndex = [];
        var settings = {};

        if (typeof key === "object") {
            settings = key;
        } else {
            settings = Object.assign(settings, {
                key: key,
                value: value
            });
        }

        var index = this.$getIndex();

        index.forEach(a => {
            var data = JSON.parse(sessionStorage.getItem(this.name + "_" + a));

            buildIndex.push(data);
        });

        var rtrn;
        if (settings.key === "*" || settings.key === undefined) {
            rtrn = buildIndex;
        } else {
            if (settings.value !== undefined) {
                rtrn = buildIndex.filter(a => {
                    return a[settings.key] === settings.value;
                });
            } else {
                rtrn = buildIndex.filter(a => {
                    return a["__id"] === settings.key;
                });
            }
        }

        if (rtrn.length > 1) {
            if (typeof settings.every === "function") {
                let temp = [];
                rtrn.forEach(a => {
                    temp.push(settings.every(a));
                });

                rtrn = temp;
            }
        } else if (rtrn.length === 1) {
            if (rtrn[0]["__value"] !== undefined) {
                rtrn = rtrn[0]["__value"];
            }
        }

        return new Promise((r, c) => {
            r(rtrn);
        });
    }

    async update(key, value, data) {
        if (typeof value === "object") {
            data = value;
        }

        var list;
        if (typeof value === "object") {
            list = await this.get(key);
        } else {
            list = await this.get(key, value);
        }

        list.forEach(a => {
            var t = Object.assign({}, a);
            var newValue = Object.assign(a, data);
            if (this.onChange[a.__id] !== undefined) {
                let temp = this.onChange[a.__id](t, newValue);
                if (temp !== undefined) {
                    newValue = Object.assign(newValue, temp);
                }
            }

            sessionStorage.setItem(this.name + "_" + a.__id, JSON.stringify(newValue));
        });

        this.$updateComputed();
		this.$onSnapshowEvent();
    }

    del(key, value) {
        var buildIndex = [];
        var index = this.$getIndex();

        index.forEach(a => {
            var data = JSON.parse(sessionStorage.getItem(this.name + "_" + a));
            buildIndex.push(data);
        });

        var delList;
        var newIndex = [];
        if (key === "*" || key === undefined) {
            delList = buildIndex;
            sessionStorage.removeItem(this.name + "-index");
        } else {
            if (value !== undefined) {
                delList = buildIndex.filter(a => {
                    if (a[key] === value) {
                        return true;
                    } else {
                        newIndex.push(a["__id"]);
                        return false;
                    }
                });
            } else {
                delList = buildIndex.filter(a => {
                    if (a["__id"] === value) {
                        return true;
                    } else {
                        newIndex.push(a["__id"]);
                        return false;
                    }
                });
            }
        }

        delList.forEach(a => {
            if (a["__id"] === undefined) {
                throw new Error("Error deleting item: id field was not defined");
            } else {
                sessionStorage.removeItem(this.name + "_" + a["__id"]);
            }
        });

        this.documentCount -= delList.length;

        if (newIndex.length > 0) {
            sessionStorage.setItem(this.name + "-index", JSON.stringify(newIndex));
        } else {
            sessionStorage.removeItem(this.name + "-index");
        }

        this.$updateComputed();
		this.$onSnapshowEvent();
    }

    computed(name, fn) {
        var disabled = ["put", "get", "update", "del", "computed", "addProcessor", "dev", "$updateIndex", "$updateComputed", "$genId", "$getIndex"];
        if (disabled.indexOf(name) === -1) {
            this.computable[name] = {
                name,
                fn
            };
        } else {
            throw new Error("Error creating computed value: cannot create a computed value with the name of '" + name + "'")
        }

        this.$updateComputed();
    }

	onSnapshot(name, fn) {
		if (typeof name !== "string") {
			fn = name;
			name = this.$genId();
		}

		this.snapshot[name] = {
			name,
			fn
		}

		this.$onSnapshowEvent();
	}

    addProcessor(name, fn) {
        this.processors[name] = {name, fn};
    }

    dev() {
        this.devValue = true;
        return this;
    }

    $updateIndex(id) {
        var index = this.$getIndex();

        index.push(id);

        sessionStorage.setItem(this.name + "-index", JSON.stringify(index));
    }

    $getIndex() {
        var index = sessionStorage.getItem(this.name + "-index");

        if (index === null) {
            index = "[]";
        }

        index = JSON.parse(index);

        return index;
    }

    $genId() {

        function randomString(characters, l) {
        	var retn = "";
        	for (var i = 0; i < l; i++) {
        		var r = Math.floor(Math.random() * characters.length);
        		retn += characters[r];
        	}
        	return retn;
        }

    	return randomString("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 32);
    }

    async $updateComputed() {
        var values = Object.values(this.computable);
        var data = await this.get();
        values.forEach(a => {
            var rtrn = a.fn(data);
            if (rtrn !== undefined) {
                this[a.name] = rtrn;
            }
        });
    }

	async $onSnapshowEvent() {
        var values = Object.values(this.snapshot);
        var data = await this.get();
        values.forEach(a => {
            var rtrn = a.fn(data);
        });
    }
}
