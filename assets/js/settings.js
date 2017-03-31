function settingToggle(setting) {
	switch (setting) {
		case 'redirect':
			if (localStorage.getItem("setting-red") === "true") {
				localStorage.setItem("setting-red", "false")
				document.getElementById("set-redirect").innerHTML = "Zet aan";
			} else {
				localStorage.setItem("setting-red", "true")
				document.getElementById("set-redirect").innerHTML = "Zet uit";
			}
			break;
		
		case 'download':
			if (localStorage.getItem("setting-download") === "true") {
				localStorage.setItem("setting-download", "false");
				document.getElementById("set-download").innerHTML = "Zet aan";
			} else {
				localStorage.setItem("setting-download", "true");
				document.getElementById("set-download").innerHTML = "Zet uit";
			}
			break;
			
		case 'delete':
			if (confirm("Weet je zeker dat je je gegevens wilt verwijderen?")) {
				localStorage.clear();
				location.href="index.html"
			}
			break;
	}
}