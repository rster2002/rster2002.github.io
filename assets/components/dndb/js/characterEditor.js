sUid = sessionStorage.getItem("::uid");
characters = "abcdefghijklmnopqrstuvwxyz0123456789";

sessionStorage.setItem("::saved", "false");

$(".innerPage").ready(() => {
	$(".characterContainer").load("../assets/components/dndb/pages/characterSheet.html");
});

function ctrlS() {
	if (sessionStorage.getItem("::openPage") === "characterEditor") {
		saveCharacter(true);
	}
}

allowSave = false;

function localError(error) {
	error(error);
	progress.hide();
	openPage("characterList");
}

function t(here) {
	if ($(here).parent().hasClass("open")) {
		c(here);
	} else {
		o(here);
	}
}

function o(here) {
	$(here).parent().addClass("open");
	setTimeout(function() {
		$(here).parent().children(".content").addClass("open");
	}, 75);
	setTimeout(function() {
		$(here).parent().addClass("h");
	}, 80);
}

function c(here) {
	$(here).parent().removeClass("h");
	setTimeout(function() {
		$(here).parent().removeClass("open");
	}, 80);
	$(here).parent().children(".content").removeClass("open");
}

console.log("hmm");

function saveCharacter(show) {

	progress.show();

	se = false;

	try {
		s();
		if (sessionStorage.getItem("::saved") !== "false") {
			progress.show();
			firestore.collection("users").doc(sUid + "/characters/" + sessionStorage.getItem("::saved") + "/data/characterObj").update(characterObj).then(function() {
				progress.hide();
				if (show) {
					note.open("save", "Saved", 1000);
				}
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
			}).catch(function(error) {
				error(e);
			})
		} else {
			promptName();
		}
	} catch(e) {
		error(e);
	}
}

function addSpellToList(spell, index) {
	function prop(text) {
		return "<div class='tag'><p>" + text + "</p></div>"
	}

	var properties = "";
	console.log(spell);
	if (spell.level == 0) {
		properties += prop("Cantrip");
	} else {
		properties += prop("Level " + spell.level);
	}

	if (spell.verbal === true) {
		properties += prop("Verbal");
	}

	if (spell.somatic === true) {
		properties += prop("Somatic");
	}

	if (spell.material !== '') {
		properties += prop("Material " + spell.material);
	}

	if (spell.range !== '') {
		properties += prop("Range " + spell.range);
	}

	if (spell.castingTime !== '') {
		properties += prop("Casting time " + spell.castingTime);
	}

	if (spell.duration !== '') {
		properties += prop("Duration " + spell.duration);
	}

	if (spell.concentration === true) {
		properties += prop("Concentration");
	}

	if (spell.ritual === true) {
		properties += prop("Ritual");
	}

	var description = spell.description;
	var desc = description.split("\n");
	console.log(desc);
	var out = "";
	for (var i = 0; i < desc.length; ++i) {
		var text = desc[i];
		if (text === "") {
			out += "<br>";
		} else {
			out += "<p>" + text + "</p>";
		}
	}

	var levelText = spell.level == 0 ? "Cantrip" : "Level " + spell.level;

	$("#spellsListing").append("<div class='item s2 rounded centerHorizontal' id='spell" + index + "'><div class='shared'><div class='icon'><div class='circle'></div></div><div class='text'><div class='wrapper'><h1>" + spell.name + "</h1><p>" + levelText + "</p></div></div></div><div class='content'><div class='tags'>" + properties + "</div><div class='text'>" + out + "</div><div class='actions'><button onclick='deleteSpell(" + index + ")' icon-left='delete' class='wave del'>Delete</button></div></div></div>");

	$("#spell" + index).children(".shared").on("click", function(e) {
		console.log("click")
		e.stopPropagation();
		t(this);
	});

	var thisthis = this;

	// $("#spell" + index + " .del").on("click", function(e) {
	// 	e.stopPropagation();
	// 	wave.dialog.open("Confirm", "Are you sure you want to delete this spell from your list?", [
	// 		{
	// 			"text": "Confirm",
	// 			"function": function() {
	// 				deleteSpell(thisthis);
	// 			}
	// 		},
	// 		{
	// 			"text": "Cancel",
	// 			"function": function() {
	// 				wave.dialog.close();
	// 			}
	// 		}
	// 	])
	// });
}

