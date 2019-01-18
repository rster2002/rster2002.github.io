sUid = global.openedCharacter.uid;
characters = "abcdefghijklmnopqrstuvwxyz0123456789";
characterId = global.openedCharacter.characterId;
characterRef = firestore.collection("users").doc(global.openedCharacter.uid).collection("characters").doc(characterId);
var characterInfo;
var characterObj;
var file = null;

sessionStorage.setItem("::saved", "false");

Vue.component("editorlist", {
	template: `
	<div>
		<div class="entry" style="margin-bottom: 46px;">
			<input v-if="items.length > 0" placeholder="Search" v-model="query">
			<h3 v-if="items.length === 0" class="hc">Nothing here</h3>
			<div class="listItem" v-for="item in sorted" v-bind:style="{border: color(item)}">
				<div v-if="item.editing !== true">
					<div class="shared" @click="toggleShown(item)">
						<h1 v-if="item.name !== ''" class="noOverflow">{{ item.name }}</h1>
						<h1 v-if="item.name === ''" class="noOverflow">Unnamed item</h1>
					</div>
					<div class="expanded" v-if="item.shown == true">
						<input :disabled="limit === true" v-if="showcount === 'true'" v-model="item.count" v-bind:placeholder="countPlaceholder" type="number" />
						<div class="markdown" v-html="toMarkdown(item.description)"></div>
						<!-- {{{ toMarkdown(item.description) }}} -->
						<div class="tags">
							<div class="tag" v-for="tag in item.tags">
								<p>{{ tag }}</p>
							</div>
						</div>
						<div class="btn icn" v-if="limit === false">
							<button @click="deleteItem(item)"><span class="material-icons">delete</span></button>
							<button @click="editItem(item)"><span class="material-icons">edit</span></button>
							<button @click="pin(item)"><span v-if="item.pinned === true" class="material-icons">label_off</span><span v-if="item.pinned === false" class="material-icons">label</span></button>
							<button @click="changeColor(item)"><span class="material-icons">color_lens</span></button>
						</div>
					</div>
				</div>
				<div v-if="item.editing === true">
					<input :placeholder="itemname + ' name'" v-model="item.name" />
					<textarea v-model="item.description" placeholder="Description"></textarea>
					<div class="row">
						<input @keyup.enter="addTag(item)" v-model="item.tag" placeholder="Tag" />
						<button @click="addTag(item)" style="padding: 0px; height: 41px;"><i class="material-icons">add</i></button>
					</div>
					<div class="tags" style="margin-bottom: 16px;">
						<div class="tag" v-for="tag in item.tags" @click="deleteTag(tag)">
							<p>{{ tag }}</p>
							<i class="material-icons">clear</i>
						</div>
					</div>
					<div class="btn icn">
						<button @click="saveEdit(item)"><span class="material-icons">save</span></button>
					</div>
				</div>
			</div>
			<button v-if="limit === false" class="wave fab" @click="addEntry()">
				<i class="material-icons">add</i>
			</button>
		</div>
	</div>`,
	props: ["internalname", "displayname", "itemname", "showcount", "todb", "limit"],
	data() {
		return {
			items: [],
			editing: false,
			editingItem: {},
			query: "",
			colors: ["rgba(0, 0, 0, .1)", "#ff3030", "#30ff30", "#1cd0f6", "#008080", "#FFA500"],
			working: {
				name: "",
				count: 1,
				description: "",
				tag: "",
				tags: [],
				shown: false
			},
			forceUpdate: false,
			adding: false
		}
	},
	watch: {
		todb() {
			if (this.todb.send < 3) {

				let tempCharacterRef = userRef.collection("characters").doc(this.todb.toId);

				for (var i = 0; i < this.items.length; ++i) {
					let item = this["items"][i];
					item.shown = false;
					tempCharacterRef.collection(this.internalname).doc(item.__id).set(item).catch(e => {thr(e)}).then(e => {console.log("SAVHUFHAUHFUI")});
				}

				this.todb.send += 1;
			}
		},
		forceUpdate() {
			if (this.forceUpdate === true) {
				console.log(`%c Forced update %c`, "padding: 1px; border-radius: 3px; color: white; background-color: #30ff30;", "background-color: transparent;");

				this.updateList();

				this.forceUpdate = false;
			}
		}
	},
	computed: {
		sorted() {
			var query = this.query;
			query = query.toLowerCase();
			let list = this.items;
			if (query !== "") {
				list = list.filter(item => {
					if (item.name.includes(query)) {
						return true;
					}
				});
			}

			list = list.sort((a, b) => {
				if (a.pinned === true) {
					return -1;
				}
			});

			return list;

			// let queried = this.items.filter(function(item) {
			// 	if (query !== "") {
			// 		if (item.pinned === true) {
			// 			console.log(query);
			// 			let n = item.name.toLowerCase();
			// 			if (n.includes(query)) {
			// 				return true;
			// 			}
			// 		}
			// 	} else {
			// 		return item.pinned;
			// 	}
			// });
		},
		countPlaceholder() {
			if (this.internalname === "spells") {
				return "Level"
			} else if (this.internalname === "inventory") {
				return "Amount"
			} else {
				return "COUNT"
			}
		}
	},
	methods: {
		color(item) {
			console.log(item);

			if (item.pinned === true && item.color === "rgba(0, 0, 0, .1)") {
				return "#0080ff solid 2px";
			} else {
				if (item.color !== undefined) {
					return item.color + " solid 2px";
				}
			}
		},
		pin(item) {
			var index = this.items.indexOf(item);
			if (this.items[index].pinned === undefined || this.items[index].pinned === false) {
				this.items[index].pinned = true;
			} else {
				this.items[index].pinned = false;
			}
		},
		toMarkdown(description) {
			let o = marked(description, { sanitize: true });
			console.log(o);
			return o;
		},
		toggleShown(item) {
			console.log("het")
			this.items[this.items.indexOf(item)].shown = !this.items[this.items.indexOf(item)].shown;
		},
		addTag(item) {
			item.tags.push(item.tag);
			item.tag = "";
		},
		deleteTag(tag) {
			this.working.tags.splice(this.working.tags.indexOf(tag), 1);
		},
		addEntry() {

			this.items.push({
				name: "",
				description: "",
				tag: "",
				tags: [],
				editing: true,
				color: "rgba(0, 0, 0, .1)",
				pinned: false,
				shown: true,
				version: 3,
				count: 1,
				__id: genId()
			});

			a.ev("Character Editor", "Item add", "user action");

		},
		deleteItem(item) {
			global.i = item;

			global.t = this;

			global.alert({
				text: "Are you sure you want to delete this " + global.i.name + "? This can't be undone!",
				btn1: "delete",
				btn2: "cancel",
				btn1fn: function() {
					var t = global.t;
					var item = global.i;

					characterRef.collection(t.internalname).doc(item.__id).delete().then(function() {
						t.items.splice(t.items.indexOf(item), 1);
						a.ev("Character Editor", "Item deleted (" + t.internalname + ")", "user action", `Uid: ${uid}, characterId: ${characterId}`);

						global.i = {};
					}).catch(err => {
						error(err);
					});
				}
			})
		},
		resetWorking() {
			this.working = {
				name: "",
				description: "",
				count: 1,
				tag: "",
				tags: [],
				shown: false
			}
		},
		editItem(item) {

			a.ev("Character Editor", "Item edit (start)", "user action");

			item.editing = true;

		},
		saveEdit(item) {

			global.i = {};
			global.i.item = item;
			global.t = this;

			let packSearchName = item.name;
			packSearchName = packSearchName.toLowerCase();

			global.i.packName = packSearchName;

			if (gearPacks[packSearchName] !== undefined && this.internalname === "inventory") {
				global.alert({
					text: "You can quickly add all the individial items of this pack to your inventory or do you want to add the pack as one item?",
					btn1: "add content",
					btn2: "add pack",
					btn1fn: function() {

						a.ev("Character Editor", "Item edit (pack)", "user action");

						var name = global.i.packName;
						var t = global.i.t;
						var arr = gearPacks[name];
						for (var i = 0; i < arr.length; ++i) {
							var itemFromPack = arr[i];

							global.t.items.push({
								name: itemFromPack.name,
								description: itemFromPack.name,
								tag: global.i.item.tag,
								tags: global.i.item.tags,
								editing: false,
								color: "rgba(0, 0, 0, .1)",
								pinned: false,
								shown: false,
								version: 3,
								count: itemFromPack.count,
								__id: genId()
							});
						}

						global.t.items.splice(global.t.items.indexOf(global.i.item), 1);

					},
					btn2fn: function() {
						finalize(global.i.item);
					}
				})
			} else {

				a.ev("Character Editor", "Item edit (save)", "user action");

				item.editing = false;
			}

		},
		changeColor(item) {
			var currentColorIndex = this.colors.indexOf(item.color);
			var itemIndex = this.items.indexOf(item);
			console.log(currentColorIndex);
			currentColorIndex++;
			if (currentColorIndex >= this.colors.length) {
				currentColorIndex = 0;
			}

			console.log(currentColorIndex, this.colors[currentColorIndex]);

			this.items[itemIndex].color = this.colors[currentColorIndex];
		},
		updateList: async function() {
			var currentItems = [];

			this.items.forEach(a => {
				let p = Object.assign({}, a);
				p.editing = false;
				currentItems.push(p);
			});

			var internalName = this.internalname;
			var lastLevel = -1;

			var query = await createQuery(characterRef.collection(this.internalname).orderBy("name", "asc"));
			console.log(query, this.internalname);

			let q = [];
			query.forEach(a => {
				a.editing = false;

				if (Array.isArray(a.description)) {
					console.log("FIX ARRAY")
					a.description = a.description.join("\n");
				}

				if (a.count === undefined) {
					a.count = 1;
				}

				q.push(a);
			});

			let diff = _.differenceBy(q, currentItems, "__id");

			console.log(currentItems, q, diff);

			if (this.internalname) {
				diff.forEach(spell => {
					if (spell.version === "b" || spell.version === undefined) {
						spell.version = 3;
					}
					console.log(spell);

					if (spell.pinned === undefined) {
						spell.pinned = false;
					}

					if (spell.count === undefined) {
						spell.count = spell.level;
					}

					if (spell.color === undefined) {
						spell.color = "rgba(0, 0, 0, .1)";
					}

					this.items.push(spell);
				});
			} else {
				diff.forEach(item => {
					if (item.pinned === undefined) {
						item.pinned = false;
					}

					if (item.color === undefined) {
						item.color = "rgba(0, 0, 0, .1)";
					}

					this.items.push(item);
				});
			}

			// if (internalName === "spells") {
			// 	var query = await createQuery(characterRef.collection("spells").orderBy("name", "asc"));
			// 	console.log(query);
			// 	if (query.length > 0) {
			// 		for (var i = 0; i < query.length; ++i) {
			// 			var spell = query[i];
			//
			// 		}
			// 	}
			// } else {
			// 	var query = await createQuery(characterRef.collection(internalName).orderBy("name", "asc"));
			// 	console.log(query);
			// 	if (query[0] !== undefined) {
			// 		for (var i = 0; i < query.length; i++) {
			// 			var item = query[i];
			// 			if (item.pinned === undefined) {
			// 				item.pinned = false;
			// 			}
			//
			// 			if (item.color === undefined) {
			// 				item.color = "rgba(0, 0, 0, .1)";
			// 			}
			//
			// 			this.items.push(item);
			// 		}
			// 	} else {
			// 		this.items = [];
			// 	}
			// }
		}
	},
	created() {
		this.updateList();
	}
});

