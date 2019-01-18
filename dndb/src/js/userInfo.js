characters = "abcdefghijklmnopqrstuvwxuz";
uid = "";

async function getUser(f) {
	var user = firebase.auth().currentUser;
	firebase.auth().onAuthStateChanged(function(user) {
		if (user != null) {
			f(user);
			return user;
		} else {
			logout();
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
			vueTerminal.display = globalUser;

			if (globalUser.tou === undefined || globalUser.tou === false) {
				alert("Please note that by using this website, you agree to the 'terms of use' which can be found on 'https://rster2002.github.io/dndb/tou.html'");
				userRef.update({
					tou: true
				}).catch(e => {thr(e)});
			}

			// updates the document
			userRef.update({
				lastLogin: Date.now()
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

								let x = "\n\nTo make sure no data is lost, you'll be logged out.";

								if (d.status === "warn") {
									x = "";
								}

								global.i = d;

								global.alert({
									text: "Status: " + d.status + ", \n\n" + d.info + x,
									btn1fn: function() {
										let d = global.i;
										if (d.status !== "warn") {
											logout();
										}
									}
								});


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

		a.ev("App", "user login", "passive", p.uid);

		// sets some vars
		realUid = p.uid;
		userInformation = {
			username: p.displayName,
			profileImage: p.photoURL,
			uid: p.uid
		}

		// checks if the user is emulating and if so sets the uid to the emulated uid
		if (sessionStorage.getItem("::emuUid") !== null) {
			let emuUid = sessionStorage.getItem("::emuUid");
			uid = emuUid;
			userInformation.uid = emuUid;
		} else {
			uid = p.uid;
		}

		sessionStorage.setItem("::uid", uid);
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
