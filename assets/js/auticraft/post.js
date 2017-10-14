var config = {
    apiKey: "AIzaSyDCgnh6ezKcNkcpAUtGXuiN77jxlDbLPck",
    authDomain: "dewebsite-bae27.firebaseapp.com",
    databaseURL: "https://dewebsite-bae27.firebaseio.com",
    projectId: "dewebsite-bae27",
    storageBucket: "dewebsite-bae27.appspot.com",
    messagingSenderId: "437303961105"
};
firebase.initializeApp(config);
dbRef = firebase.database().ref("auticraft");

sessionStorage.setItem("imgUrl", "false");
sessionStorage.setItem("type", "false");

function logout() {
	localStorage.removeItem("firebaseui::rememberedAccounts");
	location.href="../auticraft.html";
}

function checkUrl() {
	var inputValue = $("#imgUrl").val();
	if (inputValue.includes("http") && inputValue.includes("://")) {
		if (inputValue.includes(".png") || inputValue.includes(".jpeg") || inputValue.includes(".jpg") || inputValue.includes(".PNG")) {
			$("#out").text("Afbeelding gezet");
			sessionStorage.setItem("imgUrl", "true");
		} else {
			$("#out").text("Dit formaat wordt niet ondersteunt. Is dit een directe link naar een .png, .jpeg of .jpg afbeelding?");
			sessionStorage.setItem("imgUrl", "false");
		}
	} else {
		$("#out").text("Dit is geen url");
		sessionStorage.setItem("imgUrl", "false");
	}
}

function checkType() {
	var inputValue = $("#type").val();
	if (inputValue === "event" || inputValue === "mededeling" || inputValue === "wedstrijd" || inputValue === "update") {
		$("#out").text("Soort gezet");
		sessionStorage.setItem("type", "true");
	} else {
		$("#out").text("Dit is niet een geldige soort");
		sessionStorage.setItem("type", "false");
	}
}

$(document).ready(function(){
	var user = firebase.auth().currentUser;
	firebase.auth().onAuthStateChanged(function(user) {
		if (user != null) {
			username = user.displayName;
			userIcon = user.photoURL;
			uid = user.uid;
			
			$("#username").text(username);
			$("#userImg").attr("src", userIcon);
		}
	})
});

function post() {
	if (sessionStorage.getItem("type") !== "false" || sessionStorage.getItem("imgUrl") !== "false") {
		dbRef.child("articles").once("value",function(e){
			var dbContent = e.val();
			console.log(dbContent);
			var createdArticle = {};
			createdArticle.title = $("#title").val();
			createdArticle.offset = "0% 0%";
			createdArticle.type = $("#type").val();
			createdArticle.img = $("#imgUrl").val();
			createdArticle.postedBy = username;
			var contentInput = $("#content").val();
			createdArticle.content = "<p>" + contentInput + "</p>";
			dbContent.unshift(createdArticle);
			console.log(dbContent);
			dbRef.child("articles").set(dbContent);
			alert("Gepost!");
			location.href = "../auticraft.html";
		});
	} else {
		alert("Niet alles is goed ingevult.");
	}
}