var vueLists = new Vue({
	el: "#editorLists",
	data: {
		toDB: {
			send: false,
			toId: ""
		},
		items: [],
		editing: false,
		editingItem: {},
		working: {
			name: "",
			count: 1,
			description: "",
			tag: "",
			tags: [],
			shown: false
		},
		limit: false
	}
});

var vueUtilities = new Vue({
	el: "#utilities",
	data: {
		usedInCampaigns: [],
		limit: false,
		userId: "",
		permissions: []
	},
	methods: {
		addPermission() {
			var userId = this.userId;
			console.log(userId);
			getUidFromId(userId, returnedUid => {
				getProfile(returnedUid, returnedProfile => {
					characterRef.collection("permissions").doc(returnedProfile.uid).set(returnedProfile).then(() => {
						this.permissions.push(returnedProfile);
						skb("Permission added");
					}).catch(e => thr(e));
				});
			});
		},
		revoke(permission) {
			global.i = permission;
			global.t = this;
			global.alert({
				text: "Are you sure you want to revoke permissions?",
				btn1: "revoke",
				btn2: "cancel",
				btn1fn: function() {
					var revokeUid = global.i.uid;
					characterRef.collection("permissions").doc(revokeUid).delete().then(() => {
						global.t.permissions.splice(global.t.permissions.indexOf(permission), 1);
						skb("Permission revoked");
					}).catch(e => thr(e));
				}
			});
		}
	},
	created: async function() {
		var query = await createQuery(characterRef.collection("permissions"));
		if (query.length > 0) {
			this.permissions = query;
		}
	}
});


