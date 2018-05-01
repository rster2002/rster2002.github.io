var user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function(user) {
	if (user != null) {
		// catches user data
		username = user.displayName;
		userIcon = user.photoURL;
		uid = user.uid;
		userRef = firestore.doc("users/" + uid);
		var time = Date.now();
		
		userRef.get().then(function(doc) {
			if (!doc.exists) {
				userRef.set({
					username: username,
					userIcon: userIcon,
					uid: uid,
					creationTime: time,
					lastLogin: time
				}).then(function() {
					console.log("DONE");
				}).catch(function(error) {
					console.log("error", error);
				});
			} else {
				userRef.update({
					lastLogin: time
				});
			}
		});
		
		$(".userIcon").attr("src", userIcon);
		$(".username").text(username);
		
		sessionStorage.setItem("::username", username);
		sessionStorage.setItem("::uid", uid);
		
		loader.hide();
	}
});