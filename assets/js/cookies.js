function cookiesAccept(yes) {
	page = localStorage.getItem("cookieStore");
	if (page.includes(".html") !== true) {
		page = page + ".html"
	}
	if (yes === "true") {
		localStorage.setItem("cookies", "true");
		location.href=page;
		console.log("accepting cookies");
	} else {
		localStorage.setItem("cookies", "false");
		location.href=page;
		console.log("disaccepting cookies");
	}
}