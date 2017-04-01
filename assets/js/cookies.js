function cookiesAccept(yes) {
	if (yes === "true") {
		localStorage.setItem("cookies", "true");
		location.href="index.html";
		console.log("accepting cookies");
	} else {
		localStorage.setItem("cookies", "false");
		location.href="index.html";
		console.log("disaccepting cookies");
	}
}