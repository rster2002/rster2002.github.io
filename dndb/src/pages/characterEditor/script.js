sUid = sessionStorage.getItem("::uid");
characters = "abcdefghijklmnopqrstuvwxyz0123456789";
characterRef = userRef.collection("characters").doc(sessionStorage.getItem("::openCharacter"));
var characterInfo;
var file = null;

sessionStorage.setItem("::saved", "false");

var vueInventoryObj = {
	el: "#inventory",
	data: {
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
		}
	},
	methods: {
		toggleShown(item) {
			console.log("het")
			this.items[this.items.indexOf(item)].shown = !this.items[this.items.indexOf(item)].shown;
		},
		addTag() {
			this.working.tags.push(this.working.tag);
			this.working.tag = "";
		},
		deleteTag(tag) {
			this.working.tags.splice(this.working.tags.indexOf(tag), 1);
		},
		addItem() {
			var i = Object.assign({}, this.working);
			var d = i.description.split("\n");
			var rtrn = [];
			for (var p = 0; p < d.length; ++p) {
				var temp = d[p];
				if (temp === "") {
					temp = " ";
				}
				rtrn.push(temp);
			}
			i.description = rtrn;
			i.tags = Object.assign([], this.working.tags);
			i.__id = genId();
			this.items.push(i);
			this.resetWorking();
		},
		deleteItem(item) {
			if (confirm("Are you sure you want to delete this item? This can't be undone!")) {
				var i = this;
				characterRef.collection("inventory").doc(item.__id).delete().then(function() {
					i.items.splice(i.items.indexOf(item), 1);
				}).catch(err => {
					error(err);
				});
			}
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
			let index = this.items.indexOf(this.editingItem);
			if (index !== -1) {
				var d = this.editingItem.description.split("\n");
				var rtrn = [];
				for (var p = 0; p < d.length; ++p) {
					var temp = d[p];
					if (temp === "") {
						temp = " ";
					}
					rtrn.push(temp);
				}
				this.items[index].description = rtrn;
				this.items[index].editing = false;
			}
			this.editing = true;
			this.editingItem = item;
			this.items[this.items.indexOf(item)].editing = true;
			item.description = item.description.join("\n");
			this.working = item;
		},
		saveEdit() {
			var i = Object.assign({}, this.working);
			var d = i.description.split("\n");
			var rtrn = [];
			for (var p = 0; p < d.length; ++p) {
				var temp = d[p];
				if (temp === "") {
					temp = " ";
				}
				rtrn.push(temp);
			}
			i.description = rtrn;
			i.tags = Object.assign([], this.working.tags);
			i.__id = this.editingItem.__id;
			i.editing = false;
			i.shown = false;
			let index = this.items.indexOf(this.editingItem);
			this.items.splice(index, 1);
			this.items.splice(index, 0, i);
			this.editing = false;
			this.resetWorking();
		}
	}
}

