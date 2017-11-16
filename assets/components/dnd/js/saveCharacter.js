sessionStorage.setItem("::saved","false");
console.log("hmm");
function saveCharacter() {
	s();
	console.log(characterObj);
	if (sessionStorage.getItem("::saved") !== "false") {
		dbUsers.child(uid).child("characters").child(sessionStorage.getItem("::saved")).set(characterObj);
	} else {
		var i = prompt("Type a name for this caracter sheet");
		if (i) {
			sessionStorage.setItem("::saved",i);
			dbUsers.child(uid).child("characters").child(i).set(characterObj);
		}
	}
}

function saveAsCharacter() {
	s();
	var i = prompt("Type a name for this caracter sheet");
	if (i) {
		sessionStorage.setItem("::saved",i);
		dbUsers.child(uid).child("characters").child(i).set(characterObj);
	}
}

function loadCharacter() {
	var i = prompt("Type the name of the caracter sheet you want to load");
	if (i) {
		dbUsers.child(uid).child("characters").once("value",function(e){
			var dbContent = e.val();
			if (e.hasChild(i)) {
				var c = dbContent[i];
				l(c);
			} else {
				alert("Couldn't find this character in your account");
			}
		});
	}
}

function s() {
	characterObj = {};
	characterObj.name = $("#form96_1").val();
	characterObj.characterClass = $("#form94_1").val();
	characterObj.background = $("#form90_1").val();
	characterObj.playerName = $("#form93_1").val();
	characterObj.race = $("#form95_1").val();
	characterObj.alignment = $("#form92_1").val();
	characterObj.xp = $("#form91_1").val();
	characterObj.inspiration = $("#form62_1").val();
	characterObj.proficiencieBonus = $("#form61_1").val();
	var abilities = {};
	abilities.strength = $("#form83_1").val();
	abilities.strengthModifier = $("#form56_1").val();
	abilities.dexterity = $("#form84_1").val();
	abilities.dexterityModifier = $("#form59_1").val();
	abilities.constitution = $("#form82_1").val();
	abilities.constitutionModifier = $("#form58_1").val();
	abilities.intelligence = $("#form86_1").val();
	abilities.intelligenceModifier = $("#form57_1").val();
	abilities.wisdom = $("#form81_1").val();
	abilities.wisdomModifier = $("#form60_1").val();
	abilities.charisma = $("#form85_1").val();
	abilities.charismaModifier = $("#form55_1").val();
	
	characterObj.abilities = abilities;
	
	characterObj.inspiration = $("#form62_1").val();
	var savingThrows = {};
	savingThrows.strength = $("#form42_1").val();
	savingThrows.strengthProficient = $("input#form15_1").is(":checked");
	savingThrows.dexterity = $("#form54_1").val();
	savingThrows.dexterityProficient = $("input#form18_1").is(":checked");
	savingThrows.constitution = $("#form41_1").val();
	savingThrows.constitutionProficient = $("input#form22_1").is(":checked");
	savingThrows.intelligence = $("#form52_1").val();
	savingThrows.intelligenceProficient = $("input#form6_1").is(":checked");
	savingThrows.wisdom = $("#form39_1").val();
	savingThrows.wisdomProficient = $("input#form10_1").is(":checked");
	savingThrows.charisma = $("#form51_1").val();
	savingThrows.charismaProficient = $("input#form3_1").is(":checked");
	
	characterObj.savingThrows = savingThrows;
	
	var skills = {};
	skills.actrobatics = $("#form38_1").val();
	skills.actrobaticsProficient = $("input#form19_1").is(":checked");
	skills.animalHandling = $("#form50_1").val();
	skills.animalHandlingProficient = $("input#form8_1").is(":checked");
	skills.arcana = $("#form40_1").val();
	skills.arcanaProficient = $("input#form21_1").is(":checked");
	skills.athletics = $("#form49_1").val();
	skills.athleticsProficient = $("input#form2_1").is(":checked");
	skills.deception = $("#form36_1").val();
	skills.deceptionProficient = $("input#form17_1").is(":checked");
	skills.history = $("#form48_1").val();
	skills.historyProficient = $("input#form9_1").is(":checked");
	skills.insight = $("#form35_1").val();
	skills.insightProficient = $("input#form13_1").is(":checked");
	skills.intimidation = $("#form44_1").val();
	skills.intimidationProficient = $("input#form24_1").is(":checked");
	skills.investigation = $("#form31_1").val();
	skills.investigationProficient = $("input#form14_1").is(":checked");
	skills.medicine = $("#form53_1").val();
	skills.medicineProficient = $("input#form5_1").is(":checked");
	skills.nature = $("#form37_1").val();
	skills.natureProficient = $("input#form11_1").is(":checked");
	skills.perception = $("#form43_1").val();
	skills.perceptionProficient = $("input#form7_1").is(":checked");
	skills.performance = $("#form34_1").val();
	skills.performanceProficient = $("input#form16_1").is(":checked");
	skills.persuation = $("#form45_1").val();
	skills.persuationProficient = $("input#form1_1").is(":checked");
	skills.religion = $("#form33_1").val();
	skills.religionProficient = $("input#form20_1").is(":checked");
	skills.slieghtOfHand = $("#form46_1").val();
	skills.slieghtOfHandProficient = $("input#form4_1").is(":checked");
	skills.stealth = $("#form32_1").val();
	skills.stealthProficient = $("input#form23_1").is(":checked");
	skills.survival = $("#form47_1").val();
	skills.survivalProficient = $("input#form12_1").is(":checked");
	characterObj.skills = skills;
	
	characterObj.armorClass = $("#form73_1").val();
	characterObj.initiative = $("#form88_1").val();
	characterObj.speed = $("#form87_1").val();
	
	characterObj.hitPointMaximum = $("#form80_1").val();	
	characterObj.currentHitpoints = $("#form97_1").val();
	characterObj.temporaryHitpoints = $("#form98_1").val();
	characterObj.hitDiceTotal = $("#form67_1").val();
	characterObj.hitDice = $("#form89_1").val();
	
	var deathSaves = {};
	deathSaves.success1 = $("input#form30_1").is(":checked");
	deathSaves.success2 = $("input#form29_1").is(":checked");
	deathSaves.success3 = $("intput#form28_1").is(":checked");
	deathSaves.fail1 = $("input#form27_1").is(":checked");
	deathSaves.fail2 = $("input#form26_1").is(":checked");
	deathSaves.fail3 = $("input#form25_1").is(":checked");
	characterObj.deathSaves = deathSaves;
	
	characterObj.passiveWisdom = $("#form63_1").val();
	characterObj.proficiencies = $("#form105_1").val();
	
	characterObj.cp = $("#form71_1").val();
	characterObj.sp = $("#form72_1").val();
	characterObj.ep = $("#form70_1").val();
	characterObj.gp = $("#form68_1").val();
	characterObj.pp = $("#form69_1").val();
	
	characterObj.equipment = $("#form104_1").val();
	
	var weapon1 = {};
	weapon1.name = $("#form79_1").val();
	weapon1.attackBonus = $("#form64_1").val();
	weapon1.damage = $("#form76_1").val();
	
	var weapon2 = {};
	weapon2.name = $("#form78_1").val();
	weapon2.attackBonus = $("#form65_1").val();
	weapon2.damage = $("#form74_1").val();
	
	var weapon3 = {};
	weapon3.name = $("#form77_1").val();
	weapon3.attackBonus = $("#form66_1").val();
	weapon3.damage = $("#form75_1").val();
	
	var otherAttacks = $("#form103_1").val();
	
	characterObj.weapon1 = weapon1;
	characterObj.weapon2 = weapon2;
	characterObj.weapon3 = weapon3;
	characterObj.otherAttacks = otherAttacks;
}

