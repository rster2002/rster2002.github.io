var config = {
	apiKey: "AIzaSyDQ4HgJfWyijll1AHmlaVGZCBdRFStQJno",
	authDomain: "mtg-deckmanager.firebaseapp.com",
	databaseURL: "https://mtg-deckmanager.firebaseio.com",
	projectId: "mtg-deckmanager",
	storageBucket: "mtg-deckmanager.appspot.com",
	messagingSenderId: "761314315063"
};
firebase.initializeApp(config);

// FirebaseUI config.
var uiConfig = {
	signInSuccessUrl: './app.html',
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID
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
