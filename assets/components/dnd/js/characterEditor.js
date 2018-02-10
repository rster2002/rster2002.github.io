sUid = sessionStorage.getItem("::uid");

$(".innerPage").ready(() => {
	$(".characterContainer").load("../assets/components/dnd/pages/characterSheet.html");
});

sessionStorage.setItem("::saved","false");
console.log("hmm");
function saveCharacter() {
    
	try {
		s();
		console.log(characterObj);
		if (sessionStorage.getItem("::saved") !== "false") {
            loader.show();
			dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::saved")).set(characterObj);
			alert("Saved character sheet");
            loader.hide();
		} else {
			var i = prompt("Type a name for this caracter sheet");
			if (i) {
				loader.show();
				sessionStorage.setItem("::saved",i);
				dbUsers.child(sUid).child("characters").child(i).set(characterObj);
				alert("Saved character sheet");
				loader.hide();
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
					alert("Couldn't find this character in your account");
				}
			});

			loader.hide();
		}
	} catch(e) {
		error(e);
	}
}