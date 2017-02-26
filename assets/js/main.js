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
		}
	}
}

function login(username, password) {
	if (localStorage.getItem(username)) {
		var storedPassword = localStorage.getItem(username + '_password');
		if (password === storedPassword) {
			localStorage.setItem('sesion', username);
			console.log("action:login:username:" + username);
			location.href='mainPage.html';
		} else {
			console.log("note:login:wrong-password");
			alert("Wrong password");
		}
	} else {
		console.log("note:login:cant-find-user:username:" + username);
		alert("Cant find this user! Did you register?");
	}
}

function lockTo(userType, type) {
	if (userType !== type) {
		alert("You dont have premision to view this page!");
		location.href='loginPage.html';
	}
}

function logout() {
	localStorage.removeItem('sesion');
	location.href='loginPage.html';
	console.log("action:logout:username" + username);
}