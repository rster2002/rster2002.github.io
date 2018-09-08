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
		}
	}
}

var vueInventory = new Vue(vueInventoryObj);
var vueAbilities = new Vue(vueAbilitiesObj);
var vueSpells = new Vue(vueSpellsObj);


// $(".innerPage").ready(() => {
// 	$(".characterContainer").load("./src/pages/characterSheet.html");
// });

function back() {
	openPage(global["viewCharacterInfo"]["returnPage"]);
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

function loadCharacter(sUid, i) {
	try {
		if (i) {
			progress.show();
			sessionStorage.setItem("::saved", i);
			console.log(i);
			firestore.collection("users").doc(sUid + "/characters/" + sessionStorage.getItem("::saved") + "/data/characterObj").get().then(function(doc) {
				if (doc && doc.exists) {
					var data = doc.data();
					lDisabled(data);
					allowSave = false;
					// window.history.pushState("", "", "appb.html?user=" + sUid + "&character=" + sessionStorage.getItem("::saved"));
					progress.hide();
				} else {
					error("Couldn't find this character in the database");
					openPage("characterList");
				}
			}).then(function() {
				userRef.collection("characters").doc(sessionStorage.getItem("::saved")).get().then(function(doc) {
					if (doc && doc.exists) {
						var characterInfo = doc.data();
						if (characterInfo.hasImg !== undefined && characterInfo.hasImg === true) {
							userBucket.child(sessionStorage.getItem("::saved")).getDownloadURL().then(function(url) {
								console.log(url);
								$('#form12_2').css('background-image', "url('" + url + "')");
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

function loadInventory() {
	firestore.collection("users").doc(global["viewCharacterInfo"]["userId"]).collection("characters").doc(global["viewCharacterInfo"]["characterId"]).collection("lists").doc("inventory").get().then(doc => {
		if (doc && doc.exists) {
			vueInventory.items = doc.data().data;
		} else {
			vueInventory.items = [];
		}
	});
}

function loadAbilities() {
	firestore.collection("users").doc(global["viewCharacterInfo"]["userId"]).collection("characters").doc(global["viewCharacterInfo"]["characterId"]).collection("lists").doc("abilities").get().then(doc => {
		if (doc && doc.exists) {
			vueAbilities.items = doc.data().data;
		} else {
			vueAbilities.items = []
		}
	})
}

async function loadSpells() {
	firestore.collection("users").doc(global["viewCharacterInfo"]["userId"]).collection("characters").doc(global["viewCharacterInfo"]["characterId"]).collection("lists").doc("spells").get().then(doc => {
		if (doc && doc.exists) {
			vueSpells.items = doc.data().data;
		} else {
			vueSpells.items = [];
		}
	});

	var query = await createQuery(firestore.collection("users").doc(global["viewCharacterInfo"]["userId"]).collection("characters").doc(global["viewCharacterInfo"]["characterId"]).collection("spells"));
	for (var i = 0; i < query.length; ++i) {
		var spell = query[i];
		firestore.collection("users").doc(global["viewCharacterInfo"]["userId"]).collection("characters").doc(global["viewCharacterInfo"]["characterId"]).collection("spells").doc(spell.__id).delete().catch(err => {
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

		vueSpells.items.push(spellObj);
	}
}

async function loadLists() {
	loader.show();
	await loadSpells();
	await loadInventory();
	await loadAbilities();
	loader.hide();
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

var onExit = function() {
	inputCard.close();
}

var loaded = false;

function onload() {
	if (!loaded) {
		console.log("C");
		loadLists();
		loadCharacter(global["viewCharacterInfo"]["userId"], global["viewCharacterInfo"]["characterId"]);
		loaded = true;
	}
}