function addItemToList(itemObj, index) {
	function prop(text) {
		return "<div class='tag'><p>" + text + "</p></div>"
	}
	var properties = "";
	if (itemObj.magic) {
		properties += prop("Magic");
	}
	if (itemObj.maxCharges !== 0) {
		properties += prop("Max charges: " + itemObj.maxCharges);
	}
	if (itemObj.weapon === true) {
		properties += prop("Weapon")
	}
	if (itemObj.damageDie !== "") {
		properties += prop("Damage die: " + itemObj.damageDie);
	}
	if (itemObj.light === true) {
		properties += prop("Light");
	}
	if (itemObj.finess === true) {
		properties += prop("Finess");
	}
	if (itemObj.twoHanded === true) {
		properties += prop("Two-handed");
	}
	if (itemObj.heavy === true) {
		properties += prop("Heavy");
	}
	if (itemObj.reach === true) {
		properties += prop("Reach");
	}
	if (itemObj.throw !== "") {
		properties += prop("Throw: " + itemObj.throw);
	}
	if (itemObj.vercitile !== "") {
		properties += prop("Vercitile: " + itemObj.vercitile);
	}
	if (itemObj.ammunition !== "") {
		properties += prop("Ammunition: " + itemObj.ammunition);
	}
	if (itemObj.melee === true) {
		properties += prop("Melee weapon");
	}
	if (itemObj.ranged === true) {
		properties += prop("Ranged weapon");
	}
	if (itemObj.loading === true) {
		properties += prop("Loading");
	}

	var description = itemObj.description;
	var desc = description.split("\n");
	var out = "";
	for (var i = 0; i < desc.length; ++i) {
		var text = desc[i];
		if (text === "") {
			out += "<br>";
		} else {
			out += "<p>" + text + "</p>";
		}
	}
	var note = "";
	var colorGrad = "";
	if (itemObj.magic === true && itemObj.weapon) {
		note = "Magical weapon";
		colorGrad = "background-color: #ff4e00;background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);"
	} else if (itemObj.magic === true) {
		note = "Magical item";
		colorGrad = "background-color: #fbb034;background-image: linear-gradient(315deg, #fbb034 0%, #ffdd00 74%);"
	} else if (itemObj.weapon === true) {
		note = "Weapon";
		colorGrad = "background-color: #6b0f1a;background-image: linear-gradient(315deg, #6b0f1a 0%, #b91372 74%);"
	} else {
		note = "Normal item";
		colorGrad = "background-color: #2a2a72;background-image: linear-gradient(315deg, #2a2a72 0%, #009ffd 74%);"
	}
	var chargeControlls = "";
	if (itemObj.magic === true) {
		chargeControlls = "<div class='controll'><h1>Charge: </h1><button class='wave prime' onclick='addCharge(" + index + ")'><i class='material-icons'>add</i></button><h1 id='itemCharge" + index + "'>" + itemObj.charges + "</h1><button class='wave prime' onclick='removeCharge(" + index + ")'><i class='material-icons'>remove</i></button></div>"
	}

	$("#itemsList").append("<div class='item s2 rounded centerHorizontal' id='item" + index + "'><div class='shared'><div class='icon'><div class='circle' style='" + colorGrad + "'></div></div><div class='text'><div class='wrapper'><h1>" + itemObj.name + "</h1><p>" + note + "</p></div></div></div><div class='content'><div class='tags'>" + properties + "</div><div class='controlls'><div class='controll'><h1>Quantity: </h1><button class='wave prime' onclick='addQuantity(" + index + ")'><i class='material-icons'>add</i></button><h1 id='itemQuantity" + index + "'>" + itemObj.quantity + "</h1><button class='wave prime' onclick='removeQuantity(" + index + ")'><i class='material-icons'>remove</i></button></div>" + chargeControlls + "</div><div class='text'>" + out + "</div><div class='actions'><button onclick='deleteItem(" + index + ")' icon-left='delete' class='wave del'>Delete</button></div></div></div>");

	$("#item" + index).children(".shared").on("click", function(e) {
		console.log("click")
		e.stopPropagation();
		t(this);
	});

	var thisthis = this;
}

function addQuantity(index) {
	var item = itemObj[index];
	var currentQuantity = item.quantity;
	currentQuantity += 1;
	itemObj[index]["quantity"] = currentQuantity;
	$("#itemQuantity" + index).text(currentQuantity);
	userRef.collection("characters").doc(sessionStorage.getItem("::saved")).collection("items").doc(item.__id).update({
		quantity: currentQuantity
	}).catch((e) => {
		error(e);
	})
}

function removeQuantity(index) {
	var item = itemObj[index];
	var currentQuantity = item.quantity;
	currentQuantity -= 1;
	itemObj[index]["quantity"] = currentQuantity;
	$("#itemQuantity" + index).text(currentQuantity);
	userRef.collection("characters").doc(sessionStorage.getItem("::saved")).collection("items").doc(item.__id).update({
		quantity: currentQuantity
	}).catch((e) => {
		error(e);
	});
}

function addCharge(index) {
	var item = itemObj[index];
	var currentCharge = item.charges;
	currentCharge += 1;
	itemObj[index]["charges"] = currentCharge;
	$("#itemCharge" + index).text(currentCharge);
	userRef.collection("characters").doc(sessionStorage.getItem("::saved")).collection("items").doc(item.__id).update({
		charges: currentCharge
	}).catch((e) => {
		error(e);
	});
}

function removeCharge(index) {
	var item = itemObj[index];
	var currentCharge = item.charges;
	currentCharge -= 1;
	itemObj[index]["charges"] = currentCharge;
	$("#itemCharge" + index).text(currentCharge);
	userRef.collection("characters").doc(sessionStorage.getItem("::saved")).collection("items").doc(item.__id).update({
		charges: currentCharge
	}).catch((e) => {
		error(e);
	});
}