function check(id, state) {
	if (state) {
		$("input#" + id).prop("checked");
		$("img#" + id).attr("src","1/form/3011 0 ROn.png");
	}
}

function l(characterObj) {
	$("#form96_1").val(characterObj.name);
	$("#form94_1").val(characterObj.characterClass);
	$("#form90_1").val(characterObj.background);
	$("#form93_1").val(characterObj.playerName);
	$("#form95_1").val(characterObj.race);
	$("#form92_1").val(characterObj.alignment);
	$("#form91_1").val(characterObj.xp);
	$("#form62_1").val(characterObj.inspiration);
	$("#form61_1").val(characterObj.proficiencieBonus);
	$("#form83_1").val(characterObj.abilities.strength);
	$("#form56_1").val(characterObj.abilities.strengthModifier);
	$("#form84_1").val(characterObj.abilities.dexterity);
	$("#form59_1").val(characterObj.abilities.dexterityModifier);
	$("#form82_1").val(characterObj.abilities.constitution);
	$("#form58_1").val(characterObj.abilities.constitutionModifier);
	$("#form86_1").val(characterObj.intelligence);
	$("#form57_1").val(characterObj.abilities.intelligenceModifier);
	$("#form81_1").val(characterObj.abilities.wisdom);
	$("#form60_1").val(characterObj.abilities.wisdomModifier);
	$("#form85_1").val(characterObj.abilities.charisma);
	$("#form55_1").val(characterObj.charismaModifier);
	
	$("#form62_1").val(characterObj.inspiration);
	$("#form42_1").val(characterObj.savingThrows.strength);
	check("form15_1",characterObj.savingThrows.strengthProficient);
	$("#form54_1").val(characterObj.savingThrows.dexterity);
	check("form18_1",characterObj.savingThrows.dexterityProficient);
	$("#form41_1").val(characterObj.savingThrows.constitution);
	check("form22_1",characterObj.savingThrows.constitutionProficient);
	$("#form52_1").val(characterObj.savingThrows.intelligence);
	check("form6_1",characterObj.savingThrows.intelligenceProficient);
	$("#form39_1").val(characterObj.savingThrows.wisdom);
	check("form10_1",characterObj.savingThrows.wisdomProficient);
	$("#form51_1").val(characterObj.savingThrows.charisma);;
	check("form3_1",characterObj.savingThrows.charismaModifier);
	
	$("#form38_1").val(characterObj.skills.actrobatics);
	check("form19_1",characterObj.skills.actrobaticsProficient);
	$("#form50_1").val(characterObj.skills.animalHandling);
	check("form8_1",characterObj.skills.animalHandlingProficient);
	$("#form40_1").val(characterObj.skills.arcana);
	check("form21_1",characterObj.skills.arcanaProficient)
	$("#form49_1").val(characterObj.skills.athletics);
	check("form2_1",characterObj.skills.athleticsProficient)
	$("#form36_1").val(characterObj.skills.deception);
	check("form17_1",characterObj.skills.deceptionProficient);
	$("#form48_1").val(characterObj.skills.history);
	check("form9_1",characterObj.skills.historyProficient)
	$("#form35_1").val(characterObj.skills.insight);
	check("form13_1",characterObj.skills.insightProficient)
	$("#form44_1").val(characterObj.skills.intimidation);
	check("form24_1",characterObj.skills.intimidationProficient)
	$("#form31_1").val(characterObj.skills.investigation);
	check("form14_1",characterObj.skills.investigationProficient)
	$("#form53_1").val(characterObj.skills.medicine);
	check("form5_1",characterObj.skills.medicineProficient)
	$("#form37_1").val(characterObj.skills.nature);
	check("form11_1",characterObj.skills.natureProficient)
	$("#form43_1").val(characterObj.skills.perception);
	check("form7_1",characterObj.skills.perceptionProficient)
	$("#form34_1").val(characterObj.skills.performance);
	check("form16_1",characterObj.skills.performanceProficient)
	$("#form45_1").val(characterObj.skills.persuation);
	check("form1_1",characterObj.skills.persuationProficient)
	$("#form33_1").val(characterObj.skills.religion);
	check("form20_1",characterObj.skills.religionProficient);
	$("#form46_1").val(characterObj.skills.slieghtOfHand);
	check("form4_1",characterObj.skills.slieghtOfHandProficient)
	$("#form32_1").val(characterObj.skills.stealth);
	check("form23_1",characterObj.skills.stealthProficient)
	$("#form47_1").val(characterObj.skills.survival);
	check("form12_1",characterObj.skills.survivalProficient)
	
	$("#form73_1").val(characterObj.armorClass);
	$("#form88_1").val(characterObj.initiative);
	$("#form87_1").val(characterObj.speed);
	
	$("#form80_1").val(characterObj.hitPointMaximum);	
	$("#form97_1").val(characterObj.currentHitpoints);
	$("#form98_1").val(characterObj.temporaryHitpoints);
	$("#form67_1").val(characterObj.hitDiceTotal);
	$("#form89_1").val(characterObj.hitDice);
	
	check("form30_1",characterObj.deathSaves.success1);
	check("form29_1",characterObj.deathSaves.success2);
	check("form28_1",characterObj.deathSaves.success3);
	check("form27_1",characterObj.deathSaves.fail1);
	check("form26_1",characterObj.deathSaves.fail2);
	check("form25_1",characterObj.deathSaves.fail3);
	
	$("#form63_1").val(characterObj.passiveWisdom);
	$("#form105_1").val(characterObj.proficiencies);
	
	$("#form71_1").val(characterObj.cp);
	$("#form72_1").val(characterObj.sp);
	$("#form70_1").val(characterObj.ep);
	$("#form68_1").val(characterObj.gp);
	$("#form69_1").val(characterObj.pp);
	
	$("#form104_1").val(characterObj.equipment);
	
	$("#form79_1").val(characterObj.weapon1.name);
	$("#form64_1").val(characterObj.weapon1.attackBonus);
	$("#form76_1").val(characterObj.weapon1.damage);
	
	$("#form78_1").val(characterObj.weapon2.name);
	$("#form65_1").val(characterObj.weapon2.attackBonus);
	$("#form74_1").val(characterObj.weapon2.damage);
	
	$("#form77_1").val(characterObj.weapon3.name);
	$("#form66_1").val(characterObj.weapon3.attackBonus);
	$("#form75_1").val(characterObj.weapon3.damage);
	
	$("#form103_1").val(characterObj.otherAttacks);
}