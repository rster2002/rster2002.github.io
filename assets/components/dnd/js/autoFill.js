async function getClass() {
	var temp = $("#form94_1").val();
	var classAndLevel = temp.toLowerCase();
	console.log(classAndLevel);
	characterInfo = {};
	if (classAndLevel.includes("barbarian")) {
		characterInfo.class = "barbarian";
	} else if (classAndLevel.includes("bard")) {
		characterInfo.class = "bard";
	} else if (classAndLevel.includes("cleric")) {
		characterInfo.class = "cleric";
	} else if (classAndLevel.includes("druid")) {
		characterInfo.class = "druid";
	} else if (classAndLevel.includes("fighter")) {
		characterInfo.class = "fighter"
	} else if (classAndLevel.includes("monk")) {
		characterInfo.class = "monk"
	} else if (classAndLevel.includes("paladin")) {
		characterInfo.class = "paladin"
	} else if (classAndLevel.includes("ranger")) {
		characterInfo.class = "ranger"
	} else if (classAndLevel.includes("rogue")) {
		characterInfo.class = "rogue"
	} else if (classAndLevel.includes("sorcerer")) {
		characterInfo.class = "sorcerer"
	} else if (classAndLevel.includes("warlock")) {
		characterInfo.class = "warlock"
	} else if (classAndLevel.includes("wizard")) {
		characterInfo.class = "wizard"
	}
	console.log(characterInfo);

	// classObj = await $.get("http://www.dnd5eapi.co/api/classes/" + characterInfo.class);
	return classObj;
}

async function getRace() {
	var temp = $("#form95_1").val();
	var race = temp.toLowerCase();
	raceObj = await $.get("http://www.dnd5eapi.co/api/races/" + raceNumbers[race]);
	return raceObj;
}

function afterChoice() {
	$("#form67_1").val("1d" + classObj.hit_die);
	$("#form89_1").val("1");
}

async function calculateMods(levelOne) {
	var temp = $("#form61_1").val();
	var profBonus = Number(temp.replace("+", ""));
	classObj = null;
	raceObj = null;
	// var classObj = await getClass();
	// var raceObj = await getRace();
	if (raceObj !== null) {
		$("#form87_1").val(raceObj.speed);
	}
	if (levelOne) {
		if (classObj !== null) {
			$("#form67_1").val("1d" + classObj.hit_die);
			$("#form89_1").val("1");
		}
	}

	for (var i = 0; i < 6; ++i) {
		var scoreModString = "";
		var score = scores[i];
		var scoreNumber = Number($("#" + abilityScores[score]).val());
		if ($("#" + abilityScores[score]).val() !== "") {
			var scoreMod = calcMod(scoreNumber);
			var scoreModString = scoreMod < 0 ? scoreMod : "+" + scoreMod;
			$("#" + abilityMods[score]).val(scoreModString);
			if (score === "DEX") {
				$("#form88_1").val(scoreModString);
			}
			if (levelOne) {
				if (classObj !== null) {
					if (score === "CON") {
						$("#form80_1").val(classObj.hit_die + scoreMod);
						$("#form97_1").val(classObj.hit_die + scoreMod);
					}
				}
			}
			if ($("input#" + savingProf[score]).is(":checked")) {
				savingMod = scoreMod + profBonus;
			} else {
				savingMod = scoreMod;
			}
			var savingThrowModString = savingMod < 0 ? savingMod : "+" + savingMod;
			$("#" + savingThrowsMod[score]).val(savingThrowModString);
			if (score !== "CON") {
				var skillsArray = abilitySkills[score];
				for (var o = 0; o < 18; ++o) {
					var skill = skillsArray[o]
					if ($("input#" + skillCheck[skill]).is(":checked")) {
						skillMod = scoreMod + profBonus;
					} else {
						skillMod = scoreMod;
					}
					if (skill === "perception") {
						$("#form63_1").val(10 + skillMod);
					}
					var skillModString = skillMod < 0 ? skillMod : "+" + skillMod;
					$("#" + skillInputs[skill]).val(skillModString);
				}
			}
		}
	}
}

function calcMod(score) {
	var scoresToMod = {
		1: -5,
		2: -4,
		3: -4,
		4: -3,
		5: -3,
		6: -2,
		7: -2,
		8: -1,
		9: -1,
		10: 0,
		11: 0,
		12: 1,
		13: 1,
		14: 2,
		15: 2,
		16: 3,
		17: 3,
		18: 4,
		19: 4,
		20: 5
	}
	return scoresToMod[score];
}
