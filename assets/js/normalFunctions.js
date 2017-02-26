function payUser(user, toUser, amount) {
	var amount = Number(amount);
	if (balance < amount) {
		console.log("note:transaction:not-enough:username:" + username + ":toUser:" + toUser);
		alert("You dont have enough money to do this.");
	} else {
		if (amount <= 0) {
			console.log("note:transaction:amount-must-be-higher-than-0:username:" + username + ":toUser:" + toUser;
			alert("Amount must be higher than 0.")
		} else {
			if (localStorage.getItem(toUser)) {
				var toBalance = localStorage.getItem(toUser + '_balance');
				balance = balance - amount;
				var toBalance = toBalance + Number(amount);
				localStorage.setItem(user + '_balance', balance);
				localStorage.setItem(toUser + '_balance', toBalance);
				document.getElementById('info').innerHTML = 'Username: ' + user + ' balance: ' + balance + ' type: ' + type;
			} else {
				console.log("note:transaction:cant-find-toUser:username:" + username + ":toUser:" + toUser);
				alert("Cant find this user.")
			}
		}
	}
}