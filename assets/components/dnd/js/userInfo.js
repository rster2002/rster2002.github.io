$(document).ready(function(){
	var user = firebase.auth().currentUser;
	firebase.auth().onAuthStateChanged(function(user) {
		if (user != null) {
			username = user.displayName;
			userIcon = user.photoURL;
			uid = user.uid;
			
			$("#userIcon").attr("src", userIcon);
			$("#username").text(username);
		}
	});
	dbUsers.once("value",function(e){
		var dbContent = e.val();
		if (e.hasChild(uid)) {
			console.log("Found user " + uid);
		} else {
			dbUsers.child(uid).child("username").set(username);
			dbUsers.child(uid).child("usericon").set(userIcon);
		}
		dbUsers.child(uid).once("value",function(e){
			var dbContent = e.val();
			if (dbContent.Character === undefined) {
				$(".createCharacter").css("display","block");
				$("#characterName").css("display","none");
			} else {
				$(".createCharacter").css("display","none")
				character = dbContent.character;
				openPage("mainPage");
			}
		})
	})
});