async function reloadCampaigns() {
	vueUtilities.usedInCampaigns = [];
	var query = await createQuery(characterRef.collection("usedInCampaigns"));
	if (query.length > 0) {
		vueUtilities.usedInCampaigns = query;
	}
}

reloadCampaigns();

function setChannel(channel, status) {
	characterRef.collection("channels").doc(channel).set({
		status: status
	});
}

characterRef.collection("channels").doc("inventory").onSnapshot(e => {
	if (e && e.exists) {
		let i = e.data();

		console.log(`%c Status update %c ${i.status} `, "padding: 1px; border-radius: 3px; color: white; background-color: #3030ff;", "background-color: transparent;");

		if (i.status !== "idle") {

			if (i.status === "dm-added") {
				vueLists.$children[0].forceUpdate = true;

				skb("DM added an item to your inventory");
			}

			setChannel("inventory", "idle");
		}
	}
});

// $(".innerPage").ready(() => {
// 	$(".characterContainer").load("./src/pages/characterSheet.html");
// });

function ctrlS() {
	if (sessionStorage.getItem("::openPage") === "characterEditor") {
		a.ev("Character Editor", "ctrl+s", "user interaction", `Uid: ${uid}, characterId: ${characterId}`);
		saveCharacter(true);
	}
}

function openSection(id, index) {
	$(".lists .nav .buttons .button").removeClass("selected");
	var i = index + 1;
	$(".lists .nav .buttons .button:nth-of-type(" + i + ")").addClass("selected");
	$(".page .section").hide();
	$("#" + id).show();
	var c = index * 24;
	var i = 100 * index;
	$(".parser").css("transform", "translateX(calc(" + i + "% + " + c + "px))");
}

