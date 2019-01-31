var config = {
	apiKey: "AIzaSyCOJqjBzyYKSg9_Kfl_hyn0c3A5p87rdpE",
	authDomain: "dashboard-rster2002.firebaseapp.com",
	databaseURL: "https://dashboard-rster2002.firebaseio.com",
	projectId: "dashboard-rster2002",
	storageBucket: "dashboard-rster2002.appspot.com",
	messagingSenderId: "388992894417"
};

firebase.initializeApp(config);

const firestoreFunction = firebase.firestore();
const firestoreSettings = {
	timestampsInSnapshots: true
}
firestoreFunction.settings(firestoreSettings);

firestoreFunction.enablePersistence();

const firestore = firestoreFunction.collection(dbNew).doc("dashboard");
var userRef;
var signIn;


var globUser;
function login() {

	var provider = new firebase.auth.GithubAuthProvider();
	provider.addScope("repo");
	provider.addScope("notifications");
	provider.addScope("user");

	firebase.auth().signInWithPopup(provider).then(result => {

		console.log("LOGIN");

		signIn = true;
		globUser = result

		app.user.icon = result.user.photoURL;
		app.user.name = result.user.username;
		app.user.uid = result.user.uid;
		app.user.token = result.credential.accessToken;
		app.prompt.login = false;

		userRef = firestore.collection("users").doc(app.user.uid);

		userRef.get().then(r => {
			if (r && r.exists) {
				userRef.update({
					token: app.user.token
				});
			} else {
				userRef.set({
					username: app.user.name,
					icon: app.user.icon,
					uid: app.user.uid,
					token: app.user.token,
					lastLogin: Date.now(),
					firstLogin: Date.now()
				});
			}
		});
	});
}

firebase.auth().onAuthStateChanged(function(user) {
	if (user != null) {

		console.log("AUTH");

		app.user.icon = user.photoURL;
		app.user.name = user.displayName;
		app.user.uid = user.uid;
		app.prompt.login = false;

		userRef = firestore.collection("users").doc(user.uid);

		if (!signIn) {
			userRef.update({
				lastLogin: Date.now()
			});
		}

	} else {
		// logout();
	}
});



var app = new Vue({
	el: "#app",
	data: {
		prompt: {
			login: true
		},
		user: {
			name: "",
			icon: "",
			uid: "",
			token: ""
		}
	},
	methods: {
		login() {
			login();
		}
	},
	openPage(page) {
		var xhr= new XMLHttpRequest();
		xhr.open("GET", "./page/" + page + ".html", true);
		xhr.onreadystatechange = function() {
			if (this.readyState !== 4) return;
			if (this.status !== 200) return; // or whatever error handling you want
			document.getElementById("body").innerHTML += "<div class='innerPage'>" + this.responseText + "</div>";
		};
		xhr.send();
	}
});
