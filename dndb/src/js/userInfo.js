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

	// requests the user document
	userRef.get().then(function(doc) {

		// checks if the document exists.
		if (doc && doc.exists) {

			// gets the data
			globalUser = doc.data();
			vueTerminal.user = globalUser;

			// updates the document
			userRef.update({
				lastLogin: Date.now()
			}).then(function() {
				progress.hide();
			}).catch(err => {
				error(err);
			});

			var userId;
			// checks if the user document has an userId
			if (globalUser.userId === undefined) {
				userId = "dnd-" + genId();
				userRef.update({
					userId: userId
				});
			} else {
				userId = globalUser.userId;
				firestore.collection("userId").doc(userId).set(globalUser);
			}

			userInformation["userId"] = userId;
		} else {

			// creates the user document
			var userId = "dnd-" + genId();
			userInformation["userId"] = userId;
			userRef.set({
				uid: authObj.uid,
				username: authObj.displayName,
				usericon: authObj.photoURL,
				firstLogin: Date.now(),
				lastLogin: Date.now(),
				userId: userId
			}).then(() => {
				firestore.collection("userId").doc(userId).set({
					uid: authObj.uid,
					username: authObj.displayName,
					usericon: authObj.photoURL
				}).catch(err => {
					thr(err);
				})
			}).then(() => {
				progress.hide();
			}).catch(err => {
				error(err);
			});
		}
	}).then(function() {

		// requests the misc data
		firestore.collection("users").doc(realUid).collection("misc").doc("info").get().then(function(doc) {
			if (doc && doc.exists) {

				// gets the data
				var miscInfo = doc.data();
				sessionStorage.setItem("::wait", "0");

				// check if the user is a system user
				if (miscInfo.type === "system" && sessionStorage.getItem("::wait") === "0") {

					// checks if the user is emulating an other uid and sets the border color
					if (sessionStorage.getItem("::emuUid") === null) {
						// $(".userIcon").css("border", "1px solid #169afd");
					} else {
						$(".userIcon").css("border", "1px solid #6dec1c");
					}

					// adds the system tab to the menu
					$(".sidebar .menu").append("<div class='menubutton page-system' onclick='openSystemPage()'><p class='centerVertical'><i class='material-icons'>code</i>System</p></div>");
					sessionStorage.setItem("::wait", "1");
				}
				if (miscInfo.type !== "system") {
					firestore.onSnapshot(function(doc) {
						if (doc && doc.exists) {
							let d = doc.data();
							if (d.status !== "online") {
								if (d.info === undefined) {
									d.info = "Application is not available at the moment.";
								}

								alert("Status: " + d.status + "\n\n" + d.info + "\n\nTo make sure no data is lost, you'll be logged out.");
								logout();
							}
						}
					});
				}
			} else {

				// registers the user as a default user
				firestore.collection("users").doc(realUid).collection("misc").doc("info").set({
					type: "default"
				}).catch(err => {
					error(err);
				});
			}
		});
	}).catch(err => {
		error(err);
	});
}

async function createReferences(authObj) {

	// checks if the user is emulating and if so uses the emulated uid.
	if (sessionStorage.getItem("::emuUid") !== null) {
		uid = sessionStorage.getItem("::emuUid")
	} else {
		uid = authObj.uid;
	}

	// sets some vars used later.
	realUid = authObj.uid;
	userRef = firestore.collection("users").doc(uid);
	userBucket = cloudStorage.child(uid);
}

function initUser() {

	// gets the suer
	getUser(p => {

		// checks if the user is emulating and if so sets the uid to the emulated uid
		if (sessionStorage.getItem("::emuUid") !== null) {
			uid = sessionStorage.getItem("::emuUid")
		} else {
			uid = p.uid;
		}

		// sets some vars
		realUid = p.uid;
		sessionStorage.setItem("::uid", uid);
		userInformation = {
			username: p.displayName,
			profileImage: p.photoURL,
			uid: p.uid
		}
		userRef = firestore.collection("users").doc(uid);
		userBucket = cloudStorage.child(uid);
		$(".userimg").attr("src", p.photoURL);
		$(".username").text(p.displayName);
		$(".userEmail").text(p.email);
		configUserDb(p);
		openPage("dashboard");
	});
}

initUser();

function openSystemPage() {
	openPage("system");
}
