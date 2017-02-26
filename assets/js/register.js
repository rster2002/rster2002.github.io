function register(username, password, repassword, type, bank) {
	if (localStorage.getItem(username)) {
		console.log("note:register:username-exists:username:" + username);
		alert("A account with that username already exist");
	} else {
		if (password !== repassword) {
			console.log("note:passwords-doesnt-match:username:" + username);
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
					console.log("action:register:username:" + username);
					location.href='mainPage.html'
				} else {
					console.log("note:register:bank:found-user-isnt-bank:bank:" + bank);
					alert("Found this user, but this user isnt a bank")
				}
			} else {
				console.log("note:register:bank:not-found:bank:" + bank);
				alert("Cant find this bank user");
			}
		}
	}
}