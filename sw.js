var config = {
    apiKey: "AIzaSyDCgnh6ezKcNkcpAUtGXuiN77jxlDbLPck",
    authDomain: "dewebsite-bae27.firebaseapp.com",
    databaseURL: "https://dewebsite-bae27.firebaseio.com",
    projectId: "dewebsite-bae27",
    storageBucket: "dewebsite-bae27.appspot.com",
    messagingSenderId: "437303961105"
};
firebase.initializeApp(config);

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
	'/'
];

self.addEventListener('install', function(event) {
		// Perform install steps
		event.waitUntil(
		caches.open(CACHE_NAME)
		  .then(function(cache) {
			console.log('Opened cache');
			return cache.addAll(urlsToCache);
		  })
	  );
	database = firebase.database();
	dbRef = database.ref("test");
	dbRef.on("value",function(e){
		dbContent = e.val();
		console.log(e.val);
	})
});