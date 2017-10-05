// Initialize Firebase
var config = {
    apiKey: "AIzaSyDCgnh6ezKcNkcpAUtGXuiN77jxlDbLPck",
    authDomain: "dewebsite-bae27.firebaseapp.com",
    databaseURL: "https://dewebsite-bae27.firebaseio.com",
    projectId: "dewebsite-bae27",
    storageBucket: "dewebsite-bae27.appspot.com",
    messagingSenderId: "437303961105"
};
firebase.initializeApp(config);

transAmountPossible = false;
transUserPossible = false;

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

// Get user information
document.addEventListener("DOMContentLoaded", function(event) { 
	$(".loading").show();
	$(".info-bar").hide();
		// get user data
		var user = firebase.auth().currentUser;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user != null) {
				username = user.displayName;
				userIcon = user.photoURL;
				uid = user.uid;

				// set info bar
				document.getElementById("username").innerHTML = username;
				document.getElementById("usericon").setAttribute("src",userIcon);
				document.getElementById("userid").innerHTML = uid;
				
				// check if catched data is available
				if (sessionStorage.getItem("catchedId")) {
					document.getElementById("transId").value = sessionStorage.getItem("catchedId");
					searchId();
					sessionStorage.removeItem("catchedId");
				}
				if (sessionStorage.getItem("catchedAmount")) {
					document.getElementById("transAmount").value = sessionStorage.getItem("catchedAmount");
					sessionStorage.removeItem("catchedAmount");
					transAmountPossible = true;
				}
			} else {
//				localStorage.removeItem("firebaseui::rememberedAccounts");
//				location.href="../pay.html";
			}
		});
	// define database
	database = firebase.database();
	dbRef = database.ref("pay");
	dbRef.once("value", function(snapshot) {
		// check if user exists in db and else create one
		if(snapshot.hasChild(uid)) {
			uidRef = database.ref("pay/" + uid);
		} else {
			dbRef.child(uid).child("username").set(username);
			dbRef.child(uid).child("value").set(1000);
			uidRef = database.ref("pay/" + uid);
		}
		
		if (uidRef === undefined) {
			alert("You are offline!");
			location.href="../pay.html";
		}
		
		// on db change get changes
		dbRef.child(uid).on("value",function(snapshot){
			dbContent = snapshot.val()
			console.log(dbContent.value);
			sessionStorage.setItem("value",dbContent.value);
			if (snapshot.hasChild("latestTransaction")) {
				latestTransactionAmount = dbContent.latestTransaction.amount;
				latestTransactionUser = dbContent.latestTransaction.user;
				latestTransactionType = dbContent.latestTransaction.type;
				document.getElementById("latestTransactionAmount").innerHTML = latestTransactionAmount + "C";
				if (latestTransactionType === "add") {
					document.getElementById("latestTransactionAmount").setAttribute("style","color:rgb(0,160,0);")
					document.getElementById("latestTransactionUser").innerHTML = "from " + latestTransactionUser;
				} else {
					document.getElementById("latestTransactionAmount").setAttribute("style","color:rgb(160,00,0);");
					document.getElementById("latestTransactionUser").innerHTML = "to " + latestTransactionUser;
				}
			} else {
				latestTransactionAmount = false;
			}
			document.getElementById("value").innerHTML = toFixed(dbContent.value, 2) + "C";
		})
	})
	$(".loading").hide();
	$(".info-bar").show();
});

