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
database = firebase.database();
dbRefAPI = database.ref("gamepayAPI");
dbRefPay = database.ref("pay");

if (localStorage.getItem("firebaseui::rememberedAccounts")) {
	console.log("Found user");
} else {
	alert("No logged in user");
	location.href="../pay.html";
}

new Fingerprint2().get(function(result, components){
	sessionStorage.setItem("::browserId", result); //a hash, representing your device fingerprint
});

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

$(document).ready(function(){
	var user = firebase.auth().currentUser;
	firebase.auth().onAuthStateChanged(function(user) {
		if (user != null) {
			username = user.displayName;
			userIcon = user.photoURL;
			uid = user.uid;
			
			document.getElementById("userImg").setAttribute("src",userIcon);
			$("#userName").text(username);
			dbRefPay.child(uid).once("value",function(snapshot){
				var dbContent = snapshot.val();
				userValue = Number(dbContent.value);
				userName = dbContent.username;
				$("#userValue").text(toFixed(userValue,2) + "c");
			});
			var browserId = sessionStorage.getItem("::browserId");
			dbRefAPI.child(browserId).once("value",function(snapshot){
				var dbContent = snapshot.val();
				payAmount = Number(dbContent.amount);
				payToId = dbContent.toId;
				payFromURL = dbContent.fromURL;
				console.log(dbContent);
				$("#amount").text(payAmount + "c");
				$("#toId").text(payToId);
			});
			
			$("#btnConfirmPay").on("click",function(){
				dbRefPay.child(payToId).once("value",function(snapshot){
					var dbContent = snapshot.val();
					toIdValue = Number(dbContent.value);
					toIdName = dbContent.username;
					
					if (payAmount > userValue) {
						alert("You don't have this amount");
						location.href = payFromURL;
						return;
					}
					
					userValue = userValue - payAmount;
					toIdValue = toIdValue + payAmount;
					dbRefPay.child(uid).child("latestTransaction").child("type").set("remove");
					dbRefPay.child(uid).child("latestTransaction").child("amount").set(payAmount);
					dbRefPay.child(uid).child("latestTransaction").child("user").set(toIdName);
					dbRefPay.child(uid).child("value").set(userValue);

					dbRefPay.child(payToId).child("latestTransaction").child("type").set("add");
					dbRefPay.child(payToId).child("latestTransaction").child("amount").set(payAmount);
					dbRefPay.child(payToId).child("latestTransaction").child("user").set(userName);
					dbRefPay.child(payToId).child("value").set(toIdValue);
					
					dbRefAPI.child(sessionStorage.getItem("::browserId")).remove();
					location.href="../pay.html";
				});
			});
		}
	});
});