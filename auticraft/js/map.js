var h = document.body.clientHeight;
var w = document.body.clientWidth;
console.log("max x: " + w + " max z: " + h);
function showCoords(event) {
    var x = Math.round((event.pageX * 10.3626943005) - 7880);
    var rawy = String(Math.round((event.pageY * -0.936507937) - 9432 - 5372));
	console.log("x: " + event.pageX + " y: " + event.pageY);
	var n = rawy.includes("-");
	if (n === true) {
		y = rawy.replace("-", "");
	} else {
		y = "-" + rawy;
/*	}
	if (x < -4670 || String(y) > 4350) {
		x = ""
		y = ""
	}
	if (x > 5510) {
		x = ""
		y = ""
	}*/
    document.getElementById("coords").innerHTML = "x: " + x + " z: " + y;
}
document.onmousemove = showCoords;