function deleteSpell(elementId) {
	wave.dialog.open("Confirm", "Are you sure you want to delete this spell?", [
		{
			"text": "Accept",
			"function": function() {
				var spellId = spellObj[elementId]["__id"];
				console.log(spellId);
				userRef.collection("characters").doc(sessionStorage.getItem("::saved") + "/spells/" + spellId).delete().catch(function(e){error(e)});
				$("#spell" + elementId).remove();
				note.open("delete", "Spell deleted", 2000);
			}
		},
		{
			"text": "Cancel",
			"function": function() {
				wave.dialog.close();
			}
		}
	]);
}

function deleteItem(elementId) {
	wave.dialog.open("Confirm", "Are you sure you want to delete this item", [
		{
			"text": "Accept",
			"function": function() {
				var itemId = itemObj[elementId]["__id"];
				userRef.collection("characters").doc(sessionStorage.getItem("::saved") + "/items/" + itemId).delete().catch(function(e){error(e)});
				$("#item" + elementId).remove();
				note.open("delete", "Item deleted", 2000);
			}
		},
		{
			"text": "Cancel",
			"function": function() {
				wave.dialog.close();
			}
		}
	])
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
					window.history.pushState("", "", "appb.html?user=" + sUid + "&character=" + sessionStorage.getItem("::saved"));
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
				}).catch(function(e){error(e)});
			}).catch(function(e){error(e)});

			loader.hide();
		}
	} catch(e) {
		error(e);
	}
}

async function del() {
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
				}).catch(function(e){error(e)});
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
				});;
			}
		}).catch(function(error) {
			localError(error);
		});
	}
}

addSpellIndex = 5000;
addItemIndex = 5000;

function addSpell() {
	var spellId = genId();
	if ($("#level").val() !== "") {
		var spellObj = {
			name: $("#spellName").val(),
			verbal: $(".verbal").hasClass("selected"),
			somatic: $(".somatic").hasClass("selected"),
			material: $("#materialComponent").val(),
			range: $("#range").val(),
			castingTime: $("#castingTime").val(),
			duration: $("#duration").val(),
			description: $("#description").val(),
			level: Number($("#level").val()),
			concentration: $(".concentration").hasClass("selected"),
			ritual: $(".ritual").hasClass("selected"),
			id: spellId
		};

		userRef.collection("characters").doc(sessionStorage.getItem("::saved")).collection("spells").add(spellObj).catch(function(e){error(e)});;

		addSpellToList(spellObj, addSpellToList);
		addSpellIndex += 1;
	} else {
		alert("You didn't select a spell level");
	}
}

function addItem() {
	var itemId = genId();
	var newItemObj = {
		name: $("#itemName").val(),
		magic: $(".magic").hasClass("selected"),
		description: $("#itemDescription").val(),
		maxCharges: Number($("#itemCharges").val()),
		charges: Number($("#itemCharges").val()),
		quantity: Number($("#itemCount").val()),
		weapon: $("#itemWeapon").hasClass("selected"),
		damageDie: $("#itemDamageDie").val(),
		light: $("#itemLight").hasClass("selected"),
		finess: $("#itemFiness").hasClass("selected"),
		twoHanded: $("#itemTwoHanded").hasClass("selected"),
		heavy: $("#itemHeavy").hasClass("selected"),
		reach: $("#itemReach").hasClass("selected"),
		throw: $("#itemThrow").val(),
		vercitile: $("#itemVercitile").val(),
		ammunition: $("#itemAmmunition").val(),
		melee: $("#itemMelee").hasClass("selected"),
		ranged: $("#itemRanged").hasClass("selected"),
		loading: $("#itemLoading").hasClass("selected")
	}
	itemObj[addItemIndex] = newItemObj;
	itemObj[addItemIndex]["__id"] = itemId;
	userRef.collection("characters").doc(sessionStorage.getItem("::saved")).collection("items").doc(itemId).set(newItemObj).catch(e => {error(e)});
	addItemToList(newItemObj, addItemIndex);
	addItemIndex += 1;
}

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

async function querySpells() {
	progress.show();
	var spellArray = await createQuery(userRef.collection("characters").doc(sessionStorage.getItem("::openCharacter")).collection("spells").orderBy("level", "desc").orderBy("name", "desc"));

	for (var i = 0; i < spellArray.length; i++) {
		addSpellToList(spellArray[i], i);
		spellObj[i] = spellArray[i];
	}

	progress.hide();
}

async function queryItems() {
	var itemArray = await createQuery(userRef.collection("characters").doc(sessionStorage.getItem("::openCharacter")).collection("items").orderBy("name", "desc"));

	for (var i = 0; i < itemArray.length; i++) {
		addItemToList(itemArray[i], i);
		itemObj[i] = itemArray[i];
	}
}

async function onload() {
	loader.show();
	await loadCharacter(sessionStorage.getItem("::openCharacter"));
	await querySpells();
	await queryItems();
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
