<template lang="html">
	<div>
        <searchbar placeholder="Search on name and number" @onchange="catchSearch"></searchbar>
        <snackbar :show="snackbar">Saved</snackbar>
        <card>
            <p>You have: <b>{{ headCount }}</b> heads, just <b>{{ 742 - headCount }}</b> to go.</p>
            <actions>
                <button @click="save" class="primary">Save</button>
            </actions>
        </card>
        <card>
            <primaryTitle>
                <h1>Heads</h1>
            </primaryTitle>
            <div v-if="queried.length === 0">
                <p>Start searching to find heads.</p>
            </div>
            <div v-if="queried.length > 0">
                <listitem v-for="head in queried" :key="head.totalNr">
                    <h1 @click="head.open = !head.open" style="cursor: pointer;"><dropdownindicator :val="head.open"></dropdownindicator><span class="material-icons" v-if="head.aquired">check</span>{{ head.name }}</h1>
                    <dropdowncontent :show="head.open">
                        <div class="setting">
                            <div class="checkboxWrapper">
                                <checkbox v-model="head.aquired"></checkbox>
                            </div>
                            <div class="txt"><p>Aquired?</p></div>
                        </div>
                        <p>Category: <b>{{ head.category.name }}</b></p>
                        <p>Head <b>{{ head.totalNr }}</b>/742</p>
                        <p>Head <b>{{ head.category.nr }}</b>/{{ head.category.max }}</p>
                    </dropdowncontent>
                </listitem>
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
            snackbar: false,
            query: ""
        }
    },
    computed: {
        queried() {
            if (this.query !== "") {
                return this.heads.filter(a => {
                    if (isNaN(this.query)) {
                        return a.name.toLowerCase().includes(this.query.toLowerCase()) || a.category.name.toLowerCase().includes(this.query.toLowerCase());
                    } else {
                        return a.totalNr == this.query;
                    }
                });
            } else {
                return [];
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
        }
    },
    methods: {
        catchSearch(v) {
            this.query = v;
        },
        checkHead(head) {

        },
        save() {
            var saveNrs = [];

            this.heads.forEach(a => {
                if (a.aquired) {
                    saveNrs.push(a.totalNr);
                }
            });

            localStorage.setItem("savedHeads", JSON.stringify(saveNrs));

            this.snackbar = true;

            setTimeout(() => {
                this.snackbar = false;
            }, 3000);
        }
    },
    created() {
        heads.forEach(head => {
            let obj = {...head, open: false, aquired: false};

            if (localStorage.getItem("savedHeads") !== null) {
                let savedHeads = JSON.parse(localStorage.getItem("savedHeads"));
                if (savedHeads.indexOf(head.totalNr) !== -1) {
                    obj.aquired = true;
                }
            }

            this.heads.push(obj);
        });
    }
}
</script>

<style lang="stylus">


settingheight = 56px;
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

</style>
