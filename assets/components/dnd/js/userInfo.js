$(document).ready(function(){
	var user = firebase.auth().currentUser;
	firebase.auth().onAuthStateChanged(function(user) {
		if (user != null) {
			// catches user data
			username = user.displayName;
			userIcon = user.photoURL;
			uid = user.uid;
			
			if (userIcon === undefined || userIcon === null) {
				userIcon = "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg";
			}
			
			sessionStorage.setItem("::uid",uid)
			
			$("#userIcon").attr("src", userIcon);
			$("#username").text(username);
			
			// Check for user and returns stored user info
			dbUsers.once("value",function(e){
				var dbContent = e.val();
				if (e.hasChild(uid)) {
					console.log("Found user " + uid);
				} else {
					dbUsers.child(uid).child("username").set(username);
					dbUsers.child(uid).child("usericon").set(userIcon);
				}
				if (e.hasChild(uid + "/usericon")) {
					console.log("Usericon");
				} else {
					dbUsers.child(uid).child("usericon").set(userIcon);
				}
				if (e.hasChild(uid + "/uid")) {
					console.log("Usericon");
				} else {
					dbUsers.child(uid).child("uid").set(uid);
				}
			});
			
			// Checkes for user with name and returns stored uid if existend
			dbUsernames.once("value",function(e){
				var dbContent = e.val();
				if (e.hasChild(username)) {
					uid = dbContent[uid];
				} else {
					dbUsernames.child(username).set(uid);
				}
			});
		}
	});
});