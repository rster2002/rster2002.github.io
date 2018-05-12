var config = {
	apiKey: "AIzaSyDUJ9zJn7jgotr4cxZBQHrDjhTjX1cDAgo",
	authDomain: "dnd-online.firebaseapp.com",
	databaseURL: "https://dnd-online.firebaseio.com",
	projectId: "dnd-online",
	storageBucket: "dnd-online.appspot.com",
	messagingSenderId: "318768830276"
};
firebase.initializeApp(config);

const firestoreFunction = firebase.firestore();
const firestoreSettings = {
	timestampsInSnapshots: true
}
firestoreFunction.settings(firestoreSettings);
const firestore = firestoreFunction.collection(dbNew).doc("dnd");


console.log("firebase init");
database = firebase.database().ref("dnd" + db);
dbUsers = database.child("users");
dbCampaign = database.child("campaign");
dbUsernames = database.child("usernames");
dbGlobal = database.child("global");
dbUserCodes = database.child("userCodes");
dbBackups = firebase.database().ref("backups" + dbNew);

console.log(dbNew);
firestore.get().then(function(doc) {
	console.log(doc);
	if (doc && doc.exists) {
		var state = doc.data();
		if (state.function === "logout") {
			alert(state.message);
			logout();
		} else if (state.function === "message") {
			alert(state.message);
		}
	} else {
		alert("Can't fetch database state");
		logout();
	}
});
