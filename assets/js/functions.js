// checking for browser
isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
isFirefox = typeof InstallTrigger !== 'undefined';
isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
isIE = /*@cc_on!@*/false || !!document.documentMode;
isEdge = !isIE && !!window.StyleMedia;
isChrome = !!window.chrome && !!window.chrome.webstore;
isBlink = (isChrome || isOpera) && !!window.CSS;
if (isIE === true) {
	console.log("found IE. running in minimal mode")
	if (localStorage.getItem("IE")) {
		console.log("found IE in storage")
	} else {
		if (localStorage.getItem("IE") === "false") {
			if (isIE) {
				if (confirm("Internet exploder is niet volledig ondersteund. Wilt je doorgaan?")) {
					localStorage.setItem("IE", "true");
				} else {
					localStorage.setItem("IE", "false");
					location.href="https://www.google.nl/";
				}
			}
		}
	}
}
if (isSafari === true) {
	console.log("running in Safari mode")
}

if (isEdge === true) {
	console.log("running in Edge mode")
}

function cookies(page) {
	console.log("lookup cookies")
	if (localStorage.getItem("cookies")) {
		console.log("found cookies")
		var cookies = localStorage.getItem("cookies")
		console.log("finding state of cookies")
		if (cookies === "true") {
			console.log("found cookies state as accepted")
		} else {
			console.log("found cookies state as disaccepted")
		}
	} else {
		console.log("lookup found nothing")
		localStorage.setItem("cookieStore", page);
		location.href="cookie.html"
	}
	console.log("checking state cookies for cookies")
	if (localStorage.getItem("cookies") === "true") {
		console.log("state for cookies is true")
		if (localStorage.getItem("settings-setup")) {
			console.log("found settings")
		} else {
			console.log("setting default settings")
			localStorage.setItem("setting-red", "false");
			localStorage.setItem("setting-dowload", "true");
			localStorage.setItem("setting-private", "false");
			localStorage.setItem("settings-setup", true)
		}
	}
}


function redirect(url, type, displayName) {
	console.log("check state of cookies");
	if (localStorage.getItem("cookies") === "true") {
		console.log("state of cookies is true");
		console.log("searching for settings for redirecting");
		if (localStorage.getItem("setting-red") === "false") {
			console.log("state is false")
			localStorage.setItem("red", url);
			localStorage.setItem("type", type);
			localStorage.setItem("displayName", displayName);
			console.log("defining type");
			switch (type) {
				case 'url':
					console.log("type is url");
					location.href="external.html"
					break;
					
				case 'download':
					console.log("type is download")
					location.href="download.html"
					break;
			}
		} else {
			console.log("state is true")
			console.log("defining type")
			switch (type) {
				case 'url':
					console.log("type is url")
					url = "http://" + url;
					break;
					
				case 'download':
					console.log("type is download")
					url = url;
					break;
			}
			location.href=url;
		}
	} else {
		console.log("state of cookies is false or invalid")
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
				head = "Externe site - " + localStorage.getItem("displayName");
				document.getElementById("head").innerHTML = head;
				title = "We proberen je door te sturen naar " + localStorage.getItem("displayName") + ". Je bent tegengehouden omdat je dit zo hebt ingesteld in je instellingen. Ga naar thuis > instelingen om dit te veranderen.";
				document.getElementById("title").innerHTML = title;
				break;
				
			case 'download':
				head = "download - " + localStorage.getItem("displayName");
				document.getElementById("head").innerHTML = head;
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

function encrypt(input) {
	if (input === null) {
		alert("Je moet iets invullen");
		location.href="index.html";
	}
	rawstr = '';
	for (var char of input) {
		rawstr += char.charCodeAt();
	}
	return rawstr;
}

function password(password) {
	if (localStorage.getItem("passwordCache")) {
		input = localStorage.getItem("passwordCache");
		if (input !== password) {
			input = encrypt(prompt("Type het wachtwoord in!"));
			if (input !== password) {
				alert("Dit wachtwoord is niet juist")
				location.href="index.html";
			} else {
				localStorage.setItem("passwordCache", input);
			}
		}
	} else {
		input = encrypt(prompt("Type het wachtwoord in!"));
		if (input !== password) {
			alert("Dit wachtwoord is niet juist")
			location.href="index.html";
		} else {
			localStorage.setItem("passwordCache", input);
		}
	}
}