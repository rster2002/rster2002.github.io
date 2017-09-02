// Initialize Firebase
var config = {
	apiKey: "AIzaSyDCgnh6ezKcNkcpAUtGXuiN77jxlDbLPck",
	authDomain: "dewebsite-bae27.firebaseapp.com",
	databaseURL: "https://dewebsite-bae27.firebaseio.com",
	projectId: "dewebsite-bae27",
	storageBucket: "dewebsite-bae27.appspot.com",
	messagingSenderId: "437303961105"
};
firebase.initializeApp(config);

user = {
	"username":null
}

database = firebase.database();
dbRef = database.ref("pay");

// FirebaseUI config.
var uiConfig = {
	signInSuccessUrl: 'theMoneyGame.html',
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	tosUrl: 'tos.html'
};

if (localStorage.getItem("firebaseui::rememberedAccounts")) {
	var user = firebase.auth().currentUser;
	firebase.auth().onAuthStateChanged(function(user) {
		username = user.displayName;
		userIcon = user.photoURL;
		uid = user.uid;
		document.getElementById("username").innerHTML = username;
		localStorage.setItem("log",true);
		document.getElementById("logOut").setAttribute("style","display:block;");
	})
} else {
	// Initialize the FirebaseUI Widget using Firebase.
	var ui = new firebaseui.auth.AuthUI(firebase.auth());
	// The start method will wait until the DOM is loaded.
	ui.start('#firebaseui-auth-container', uiConfig);
	document.getElementById("logOut").setAttribute("style","display:none;");
}

lss = false;
max = false;
if (localStorage.getItem("ch")) {
	var i = localStorage.getItem("ch");
	if (i === "") {
		ch = [];
	} else {
		ch = i.split(",");
	}
} else {
	ch = ["200","200","200","200","200"];
}

if (localStorage.getItem("money")) {
	money = Number(localStorage.getItem("money"));
	document.getElementById("money").innerHTML = money;
} else {
	money = 2000;
	localStorage.setItem("money", money);
	document.getElementById("money").innerHTML = money;
}

if (localStorage.getItem("stocks")) {
	stocks = Number(localStorage.getItem("stocks"));
	document.getElementById("stocks").innerHTML = stocks;
} else {
	stocks = 5;
	localStorage.setItem("stocks", stocks);
	document.getElementById("stocks").innerHTML = stocks;
}

int = 1000;

window.setInterval(function(){
	if (localStorage.getItem("moneyBank")) {
		moneyCashe = localStorage.getItem("moneyBank");
	} else {
		localStorage.setItem("moneyBank", 0);
		moneyCashe = 0;
	}
	changeMoney = Number(Math.floor((Math.random() * 1000) + 100));
	what = Math.floor((Math.random() * 2) + 1);
	if (what === 1) {
		moneyCashe = Number(moneyCashe) + changeMoney;
	} else {
		moneyCashe = Number(moneyCashe) - changeMoney;
	}
	if (moneyCashe < 200) {
		moneyCashe = 200;
	}
	
	localStorage.setItem("moneyBank", moneyCashe);
	document.getElementById("price").innerHTML = moneyCashe;
	
	var change = localStorage.getItem("change");
	
	if (stocks > 0) {
		if (moneyCashe < Number(ch[0])) {
			var i = Number(ch[0]) - moneyCashe;
			document.getElementById("add").innerHTML = "Current price: -" + i;
			document.getElementById("title").innerHTML = "tmg (-" + i + ")";
		} else {
			var i = moneyCashe - Number(ch[0]);
			document.getElementById("add").innerHTML = "Current price: +" + i;
			document.getElementById("title").innerHTML = "tmg (+" + i + ")";
		}
	} else {
		document.getElementById("title").innerHTML = "The Money Game";
		document.getElementById("add").innerHTML = "Current price:";
	}
}, int);

function buy() {
	var price = localStorage.getItem("moneyBank");
	if (money < price) {
		alert("You dont have enough money!");
	} else {
		money = Number(money) - price;
		stocks += 1;
		localStorage.setItem("stocks", stocks);
		document.getElementById("stocks").innerHTML = stocks;
		localStorage.setItem("money", money);
		document.getElementById("money").innerHTML = money;
		ch.unshift(String(price));
		localStorage.setItem("ch", ch);
	}
}

