// Initialize Firebase
var config = {
	apiKey: "AIzaSyAcF0oty8WOkHdaBKFcHxfDi97v1mrhOsA",
	authDomain: "project-for-tasks.firebaseapp.com",
	databaseURL: "https://project-for-tasks.firebaseio.com",
	projectId: "project-for-tasks",
	storageBucket: "project-for-tasks.appspot.com",
	messagingSenderId: "427957966742"
};
firebase.initializeApp(config);

var firestore = firebase.firestore();

const docRef = firestore.doc("example/sandwich");
const status = $("#onlineStatus");

$("#updateStatus").on("click", function() {
	var newValue = $("#input").val();
	console.log("I'm going to save " + newValue);
	docRef.set({
		status: newValue
	}).then(function () {
		console.log("DONE");
	}).catch(function (error) {
		console.log("error", error);
	});
});

$("#get").on("click", function () {
	docRef.get().then(function (doc) {
		if (doc && doc.exists) {
			var myData = doc.data();
			status.text(myData.status);
		}
		
		console.log("fetch");
	}).catch(function(error) {
		console.log("error", error);
	});
});

docRef.onSnapshot(function (doc) {
	if (doc && doc.exists) {
		var myData = doc.data();
		status.text(myData.status);
	}
})