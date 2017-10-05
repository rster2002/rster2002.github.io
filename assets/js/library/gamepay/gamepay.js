var head = document.getElementsByTagName('head').item(0);
var element = document.createElement("script");
element.src = "https://rawgit.com/jackspirou/clientjs/master/dist/client.min.js";
head.appendChild(element);

var config = {
	apiKey: "AIzaSyDCgnh6ezKcNkcpAUtGXuiN77jxlDbLPck",
	authDomain: "dewebsite-bae27.firebaseapp.com",
	databaseURL: "https://dewebsite-bae27.firebaseio.com",
	projectId: "dewebsite-bae27",
	storageBucket: "dewebsite-bae27.appspot.com",
	messagingSenderId: "437303961105"
};
firebase.initializeApp(config);
database = firebase.database();
dbRefPay = database.ref("pay");
dbRefAPI = database.ref("gamepayAPI");

gamepay = {
	"config": function(config) {
		// inisialize widget
		document.getElementById("gamepayWindow").innerHTML = "<div class='gamePayBackground'><style>@import url('https://fonts.googleapis.com/css?family=Raleway');#gamepayWindow {border-radius: 5px;background-color: brown;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);}.gamePayBackground {border-radius: 5px;margin: 0;padding: 0;text-align: center;width: 100%;height: 100%;background-color: rgb(255,255,255);}.gamePayBackground .header {border-top-left-radius: 5px;border-top-right-radius: 5px;background-color: #4c90ff;margin: 0;padding: 0;width: 100%;height: 20%;}.gamePayBackground .header h1 {color: white;font-size: 3em;font-family: 'Raleway';}.gamePayBackground .header #toId {font-size: 1em;color:lightgray;}.gamePayBackground button {display: block;margin-top: 5%;margin-left: auto;margin-right: auto;border: none;font-size: 2em;border-radius: 5px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);}</style><div class='header'><h1 id='gamePayAmount'></h1><h1 id='toId'></h1></div><button id='gamePayBtnPay' onclick='gamepay.payConfirm()'>Pay</button></div>"
		
		dbRefPay.once("value",function(snapshot){
			// check if there is a config defined
			if (config === undefined) {
				console.error("There is no config defined.");
				return;
			}
			
			// checks if there is a toId defined
			if (config.toId !== undefined) {
				// check if user exists in db and print a error in console otherwise
				if(snapshot.hasChild(config.toId)) {
					sessionStorage.setItem("toId",config.toId);
					console.log("toId set to: " + config.toId);
					sessionStorage.setItem("::toId",config.toId);
				} else {
					console.error("There is no user with that id");
					return;
				}
			} else {
				console.error("There is no 'toId' defined in config");
				return;
			}
			
			if (config.mode !== undefined) {
				sessionStorage.setItem("::type","dev");
			} else {
				sessionStorage.setItem("::type","default");
			}
			
			dbRefPay.child(config.toId).once("value",function(s){
				var dbContent = s.val();
				toIdName = dbContent.username;
				console.log(toIdName);
				document.getElementById("toId").innerHTML = "to " + toIdName;
			});
			
			
			if (config.amount === undefined) {
				console.error("No amount set");
				return;
			}
			
			if (config.return !== undefined) {
				sessionStorage.setItem("::return",String(config.return));
			}
			
			document.getElementById("gamePayAmount").innerHTML = config.amount + "c";
			var client = new ClientJS();
			var fingerprint = client.getFingerprint();
			sessionStorage.setItem("::browserId", fingerprint);
			sessionStorage.setItem("::amount", config.amount);
			});
	},
	"payConfirm": function() {
		if (sessionStorage.getItem("::browserId") && sessionStorage.getItem("::amount")) {
			dbBrowserId = dbRefAPI.child(sessionStorage.getItem("::browserId"));
			dbBrowserId.child("amount").set(sessionStorage.getItem("::amount"));
			dbBrowserId.child("toId").set(sessionStorage.getItem("::toId"));
			dbBrowserId.child("return").set(sessionStorage.getItem("::return"));
			dbBrowserId.child("fromURL").set(window.location.href);
			if (sessionStorage.getItem("::type") === "dev") {
				sessionStorage.removeItem("::type");
				location.href="pay.html?payment=true";
			} else {
				location.href="https://rster2002.github.io/pay.html?payment=true";
			}
		} else {
			console.error("Error with cached info")
		}
	}
}