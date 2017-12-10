var config = {
    apiKey: "AIzaSyDUJ9zJn7jgotr4cxZBQHrDjhTjX1cDAgo",
    authDomain: "dnd-online.firebaseapp.com",
    databaseURL: "https://dnd-online.firebaseio.com",
    projectId: "dnd-online",
    storageBucket: "dnd-online.appspot.com",
    messagingSenderId: "318768830276"
};
firebase.initializeApp(config);

database = firebase.database();
dbUsers = database.ref("dnd").child("users");
dbParty = database.ref("dnd").child("party");
dbUsernames = database.ref("dnd").child("usernames");