allowSave = false;

function localError(error) {
	error(error);

	openPage("characterList");
}


console.log("hmm");

// save function for the character
saveCharacter = function(show) {

	if (show === undefined) {
		show = true;
	}

	se = false;

	try {
		s();
		console.log('c');
		if (characterId !== "false") {
			firestore.collection("users").doc(sUid + "/characters/" + characterId + "/data/characterObj").update(characterObj).then(function() {

			}).then(function() {
				if (file !== null && file.includes("https://") === false) {
					var task = userBucket.child(characterId).put(file);
					userRef.collection("characters").doc(characterId).update({
						hasImg: true
					});
					task.on("state_changed",
						function progress(e) {
							var percentage = (e.bytesTransferred / e.totalBytes) * 100;
							console.log(percentage);
						},
						function error(err) {
							console.log("err", err);
						},
						function complete() {
							console.log("done");
						}
					);
				}
			}).then(function() {
				vueLists.toDB = {
					send: 0,
					toId: characterId
				}
			}).then(function() {
				if (show) {
					a.ev("Character Editor", "Character saved", "user action", `Uid: ${uid}, characterId: ${characterId}`);
					showSnackbar("Character saved");
				}
			}).catch(function(e) {
				error(e);
			});
		} else {
			error("No character found in session");
		}
	} catch(e) {
		error(e);
	}
}

function loadCharacter(i) {
	try {
		if (i) {
			sessionStorage.setItem("::saved", i);
			console.log(i);
			firestore.collection("users").doc(sUid + "/characters/" + sessionStorage.getItem("::saved") + "/data/characterObj").get().then(function(doc) {
				if (doc && doc.exists) {
					var data = doc.data();
					characterObj = data;
					if (global.openedCharacter.view === true) {
						lDisabled(data);
						a.ev("Character Editor", "Character loaded (view)", "passive", `Uid: ${uid}, characterId: ${characterId}`);
					} else {
						l(data);
						a.ev("Character Editor", "Character loaded (edit)", "passive", `Uid: ${uid}, characterId: ${characterId}`);
					}
					allowSave = true;
					// window.history.pushState("", "", "appb.html?user=" + sUid + "&character=" + sessionStorage.getItem("::saved"));

				} else {
					error("Couldn't find this character in the database");
					openPage("characterList");
				}
			}).then(function() {
				userRef.collection("characters").doc(sessionStorage.getItem("::saved")).get().then(function(doc) {
					if (doc && doc.exists) {
						characterInfo = doc.data();
						if (characterInfo.hasImg !== undefined && characterInfo.hasImg === true) {
							userBucket.child(sessionStorage.getItem("::saved")).getDownloadURL().then(function(url) {
								console.log(url);
								$('#form12_2').css('background-image', "url('" + url + "')");
								file = url;
							}).catch(function(err) {
								error(err)
							});
						}
					}
				}).catch(function(e){
					error(e)
				});
			}).catch(function(e){
				error(e)
			});


		}
	} catch(e) {
		error(e);
	}
}