var vueAbilitiesObj = {
	el: "#abilities",
	data: {
		items: [],
		editing: false,
		editingItem: {},
		working: {
			name: "",
			description: "",
			tag: "",
			tags: [],
			shown: false
		}
	},
	methods: {
		toggleShown(item) {
			this.items[this.items.indexOf(item)].shown = !this.items[this.items.indexOf(item)].shown;
		},
		addTag() {
			this.working.tags.push(this.working.tag);
			this.working.tag = "";
		},
		deleteTag(tag) {
			this.working.tags.splice(this.working.tags.indexOf(tag), 1);
		},
		addItem() {
			var i = Object.assign({}, this.working);
			var d = i.description.split("\n");
			var rtrn = [];
			for (var p = 0; p < d.length; ++p) {
				var temp = d[p];
				if (temp === "") {
					temp = " ";
				}
				rtrn.push(temp);
			}
			i.description = rtrn;
			i.tags = Object.assign([], this.working.tags);
			i.__id = genId();
			this.items.push(i);
			this.resetWorking();
		},
		deleteItem(item) {
			if (confirm("Are you sure you want to delete this ability?")) {
				var i = this;
				characterRef.collection("abilities").doc(item.__id).delete().then(function() {
					i.items.splice(i.items.indexOf(item), 1);
				}).catch(err => {
					error(err);
				});
			}
		},
		resetWorking() {
			this.working = {
				name: "",
				description: "",
				level: 0,
				tag: "",
				tags: [],
				shown: false
			}
		},
		editItem(item) {
			let index = this.items.indexOf(this.editingItem);
			if (index !== -1) {
				var d = this.editingItem.description.split("\n");
				var rtrn = [];
				for (var p = 0; p < d.length; ++p) {
					var temp = d[p];
					if (temp === "") {
						temp = " ";
					}
					rtrn.push(temp);
				}
				this.items[index].description = rtrn;
				this.items[index].editing = false;
			}
			this.editing = true;
			this.editingItem = item;
			this.items[this.items.indexOf(item)].editing = true;
			item.description = item.description.join("\n");
			this.working = item;
		},
		saveEdit() {
			var i = Object.assign({}, this.working);
			var d = i.description.split("\n");
			var rtrn = [];
			for (var p = 0; p < d.length; ++p) {
				var temp = d[p];
				if (temp === "") {
					temp = " ";
				}
				rtrn.push(temp);
			}
			i.description = rtrn;
			i.tags = Object.assign([], this.working.tags);
			i.__id = this.editingItem.__id;
			i.editing = false;
			i.shown = false;
			let index = this.items.indexOf(this.editingItem);
			this.items.splice(index, 1);
			this.items.splice(index, 0, i);
			this.editing = false;
			this.resetWorking();
		}
	}
}

var vueSpellsObj = {
	el: "#spells",
	data: {
		items: [],
		editing: false,
		editingItem: {},
		working: {
			name: "",
			description: "",
			level: 0,
			tag: "",
			tags: [],
			shown: false
		}
	},
	methods: {
		toggleShown(item) {
			this.items[this.items.indexOf(item)].shown = !this.items[this.items.indexOf(item)].shown;
		},
		addTag() {
			this.working.tags.push(this.working.tag);
			this.working.tag = "";
		},
		deleteTag(tag) {
			this.working.tags.splice(this.working.tags.indexOf(tag), 1);
		},
		addItem() {
			if (this.working.level === 0) {
				this.working.tags.unshift("Cantrip");
			} else {
				this.working.tags.unshift("Level: " + this.working.level);
			}

			var i = Object.assign({}, this.working);
			i.tags = Object.assign([], this.working.tags);
			var d = i.description.split("\n");
			var rtrn = [];
			for (var p = 0; p < d.length; ++p) {
				var temp = d[p];
				if (temp === "") {
					temp = " ";
				}
				rtrn.push(temp);
			}
			i.description = rtrn;
			i.tags = Object.assign([], this.working.tags);
			i.__id = genId();
			i.version = "b";
			this.items.push(i);
			this.resetWorking();
		},
		deleteItem(item) {
			if (confirm("Are you sure you want to delete this spell?")) {
				var i = this;
				characterRef.collection("spells").doc(item.__id).delete().then(function() {
					i.items.splice(i.items.indexOf(item), 1);
				}).catch(err => {
					error(err);
				});
			}
		},
		resetWorking() {
			this.working = {
				name: "",
				description: "",
				level: 0,
				tag: "",
				tags: [],
				shown: false
			}
		},
		editItem(item) {
			let index = this.items.indexOf(this.editingItem);
			if (index !== -1) {
				var d = this.editingItem.description.split("\n");
				var rtrn = [];
				for (var p = 0; p < d.length; ++p) {
					var temp = d[p];
					if (temp === "") {
						temp = " ";
					}
					rtrn.push(temp);
				}
				this.items[index].description = rtrn;
				this.items[index].editing = false;
			}
			this.editing = true;
			this.editingItem = item;
			this.items[this.items.indexOf(item)].editing = true;
			item.description = item.description.join("\n");
			this.working = item;
		},
		saveEdit() {
			var i = Object.assign({}, this.working);
			var d = i.description.split("\n");
			var rtrn = [];
			for (var p = 0; p < d.length; ++p) {
				var temp = d[p];
				if (temp === "") {
					temp = " ";
				}
				rtrn.push(temp);
			}
			i.description = rtrn;
			i.tags = Object.assign([], this.working.tags);
			i.__id = this.editingItem.__id;
			i.editing = false;
			i.shown = false;
			let index = this.items.indexOf(this.editingItem);
			this.items.splice(index, 1);
			this.items.splice(index, 0, i);
			this.editing = false;
			this.resetWorking();
		}
	}
}

