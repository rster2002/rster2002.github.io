function register() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var passwordRe = document.getElementById("passwordRe").value;
	if(loadData("ext_username") === username) {
		document.getElementById("output").innerHTML = "There is already a user with this username";
	} else {
		if(password !== passwordRe) {
			document.getElementById("output").innerHTML = "Passwords doesnt match";
		} else {
			storeData("ext_username", username);
			
		}
	}
}