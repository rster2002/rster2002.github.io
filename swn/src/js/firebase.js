import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { env } from "@js/global.js";

const cfb = firebase;
const fb = firebase.initializeApp({
	apiKey: "AIzaSyCWiSAjHBMyXksTGAoJ9fCQyiDqMKWfqhk",
	authDomain: "swn-tools.firebaseapp.com",
	databaseURL: "https://swn-tools.firebaseio.com",
	projectId: "swn-tools",
	storageBucket: "swn-tools.appspot.com",
	messagingSenderId: "753059590422"
});

const fs = firebase
    .firestore()
    .collection("swn")
    .doc(env);

const at = fb.auth;

// Client => User obj => date
// Function => UID => User object

async function qu(a) {
    /*
		IDEA:
		When if gets data, it should store it in the session,
		later when there is a call to the same location within one minute,
		it should return the data stored in the session.

		This makes sure that when switching from page to page, it doesn't make
		extra calls for data that (most of the time) hasn't been changed.
	*/
    console.log(a);
    var snapshot = await fs.collection(a).get();
    return snapshot.docs.map(doc =>
        Object.assign({ __id: doc.id }, doc.data())
    );
}

export { fb, fs, at, cfb, qu };