var vueInventory = new Vue(vueInventoryObj);
var vueAbilities = new Vue(vueAbilitiesObj);
var vueSpells = new Vue(vueSpellsObj);

// var vuePermissions = new Vue({
// 	el: "#permissions",
// 	data: {
// 		userId: "",
// 		permissions: [],
// 		uidPermissions: []
// 	},
// 	methods: {
// 		addPermission() {
// 			var userId = this.userId;
// 			getUidFromId(userId, returnedUid => {
// 				getProfile(returnedUid, returnedProfile => {
// 					this.permissions.push(returnedProfile);
// 					this.uidPermissions.push(returnedUid);
// 					characterRef.update({
// 						permissions: this.permissions,
// 						uidPermissions: this.uidPermissions
// 					});
// 				});
// 			});
// 		},
// 		revoke(permission) {
// 			if (confirm("Are you sure?")) {
// 				var revokeUid = permission.uid;
// 				this.uidPermissions.splice(this.uidPermissions.indexOf(revokeUid), 1);
// 				this.permissions.splice(this.permissions.indexOf(permission), 1);
// 				characterRef.update({
// 					permissions: this.permissions,
// 					uidPermissions: this.uidPermissions
// 				});
// 			}
// 		}
// 	}
// });

// $(".innerPage").ready(() => {
// 	$(".characterContainer").load("./src/pages/characterSheet.html");
// });

function ctrlS() {
	if (sessionStorage.getItem("::openPage") === "characterEditor") {
		saveCharacter(true);
	}
}

function openSection(id, index) {
	$(".lists .nav .buttons .button").removeClass("selected");
	var i = index + 1;
	$(".lists .nav .buttons .button:nth-of-type(" + i + ")").addClass("selected");
	$(".page .section").hide();
	$("#" + id).show();
	var i = 100 * index;
	$(".parser").css("transform", "translateX(" + i + "%)");
}

allowSave = false;

function localError(error) {
	error(error);
	progress.hide();
	openPage("characterList");
}


console.log("hmm");

