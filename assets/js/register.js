function register(username, password, repassword, type, bank) {
	if (localStorage.getItem(username)) {
		alert("A account with that username already exist");
	} else {
		if (password !== repassword) {
			alert("Passwords doesnt match")
		} else {
			if (localStorage.getItem(bank)) {
				var bankType = localStorage.getItem(bank + '_type');
				if (bankType === 'bank') {
					localStorage.setItem(username, username);
					localStorage.setItem(username + '_password', password);
					localStorage.setItem(username + '_balance', 1000);
					localStorage.setItem(username + '_type', 'normal');
					localStorage.setItem('sesion', username);
					location.href='mainPage.html'
				} else {
					alert("Found this user, but this user isnt a bank")
				}
			} else {
				alert("Cant find this bank user");
			}
		}
	}
}