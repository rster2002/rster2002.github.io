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
			switch (type) {
				case 'url':
					location.href="external.html"
					break;
					
				case 'download':
					location.href="download.html"
			}
		} else {
			switch (type) {
				case 'url':
					url = "http://" + url;
					break;
					
				case 'download':
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
	if(localStorage.getItem("red") || localStorage.getItem("type") || localStorage.getItem("displayName")) {
		url = localStorage.getItem("red");
		type = localStorage.getItem("type");
		displayName = localStorage.getItem("displayName");
		switch (type) {
			case 'url':
				title = "We proberen je door te sturen naar " + localStorage.getItem("displayName") + ". Je bent tegengehouden omdat je dit zo hebt ingesteld in je instellingen. Ga naar thuis > instelingen om dit te veranderen.";
				document.getElementById("title").innerHTML = title;
				break;
				
			case 'download':
				title = "We proberen het bestand: " + displayName + " te sturen naar je apparaat. Je hebt je instellingen zo staan dat je dit scherm te zien krijgt voordat het bestand word gestuurd. Ga naar thuis > instellingen om dit uit te zetten"
				document.getElementById("title").innerHTML = title;
				break;
		}
	} else {
		location.href="error.html"
	}
}

function external() {
	if(localStorage.getItem("red") || localStorage.getItem("type") || localStorage.getItem("displayName")) {
		url = localStorage.getItem("red");
		type = localStorage.getItem("type");
		switch (type) {
			case 'url':
				url = "http://" + localStorage.getItem("red");
				break;

			case 'download':
				console.log("type is download")
				url = url;
				break;

			case 'pdf':
				url = url;
				break;
	}
	}
	localStorage.removeItem("red");
	localStorage.removeItem("type");
	localStorage.removeItem("displayName");
	location.href=url;
}