// save function for the character
function saveCharacter(show) {

	if (show === undefined) {
		show = true;
	}

	progress.show();

	se = false;

	try {
		s();
		console.log('c');
		if (sessionStorage.getItem("::saved") !== "false") {
			progress.show();
			firestore.collection("users").doc(sUid + "/characters/" + sessionStorage.getItem("::saved") + "/data/characterObj").update(characterObj).then(function() {
				progress.hide();
			}).then(function() {
				if (file !== null) {
					var task = userBucket.child(sessionStorage.getItem("::saved")).put(file);
					userRef.collection("characters").doc(sessionStorage.getItem("::saved")).update({
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
				if (vueInventory) {
					let rtrn = [];
					for (var i = 0; i < vueInventory.items.length; ++i) {
						let item = vueInventory["items"][i];
						item.shown = false;
						characterRef.collection("inventory").doc(item.__id).set(item);
					}
				}

				if (vueAbilities) {
					let rtrn = [];
					for (var i = 0; i < vueAbilities.items.length; ++i) {
						let item = vueAbilities["items"][i];
						item.shown = false;
						characterRef.collection("abilities").doc(item.__id).set(item);
					}
				}

				if (vueSpells) {
					let rtrn = [];
					for (var i = 0; i < vueSpells.items.length; ++i) {
						let item = vueSpells["items"][i];
						item.shown = false;
						characterRef.collection("spells").doc(item.__id).set(item);
					}
				}
			}).then(function() {
				if (show) {
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
			progress.show();
			sessionStorage.setItem("::saved", i);
			console.log(i);
			firestore.collection("users").doc(sUid + "/characters/" + sessionStorage.getItem("::saved") + "/data/characterObj").get().then(function(doc) {
				if (doc && doc.exists) {
					var data = doc.data();
					l(data);
					allowSave = true;
					// window.history.pushState("", "", "appb.html?user=" + sUid + "&character=" + sessionStorage.getItem("::saved"));
					progress.hide();
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

			loader.hide();
		}
	} catch(e) {
		error(e);
	}
}

async function deleteCharacter() {
	console.log("Delete");

	progress.show();
	var usedInCampaigns = await createQuery(userRef.collection("characters").doc(sessionStorage.getItem("::saved")).collection("usedInCampaigns"));
	if (usedInCampaigns[0] === undefined) {
		progress.hide();

		if (confirm("Are you sure you want to delete this character? This character will be lost forever.")) {
			characterRef.collection("data").doc("characterObj").delete().catch(e => {thr(e)});
			var inventoryQuery = createQuery(characterRef.collection("inventory"));
			for (var i = 0; i < inventoryQuery.length; ++i) {
				var id = inventoryQuery[i]["__id"];
				characterRef.collection("inventory").doc(id).delete().catch(e => {thr(e)});
			}

			var abilitiesQuery = createQuery(characterRef.collection("abilities"));
			for (var i = 0; i < abilitiesQuery.length; ++i) {
				var id = abilitiesQuery[i]["__id"];
				characterRef.collection("abilities").doc(id).delete().catch(e => {thr(e)});
			}

			var spellsQuery = createQuery(characterRef.collection("spells"));
			for (var i = 0; i < spellsQuery.length; ++i) {
				var id = spellsQuery[i]["__id"];
				characterRef.collection("spells").doc(id).delete().catch(e => {thr(e)});
			}

			characterRef.delete().catch(e => {thr(e)});
			openPage("characterList");
		}
	} else {
		alert("This character is in use in a campaign");
		progress.hide();
	}
}

function dupe() {
	if (confirm("Are you sure you want to dupe this character?")) {
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
		if (vueInventory) {
			let rtrn = [];
			for (var i = 0; i < vueInventory.items.length; ++i) {
				let item = vueInventory["items"][i];
				item.shown = false;
				newCharacterRef.collection("inventory").doc(item.__id).set(item).catch(e => {thr(e)});
			}
		}

		if (vueAbilities) {
			let rtrn = [];
			for (var i = 0; i < vueAbilities.items.length; ++i) {
				let item = vueAbilities["items"][i];
				item.shown = false;
				newCharacterRef.collection("abilities").doc(item.__id).set(item).catch(e => {thr(e)});
			}
		}

		if (vueSpells) {
			let rtrn = [];
			for (var i = 0; i < vueSpells.items.length; ++i) {
				let item = vueSpells["items"][i];
				item.shown = false;
				newCharacterRef.collection("spells").doc(item.__id).set(item).catch(e => {thr(e)});
			}
		}

		// if (file !== null) {
		// 	userBucket.child(newCharacterId).put(file);
		// }

		showSnackbar("Character dupelicated");
	}
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
	var query = await createQuery(characterRef.collection("inventory"));
	console.log(query);
	if (query[0] !== undefined) {
		vueInventory.items = query;
	} else {
		vueInventory.items = [];
	}
}

async function loadAbilities() {
	var query = await createQuery(characterRef.collection("abilities"));
	console.log(query);
	if (query[0] !== undefined) {
		vueAbilities.items = query;
	} else {
		vueAbilities.items = [];
	}
}

async function loadSpells() {
	var query = await createQuery(userRef.collection("characters").doc(sessionStorage.getItem("::openCharacter")).collection("spells").orderBy("level", "desc").orderBy("name", "desc"));
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

				vueSpells.items.push(spellObj);
			} else {
				vueSpells.items.push(spell);
			}
		}
	}
}

async function loadLists() {
	loader.show();
	await loadSpells();
	await loadInventory();
	await loadAbilities();
	loader.hide();
	saveCharacter(false);
}

function calcMod(selector, modSelector) {
	$(selector).focusout(function() {
		var value = Number($(this).val());
		var modValue = modifiers[value - 1];
		console.log(selector, modSelector);
		console.log(value, modValue);
		$(modSelector).val(modValue);
	});
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

var onExit = function() {
	inputCard.close();
}

var loaded = false;

function onload() {
	if (!loaded) {
		console.log("C");
		loadLists();
		loadCharacter(sessionStorage.getItem("::openCharacter"));
		refreshLayout();
		// loadPermissions();
		loaded = true;
	}
}
