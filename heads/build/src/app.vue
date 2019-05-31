<template lang="html">
	<div>
        <searchbar placeholder="Search by name and number" @onchange="catchSearch"></searchbar>
        <snackbar :show="snackbar">Saved</snackbar>
        <card>
            <p>You own <b>{{ headCount }}</b> heads in total, just <b>{{ 742 - headCount }}</b> to go.</p>
            <p>The current search shows <b>{{ queried.length }}</b> heads. You own <b>{{ searchOwnCount }}</b> of them.</p>
            <p>Searched numbers: <b>{{ idList }}</b></p>
            <actions>
                <button @click="save" class="primary">Save</button>
            </actions>
            <div class="setting">
                <div class="checkboxWrapper">
                    <checkbox v-model="filter.owned"></checkbox>
                </div>
                <div class="txt"><p>Only show Owned</p></div>
            </div>
            <div class="setting">
                <div class="checkboxWrapper">
                    <checkbox v-model="filter.duplicates"></checkbox>
                </div>
                <div class="txt"><p>Only show duplicates</p></div>
            </div>
        </card>
        <card v-if="queried.length > 0">
            <primaryTitle>
                <h1>Searched heads</h1>
            </primaryTitle>
            <div>
                <listitem v-for="head in queried" :key="head.totalNr">
                    <h1 @click="head.open = !head.open" style="cursor: pointer;"><dropdownindicator :val="head.open"></dropdownindicator><span class="material-icons" v-if="head.aquired">check</span>{{ head.name }}</h1>
                    <dropdowncontent :show="head.open">
                        <div class="setting">
                            <div class="checkboxWrapper">
                                <checkbox v-model="head.aquired"></checkbox>
                            </div>
                            <div class="txt"><p>Aquired?</p></div>
                        </div>
                        <dropdowncontent :show="head.aquired">
                            <div class="setting">
                                <div class="checkboxWrapper">
                                    <checkbox v-model="head.duplicate"></checkbox>
                                </div>
                                <div class="txt"><p>More than one?</p></div>
                            </div>
                        </dropdowncontent>
                        <p>Category: <b>{{ head.category.name }}</b></p>
                        <p>Total nr: <b>{{ head.totalNr }}</b>/742</p>
                        <p>Category nr: <b>{{ head.category.nr }}</b>/{{ head.category.max }}</p>
                    </dropdowncontent>
                </listitem>
            </div>
        </card>
        <card v-if="queried.length == 0">
            <p>You can now <b>{{ mode }}</b> heads.</p>
            <actions>
                <button @click="mode = 'add'">Add heads</button>
                <button @click="mode = 'remove'">Remove mode</button>
            </actions>
        </card>
        <card class="chest" v-if="queried.length == 0" v-for="(chest) in chests">
            <div class="item" @click="processItemClick(head)" v-for="(head, index) in chest" style="--aspect-ratio: 1/1;" :style="{ gridRow: row(index), gridColumn: column(index), backgroundColor: clr(head) }">
                <p v-if="head.aquired === false && head.duplicate === false" style="color: #505050;">{{ head.totalNr }}</p>
                <p v-if="head.aquired && head.duplicate === false">aqd</p>
                <p v-if="head.duplicate">dupe</p>
            </div>
        </card>
    </div>
</template>

<script>
import { card, primaryTitle, searchbar, listitem, dropdownindicator, dropdowncontent, checkbox, actions, snackbar } from "@components";
import heads from "@json/heads.json";

