function register(username, password, rePassword, type, bank) {
	if (localStorage.getItem(username)) {
		alert("This username is already taken")
	} else {
		if (password !== rePassword) {
			alert("passwords doesn't match");
		} else {
			switch (type) {
				case 'admin':
					localStorage.setItem(username, username);
					localStorage.setItem(username + '_password', password);
					localStorage.setItem(username + '_balance', 10000);
					localStorage.setItem(username + '_type', 'admin');
					localStorage.setItem('sesion', username);
				break;
					
				case 'bank':
					localStorage.setItem(username, username);
					localStorage.setItem(username + '_password', password);
					localStorage.setItem(username + '_balance', 1000000);
					localStorage.setItem(username + '_type', 'bank');
					localStorage.setItem('sesion', username);
				break;
					
				default: 
					localStorage.setItem(username, username);
					localStorage.setItem(username + '_password', password);
					localStorage.setItem(username + '_balance', 1000);
					localStorage.setItem(username + '_type', 'normal');
					localStorage.setItem('sesion', username);
				break;
			}
			location.href='setupDone.html';
		}
	}
}