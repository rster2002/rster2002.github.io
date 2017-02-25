if (localStorage.getItem('sesion')) {
	username = localStorage.getItem('sesion');
	balance = localStorage.getItem(username + '_balance');
	type = localStorage.getItem(username + '_balance');
	document.getElementById("adminButton").style.visibility = "hidden";;
	document.getElementById('bankButton').style.visibility = 'hidden';
	switch (type) {
		case 'admin':
			document.getElementById('adminButton').style.visibility = "visible";
			document.getElementById("bankButton").style.visibility = "hidden";
			break;
		
		case 'bank':
			document.getElementById('bankButton').style.visibility = "visible";
			document.getElementById('adminButton').style.visibility = "hidden";
			break;
			
		default: 
			break;
	}
	document.getElementById('info').innerHTML = 'Username: ' + username + ' Balance: ' + balance + ' Type: ' + type;
} else {
	alert("error when trying to load sesion. Try reloading the page or login.");
}