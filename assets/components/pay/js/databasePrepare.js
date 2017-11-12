document.addEventListener("DOMContentLoaded", function(event) { 
	// define database
	database = firebase.database();
	dbUsers = database.ref("pay").child("users");
	dbUid = database.ref("pay").child("uid");
	dbPaymentId = database.ref("pay").child("paymentId");
	dbcurrency = database.ref("pay").child("currency");
	$(".loading").show();
	$(".info-bar").hide();
		// get user data
		try {
			var user = firebase.auth().currentUser;
			firebase.auth().onAuthStateChanged(function(user) {
				if (user != null) {
					username = user.displayName;
					userIcon = user.photoURL;
					uid = user.uid;

					sessionStorage.setItem("::localUsername",username);

					// set info bar
					dbUsers.child(uid).on("value",function(e){
						var dbContent = e.val();
						if (dbContent.username !== undefined || dbContent.username !== null) {
							if (dbContent.username !== username) {
								document.getElementById("onlinename").innerHTML = dbContent.username;
							} else {
								document.getElementById("onlinename").innerHTML = "";
							}
						}
					});
					document.getElementById("username").innerHTML = username;
					document.getElementById("usericon").setAttribute("src",userIcon);
					document.getElementById("menu-usericon").setAttribute("src",userIcon);

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
		} catch(e) {
			error(e);
		}
	
		try {
			dbUsers.once("value", function(snapshot) {
				// check if user exists in db and else create one
				if(snapshot.hasChild(uid)) {
					uidRef = database.ref("pay/" + uid);
				} else {
					var characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
					var paymentId = "P" + "-" + randomString(3,characters) + "-" + randomString(3,characters) + "-" + randomString(3,characters);
					dbUsers.child(uid).child("username").set(username);
					dbUsers.child(uid).child("value").set(1000);
					dbUsers.child(uid).child("paymentId").set(paymentId);
					dbPaymentId.child(paymentId).set(uid);
					uidRef = database.ref("pay/" + uid);
				}

				if (uidRef === undefined) {
					alert("You are offline!");
					location.href="../pay.html";
				}
			});
		} catch(e) {
			error(e);
		}
	$(".loading").hide();
	$(".info-bar").show();
});