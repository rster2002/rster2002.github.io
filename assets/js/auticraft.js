shopHeight = 200

function defineUser(username) {
	var element = document.createElement("div");
	element.id = username;
	element.width = "984px";
	document.getElementById("shops").appendChild(element);
	var element = null
	var element = document.createElement("h2");
	var content = document.createTextNode(username);
	element.appendChild(content);
	document.getElementById(username).appendChild(element); 
	shopHeight += 80
	document.getElementById("shops").style = shopHeight + 'px';
}
 
function defineShop(username, shopName, coords) {
	var element = document.createElement("div");
	element.id = username + "_" + shopName;
	element.width = "984px";
	document.getElementById(username).appendChild(element);
	
	var element = document.createElement("h3");
	var content = document.createTextNode(shopName);
	element.appendChild(content);
	document.getElementById(username + "_" + shopName).appendChild(element);
	shopHeight += 70
	document.getElementById("shops").style = shopHeight + 'px';
	
	var element = document.createElement("h4");
	var content = document.createTextNode("Coords: " + coords);
	element.appendChild(content);
	document.getElementById(username + "_" + shopName).appendChild(element);
	shopHeight += 60
	document.getElementById("shops").style = shopHeight + 'px';
	
	var element = document.createElement("ul");
	element.id = username + "_" + shopName + "_items";
	var content = document.createTextNode("goederen");
	element.appendChild(content);
	document.getElementById(username + "_" + shopName).appendChild(element);
	shopHeight += 20
	document.getElementById("shops").style = shopHeight + 'px';
}

function defineItem(username, shopName, itemName, getNumber, payNumber, per) {
	var element = document.createElement("li");
	if (per === null || per === false) {
		var content = document.createTextNode(getNumber + " " + itemName + " " + payNumber + " dia");
	} else {
		var content = document.createTextNode(getNumber + " " + itemName + " " + payNumber + " dia " + per);
	}
	element.appendChild(content);
	document.getElementById(username + "_" + shopName + "_items").appendChild(element);
	shopHeight += 20
	document.getElementById("shops").style = shopHeight + 'px';
}