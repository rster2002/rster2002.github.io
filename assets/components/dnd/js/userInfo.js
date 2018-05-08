characters = "abcdefghijklmnopqrstuvwxuz";

waveImported = function(){
	var user = firebase.auth().currentUser;
	firebase.auth().onAuthStateChanged(function(user) {
		if (user != null) {
			console.log(user);
			
			// catches user data
			username = user.displayName;
			userIcon = user.photoURL;
			uid = user.uid;
			userCode = "dnd-" + randomString(characters, 4) + "-" + randomString(characters, 4) + "-" + randomString(characters, 4) + "-" + randomString(characters, 4);
			
            sessionStorage.setItem("::uid", uid);
            sUid = uid;
            
			userRef = firestore.collection("users").doc(sessionStorage.getItem("::uid"));
			
			if (userIcon === undefined || userIcon === null) {
				userIcon = "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg";
			}
			
			sessionStorage.setItem("::uid",uid)
			
			$(".userIcon").attr("src", userIcon);
			$(".username").text(username);
			
			setUserinfo(username, userIcon);
			$(".ui--sidenavWrapper").addClass("modified");
			
			
			
			// Check for user and returns stored user info
			
			progress.show();
			userRef.get()
			.then(function(doc) {
				if (doc && doc.exists) {
					userRef.update({
						lastLogin: Date.now()
					}).then(function() {
						progress.hide();
					});
				} else {
					userRef.set({
						uid: uid,
						username: username,
						usericon: userIcon,
						firstLogin: Date.now(),
						lastLogin: Date.now(),
						userCode: userCode
					}).then(function() {
						progress.hide();
					});
				}
			});
		} else {
			logout();
		}
	});
};

waveImported();