sUid = sessionStorage.getItem("::uid");

$(".innerPage").ready(() => {
	$(".characterContainer").load("../assets/components/dnd/pages/characterSheet.html");
});

function ctrlS() {
	saveCharacter();
}

sessionStorage.setItem("::saved","false");
console.log("hmm");
function saveCharacter() {
    
	try {
		s();
		console.log(characterObj);
		if (sessionStorage.getItem("::saved") !== "false") {
			dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::saved")).set(characterObj).then(() => {
				note.open("Saved " + sessionStorage.getItem("::saved"), 1000);
			});
		} else {
			var i = prompt("Type a name for this caracter sheet");
			if (i) {
				sessionStorage.setItem("::saved",i);
				dbUsers.child(sUid).child("characters").child(i).set(characterObj);
				note.open("Saved " + sessionStorage.getItem("::saved"), 1000);
			}
		}
	} catch(e) {
		error(e);
	}
}

function saveAsCharacter() {
	s();
	var i = prompt("Type a name for this caracter sheet");
	if (i) {
		loader.show();
		sessionStorage.setItem("::saved",i);
		dbUsers.child(sUid).child("characters").child(i).set(characterObj);
		loader.hide();
	}
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