var config = {
    apiKey: "AIzaSyDUJ9zJn7jgotr4cxZBQHrDjhTjX1cDAgo",
    authDomain: "dnd-online.firebaseapp.com",
    databaseURL: "https://dnd-online.firebaseio.com",
    projectId: "dnd-online",
    storageBucket: "dnd-online.appspot.com",
    messagingSenderId: "318768830276"
};
firebase.initializeApp(config);

// FirebaseUI config.
var uiConfig = {
	signInSuccessUrl: '../../../dnd/app.html',
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	tosUrl: 'tos.html'
};

if (localStorage.getItem("firebaseui::rememberedAccounts")) {
	location.href = "../../../dnd/app.html";
}

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