async function deleteCharacter() {
	console.log("Delete");
	var usedInCampaigns = await createQuery(userRef.collection("characters").doc(sessionStorage.getItem("::saved")).collection("usedInCampaigns"));
	if (usedInCampaigns[0] === undefined) {


		global.alert({
			text: "Are you sure you want to delete this character? This can't be undone.",
			btn1: "delete",
			btn2: "cancel",
			btn1fn: async function() {
				characterRef.collection("data").doc("characterObj").delete().catch(e => {thr(e)});
				var inventoryQuery = await createQuery(characterRef.collection("inventory"));
				for (var i = 0; i < inventoryQuery.length; ++i) {
					var id = inventoryQuery[i]["__id"];
					characterRef.collection("inventory").doc(id).delete().catch(e => {thr(e)});
				}

				var abilitiesQuery = await createQuery(characterRef.collection("abilities"));
				for (var i = 0; i < abilitiesQuery.length; ++i) {
					var id = abilitiesQuery[i]["__id"];
					characterRef.collection("abilities").doc(id).delete().catch(e => {thr(e)});
				}

				var spellsQuery = await createQuery(characterRef.collection("spells"));
				for (var i = 0; i < spellsQuery.length; ++i) {
					var id = spellsQuery[i]["__id"];
					characterRef.collection("spells").doc(id).delete().catch(e => {thr(e)});
				}

				characterRef.delete().catch(e => {thr(e)});
				a.ev("Character Editor", "Character deleted", "user action", `Uid: ${uid}, characterId: ${characterId}`);
				openPage("characterList");
			}
		})
	} else {
		alert("This character is in use in a campaign");

	}
}

function dupe() {
	global.alert({
		text: "Are you sure you want to duplicate this character?",
		btn1: "duplicate",
		btn2: "cancel",
		btn1fn: function() {
			var dupeName = prompt("You can name this dupe, but is not mandatory.");
			var newCharacterId = "character_" + genId();
			if (dupeName === null || dupeName === "") {
				dupeName = shortId();
			}
			s();
			var newCharacterInfo = characterInfo;
			newCharacterInfo.dupe = dupeName;
			newCharacterInfo.id = newCharacterId;
			newCharacterInfo.hasImg = false;
			console.log(newCharacterInfo);
			var newCharacterRef = userRef.collection("characters").doc(newCharacterId);
			newCharacterRef.set(newCharacterInfo).catch(e => {thr(e)});
			newCharacterRef.collection("data").doc("characterObj").set(characterObj).catch(e => {thr(e)});
			vueLists.toDB = {
				send: 0,
				toId: newCharacterId
			}

			// if (file !== null) {
			// 	userBucket.child(newCharacterId).put(file);
			// }

			a.ev("Character Editor", "Character duplicated", "user action", `Uid: ${uid}, characterId: ${characterId}`);

			showSnackbar("Character duplicated");
		}
	})
}

addSpellIndex = 5000;
addItemIndex = 5000;

var inputs = [
	"form83_1",
	"form84_1",
	"form82_1",
	"form86_1",
	"form81_1",
	"form85_1"
]

var mods = {
	"form83_1": "form56_1",
	"form84_1": "form59_1",
	"form82_1": "form58_1",
	"form86_1": "form57_1",
	"form81_1": "form60_1",
	"form85_1": "form55_1"
}

var modifiers = [
	"-5",
	"-4",
	"-4",
	"-3",
	"-3",
	"-2",
	"-2",
	"-1",
	"-1",
	"+0",
	"+0",
	"+1",
	"+1",
	"+2",
	"+2",
	"+3",
	"+3",
	"+4",
	"+4",
	"+5"
]

var spellObj = {};
var itemObj = {};

