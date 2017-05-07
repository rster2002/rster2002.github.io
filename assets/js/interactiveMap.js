function readMouse(e) {
	x = document.clientX;
	y = document.clientY;
	console.log("X: " + x + " Y: " + y);
	var element = document.createElement("h1")
	var content = document.createTextNode("X: " + x + " Y: " + y);
	element.coords = String(x) + "," + String(y) + ",0";
	document.appendChild(element);
}
document.onmousemove = readMouse;