function sell() {
	if (stocks > 0) {
		var price = localStorage.getItem("moneyBank");
		money = Number(money) + Number(price);
		stocks -= 1;
		localStorage.setItem("stocks", stocks);
		document.getElementById("stocks").innerHTML = stocks;
		localStorage.setItem("money", money);
		document.getElementById("money").innerHTML = money;
		ch.shift();
		localStorage.setItem("ch", ch);
		if (stocks > 0) {
			if (moneyCashe < Number(ch[0])) {
				var i = Number(ch[0]) - moneyCashe;
				document.getElementById("add").innerHTML = "Current price: -" + i;
				document.getElementById("title").innerHTML = "tmg (-" + i + ")";
			} else {
				var i = moneyCashe - Number(ch[0]);
				document.getElementById("add").innerHTML = "Current price: +" + i;
				document.getElementById("title").innerHTML = "tmg (+" + i + ")";
				if (i < minMax) {
					max = false;
				}
				if (minMax !== false) {
					if (i >= minMax && max === false) {
						Push.create("Now is your chance!", {
						body: "The profit is now more than " + minMax,
						timeout: 4000,
						onClick: function () {
							window.focus();
							this.close();
						}
						});
						//alert("yes");
						max = true;
					}
				}
			}
		} else {
			document.getElementById("title").innerHTML = "The Money Game";
			document.getElementById("add").innerHTML = "Current price:";
		}
	} else {
		alert("You dont have any stocks");
	}
}

function reset() {
	document.getElementById("price").innerHTML = "resetting...";
	localStorage.removeItem("moneyBank");
	localStorage.removeItem("money");
	localStorage.removeItem("stocks");
	localStorage.removeItem("change");
	localStorage.removeItem("ch");
	money = 2000;
	localStorage.setItem("money", money);
	document.getElementById("money").innerHTML = money;
	stocks = 5;
	localStorage.setItem("stocks", stocks);
	document.getElementById("stocks").innerHTML = stocks;
	ch = ["200","200","200","200","200"];
}

function toFixed(value, precision) {
	var precision = precision || 0,
	power = Math.pow(10, precision),
	absValue = Math.abs(Math.round(value * power)),
	result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));
	if (precision > 0) {
		var fraction = String(absValue % power),
		padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
			result += '.' + padding + fraction;
	}
	return result;
}

function transver() {
	if (localStorage.getItem("firebaseui::rememberedAccounts")) {
		var money = Number(localStorage.getItem("money"))
		var much = Number(prompt("How much do you want to transver?"));
		if (much === null || much === "") {
			return;
		}
		if (much < 1) {
			alert("This is less than 0")
			return;
		}
		if (much <= money) {
			var transverAmmount = Number(toFixed(much / 1000, 2));
			if (confirm("Are you sure you want to transver to pay? You'll get " + transverAmmount + " Credits") === true) {
				dbRef.once("value",function(snapshot) {
					if (snapshot.hasChild(uid)) {
						dbRef.child(uid).once("value",function(snapshot){
							var dbContent = snapshot.val();
							var gamepayCredits = Number(dbContent.value);
							var exportCredit = gamepayCredits + transverAmmount;
							dbRef.child(uid).child("value").set(exportCredit);
							dbRef.child(uid).child("latestTransaction").child("amount").set(transverAmmount);
							dbRef.child(uid).child("latestTransaction").child("type").set("add");
							dbRef.child(uid).child("latestTransaction").child("user").set("The Money Game");
							localStorage.setItem("money",money - much);
							document.getElementById("money").innerHTML = localStorage.getItem("money");
						})
					} else {
						alert("You haven't made a gamepay account")
					}
				})
			} else {
				return;
			}

		} else {
			alert("You dont have enough money");
		}
	} else {
		alert("You are not loged in")
	}
}

function logout() {
	if (confirm("If you logout you'll lose all your progress on this machine") === true){
		reset();
		localStorage.removeItem("firebaseui::rememberedAccounts");
		location.href="theMoneyGame.html";
	}
}