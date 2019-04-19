const path = require("path");
const fs = require("fs");
const rootPath = process.cwd();

class Tracker {
    constructor(a) {
        var config = Object.assign({
            name: "test",
            timeout: 500
        }, a);

        var e = Object.entries(config);
        e.forEach(a => {
            this[a[0]] = a[1];
        });

        this.path = path.resolve(rootPath, `./tracker/${config.name}`);
        this.sessionId = -1;
        this.session = {};

        if (!fs.existsSync(path.resolve(this.path, "brain.json"))) {
            console.log("CREATING");
            fs.mkdir(
                this.path,
                {recursive: true},
                a => {
                    fs.writeFile(
                        path.resolve(this.path, "brain.json"),
                        JSON.stringify({
                            name: config.name,
                            timeout: config.timeout,
                            entries: 0
                        }),
                        a => {
                            console.log("DONE");
                        }
                    )
                }
            )
        }
    }

    $getBrain() {
        delete require.cache[require.resolve(path.resolve(this.path, "./brain.json"))];
        var brain = require(require.resolve(path.resolve(this.path, "./brain.json")));
        return brain;
    }

    $updateBrain(content) {
        var brain = this.$getBrain();
        fs.mkdir(
            this.path,
            {recursive: true},
            a => {
                fs.writeFile(
                    path.resolve(this.path, "brain.json"),
                    JSON.stringify(Object.assign(brain, content)),
                    a => {
                        console.log("UPDATE");
                    }
                )
            }
        )
    }

    startSession() {
        console.log("NEW SESSIon");
        var brain = this.$getBrain();

        this.sessionId = brain.entries;
        var entries = brain.entries;
        entries++;
        this.$updateBrain({
            entries
        });

        this.session.start = Date.now();
    }

    trackSession() {
        this.session.stop = Date.now();
        this.session.durration = this.session.stop - this.session.start;

        console.log(this.session, this.sessionId);

        if (this.session.durration >= this.timeout) {
            this.startSession();
        } else {
            fs.mkdir(
                path.resolve(this.path, "./entries"),
                {recursive: true},
                a => {
                    fs.writeFile(
                        path.resolve(this.path, `./entries/${this.sessionId}.json`),
                        JSON.stringify(this.session),
                        a => {
                            console.log("UPDATE SESSION");
                        }
                    )
                }
            )
        }
    }
}

module.exports = Tracker;
