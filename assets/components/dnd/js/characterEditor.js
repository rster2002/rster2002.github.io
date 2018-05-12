sUid = sessionStorage.getItem("::uid");
characters = "abcdefghijklmnopqrstuvwxyz0123456789";

sessionStorage.setItem("::saved", "false");

$(".innerPage").ready(() => {
	$(".characterContainer").load("../assets/components/dnd/pages/characterSheet.html");
});

function ctrlS() {
	if (sessionStorage.getItem("::openPage") === "characterEditor") {
		saveCharacter(true);
	}
}

sessionStorage.setItem("current", "0");

$(".innerPage").scroll(function () {
	inputCard.peek.open();
	var scrolled = $(".innerPage").scrollTop();
	var height = $(".characterSheet").css("height");
	var height = height.replace("px", "");
	var tumble = Number(height);

	if (scrolled < tumble && sessionStorage.getItem("current") !== "1") {
		inputCard.slideUp("Creating a character");
		inputCard.loadContent($(".characterBuilding").html(), "Down", "characterBuilding");
		sessionStorage.setItem("current", "1");
	} else if (scrolled > tumble && sessionStorage.getItem("current") !== "2") {
		inputCard.slideDown("Add a spell");
		inputCard.loadContent("<p>Spell form</p>", "Down");
		sessionStorage.setItem("current", "2");
	}
});

allowSave = false;

timer = setInterval(function() {
	if (sessionStorage.getItem("::openPage") === "characterEditor") {
		if (sessionStorage.getItem("::saved") !== "false") {
			if (allowSave === true) {
				saveCharacter(false);
			}
		}
	}
}, 15000);

function localError(error) {
	error(error);
	progress.hide();
	openPage("characterList");
}

function t(here) {
	if ($(here).hasClass("open")) {
		c(here);
	} else {
		o(here);
	}
}

function o(here) {
	$(here).addClass("open");
	setTimeout(function() {
		$(here).children(".content").addClass("open");
	}, 75);
	setTimeout(function() {
		$(here).addClass("h");
	}, 80);
}

function c(here) {
	$(here).removeClass("h");
	setTimeout(function() {
		$(here).removeClass("open");
	}, 80);
	$(here).children(".content").removeClass("open");
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
						note.open("Saved", "save", 1000);
					}
				})
				.catch(function(error) {
					error(error);
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

	$(".spellList").prepend("<div class='spell s2 rounded centerHorizontal' id='spell" + index + "'><div class='shared'><div class='icon'><div class='circle'></div></div><div class='text'><div class='wrapper'><h1>" + spell.name + "</h1><p>" + levelText + "</p></div></div></div><div class='content'><div class='tags'>" + properties + "</div><div class='text'>" + out + "</div><div class='actions'><button class='flat del'>Delete</button></div></div></div>");

	$("#spell" + index).on("click", function(e) {
		console.log("click")
		e.stopPropagation();
		t(this);
	});

	$("#spell" + index + " .del").on("click", function(e) {
		e.stopPropagation();
		deleteSpell(this);
	});
}

function deleteSpell(here) {
	var k = $(here).parent().parent().parent().attr("id");
	var elementId = Number(k.replace("spell", ""));
	var spellId = spellObj[elementId]["__id"];
	userRef.collection("characters").doc(sessionStorage.getItem("::saved") + "/spells/" + spellId).delete();
	note.open("Spell deleted", "delete", 2000);
}

function loadCharacter(i) {
	try {
		if (i) {
			progress.show();
			sessionStorage.setItem("::saved", i);
			firestore.collection("users").doc(sUid + "/characters/" + sessionStorage.getItem("::saved") + "/data/characterObj").get().then(function(doc) {
				if (doc && doc.exists) {
					var data = doc.data();
					l(data);
					allowSave = true;
					progress.hide();
				} else {
					error("Couldn't find this character in the database");
					openPage("characterList");
				}
			}).catch(function(error) {
				error(error);
			});

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

		if (confirm("Are you sure you want to delete this character?")) {
			if (confirm("Are you realy sure?")) {
				progress.show();
				firestore.collection("users").doc(sUid + "/characters/" + sessionStorage.getItem("::saved") + "/data/characterObj").delete().then(function() {
					progress.hide();
					note.open("Character deleted", "delete", 2000);
					openPage("characterList");
				}).catch(function(e) {
					error(e);
					progress.hide();
				});
			}
		}
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
				console.log(characterInfo);
				firestore.collection("users").doc(sUid + "/characters/" + newCharacterId).set(characterInfo).then(function() {
					firestore.collection("users").doc(sUid + "/characters/" + characterId + "/data/characterObj").get().then(function(doc) {
						if (doc && doc.exists) {
							var characterObj = doc.data();
							firestore.collection("users").doc(sUid + "/characters/" + newCharacterId + "/data/characterObj").set(characterObj).then(function() {
								progress.hide();
								note.open("Duped characer", "file_copy", 2000);
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

		userRef.collection("characters").doc(sessionStorage.getItem("::saved")).collection("spells").add(spellObj);

		addSpellToList(spellObj);
	} else {
		alert("You didn't select a level");
	}
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

async function querySpells() {
	console.log("Query spells")
	progress.show();
	var spellArray = await createQuery(userRef.collection("characters").doc(sessionStorage.getItem("::openCharacter")).collection("spells").orderBy("level", "desc").orderBy("name", "desc"));

	console.log(spellArray);
	console.log(spellArray);

	for (var i = 0; i < spellArray.length; ++i) {
		addSpellToList(spellArray[i], i);
		spellObj[i] = spellArray[i];
	}

	progress.hide();
}

async function onload() {
	loader.show();
	await loadCharacter(sessionStorage.getItem("::openCharacter"));
	await querySpells();
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
		allowEdit: $(".allowEdit").val()
	});
}

var onExit = function() {
	inputCard.close();
}
