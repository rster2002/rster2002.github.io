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

database = firebase.database();
dbRef = database.ref("ids");

var urlParam = function(name, w){
	w = w || window;
	var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
	val = w.location.search.match(rx);
	return !val ? '':val[1];
}

urlId = urlParam("id");

local = false;
if (localStorage.getItem("id")) {
	urlId = localStorage.getItem("id");
	local = true;
}

if (urlId === "") {
	alert("There is no id in url or registrated");
	location.href="index.html";
}

function requireId() {
	dbRef.child(urlId).once("value").then(function (snapshot){
		dbIdState = snapshot.val();
		if (dbIdState === null || dbIdState.valid === "false") {
			alert("This id is invalid (anymore)");
			location.href="index.html";
		}
		
		if (local === false && dbIdState.registrated === "true") {
			alert("This id is already in use!");
			location.href="index.html";
		}
		
		distance = 1;
		if (dbIdState.expire !== undefined && dbIdState.registrated === "false") {
			var expire = new Date(dbIdState.expire).getTime();
			var now = new Date().getTime();
			var distance = expire - now;
			if (distance < 0) {
				alert("This id has expired. Please contact webhost.");
				location.href="index.html";
			}
		}
		
		if (dbIdState.registrated === "false" && distance > 0) {
			if (confirm("Do you want to register this id on this device? You can't use it on a other device!") === true) {
				dbRef.child(urlId).child("registrated").set("true");
				localStorage.setItem("id",urlId);
				if (dbIdState.expire !== null) {
					dbRef.child(urlId).child("expire").remove();
				}
				re = true;
			} else {
				location.href="index.html";
			}
		}
		if (dbIdState.valid === "true") {
			document.getElementById("mainStory").setAttribute("style","display:block");
		} else {
			reValid = false;
		}
	});
}