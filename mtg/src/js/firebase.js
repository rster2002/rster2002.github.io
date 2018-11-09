var config = {
	apiKey: "AIzaSyDQ4HgJfWyijll1AHmlaVGZCBdRFStQJno",
	authDomain: "mtg-deckmanager.firebaseapp.com",
	databaseURL: "https://mtg-deckmanager.firebaseio.com",
	projectId: "mtg-deckmanager",
	storageBucket: "mtg-deckmanager.appspot.com",
	messagingSenderId: "761314315063"
};
firebase.initializeApp(config);

const firestoreFunction = firebase.firestore();
const firestoreSettings = {
	timestampsInSnapshots: true
}
firestoreFunction.settings(firestoreSettings);
const firestore = firestoreFunction.collection(dbNew).doc("mtg");

var wait = firebase.storage();
const cloudStorage = wait.ref("mtg" + dbNew);

const usersRef = firestore.collection("users");

console.log(dbNew);
