function registerBank(user, password, repassword) {
	if (localStorage.getItem(user)) {
		alert("A account with this username already exists");
	} else {
		if (password !== repassword) {
			alert("Passwords doesnt match");
		} else {
			localStorage.setItem(user, user);
			localStorage.setItem(user + '_password', password);
			localStorage.setItem(user + '_balance', 1000000);
			localStorage.setItem(user + '_type', 'bank');
			alert("Bank register compleet")
		}
	}
}