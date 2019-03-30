<template lang="html">
	<div>
		<card>
			<div v-if="!m.edit">
				<primaryTitle>
					<h1>{{ c.name }}</h1>
				</primaryTitle>
			</div>
			<div v-if="m.edit">
				<textbox @change="h" :val="c.name" label="name"></textbox>
			</div>
		</card>
		<card>
			<div v-if="!m.edit">
				<div class="row">
					<div class="stat">
						<div class="mod">
							<h1>{{ mod(c.abilities.str) }}</h1>
						</div>
						<div class="label">
							<p>Strength</p>
						</div>
					</div>
					<div class="stat">
						<div class="mod">
							<h1>{{ mod(c.abilities.dex) }}</h1>
						</div>
						<div class="label">
							<p>Dexteriry</p>
						</div>
					</div>
					<div class="stat">
						<div class="mod">
							<h1>{{ mod(c.abilities.con) }}</h1>
						</div>
						<div class="label">
							<p>Constitution</p>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="stat">
						<div class="mod">
							<h1>{{ mod(c.abilities.int) }}</h1>
						</div>
						<div class="label">
							<p>Intelligence</p>
						</div>
					</div>
					<div class="stat">
						<div class="mod">
							<h1>{{ mod(c.abilities.wis) }}</h1>
						</div>
						<div class="label">
							<p>Wisdom</p>
						</div>
					</div>
					<div class="stat">
						<div class="mod">
							<h1>{{ mod(c.abilities.cha) }}</h1>
						</div>
						<div class="label">
							<p>Charisma</p>
						</div>
					</div>
				</div>
			</div>
			<div v-if="m.edit">
				<textbox @change="h" label="Strength" :val="c.abilities.str" vname="abilities.str" type="number"></textbox>
				<textbox @change="h" label="Dexteriry" :val="c.abilities.dex" vname="abilities.dex" type="number"></textbox>
				<textbox @change="h" label="Constitution" :val="c.abilities.con" vname="abilities.con" type="number"></textbox>
				<textbox @change="h" label="Intelligence" :val="c.abilities.int" vname="abilities.int" type="number"></textbox>
				<textbox @change="h" label="Wisdom" :val="c.abilities.wis" vname="abilities.wis" type="number"></textbox>
				<textbox @change="h" label="Charisma" :val="c.abilities.cha" vname="abilities.cha" type="number"></textbox>
			</div>
		</card>
		<card>
			<actions>
				<button v-if="m.allowEdit" @click="toggleEdit()"><span class="material-icons">edit</span></button>
				<button v-if="!m.edit" @click="save()"><span class="material-icons">save</span></button>
				<button v-if="m.allowEdit && !m.edit" @click="del()"><span class="material-icons">delete</span></button>
			</actions>
		</card>
		<card>
			<primaryTitle>
				<h1>{{ info.ownerUid }}</h1>
				<h2>{{ info.characterId }}</h2>
			</primaryTitle>
		</card>
	</div>
</template>

<script>
import { card, primaryTitle, actions, textbox } from "@components";
import { user } from "@js/global.js";

import { fs } from "@js/firebase.js";

function updateInstance(t) {
	var params = t.$route.params;
	console.log(params);
	t.info.ownerUid = params.ownerUid;
	t.info.characterId = params.characterId;

	if (user().uid === t.info.ownerUid) {
		t.m.allowEdit = true;
	}

	function fill(a, b) {
		var entries = Object.entries(b);

		entries.forEach(ent => {
			if (typeof ent[1] === "object") {
				fill(a[ent[0]], ent[1]);
			} else {
				a[ent[0]] = ent[1];
			}
		});
	}

	fs.collection(`users/${t.info.ownerUid}/characters/${t.info.characterId}/d`).doc("data").get().then(a => {
		console.log(a);
		if (a && a.exists) {
			var d = a.data();
			console.log(d);
			fill(t.c, d);
		} else {
			window.history.go(-2);
		}
	});
}

export default {
	components: {
		card,
		primaryTitle,
		actions,
		textbox
	},
	data() {
		return {
			info: {
				ownerUid: "",
				characterId: ""
			},
			m: {
				allowEdit: false,
				edit: false
			},
			c: {
				name: "",
				abilities: {
					str: 0,
					dex: 0,
					con: 0,
					int: 0,
					wis: 0,
					cha: 0
				}
			}
		}
	},
	methods: {
		save() {
			var t = this;
			if (t.m.allowEdit) {
				fs.collection(`users/${t.info.ownerUid}/characters/${t.info.characterId}/d`).doc("data").set(t.c).then(a => {
					fs.collection(`users/${t.info.ownerUid}/characters`).doc(t.info.characterId).update({
						name: t.c.name
					});
				});
			}
		},
		del() {
			var t = this;
			if (confirm("Are you sure you want do delete your character?")) {
				fs.collection(`users/${t.info.ownerUid}/characters/${t.info.characterId}/d`).doc("data").delete().then(a => {
					fs.collection(`users/${t.info.ownerUid}/characters/`).doc(t.info.characterId).delete().then(a => {
						t.$router.push({ path: "/characters" });
					});
				});
			}
		},
		toggleEdit() {
			this.m.edit = !this.m.edit
		},
		h(value) {
			var refBuild = value.key.split(".");
			var f = refBuild.pop();
			var ref = this.c;

			refBuild.forEach(a => {
				ref = ref[a];
			});

			console.log(ref, value.value);

			ref[f] = value.value;
		},
		mod(s) {
			if (s <= 3) {
				return "-2";
			} else if (s >= 4 && s <= 7) {
				return "-1";
			} else if (s >= 8 && s <= 13) {
				return "0";
			} else if (s >= 14 && s <= 17) {
				return "+1";
			} else if (s >= 18) {
				return "+2";
			}
		}
	},
	watch: {
		"$route": function() {
			updateInstance(this);
		}
	},
	created() {
		updateInstance(this);
	}
}
</script>

<style lang="stylus" scoped>
@import "../default.stylus";

.row {
	width: 100%;
	height: 78px;

	.stat {
		width: 33.3333333333%;
		height: 100%;

		float: left;

		.mod {
			width: 100%;
			height: 70%;

			h1 {
				margin: 0;
				font-family: defaultFont;
				padding: 0;
				text-align: center;

				position: relative;
				top: 50%;
				transform: translateY(-50%);
			}
		}

		.label {
			width: 100%;
			height: 30%;

			p {
				width: 100%;
				margin: 0;
				font-family: defaultFont;
				padding: 0;
				text-align: center;
				font-size: 12px;

				position: relative;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
}

</style>
