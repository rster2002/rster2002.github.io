for (var i = 0; i < races.length; ++i) {
	$("#raceSelector").append("<option>" + races[i] + "</option>")
}

for (var i = 0; i < classes.length; ++i) {
	$("#classSelector").append("<option>" + classes[i] + "</option>")
}

for (var i = 0; i < backgrounds.length; ++i) {
	$("#backgroundSelector").append("<option>" + backgrounds[i] + "</option>")
}

$("#raceSelector").change(function () {
	var e = document.getElementById("raceSelector");
	raceSelect = e.options[e.selectedIndex].text;
});

$("#sex").change(function () {
	var e = document.getElementById("sex");
	sex = e.options[e.selectedIndex].text;
});

$("#alignment").change(function () {
	var e = document.getElementById("alignment");
	alignment = e.options[e.selectedIndex].text;
});

$("#backgroundSelector").change(function () {
	var e = document.getElementById("backgroundSelector");
	selectedBackground = e.options[e.selectedIndex].text;
});

function updateCharacterInfo() {
	// get inputs
	var e = document.getElementById("sex");
	sex = e.options[e.selectedIndex].text;
	
	var e = document.getElementById("alignment");
	alignment = e.options[e.selectedIndex].text;
	
	var e = document.getElementById("raceSelector");
	raceSelect = e.options[e.selectedIndex].text;
	
	var e = document.getElementById("backgroundSelector");
	selectedBackground = e.options[e.selectedIndex].text;
	
	var e = document.getElementById("classSelector");
	selectedClass = e.options[e.selectedIndex].text;
	
	var proficiencies = []
	var raceSelected = raceSelect.replace("-","");
	var raceSelected = raceSelected.replace("-","");
	var raceOptions = racesStats[raceSelected];
	console.log(raceOptions);
	characterObj = {};
	
	//set misk info
	characterObj.name = $("#cName").val();
	characterObj.languages = raceOptions.language;
	characterObj.speed = raceOptions.speed;
	characterObj.size = raceOptions.size;
	characterObj.race = raceSelect;
	characterObj.sex = sex;
	characterObj.alignment = alignment;
	characterObj.level = 1;
	
	// set modifiers
	var modi = {};
	var raceModifiers = raceOptions.modifiers;
	modi.strength = Number($("#iStrength").val()) + raceModifiers.strength;
	modi.dexterity = Number($("#iDexterity").val()) + raceModifiers.dexterity;
	modi.constitution = Number($("#iConstitution").val()) + raceModifiers.constitution;
	modi.intelligence = Number($("#iIntelligence").val()) + raceModifiers.intelligence;
	modi.wisdom = Number($("#iWisdom").val()) + raceModifiers.wisdom;
	modi.charisma = Number($("#iCharisma").val()) + raceModifiers.charisma;
	characterObj.modifiers = modi;
	
	// saving throws
	var savingThrows = {};
	savingThrows.strength = characterObj.modifiers.strength;
	savingThrows.dexterity = characterObj.modifiers.dexterity;
	savingThrows.constitution = characterObj.modifiers.constitution;
	savingThrows.intelligence = characterObj.modifiers.intelligence;
	savingThrows.wisdom = characterObj.modifiers.wisdom;
	savingThrows.charisma = characterObj.modifiers.charisma;
	characterObj.savingThrows = savingThrows;
	console.log(characterObj);
	
	var hitPoints = 8 + cal((characterObj.modifiers.constitution-10)/2);
	characterObj.hitpoints = hitPoints;
	var hclass = classesStats[selectedClass];
	characterObj.hitDice = hclass.hitDie;
	
	console.log(hclass);
	var armorClass = 0;
	if (hclass.armor === "") {
		armorClass += 10;
	} else {
		var a = hclass.armor;
		var a = a.replace(" ","");
		armorClass += armorList[a];
	}
	characterObj.armorClass = armorClass;
	console.log(armorClass);
	
//	var armor = hclass.armor;
//	var armorClass = 0;
//	console.log(armorList);
//	console.log(armor);
//	for (var i = 0; i < armorList.length; ++i) {
//		
//	}
//	characterObj.armorClass = armorClass;
	
	// show progress
	$("#name").text("Name: " + characterObj.name);
	$("#race").text("Race: " + characterObj.race);
	$("#speed").text("Speed: " + characterObj.speed + "ft");
	$("#hitpoints").text("Hitpoints: " + characterObj.hitpoints);
	$("#hitdie").text("Hit Die: d" + characterObj.hitDice);
	$("#armorclass").text("Armor class: " + characterObj.armorClass);
	$("#language").remove();
	$(".language-outer").append("<div id='language'></div>")
	var array = characterObj.languages;
	for (var i = 0; i < array.length; ++i) {
		$("#language").append("<p>" + array[i] +"</p>")
	}
	$("#strength").text(characterObj.modifiers.strength + "        " + cal((characterObj.modifiers.strength-10)/2));
	$("#dexterity").text(characterObj.modifiers.dexterity + "        " + cal((characterObj.modifiers.dexterity-10)/2));
	$("#constitution").text(characterObj.modifiers.constitution + "        " + cal((characterObj.modifiers.constitution-10)/2));
	$("#intelligence").text(characterObj.modifiers.intelligence + "        " + cal((characterObj.modifiers.intelligence-10)/2));
	$("#wisdom").text(characterObj.modifiers.wisdom + "        " + cal((characterObj.modifiers.wisdom-10)/2));
	$("#charisma").text(characterObj.modifiers.charisma + "        " + cal((characterObj.modifiers.charisma-10)/2));
	
	$("#sStrength").text(cal((characterObj.savingThrows.strength-10)/2));
	$("#sDexterity").text(cal((characterObj.savingThrows.dexterity-10)/2));
	$("#sConstitution").text(cal((characterObj.savingThrows.constitution-10)/2));
	$("#sIntelligence").text(cal((characterObj.savingThrows.intelligence-10)/2));
	$("#sWisdom").text(cal((characterObj.savingThrows.wisdom-10)/2));
	$("#sCharisma").text(cal((characterObj.savingThrows.charisma-10)/2));
	
	proficiencies = {};
	savingThrows = characterObj.modifiers;
	for (var i = 0; i < skills.length; ++i) {
		var r = skillsAbility[i]
		var id = skills[i].replace(" ","_");
		var id = id.replace(" ","_");
		var n = cal((Number(savingThrows[r])-10)/2);
		
		var stepone = backgroundStats[selectedBackground];
		var selectedBackgroundArray = stepone.skillProficiencies;
		
		characterObj.gold = stepone.gold;

		for (var l = 0; l < selectedBackgroundArray.length; ++l) {
			if (skills[i] === selectedBackgroundArray[l]) {
				n = Number(n) + 2;
			}
		}
		
		var stepone = classesStats[selectedClass];
		var classArray = stepone.proficiencies;
		
		for (var k = 0; k < classArray.length; ++k) {
			if (skills[i] === classArray[l]) {
				n = Number(n) + 2;
			}
		}
		$("#" + id).text(n);
		proficiencies[id] = n;
	}
	characterObj.skills = proficiencies;
	
}

function done() {
	dbUsers.child(uid).child("Character").set(characterObj);
	openPage("mainPage");
}