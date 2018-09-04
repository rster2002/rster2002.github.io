vueInstance = new Vue({
	el: "#vueInstance",
	data: {
		users: []
	},
	methods: {
		stopEmulation() {
			sessionStorage.removeItem("::emuUid");
			if (DEV) {
				location.href = "appb.html";
			} else {
				location.href = "appb.html?pro";
			}
		},
		startEmulation(u) {
			sessionStorage.setItem("::emuUid", u);
			if (DEV) {
				location.href = "appb.html";
			} else {
				location.href = "appb.html?pro";
			}
		},
		toggleOpen(u) {
			this.users[this.users.indexOf(u)].shown = !this.users[this.users.indexOf(u)].shown;
		}
	}
})

async function refreshUsers() {
	userArray = await createQuery(firestore.collection("users").orderBy("username", "asc"));
	console.log(userArray);
	for (var i = 0; i < userArray.length; ++i) {
		var userObj = userArray[i];
		userObj.shown = false;
		vueInstance.users.push(userObj);
	}
}

function startEmulatetSession() {

}

function stopEmulatetSession() {
}

function deleteAccount() {
	if (confirm("Are you sure you want to delete this account?")) {
		firestore.collection("users").doc(lUid).delete();
	}
}

function userClick(here) {
	lUid = $(here).attr("id");
	$(".selectedUser").text(lUid);
	console.log(lUid);
}

function c(doc, f) {
	if (doc && doc.exists) {
		f(doc.data());
	}
}

function backupAll() {
	for (var i = 0; i < userArray.length; ++i) {
		var id = userArray[i]["__id"];
		backupUser(id);
	}
}

function backupUser(uid) {
	console.log(uid);
	var user = firestore.collection("users").doc(uid);
	var ref = dbBackups.child(uid);
	firestore.collection("users").doc(uid).get().then(function(doc) {
		c(doc, function(data) {
			ref.set(data);
		});
	}).then(function() {
		firestore.collection("users").doc(uid + "/misc/info").get().then(function(doc) {
			c(doc, function(data) {
				ref.child("misc").child("info").set(data);
			});
		})
	}).then(async function() {
		var characterQuery = await createQuery(user.collection("characters"));
		if (characterQuery[0] !== undefined) {
			for (var o = 0; o < characterQuery.length; ++o) {
				backup.user.character(ref, characterQuery[o]["__id"], characterQuery[o]);
				backup.user.characterObj(user, ref, characterQuery[o]["__id"]);
			}
		} else {
			var re = "::none";
		}
	});
	note.open("backup", "Done", 2000);
}

backup = {
	user: {
		character: function(ref, id, characterInfo) {
			ref.child("characters").child(id).set(characterInfo);
		},
		characterObj: function(user, ref, characterId) {
			user.collection("characters").doc(characterId + "/data/characterObj").get().then(function(doc) {
				c(doc, function(data) {
					ref.child("characters").child(characterId).child("characterObj").set(data);
				});
			});
		}
	}
}

recover = {

}

refreshUsers();
