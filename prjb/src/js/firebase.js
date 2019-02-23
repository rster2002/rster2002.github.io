import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import {env} from "./global.js";

const cfb = firebase;
const fb = firebase.initializeApp({
	apiKey: "AIzaSyDCgnh6ezKcNkcpAUtGXuiN77jxlDbLPck",
	authDomain: "dewebsite-bae27.firebaseapp.com",
	databaseURL: "https://dewebsite-bae27.firebaseio.com",
	projectId: "dewebsite-bae27",
	storageBucket: "dewebsite-bae27.appspot.com",
	messagingSenderId: "437303961105"
});

const fs = firebase.firestore().collection("prja").doc(env);
const at = fb.auth;

// Client => User obj => date
// Function => UID => User object

export {
	fb,
	fs,
	at,
	cfb
};
