// Initialize Firebase
var config = {
	apiKey: "AIzaSyD4jtNIKxqPDzZSsDdW0Lzrz4NInL1cf4M",
    authDomain: "gamepay-9dbab.firebaseapp.com",
    databaseURL: "https://gamepay-9dbab.firebaseio.com",
    projectId: "gamepay-9dbab",
    storageBucket: "gamepay-9dbab.appspot.com",
    messagingSenderId: "298811984858"
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

if (urlParam("payment") !== '') {
	location.href="pay/payment.html";
} else {
	if (urlParam("id") !== '') {
		sessionStorage.setItem("catchedId", urlParam("id"));
	}

	if (urlParam("amount") !== '') {
		sessionStorage.setItem("catchedAmount",urlParam("amount"));
	}

	if (localStorage.getItem("firebaseui::rememberedAccounts")) {
		location.href = "pay/main.html";
	}
}
