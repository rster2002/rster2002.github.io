sUid = sessionStorage.getItem("::uid");
characters = "abcdefghijklmnopqrstuvwxyz0123456789";

timer = setInterval(function() {
	if (sessionStorage.getItem("::openPage") === "characterEditor") {
		if (sessionStorage.getItem("::saved") !== "false") {
			saveCharacter(false);
		}
	}
}, 15000);

$(".innerPage").ready(() => {
	$(".characterContainer").load("../assets/components/dnd/pages/characterSheet.html");
});

function ctrlS() {
	if (sessionStorage.getItem("::openPage") === "characterEditor") {
		saveCharacter(true);
	}
}

sessionStorage.setItem("::saved","false");
console.log("hmm");

function promptName() {
	input = prompt("Type a name for this caracter sheet");
	if (input) {
		if (sessionStorage.getItem("::saved") === "false") {
			dbUsers.child(sUid).once("value", (e) => {
				if (e.hasChild("characters")) {
					dbUsers.child(sUid).child("characters").once("value", (e) => {
						if (e.hasChild(input)) {
							if(confirm("Are you sure you want to overwrite this character sheet?")) {
								upCharacter();
							}
						} else {
							upCharacter();
						}
					});
				}
			});
		} else {
			upCharacter();
		}
	}
}

function upCharacter() {
	loader.show();
	try {
		sessionStorage.setItem("::saved", input);
		dbUsers.child(sUid).child("characters").child(input).set(characterObj);
	} catch (e) {
		error(e);
	}
	loader.hide();
}

function saveCharacter(show) {
	
	progress.show();
    
	se = false;
	
	try {
		s();
		if (sessionStorage.getItem("::saved") !== "false") {
			dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::saved")).set(characterObj).then(() => {
				progress.hide();
				if (show) {
					note.open("Saved", 1000);
				}
			});
		} else {
			promptName();
		}
	} catch(e) {
		error(e);
	}
}

function addSpellToList(spell) {
	function prop(text) {
		return "<div class='property'><p>" + text + "</p></div>"
	}
	
	var properties = "";
	if (spell.level !== '') {
		if (spell.level === "0") {
			properties += prop("cantrip");
		} else {
			properties += prop("Level " + spell.level);
		}
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

	$(".spellList").prepend("<div class='spell centerHorizontal rounded s2'><div class='title'><h1>" + spell.name + "</h1></div><div class='properties'>" + properties + "</div><div class='description'><p>" + spell.description + "</p></div></div>");
}

function loadCharacter(i) {
	try {
		if (i) {
			
			loader.show();
			
			dbUsers.child(sUid).child("characters").once("value",function(e){
				var dbContent = e.val();
				if (e.hasChild(i)) {
					var c = dbContent[i];
					l(c);
					sessionStorage.setItem("::saved",i);
					dbUsers.child(sUid).child("characters").child(i + "-info").once("value", function(e) {
						var content = e.val();
						if (!e.hasChild("allowEdit")) {
							dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::saved") + "-info").child("allowEdit").set("0");
						} else {
							dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::saved") + "-info").once("value", function(e) {
								var options = e.val();
								$(".allowEdit").val(options.allowEdit);
							});
						}
						
						if (e.hasChild("dupe")) {
							$(".characterId").text(sessionStorage.getItem("::openCharacter") + " (dupe " + content.dupe + ")");
						} else {
							$(".characterId").text(sessionStorage.getItem("::openCharacter"));
						}
						
						if (e.hasChild("spells")) {
							var spellArray = Object.values(content.spells);
							console.log(spellArray);
							for(var i = 0; i < spellArray.length; ++i) {
								var spellObj = spellArray[i];
								addSpellToList(spellObj);
							}
						}
					});
					loader.hide();
				} else {
					loader.hide();
					note.open("Couldn't find this character in your account", 3000);
				}
			});

			loader.hide();
		}
	} catch(e) {
		error(e);
	}
}

function del() {
	dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::saved") + "-info").once("value", function(e) {
		if (!e.hasChild("usedInCampaigns")) {
			if (confirm("Are you sure you want to delete this character sheet?")) {
				var characterId = sessionStorage.getItem("::openCharacter");
				dbUsers.child(sUid).child("characterList").once("value", function(e) {
					var list = e.val();
					var newList = [];
					for (var i = 0; i < list.length; ++i) {
						if (list[i] !== characterId) {
							newList.push(list[i]);
						}
					}
					dbUsers.child(sUid).child("characterList").set(newList);
				}).then(function() {
					dbUsers.child(sUid).child("characters").child(characterId).set(null);
					dbUsers.child(sUid).child("characters").child(characterId + "-info").set(null);
					openPage('characterList');
				});
			}
		} else {
			alert("You can't delete this character because it's in use in a campaign");
		}
	})
}

function dupe() {
	if (confirm("Are you sure you want to duplicate this character?")) {
		var characterId = sessionStorage.getItem("::saved");
		var newCharacterId = "character-" + randomString(characters, 4) + "-" + randomString(characters, 4) + "-" + randomString(characters, 4) + "-" + randomString(characters, 4);

		dbUsers.child(sUid).child("characters").child(characterId).once("value", function(e) {
			characterObj = e.val();
		}).then(function() {
			dbUsers.child(sUid).child("characters").child(characterId + "-info").once("value", function(e) {
				storedInfo = e.val();
				characterInfo = storedInfo;
				if (storedInfo.dupe === undefined) {
					characterInfo.dupe = 1;
				} else {
					characterInfo.dupe = storedInfo.dupe + 1;
				}
				characterInfo.usedInCampaigns = null;
			}).then(function() {
				dbUsers.child(sUid).child("characterList").once("value", function(e) {
					var characterList = e.val();
					characterList.unshift(newCharacterId);
					dbUsers.child(sUid).child("characterList").set(characterList);
				}).then(function() {
					dbUsers.child(sUid).child("characters").child(newCharacterId).set(characterObj);
					dbUsers.child(sUid).child("characters").child(newCharacterId + "-info").set(characterInfo).then(function() {
						sessionStorage.setItem("::openCharacter", newCharacterId);
						onload();
					});	
				});;
			})
		});
	}
}

function addSpell() {
	var spellId = genId();
	var spellObj = {
		name: $("#spellName").val(),
		verbal: $(".verbal").hasClass("selected"),
		somatic: $(".somatic").hasClass("selected"),
		material: $("#materialComponent").val(),
		range: $("#range").val(),
		castingTime: $("#castingTime").val(),
		duration: $("#duration").val(),
		description: $("#description").val(),
		level: $("#level").val(),
		concentration: $(".concentration").hasClass("selected"),
		ritual: $(".ritual").hasClass("selected"),
		id: spellId
	};
	dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::openCharacter") + "-info").child("spells").child(spellId).set(spellObj);
	
	addSpellToList(spellObj);
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

function onload() {	
	loadCharacter(sessionStorage.getItem("::openCharacter"));
	
//	for (var i = 0; i < inputs.length; ++i) {
//		var selector = "#" + inputs[i];
//		var modSelector = "#" + mods[inputs[i]];
//		calcMod(selector, modSelector);
//	}
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
	var allowEdit = $(".allowEdit").val();
	dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::saved") + "-info").child("allowEdit").set(allowEdit);
}
