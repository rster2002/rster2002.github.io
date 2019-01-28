var config = {
	apiKey: "AIzaSyCOJqjBzyYKSg9_Kfl_hyn0c3A5p87rdpE",
	authDomain: "dashboard-rster2002.firebaseapp.com",
	databaseURL: "https://dashboard-rster2002.firebaseio.com",
	projectId: "dashboard-rster2002",
	storageBucket: "dashboard-rster2002.appspot.com",
	messagingSenderId: "388992894417"
};

firebase.initializeApp(config);

// FirebaseUI config.
var uiConfig = {
	signInSuccessUrl: './app.html',
	signInOptions: [
		firebase.auth.GithubAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	tosUrl: 'tos.html'
};

if (localStorage.getItem("firebaseui::rememberedAccounts")) {
	location.href = "./app.html";
}

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
