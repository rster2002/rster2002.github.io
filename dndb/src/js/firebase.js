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

firestoreFunction.enablePersistence();

const firestore = firestoreFunction.collection(dbNew).doc("dnd");

var wait = firebase.storage();
const cloudStorage = wait.ref("dnd" + dbNew);


database = firebase.database().ref("dnd" + db);
dbUsers = database.child("users");
dbCampaign = database.child("campaign");
dbUsernames = database.child("usernames");
dbGlobal = database.child("global");
dbUserCodes = database.child("userCodes");
dbBackups = firebase.database().ref("backups" + dbNew);

console.log(dbNew);