async function loadInventory() {
	var query = await createQuery(characterRef.collection("inventory").orderBy("name", "asc"));
	console.log(query);
	if (query[0] !== undefined) {
		for (var i = 0; i < query.length; i++) {
			var item = query[i];
			if (item.pinned === undefined) {
				item.pinned = false;
			}

			vueInventory.items.push(item);
		}
	} else {
		vueInventory.items = [];
	}
}

async function loadAbilities() {
	var query = await createQuery(characterRef.collection("abilities").orderBy("name", "asc"));
	console.log(query);
	if (query[0] !== undefined) {
		for (var i = 0; i < query.length; i++) {
			var item = query[i];
			if (item.pinned === undefined) {
				item.pinned = false;
			}

			vueAbilities.items.push(item);
		}
	} else {
		vueAbilities.items = [];
	}
}

async function loadSpells() {
	var query = await createQuery(userRef.collection("characters").doc(sessionStorage.getItem("::openCharacter")).collection("spells").orderBy("name", "asc"));
	console.log(query);
	if (query.length > 0) {
		for (var i = 0; i < query.length; ++i) {
			var spell = query[i];
			if (spell.version === undefined || spell.version !== 'b') {
				userRef.collection("characters").doc(sessionStorage.getItem("::openCharacter")).collection("spells").doc(spell.__id).delete().catch(err => {
					error(err);
				});
				var spellObj = {
					name: spell.name,
					description: [],
					shown: false,
					tags: []
				}

				var temp = spell.description.split("\n")
				for (var p = 0; p < temp.length; ++p) {
					var rtrn = temp[p];
					if (rtrn === "") {
						rtrn = " ";
					}
					spellObj.description.push(rtrn);
				}

				if (spell.level === 0) {spellObj.tags.push("Cantrip")} else {spellObj.tags.push("Level: " + spell.level)}
				if (spell.verbal === true) {spellObj.tags.push("Verbal")}
				if (spell.somatic === true) {spellObj.tags.push("Somatic")}
				if (spell.material !== "") {spellObj.tags.push("Material component: " + spell.material)}
				if (spell.castingTime !== "") {spellObj.tags.push("Casting time: " + spell.castingTime)}
				if (spell.ritual === true) {spellObj.tags.push("Ritual")}
				if (spell.concentration === true) {spellObj.tags.push("Concentration")}
				if (spell.range !== "") {spellObj.tags.push("Range: " + spell.range)}
				spellObj.__id = genId();
				spellObj.version = "b";

				a.ev("Character Editor", "Spell updated", "user action", `Uid: ${uid}, characterId: ${characterId}`);

				vueSpells.items.push(spellObj);
			} else {

				if (spell.pinned === undefined) {
					spell.pinned = false;
				}
				vueSpells.items.push(spell);
			}
		}
	}
}

async function loadLists() {

	// await loadSpells();
	// await loadInventory();
	// await loadAbilities();

	vueLists.toDB = {
		send: 0,
		toId: characterId
	}
}

function saveOptions() {
	userRef.collection("characters").doc(sessionStorage.getItem("::saved")).update({
		allowEdit: $("#allowEdit").val(),
		allowView: $("#allowView").val()
	}).catch(function(e){error(e)});
}

function loadPermissions() {
	characterRef.get().then(doc => {
		if (doc && doc.exists) {
			if (doc.data().permissions !== undefined) {
				vuePermissions.permissions = doc.data().permissions;
			} else {
				vuePermissions.permissions = [];
			}

			if (doc.data().uidPermissions !== undefined) {
				vuePermissions.uidPermissions = doc.data().uidPermissions;
			} else {
				vuePermissions.uidPermissions = [];
			}
		}
	})
}

var loaded = false;


