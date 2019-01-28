var config = {
	apiKey: "AIzaSyAcF0oty8WOkHdaBKFcHxfDi97v1mrhOsA",
	authDomain: "project-for-tasks.firebaseapp.com",
	databaseURL: "https://project-for-tasks.firebaseio.com",
	projectId: "project-for-tasks",
	storageBucket: "project-for-tasks.appspot.com",
	messagingSenderId: "427957966742"
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
