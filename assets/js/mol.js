function player(number, name, inGame) {
	localStorage.setItem("player" + number + "name", name);
	localStorage.setItem("player" + number + "inGame", inGame);
}
	
pot = 9050;
player(1, "Luuk_T", "true");

document.getElementById("pot").innerHTML = "€" + pot + ",-"
document.getElementById("player1name").innerHTML = localStorage.getItem("player1name");
if (localStorage.getItem("player1inGame") !== "true") {
	document.getElementById("player1name").style.color = "red";
}