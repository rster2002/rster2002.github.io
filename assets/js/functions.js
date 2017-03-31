if (localStorage.getItem("cookies")) {
	console.log("Cookie's accepted")
} else {
	location.href="cookie.html"
}
if (localStorage.getItem("cookies") === "true") {
	if (localStorage.getItem("settings-setup")) {
		console.log("Found settings setup")
	} else {
		localStorage.setItem("setting-red", "false");
		localStorage.setItem("setting-dowload", "true");
		localStorage.setItem("setting-private", "false");
		localStorage.setItem("settings-setup", true)
	}
}

function redirect(url, type, displayName) {
	if (localStorage.getItem("cookies") === "true") {
		if (localStorage.getItem("setting-red") === "false") {
			localStorage.setItem("red", url);
			localStorage.setItem("type", type);
			localStorage.setItem("displayName", displayName);
			location.href="external.html"
		} else {
			switch (type) {
				case 'url':
					url = "http://" + url;
					break;
					
				case 'file':
					url = url;
					break;
					
				case 'pdf':
					url = url;
					break;
			}
			location.href=url;
		}
	} else {
		location.href="error.html";
	}
}

function loadRed() {
	if (localStorage.getItem("red")) {
		if (localStorage.getItem("displayName")) {
			title = "We proberen je door te sturen naar " + localStorage.getItem("displayName") + ". Je bent tegengehouden omdat je dit zo hebt ingesteld in je instellingen. Ga naar thuis > instelingen om dit te veranderen.";
			document.getElementById("title").innerHTML = title;
		} else {
			location.href="error.html";
		}
	} else {
		location.href="error.html"
	}
}

function external() {
	url = localStorage.getItem("red");
	type = localStorage.getItem("type");
	switch (type) {
		case 'url':
			url = "http://" + localStorage.getItem("red");
			break;
		
		case 'file':
			url = url;
			break;
			
		case 'pdf':
			url = url;
			break;
	}
	localStorage.removeItem("red");
	location.href=urll;
}