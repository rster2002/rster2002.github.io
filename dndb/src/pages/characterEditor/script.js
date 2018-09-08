sUid = sessionStorage.getItem("::uid");
characters = "abcdefghijklmnopqrstuvwxyz0123456789";

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
			this.items.push(i);
		},
		deleteItem(item) {
			if (confirm("Are you sure you want to delete this item?")) {
				this.items.splice(this.items.indexOf(item), 1);
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
			this.items.push(i);
		},
		deleteItem(item) {
			if (confirm("Are you sure you want to delete this ability?")) {
				this.items.splice(this.items.indexOf(item), 1);
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
				this.working.tags.push("Cantrip");
			} else {
				this.working.tags.push("Level: " + this.working.level);
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
			this.items.push(i);
		},
		deleteItem(item) {
			if (confirm("Are you sure you want to delete this spell?")) {
				this.items.splice(this.items.indexOf(item), 1);
			}
		}
	}
}

var vueInventory = new Vue(vueInventoryObj);
var vueAbilities = new Vue(vueAbilitiesObj);
var vueSpells = new Vue(vueSpellsObj);


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
						rtrn.push(item);
					}

					userRef.collection("characters").doc(sessionStorage.getItem("::saved")).collection("lists").doc("inventory").set({
						data: rtrn
					});
				}

				if (vueAbilities) {
					let rtrn = [];
					for (var i = 0; i < vueAbilities.items.length; ++i) {
						let item = vueAbilities["items"][i];
						item.shown = false;
						rtrn.push(item);
					}

					userRef.collection("characters").doc(sessionStorage.getItem("::saved")).collection("lists").doc("abilities").set({
						data: rtrn
					});
				}

				if (vueSpells) {
					let rtrn = [];
					for (var i = 0; i < vueSpells.items.length; ++i) {
						let item = vueSpells["items"][i];
						item.shown = false;
						rtrn.push(item);
					}

					userRef.collection("characters").doc(sessionStorage.getItem("::saved")).collection("lists").doc("spells").set({
						data: rtrn
					});
				}
			}).then(function() {
				showSnackbar("Character saved");
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

async function deleteCharacter() {
	console.log("Delete");

	progress.show();
	var usedInCampaigns = await createQuery(userRef.collection("characters").doc(sessionStorage.getItem("::saved")).collection("usedInCampaigns"));
	if (usedInCampaigns[0] === undefined) {
		progress.hide();

		wave.dialog.confirm("Are you sure you want to delete this character? This character will be lost forever.", () => {
			progress.show();
			firestore.collection("users").doc(sUid + "/characters/" + sessionStorage.getItem("::saved") + "/data/characterObj").delete().then(function() {
				userRef.collection("characters").doc(sessionStorage.getItem("::saved")).delete().then(function() {
					progress.hide();
					note.open("delete", "Character deleted", 2000);
					openPage("characterList");
					wave.dialog.close();
				}).catch(function(e) {
					error(e)
				});
			}).catch(function(e){error(e)});
		})
	} else {
		alert("This character is in use in a campaign");
		progress.hide();
	}
}

function dupe() {
	var characterId = sessionStorage.getItem("::saved");
	var newCharacterId = "character-" + randomString(characters, 4) + "-" + randomString(characters, 4) + "-" + randomString(characters, 4) + "-" + randomString(characters, 4);
	if (confirm("Do you wan't to dupe this character?")) {
		progress.show();
		firestore.collection("users").doc(sUid + "/characters/" + characterId).get().then(function(doc) {
			if (doc && doc.exists) {
				var characterInfo = doc.data();
				console.log(characterInfo);
				if (characterInfo["dupe"] !== undefined) {
					characterInfo["dupe"] += 1;
				} else {
					characterInfo["dupe"] = 1;
				}
				characterInfo["id"] = newCharacterId;
				console.log(characterInfo);
				firestore.collection("users").doc(sUid + "/characters/" + newCharacterId).set(characterInfo).then(function() {
					firestore.collection("users").doc(sUid + "/characters/" + characterId + "/data/characterObj").get().then(function(doc) {
						if (doc && doc.exists) {
							var characterObj = doc.data();
							firestore.collection("users").doc(sUid + "/characters/" + newCharacterId + "/data/characterObj").set(characterObj).then(function() {
								progress.hide();
								note.open("file_copy", "Duped characer", 2000);
								loadCharacter(newCharacterId);
							});
						}
					}).catch(function(error) {
						localError(error);
					});
				}).catch(function(error) {
					localError(error);
				});

				userRef.collection("characters").doc(newCharacterId).collection("lists").doc("inventory").set(vueInventory.items)
					.catch(err => {
						error(err);
					});

				userRef.collection("characters").doc(newCharacterId).collection("lists").doc("abilities").set(vueAbilities.items)
					.catch(err => {
						error(err);
					});

				userRef.collection("characters").doc(newCharacterId).collection("lists").doc("inventory").set(vueSpells.items)
					.catch(err => {
						error(err);
					});
			}
		}).catch(function(error) {
			localError(error);
		});
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
	userRef.collection("characters").doc(sessionStorage.getItem("::openCharacter")).collection("lists").doc("inventory").get().then(doc => {
		if (doc && doc.exists) {
			vueInventory.items = doc.data().data;
		} else {
			vueInventory.items = [];
		}
	});
}

function loadAbilities() {
	userRef.collection("characters").doc(sessionStorage.getItem("::openCharacter")).collection("lists").doc("abilities").get().then(doc => {
		if (doc && doc.exists) {
			vueAbilities.items = doc.data().data;
		} else {
			vueAbilities.items = []
		}
	})
}

async function loadSpells() {
	userRef.collection("characters").doc(sessionStorage.getItem("::openCharacter")).collection("lists").doc("spells").get().then(doc => {
		if (doc && doc.exists) {
			vueSpells.items = doc.data().data;
		} else {
			vueSpells.items = [];
		}
	});

	var query = await createQuery(userRef.collection("characters").doc(sessionStorage.getItem("::openCharacter")).collection("spells"));
	for (var i = 0; i < query.length; ++i) {
		var spell = query[i];
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
currentSlide = 0;
slideNames = {
	0: "Character sheet",
	1: "Inventory",
	2: "Spells",
	3: "Settings"
}

function slideLeft() {
	currentSlide -= 1;
	if (currentSlide === 0) {
		$(".contr.left").addClass("faded");
		setTimeout(() => {
			$(".buttons .controll").css("margin-left", "8vw");
			$(".contr.left").hide();
		}, 200);
	}

	$("#slideTitle").text(slideNames[currentSlide]);

	$(".contr.right").removeClass("faded");
	$(".buttons .controll").css("margin-right", "0vw");
	$(".contr.right").show();
	$(".sliding").css("margin-left", "-" + currentSlide * 100 + "vw");
}

function slideRight() {
	currentSlide += 1;
	if (currentSlide === 1) {
		$(".contr.left").removeClass("faded");
		$(".buttons .controll").css("margin-left", "0vw");
		$(".contr.left").show();
	}

	if (slideNames[currentSlide + 1] === undefined) {
		$(".contr.right").addClass("faded");
		setTimeout(() => {
			$(".buttons .controll").css("margin-right", "8vw");
			$(".contr.right").hide();
		}, 200);
	}
	$("#slideTitle").text(slideNames[currentSlide]);
	$(".sliding").css("margin-left", "-" + currentSlide * 100 + "vw");
}

var loaded = false;

function onload() {
	if (!loaded) {
		console.log("C");
		loadLists();
		loadCharacter(sessionStorage.getItem("::openCharacter"));
		loaded = true;
	}
}