function searchId() {
	var transId = document.getElementById("transId").value;
	var error = document.getElementById("errorTransact");
	if (transId === uid) {
		error.setAttribute("style","visibility: visible;color:rgb(160,0,0);");
		error.innerHTML = "You can't transact to yourself";
		return;
	}
	dbRef.once("value", function(snapshot) {
		if (snapshot.hasChild(transId)) {
			error.setAttribute("style","visibility: visible;color:rgb(0,160,0);");
			dbRef.child(transId).once("value",function(e){
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

function toFixed(value, precision) {
	var precision = precision || 0,
	power = Math.pow(10, precision),
	absValue = Math.abs(Math.round(value * power)),
	result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));
	if (precision > 0) {
		var fraction = String(absValue % power),
		padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
			result += '.' + padding + fraction;
	}
	return result;
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
		var value = Number(sessionStorage.getItem("value"));
		var transId = document.getElementById("transId").value;
		var transAmount = Number(document.getElementById("transAmount").value);
		dbRef.child(transId).once("value",function(snapshot) {
			var transUserContent = snapshot.val();
			if (transUserContent.value !== null) {
				var transValue = value - transAmount;
				var userValue = transUserContent.value + transAmount;
				dbRef.child(uid).child("value").set(transValue);
				dbRef.child(transId).child("value").set(userValue);
				
				dbRef.child(uid).child("latestTransaction").child("amount").set(transAmount);
				dbRef.child(uid).child("latestTransaction").child("user").set(transUserContent.username);
				dbRef.child(uid).child("latestTransaction").child("type").set("remove");
				
				dbRef.child(transId).child("latestTransaction").child("amount").set(transAmount);
				dbRef.child(transId).child("latestTransaction").child("user").set(dbContent.username);
				dbRef.child(transId).child("latestTransaction").child("type").set("add");
				
				error.setAttribute("style","visibility: visible;color:rgb(0,160,0);");
				error.innerHTML = "Transaction succesfull";
				ga('send', 'event', 'Pay', uid + 'made a transaction to ' + transId, 'Payment');
			} else {
				error.setAttribute("style","visibility: visible;color:rgb(160,0,0);");
				error.innerHTML = "A error has acured. User has invalid value";
			}
		});
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

function qrCam() {
	$(".qrCam-outer").fadeIn();
	$(".qrCam").show();
	$('#reader').html5_qrcode(
	function(data) {
		var qrCode = data.split("/");
		toId = qrCode[0];
		amount = qrCode[1];
		console.log(toId);
		console.log(amount);
		dbRef.child(toId).once("value",function(e){
			var dbContent = e.val();
			if (amount === "false") {
				var amount = confirm("How much do you want to pay " + dbContent + "?");
				if (amount !== '' || amount !== false || amount !== "0") {
					transactionAmount = Number(amount);
				}
			} else {
				transactionAmount = Number(amount);
			}
			if (confirm("Do you want to pay " + dbContent.username + " " + amount + "credits?")) {
				console.log("YES I DO");
			};
		});
	},
	function(error){
		console.log(error);
	}, 
	function(videoError){
		//the video stream could be opened
	});
}

///////////////////////////////////////////////////////////////////////
//OPENING AND CLOSING POPUPS
///////////////////////////////////////////////////////////////////////

function closeCreateTransaction() {
	$(".createTransaction-outer").fadeOut();
	$(".createTransaction").hide();
}

function qrCamStop() {
	$('#reader').html5_qrcode_stop();
	$('#reader').remove();
	$('.qrReader-outer').append("<div id='reader' style='width:100%;height:100%;'></div>");
	readerOn = false;
	$(".qrCam-outer").fadeOut();
	$(".qrCam").hide;
}

function qrCodeShow() {
	var amount = prompt("How much do you want to pay?");
	if (amount === '') {
		amount = "false";
	}
	new QRCode(document.getElementById("qrcode"), uid + "/" + amount);
	$(".qrCode-outer").fadeIn();
	$(".qrCode").show();
}

function qrCodeHide() {
	$(".qrCode-outer").fadeOut();
	$(".qrCode").hide;
	$("#qrcode").remove();
	$(".qrCode").append("<div id='qrcode'></div>");
}

function logout() {
	localStorage.removeItem("firebaseui::rememberedAccounts");
	location.href="../pay.html";
}

// appending functions to buttons
$(document).ready(function(){
	$("#btnCreateTransaction").on("click",function(){
		$(".createTransaction-outer").fadeIn();
		$(".createTransaction").show();
	});
	
	$("#btnCloseCreateTransaction").on("click",function(){
		closeCreateTransaction();
	});
	
	$("#btnUsingQrCode").on("click",function(){
		closeCreateTransaction();
		qrCodeShow();
	});
	
	$("#btnReceiveQrCode").on("click",function(){
		closeCreateTransaction();
		qrCam();
	});
})