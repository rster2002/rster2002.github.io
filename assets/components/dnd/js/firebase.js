var config = {
    apiKey: "AIzaSyDUJ9zJn7jgotr4cxZBQHrDjhTjX1cDAgo",
    authDomain: "dnd-online.firebaseapp.com",
    databaseURL: "https://dnd-online.firebaseio.com",
    projectId: "dnd-online",
    storageBucket: "dnd-online.appspot.com",
    messagingSenderId: "318768830276"
};
firebase.initializeApp(config);

var url = document.URL;
if (url.includes(":8887")) {
	var db = "dev";
	DEV = true;
	$("#pageTitle").text("DEV");
} else {
	db = "";
	DEV = false;
}
database = firebase.database();
dbUsers = database.ref("dnd" + db).child("users");
dbCampaign = database.ref("dnd" + db).child("campaign");
dbUsernames = database.ref("dnd" + db).child("usernames");
dbGlobal = database.ref("dnd" + db).child("global");