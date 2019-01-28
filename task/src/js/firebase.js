var config = {
	apiKey: "AIzaSyAcF0oty8WOkHdaBKFcHxfDi97v1mrhOsA",
	authDomain: "project-for-tasks.firebaseapp.com",
	databaseURL: "https://project-for-tasks.firebaseio.com",
	projectId: "project-for-tasks",
	storageBucket: "project-for-tasks.appspot.com",
	messagingSenderId: "427957966742"
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
