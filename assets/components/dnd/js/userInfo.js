characters = "abcdefghijklmnopqrstuvwxuz";

uijsImported = function(){
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
			
			$("#userIcon-Bar").attr("src", userIcon);
			$("#username-Bar").text(username);
			$("#userIcon").attr("src", userIcon);
			$("#username").text(username);
			
			setUserinfo(username, userIcon);
			$(".ui--sidenavWrapper").addClass("modified");
			
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
			
			// Checks for userCode in database and if not found, create one
			dbUsers.child(uid).once("value", function(e) {
				if (!e.hasChild("userCode")) {
					var userCode = "dnd-" + randomString(characters, 4) + "-" + randomString(characters, 4) + "-" + randomString(characters, 4) + "-" + randomString(characters, 4);
					dbUsers.child(uid).child("userCode").set(userCode);
					dbUserCodes.child(userCode).set(uid);
				}
			});
		} else {
			$(".login").show();
			ui.start('#firebaseui-auth-container', {
				signInSuccessUrl: 'app.html',
				signInOptions: [
					firebase.auth.GoogleAuthProvider.PROVIDER_ID,
					firebase.auth.EmailAuthProvider.PROVIDER_ID
				],
				tosUrl: 'tos.html'
			});
		}
	});
};