function computeMods() {

	global.alert({
		text: "Are you sure you want to calculate your mods?",
		btn1: "calculate",
		btn2: "cancel",
		btn1fn: function() {
			var abilities = {
				"strength": {
					base: "#form83_1",
					mod: "#form56_1",
					saving: ["#form15_1", "#form42_1"],
					skills: [
						["#form2_1", "#form49_1"]
					]
				},
				"dexterity": {
					base: "#form84_1",
					mod: "#form59_1",
					saving: ["#form18_1", "#form54_1"],
					skills: [
						["#form19_1", "#form38_1"],
						["#form4_1", "#form46_1"],
						["#form23_1", "#form32_1"]
					]
				},
				"constitution": {
					base: "#form82_1",
					mod: "#form58_1",
					saving: ["#form22_1", "#form41_1"],
					skills: []
				},
				"intelligence": {
					base: "#form86_1",
					mod: "#form57_1",
					saving: ["#form6_1", "#form52_1"],
					skills: [
						["#form21_1", "#form40_1"],
						["#form9_1", "#form48_1"],
						["#form14_1", "#form31_1"],
						["#form11_1", "#form37_1"],
						["#form20_1", "#form33_1"]
					]
				},
				"wisdom": {
					base: "#form81_1",
					mod: "#form60_1",
					saving: ["#form10_1", "#form39_1"],
					skills: [
						["#form8_1", "#form50_1"],
						["#form13_1", "#form35_1"],
						["#form5_1", "#form53_1"],
						["#form7_1", "#form43_1"],
						["#form12_1", "#form47_1"]
					]
				},
				"charisma": {
					base: "#form85_1",
					mod: "#form55_1",
					saving: ["#form3_1", "#form51_1"],
					skills: [
						["#form17_1", "#form36_1"],
						["#form24_1", "#form44_1"],
						["#form16_1", "#form34_1"],
						["#form1_1", "#form45_1"]
					]
				}
			}

			function calcMod(score) {
				return Math.floor((score - 10) / 2);
			}

			function toTxt(mod) {
				if (mod > 0) {
					return "+" + mod;
				} else {
					return mod;
				}
			}

			function populateMod(ab) {
				var value = Number($(ab.base).val());
				if (value !== NaN) {
					var mod = calcMod(value);
					$(ab.mod).val(toTxt(mod));
					if ($("input" + ab.saving[0]).is(":checked")) {
						$(ab.saving[1]).val(toTxt(mod + prof));
					} else {
						$(ab.saving[1]).val(toTxt(mod));
					}

					for (var i = 0; i < ab.skills.length; ++i) {
						var	skill = ab.skills[i];

						if ($("input" + skill[0]).is(":checked")) {
							$(skill[1]).val(toTxt(mod + prof));
						} else {
							$(skill[1]).val(toTxt(mod));
						}
					}
				}
			}

			function modToNumber(i) {
				if (i.includes("-")) {
					let p = i.replace("-", "");
					return Number(p) * -1;
				} else {
					let p = i.replace("+", "");
					return Number(p);
				}
			}

			var prof = modToNumber($("#form61_1").val());


			console.log(prof);

			if (prof !== NaN) {

				var entries = Object.entries(abilities);
				for (var i = 0; i < entries.length; ++i) {
					var entry = entries[i][1];
					populateMod(entry);
				}

				$("#form63_1").val(10 + modToNumber($("#form43_1").val()));

				$("#form88_1").val($("#form59_1").val());

				skb("Mods calculated");
			}
		}
	})

}

function longRest() {

	global.alert({
		text: "Are you sure you want to take a long rest?",
		btn1: "rest",
		btn2: "cancel",
		btn1fn: function() {
			$("#form97_1").val($("#form80_1").val());

			if ($("#form97_3").val() !== "") {$("#form207_3").val("0")} // lvl 1
			if ($("#form94_3").val() !== "") {$("#form205_3").val("0")} // lvl 2
			if ($("#form99_3").val() !== "") {$("#form209_3").val("0")} // lvl 3
			if ($("#form93_3").val() !== "") {$("#form197_3").val("0")} // lvl 4
			if ($("#form95_3").val() !== "") {$("#form206_3").val("0")} // lvl 5
			if ($("#form96_3").val() !== "") {$("#form212_3").val("0")} // lvl 6
			if ($("#form101_3").val() !== "") {$("#form211_3").val("0")} // lvl 7
			if ($("#form100_3").val() !== "") {$("#form210_3").val("0")} // lvl 8
			if ($("#form98_3").val() !== "") {$("#form208_3").val("0")} // lvl 9

			skb("Taken a long rest");
		}
	})

}



function onload() {
	if (!loaded) {

		console.log("C");
		loadLists();

		loadCharacter(characterId);
		refreshLayout();
		// loadPermissions();

		if (global.openedCharacter.view === true) {
			$("#svBtn").hide();
			$("#bkBtn").css("width", "100%");
			vueLists.limit = true;

			saveCharacter = function() {};
			vueUtilities.limit = true;
			a.ex(false);
		} else {
			a.ex(true);
		}

		$("#pdf1").on("load", function() {
			$("#characterSheetSpinner").hide();
		});

		loaded = true;
	}
}
