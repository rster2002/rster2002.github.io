function register() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var passwordRe = document.getElementById("passwordRe").value;
	sessionStorage.setItem("username", username);
	if (password !== passwordRe) {
		document.getElementById("output").innerHTML = "password doesnt match"
	} else {
		document.getElementById("output").innerHTML = null;
		sessionStorage.setItem("password", encrypt(password));
		location.href="setupPay.html";
	}
}