if (localStorage.getItem("cookies")) {
	console.log("Cookie's accepted")
} else {
	location.href="cookie.html"
}

if (localStorage.getItem("settings-setup")) {
	console.log("Found settings setup")
} else {
	localStorage.setItem("setting-red", "false");
	localStorage.setItem("setting-dowload", "true");
	localStorage.setItem("setting-private", "false");
	localStorage.setItem("settings-setup", true)
}

function rederect(url) {
	if (localStorage.getItem("setting-red") === "false") {
		localStorage.setItem("red", url);
		location.href="external.html"
	} else {
		var url = "http://" + url;
		location.href=url;
	}
}

function loadRed() {
	url = "We proberen je door te sturen naar " + localStorage.getItem("red") + ". Je bent tegengehouden omdat je dit zo hebt ingesteld in je instellingen. Ga naar thuis > instelingen om dit te veranderen.";
	document.getElementById("title").innerHTML = url;
}

function external() {
	url = "http://" + localStorage.getItem("red");
	localStorage.removeItem("red");
	location.href=url;
}