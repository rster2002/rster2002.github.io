console.log("races.js");

for (var i = 0; i < races.length; ++i) {
	var raceTarget = races[i]
	var race = racesStats[raceTarget];
	var raceName = raceTarget.replace(/_/g, " ");
	var raceLanguages = race.language;
	var languages = "";
	for (var l = 0; l < raceLanguages.length; ++l) {
		console.log(languages);
		languages += "<p>" + raceLanguages[l] + "</p>";
	}
	var modifiers = race.modifiers;
	$(".cardList").append("<div class='card rounded s4'><h1 id='name'>" + raceName + "</h1><div class='misc'><h1>Size: " + race.size + "</h1><h1>Speed: " + race.speed + "</h1></div><div class='modifiers'><div class='colom1'><h1>Str: " + modifiers.strength + "</h1><h1>Dex: " + modifiers.dexterity + "</h1><h1>Con: " + modifiers.constitution + "</h1></div><div class='colom2'><h1>Int: " + modifiers.intelligence + "</h1><h1>Wis: " + modifiers.wisdom + "</h1><h1>Cha: " + modifiers.charisma + "</h1></div></div><div class='languages'><h1>Languages</h1>" + languages + "</div></div>");
}
