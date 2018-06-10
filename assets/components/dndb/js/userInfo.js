characters = "abcdefghijklmnopqrstuvwxuz";

async function getUser(f) {
	var user = firebase.auth().currentUser;
	firebase.auth().onAuthStateChanged(function(user) {
		if (user != null) {
			f(user);
			return user;
		}
	});
}

async function configUserDb(authObj) {
	userRef.get().then(function(doc) {
		if (doc && doc.exists) {
			userRef.update({
				lastLogin: Date.now()
			}).then(function() {
				progress.hide();
			}).catch(function(e){error(e)});
		} else {
			var userCode = "dnd-" + genId();
			userRef.set({
				uid: authObj.uid,
				username: authObj.displayName,
				usericon: authObj.photoURL,
				firstLogin: Date.now(),
				lastLogin: Date.now(),
				userCode: userCode
			}).then(function() {
				progress.hide();
			}).catch(function(e){error(e)});
		}
	}).then(function() {
		firestore.collection("users").doc(realUid).collection("misc").doc("info").get().then(function(doc) {
			if (doc && doc.exists) {
				var miscInfo = doc.data();
				sessionStorage.setItem("::wait", "0");
				if (miscInfo.type === "system" && sessionStorage.getItem("::wait") === "0") {
					if (sessionStorage.getItem("::emuUid") === null) {
						$(".userIcon").css("border", "1px solid #169afd");
					} else {
						$(".userIcon").css("border", "1px solid #6dec1c");
					}
					$(".sidebar .menu").append("<div class='menubutton' onclick='openSystemPage()'><p class='centerVertical'><i class='material-icons'>code</i>System</p></div>")
					sessionStorage.setItem("::wait", "1");
				}
			} else {
				firestore.collection("users").doc(realUid).collection("misc").doc("info").set({
					type: "default"
				}).catch(function(e){error(e)});
			}
		});
	}).catch((e) => {
		error(e);
	});
}

async function createReferences(authObj) {
	console.log(authObj);
	if (sessionStorage.getItem("::emuUid") !== null) {
		uid = sessionStorage.getItem("::emuUid")
	} else {
		uid = authObj.uid;
	}
	realUid = authObj.uid;
	userRef = firestore.collection("users").doc(uid);
	userBucket = cloudStorage.child(uid);
}

function initUser() {
	getUser((p) => {
		console.log(p);
		if (sessionStorage.getItem("::emuUid") !== null) {
			uid = sessionStorage.getItem("::emuUid")
		} else {
			uid = p.uid;
		}
		realUid = p.uid;
		sessionStorage.setItem("::uid", uid);
		userRef = firestore.collection("users").doc(uid);
		userBucket = cloudStorage.child(uid);
		$(".userimg").attr("src", p.photoURL);
		$(".username").text(p.displayName);
		configUserDb();
	});
}

// async function initUser(f) {
// 	await getUser(async (authObj) => {
// 		await createReferences(authObj);
// 		await configUserDb(authObj);
// 		ii = authObj;
// 	});
// 	return ii;
// }

// waveImported = function(){
// 	var user = firebase.auth().currentUser;
// 	firebase.auth().onAuthStateChanged(function(user) {
// 		if (user != null) {
// 			console.log(user);
// 			// catches user data
// 			username = user.displayName;
// 			userIcon = user.photoURL;
// 			uid = user.uid;
// 			realUid = uid;
// 			userCode = "dnd-" + randomString(characters, 4) + "-" + randomString(characters, 4) + "-" + randomString(characters, 4) + "-" + randomString(characters, 4);
// 			if (sessionStorage.getItem("::emuUid") !== null) {
// 				uid = sessionStorage.getItem("::emuUid");
// 			}
//
//             sessionStorage.setItem("::uid", uid);
//             sUid = uid;
//
// 			userRef = firestore.collection("users").doc(sessionStorage.getItem("::uid"));
// 			userBucket = cloudStorage.child(uid);
// 			if (userIcon === undefined || userIcon === null) {
// 				userIcon = "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg";
// 			}
//
// 			sessionStorage.setItem("::uid",uid)
//
// 			setTimeout(() => {
// 				$(".userimg").attr("src", userIcon);
// 				$(".username").text(username);
// 			}, 100)
//
// 			setUserinfo(username, userIcon);
// 			$(".ui--sidenavWrapper").addClass("modified");
//
//
//
// 			// Check for user and returns stored user info
//
// 			progress.show();
//
// 		} else {
// 			logout();
// 		}
// 	});
// };

initUser();

function openSystemPage() {
	openPage("system");
}
