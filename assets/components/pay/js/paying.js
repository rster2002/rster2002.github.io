function payment(toId, amount) {
	dbUsers.child(uid).once("value",function(e){
		var dbContent = e.val();
		if (dbContent.paymentId === toId) {
			alert("You can't pay yourself!");
			return;
		}
		if (amount < 0) {
			alert("Amount is set to a number less than zero!");
			return;
		}
		dbPaymentId.child(toId).once("value",function(e){
			toId = e.val();
			dbUsers.child(toId).once("value",function(e){
				var toIdUser = e.val();
				try {
					$("#paymentAmount").text(amount + "c");
					$("#paymentUser").text(toIdUser.username);
					sessionStorage.setItem("::paymentAmount",amount);
					sessionStorage.setItem("::paymentUser",toId);
					openPopup("payment");
				} catch(e) {
					error(e);
				}
			});
		});
	});
}

function confirmPayment() {
	try {
		toUid = sessionStorage.getItem("::paymentUser");
		amount = Number(sessionStorage.getItem("::paymentAmount"));
	} catch(e) {
		error(e);
	}
	try {
		dbUsers.child(uid).once("value",function(e){
			var dbContentUser = e.val();
			dbUsers.child(toUid).once("value",function(e){
				var dbContentToUid = e.val();
				if (dbContentUser.value < amount) {
					alert("You don't have enough credits");
					return;
				}
				try {
					dbUsers.child(uid).child("value").set(dbContentUser.value - amount);
					dbUsers.child(toUid).child("value").set(dbContentToUid.value + amount);
				} catch(e) {
					error(e);
				}
				try {
					dbUsers.child(uid).once("value",function(e) {
						var dbContent = e.val();
						if(e.hasChild("history")) {
							r = dbContent.history;
						} else {
							r = [];
						}
						var historyObj = {};
						historyObj.user = dbContentToUid.username;
						historyObj.amount = amount;
						historyObj.type = "subtract";
						r.unshift(historyObj);
						dbUsers.child(uid).child("history").set(r);
					});
					
					dbUsers.child(toUid).once("value",function(e){
						var dbContent = e.val();
						if(e.hasChild("history")) {
							r = dbContent.history;
						} else {
							r = [];
						}
						var historyObj = {};
						historyObj.user = dbContentUser.username;
						historyObj.amount = amount;
						historyObj.type = "add";
						r.unshift(historyObj);
						dbUsers.child(toUid).child("history").set(r);
					})

				} catch (e) {
					error(e);
				}
			});
		});
	} catch(e) {
		error(e);
	}
	closePopup("payment");
}

// Get user information

function searchId() {
	var transId = document.getElementById("transId").value;
	var error = document.getElementById("errorTransact");
	if (transId === uid) {
		error.setAttribute("style","visibility: visible;color:rgb(160,0,0);");
		error.innerHTML = "You can't transact to yourself";
		return;
	}
	dbUsers.once("value", function(snapshot) {
		if (snapshot.hasChild(transId)) {
			error.setAttribute("style","visibility: visible;color:rgb(0,160,0);");
			dbUsers.child(transId).once("value",function(e){
				var dbContent = e.val();
				error.innerHTML = "Found user as " + dbContent.username;
				transUserPossible = true;
			})
		} else {
			error.setAttribute("style","visibility: visible;color:rgb(160,0,0);");
			error.innerHTML = "Couldn't find user";
		}
	})
}

function checkAmount() {
	var value = sessionStorage.getItem("value");
	var amount = Number(document.getElementById("transAmount").value);
	var error = document.getElementById("errorTransact");
	if (amount < 0) {
		error.setAttribute("style","visibility: visible;color:rgb(160,0,0);");
		error.innerHTML = "Amount is less than 0";
	} else if (amount > value) {
		error.setAttribute("style","visibility: visible;color:rgb(160,0,0);");
		error.innerHTML = "You dont have this amount";
	} else if (amount === 0) {
		error.setAttribute("style","visibility: visible;color:rgb(160,0,0);");
		error.innerHTML = "You haven't set a amount";
	} else {
		error.setAttribute("style","visibility: visible;color:rgb(0,160,0);");
		error.innerHTML = "Amount set";
		document.getElementById("transAmount").value = toFixed(amount,2);
		transAmountPossible = true;
	}
}

function checkRequest() {
	var value = sessionStorage.getItem("value");
	var amount = Number(document.getElementById("requestAmount").value);
	var error = document.getElementById("errorAmount2");
	if (amount < 0) {
		error.setAttribute("style","visibility: visible;color:rgb(160,0,0);");
		error.innerHTML = "Amount is less than 0";
	} else if (amount > value) {
		error.setAttribute("style","visibility: visible;color:rgb(160,0,0);");
		error.innerHTML = "You dont have this amount";
	} else {
		error.setAttribute("style","visibility: visible;color:rgb(0,160,0);");
		error.innerHTML = "Amount set";
		document.getElementById("requestAmount").value = toFixed(amount,2);
		transAmountPossible = true;
	}
}

function transact() {
	var error = document.getElementById("errorTransact");
	if (transAmountPossible !== true || transUserPossible !== true) {
		error.setAttribute("style","visibility: visible;color:rgb(160,0,0);");
		error.innerHTML = "There are errors, please check if amount and user id are right.";
	} else {
		var transId = document.getElementById("transId").value;
		var transAmount = Number(document.getElementById("transAmount").value);
		payment(transId,transAmount);
		closeCreateTransaction();
	}
}


function request() {
	var error = document.getElementById("errorTransact");
	var requestValue = Number(document.getElementById("requestAmount").value);
	if (requestValue !== 0) {
		if (requestValue < 0) {
			error.setAttribute("style","visibility: visible;color:rgb(160,0,0);");
			error.innerHTML = "Amount is less than 0";
		} else {
			prompt("Copy and send to request.","https://rster2002.github.io/pay?id=" + uid + "&amount=" + requestValue);
		}
	} else {
		prompt("Copy and send to request.","https://rster2002.github.io/pay?id=" + uid);
	}
}