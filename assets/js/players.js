function player(name, state) {
	var element = document.createElement("div");
	element.setAttribute("id", name);
	document.getElementById("players").appendChild(element);
	
	var element = document.createElement("h1");
	element.innerHTML = name;
	if (state === "out") {
		element.setAttribute("style","color:red");
	}
	document.getElementById(name).appendChild(element);
	
	var element = document.createElement("img");
	if (state === "in") {
		element.setAttribute("src", "assets/images/mol/" + name + ".png");
	} else {
		element.setAttribute("src", "assets/images/mol/" + name + "_out.png");
	}
	document.getElementById(name).appendChild(element);
}