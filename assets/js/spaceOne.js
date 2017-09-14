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

document.addEventListener("DOMContentLoaded", function(event) { 
	var user = firebase.auth().currentUser;
	firebase.auth().onAuthStateChanged(function(user) {
		if (user != null) {
			username = user.displayName;
			userIcon = user.photoURL;
			uid = user.uid;

			document.getElementById("userIcon").setAttribute("src",userIcon);
			document.getElementById("userName").innerHTML = username;
		}
	});
});

$("#userIcon").dblclick(function(){
	location.href="../pay.html";
})

// checks if dom loaded for stored planet and loads it
document.addEventListener("DOMContentLoaded", function(event) { 
	if (localStorage.getItem("planetName")) {
		var planetName = localStorage.getItem("planetName");
		var planetType = Number(localStorage.getItem("planetType"));
		document.getElementById("planetName").innerHTML = "Name:" + planetName;
		if (planetType === 1) {
			document.getElementById("planetIcon").setAttribute("src","../assets/images/spaceOne/earth.png");
			switch (Number(localStorage.getItem("randomResource"))) {
				case 1:
					planetResource = "wood";
					break;

				case 2:
					planetResource = "water";
					break;
			}
		}
		if (planetType === 2) {
			document.getElementById("planetIcon").setAttribute("src","../assets/images/spaceOne/mars.png");
			switch (Number(localStorage.getItem("randomResource"))) {
				case 1:
					planetResource = "iron";
					break;

				case 2:
					planetResource = "titanium";
					break;
			}
		}
		planetMultiplier = Number(localStorage.getItem("planetMultiplier"));
		planetTotal = Number(localStorage.getItem("planetTotal"));
		if (planetTotal > 0) {
			$("#planetTotal").text(planetTotal);
		} else {
			$("#planetTotal").text("-");
		}
		document.getElementById("planetMultiplier").innerHTML = "x" + planetMultiplier;
		document.getElementById("planetResource").innerHTML = "Resource:" + planetResource;
		localStorage.setItem("planetName",planetName);
	} else {
		genPlanet();
	}
});

// checks for stored mining level and loads it
if (localStorage.getItem("miningLevel")) {
	miningLevel = localStorage.getItem("miningLevel");
} else {
	miningLevel = 1;
	if (miningLevel >= 5) {
		
	}
}


// checks for stored resources and loads them
if (localStorage.getItem("wood")) {
	wood = localStorage.getItem("wood");
	water = localStorage.getItem("water");
	iron = localStorage.getItem("iron");
	titanium = localStorage.getItem("titanium");
} else {
	wood = 0;
	water = 0;
	iron = 0;
	titanium = 0;
	saveResources();
}

// function for random text
function randomText(lenth) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < lenth; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

// function for generating planets
function genPlanet() {
	var planetName = randomText(5);
	var planetType = Math.floor((Math.random() * 2) + 1);
	document.getElementById("planetName").innerHTML = "Name:" + planetName;
	var randomResource = Math.floor((Math.random() * 2) + 1);
	if (planetType === 1) {
		document.getElementById("planetIcon").setAttribute("src","../assets/images/spaceOne/earth.png");
		planetTotal = Math.floor((Math.random() * 20) + 1);
		switch (Math.floor((Math.random() * 2) + 1)) {
			case 1:
				planetResource = "wood";
				localStorage.setItem("randomResource",1);
				break;

			case 2:
				planetResource = "water";
				localStorage.setItem("randomResource",2);
				break;
		}
	}
	if (planetType === 2) {
		document.getElementById("planetIcon").setAttribute("src","../assets/images/spaceOne/mars.png");
		planetTotal = Math.floor((Math.random() * 10) + 1);
		switch (Math.floor((Math.random() * 2) + 1)) {
			case 1:
				planetResource = "iron";
				localStorage.setItem("randomResource",1);
				break;

			case 2:
				planetResource = "titanium";
				localStorage.setItem("randomResource",2);
				break;
		}
	}
	localStorage.setItem("planetType",planetType);
	planetMultiplier = Math.floor((Math.random() * 3) + 1);
	$("#planetTotal").text(planetTotal);
	localStorage.setItem("planetTotal",planetType);
	localStorage.setItem("planetMultiplier", planetMultiplier);
	document.getElementById("planetMultiplier").innerHTML = "x" + planetMultiplier;
	document.getElementById("planetResource").innerHTML = "Resource:" + planetResource;
	localStorage.setItem("planetName",planetName);
}

function saveResources() {
	localStorage.setItem("wood",wood);
	localStorage.setItem("water",water);
	localStorage.setItem("iron",iron);
	localStorage.setItem("titanium",titanium);
}

// function for sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showResources() {
	$("#wood").text("wood:" + wood);
	$("#water").text("water:" + water);
	$("#iron").text("iron:" + iron);
	$("#titanium").text("titanium:" + titanium);
	$("#resources").slideDown();
}

function closeResources() {
	$("#resources").slideUp();
}

coolDown = false;

// function for mining
async function mine() {
	if (coolDown === false) {
		if (planetTotal >= 0) {
			coolDown = true;
			$("#mineState").text("Mining...");
			await sleep(5000);
			switch (planetResource) {
				case 'water':
					water = Number(water) + planetMultiplier;
					break;

				case 'wood':
					wood = Number(wood) + planetMultiplier;
					break;

				case 'iron':
					iron = Number(iron) + planetMultiplier;
					break;

				case 'titanium':
					titanium = Number(titanium) + planetMultiplier;
					break;
			}
			planetTotal = planetTotal - planetMultiplier;
			if (planetTotal > 0) {
				$("#planetTotal").text(planetTotal);
			} else {
				$("#planetTotal").text("-");
			}
			localStorage.setItem("planetTotal",planetTotal);
			saveResources();
			$("#mineState").text("");
			coolDown = false;
		}
	} else {
		$("#mineState").css("color","red");
		await sleep(200);
		$("#mineState").css("color","white");
		await sleep(200);
		$("#mineState").css("color","red");
		await sleep(200);
		$("#mineState").css("color","white");
	}
}

$(document).ready(function(){
	$("#btnTravel").on("click",function(){
		genPlanet();
	});
});

// function for logging out
function logout() {
	localStorage.removeItem("firebaseui::rememberedAccounts");
	location.href="../spaceOne.html";
}