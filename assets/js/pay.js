// Initialize Firebase
var config = {
	apiKey: "AIzaSyDCgnh6ezKcNkcpAUtGXuiN77jxlDbLPck",
	authDomain: "dewebsite-bae27.firebaseapp.com",
	databaseURL: "https://dewebsite-bae27.firebaseio.com",
	projectId: "dewebsite-bae27",
	storageBucket: "dewebsite-bae27.appspot.com",
	messagingSenderId: "437303961105"
};
firebase.initializeApp(config);

// FirebaseUI config.
var uiConfig = {
	signInSuccessUrl: 'pay/main.html',
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	tosUrl: 'tos.html'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

var urlParam = function(name, w) {
	w = w || window;
	var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
	val = w.location.search.match(rx);
	return !val ? '':val[1];
}

if (urlParam("id") !== '') {
	sessionStorage.setItem("catchedId", urlParam("id"));
}

if (urlParam("amount") !== '') {
	sessionStorage.setItem("catchedAmount",urlParam("amount"));
}