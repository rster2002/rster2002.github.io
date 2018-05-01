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

const firestore = firebase.firestore();
const projects = firestore.collection("projects");