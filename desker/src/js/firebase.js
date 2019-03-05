import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import {env} from "./global.js";

const cfb = firebase;
const fb = firebase.initializeApp({
    apiKey: "AIzaSyDlbJuDxwDbUEU60cQFa1EFBDgsuCuCUq4",
    authDomain: "desker-github.firebaseapp.com",
    databaseURL: "https://desker-github.firebaseio.com",
    projectId: "desker-github",
    storageBucket: "",
    messagingSenderId: "66093677129"
});

const fs = firebase.firestore().collection("desker").doc(env);
const at = fb.auth;

// Client => User obj => date
// Function => UID => User object

export {
	fb,
	fs,
	at,
	cfb
};
