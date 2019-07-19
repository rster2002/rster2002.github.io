import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { env, user } from "@js/global.js";

const cfb = firebase;
const fb = firebase.initializeApp({
    apiKey: "AIzaSyDlbJuDxwDbUEU60cQFa1EFBDgsuCuCUq4",
    authDomain: "desker-github.firebaseapp.com",
    databaseURL: "https://desker-github.firebaseio.com",
    projectId: "desker-github",
    storageBucket: "",
    messagingSenderId: "66093677129"
});

const fsc = firebase.firestore();

fsc.settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

fsc.enablePersistence();
const fs = fsc
    .collection("racing")
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
    var snapshot = await a.get();
    return snapshot.docs.map(doc =>
        Object.assign({ __id: doc.id }, doc.data())
    );
}

function u() {
    return fs.collection("users").doc(user().uid);
}

export { fb, fs, at, cfb, qu, fsc, u };
