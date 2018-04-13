sUid = sessionStorage.getItem("::uid");

timer = setInterval(function() {
	console.log("timer fire");
	if (sessionStorage.getItem("::saved") !== "false") {
		saveCharacter();
	}
}, 15000);


$(".innerPage").ready(() => {
	$(".characterContainer").load("../assets/components/dnd/pages/characterSheet.html");
});

function ctrlS() {
	saveCharacter();
}

sessionStorage.setItem("::saved","false");
console.log("hmm");

function promptName() {
	input = prompt("Type a name for this caracter sheet");
	if (input) {
		if (sessionStorage.getItem("::saved") === "false") {
			dbUsers.child(sUid).once("value", (e) => {
				if (e.hasChild("characters")) {
					dbUsers.child(sUid).child("characters").once("value", (e) => {
						if (e.hasChild(input)) {
							if(confirm("Are you sure you want to overwrite this character sheet?")) {
								upCharacter();
							}
						} else {
							upCharacter();
						}
					});
				}
			});
		} else {
			upCharacter();
		}
	}
}

function upCharacter() {
	loader.show();
	try {
		sessionStorage.setItem("::saved", input);
		dbUsers.child(sUid).child("characters").child(input).set(characterObj);
	} catch (error) {
		
	}
	loader.hide();
}

function saveCharacter() {
    
	se = false;
	
	try {
		s();
		console.log(characterObj);
		if (sessionStorage.getItem("::saved") !== "false") {
			dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::saved")).set(characterObj).then(() => {
				note.open("Saved " + sessionStorage.getItem("::saved"), 1000);
			});
		} else {
			promptName();
		}
	} catch(e) {
		error(e);
	}
}

function saveAsCharacter() {
	
	se = false;
	
	s();
	promptName();
}

function loadCharacter() {
	try {
		var i = prompt("Type the name of the caracter sheet you want to load");
		if (i) {
			
			loader.show();
			
			dbUsers.child(sUid).child("characters").once("value",function(e){
				var dbContent = e.val();
				if (e.hasChild(i)) {
					var c = dbContent[i];
					console.log(c);
					l(c);
					sessionStorage.setItem("::saved",i);
					loader.hide();
				} else {
					loader.hide();
					note.open("Couldn't find this character in your account", 3000);
				}
			});

			loader.hide();
		}
	} catch(e) {
		error(e);
	}
}