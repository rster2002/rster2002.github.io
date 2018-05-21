async function fetchConditions() {
	var temp = await $.get("http://www.dnd5eapi.co/api/conditions");
	var conditionArray = temp["results"];
	console.log(conditionArray);
	for (var i = 0; i < conditionArray.length; ++i) {
		var url = conditionArray[i]["url"];
		var conditionObj = await $.get(url);
		var rtrnDescription = "";
		var descriptionArray = conditionObj.desc;
		for (var o = 0; o < descriptionArray.length; ++o) {
			rtrnDescription += descriptionArray[o] + "\n";
		}
		$(".conditions").append("<div class='condition'><h1>" + conditionObj.name + "</h1><p class='textBlock'>" + rtrnDescription + "</p></div>");
	}
}

fetchConditions();