export default {
    components: {
        card,
        primaryTitle,
        searchbar,
        listitem,
        dropdownindicator,
        dropdowncontent,
        checkbox,
        actions,
        snackbar
    },
    data() {
        return {
            heads: [],
            mode: "add",
            filter: {
                duplicates: false
            },
            snackbar: false,
            query: ""
        }
    },
    computed: {
        queried() {
            if (this.query !== "") {
                return this.heads.filter(a => {
                    // Checks wether it is an number of string
                    if (isNaN(this.query)) {
                        // Checks wether it is a list of numbers or just a name
                        if (!this.query.includes(",")) {
                            if (a.name.toLowerCase().includes(this.query.toLowerCase()) || a.category.name.toLowerCase().includes(this.query.toLowerCase())) {
                                if (this.filter.duplicates && this.filter.owned) {
                                    return a.duplicate && a.aquired;
                                } else if (this.filter.duplicates) {
                                    return a.duplicate;
                                } else if (this.filter.owned) {
                                    return a.aquired;
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        } else {
                            var nrs = this.query.split(",");
                            nrs = nrs.map(a => Number(a.trim()));

                            if (nrs.indexOf(a.totalNr) !== -1) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return a.totalNr == this.query;
                    }
                });
            } else {
                if (this.filter.duplicates && this.filter.owned) {
                    return this.heads.filter(a => a.duplicate && a.owned)
                } else if (this.filter.duplicates) {
                    return this.heads.filter(a => a.duplicate);
                } else if (this.filter.owned) {
                    return this.heads.filter(a => a.aquired);
                } else {
                    return [];
                }
            }
        },
        headCount() {
            var i = 0;

            this.heads.forEach(a => {
                if (a.aquired) {
                    i++;
                }
            });

            return i;
        },
        idList() {
            let i = [];

            this.queried.forEach(a => i.push(a.totalNr));

            return i.join(", ");
        },
        searchOwnCount() {
            let i = 0;

            this.queried.forEach(a => {
                if (a.aquired) {
                    i++;
                }
            });

            return i;
        },
        chests() {
            var chests = [];

            var headList = Object.assign([], this.heads);

            while (headList.length > 0) {
                chests.push(headList.splice(0, 54));
            }

           return chests;
        }
    },
    methods: {
        catchSearch(v) {
            this.query = v;
        },
        checkHead(head) {

        },
        clr(head) {
            if (head.duplicate) {
                return "#01a6b2";
            } else if (head.aquired) {
                return "#2db201"
            } else {
                return "#ffffff";
            }
        },
        processItemClick(head) {
            if (this.mode === "add") {
                if (head.aquired) {
                    head.duplicate = true;
                } else {
                    head.aquired = true;
                }
            } else if (this.mode === "remove") {
                if (head.duplicate) {
                    head.duplicate = false;
                } else {
                    head.aquired = false;
                }
            }
        },
        save() {
            var saveNrs = [];
            var duplicateNrs = [];

            this.heads.forEach(a => {
                if (a.aquired) {
                    saveNrs.push(a.totalNr);
                }
                if (a.duplicate) {
                    duplicateNrs.push(a.totalNr);
                }
            });

            localStorage.setItem("savedHeads", JSON.stringify(saveNrs));
            localStorage.setItem("duplicateHeads", JSON.stringify(duplicateNrs));

            this.snackbar = true;

            setTimeout(() => {
                this.snackbar = false;
            }, 3000);
        },
        row(i) {
            var r = Math.floor(i / 9) + 1;
            return `${r} / ${r + 1}`;
        },
        column(i) {
            var r = (i % 9) + 1;
            return `${r} / ${r + 1}`;
        }
    },
    created() {
        heads.forEach(head => {
            let obj = {...head, open: false, aquired: false, duplicate: false};

            if (localStorage.getItem("savedHeads") !== null) {
                let savedHeads = JSON.parse(localStorage.getItem("savedHeads"));
                if (savedHeads.indexOf(head.totalNr) !== -1) {
                    obj.aquired = true;
                }
            }

            if (localStorage.getItem("duplicateHeads") !== null) {
                let savedHeads = JSON.parse(localStorage.getItem("duplicateHeads"));
                if (savedHeads.indexOf(head.totalNr) !== -1) {
                    obj.duplicate = true;
                }
            }

            this.heads.push(obj);
        });
    }
}
</script>

<style lang="stylus">


settingheight = 56px;
settingsize = 56px;
.setting {
	width: 100%;
	height: settingheight;

	p {
		margin: 0;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		padding: 1px;
		width: 100%;
		text-align: center;

		span {
			padding: 0;
		}
	}

	.checkboxWrapper {
		height: settingheight;
		width: settingsize;
		float: left;

		& > .checkbox {
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.txt {
		height: settingheight;
		width: "calc(100% - %s)" % settingsize;
		float: left;

		p {
			text-align: left;
			width: calc(100% - 16px);
			padding: 0px 8px;
		}
	}
}

.chest {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
	grid-template-rows: auto;

    .item {
        width: 100%;
        height: 100%;
        background-color: white;
        border: 2px solid #cecece;
        cursor: pointer;

        p {
            margin: 0;
            padding: 0;
            width: 100%;
            margin-top: -20px;
            position: relative;
            top: 50%;
            transform: translateY(-200%);
            text-align: center;
            color: #ffffff;

            // span {
            //     font-size: 16px;
            // }
        }
    }

    .item[style^='--aspect-ratio']::before {
        content: "";
        display: inline-block;
        width: 1px;
        height: 0;
        padding-bottom: calc(100% / (var(--aspect-ratio)));
    }
}

</style>
