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
			globalUser = doc.data();
			vueTerminal.user = globalUser;
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
		userInformation = {
			username: p.displayName,
			profileImage: p.photoURL,
			uid: p.uid
		}
		userRef = firestore.collection("users").doc(uid);
		userBucket = cloudStorage.child(uid);
		$(".userimg").attr("src", p.photoURL);
		$(".username").text(p.displayName);
		configUserDb();
	});
}

initUser();

function openSystemPage() {
	openPage("system");
}
