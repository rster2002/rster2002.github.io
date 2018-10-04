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
		working: {
			name: "",
			count: 0,
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
			if (confirm("Are you sure you want to delete this item?")) {
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
				level: 0,
				tag: "",
				tags: [],
				shown: false
			}
		}
	}
}

var vueAbilitiesObj = {
	el: "#abilities",
	data: {
		items: [],
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
		}
	}
}

var vueSpellsObj = {
	el: "#spells",
	data: {
		items: [],
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
		}
	}
}

var vueInventory = new Vue(vueInventoryObj);
var vueAbilities = new Vue(vueAbilitiesObj);
var vueSpells = new Vue(vueSpellsObj);

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
