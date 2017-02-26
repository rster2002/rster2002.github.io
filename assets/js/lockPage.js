function lockPage(type, toType) {
	if (type !== toType) {
		alert("Invalid login. Try logging in.")
		if (localStorage.getItem('sesion')) {
			var s = true;
		} else {
			var s = false;
		}
		console.log("error:lockpage:sesion?:" + s);
		location.href='loginPage.html';
	}
}