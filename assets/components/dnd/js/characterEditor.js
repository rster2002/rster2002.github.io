sUid = sessionStorage.getItem("::uid");

timer = setInterval(function() {
	if (sessionStorage.getItem("::openPage") === "characterEditor") {
		console.log("timer fire");
		if (sessionStorage.getItem("::saved") !== "false") {
			saveCharacter(false);
		}
	}
}, 15000);

$(".innerPage").ready(() => {
	$(".characterContainer").load("../assets/components/dnd/pages/characterSheet.html");
});

function ctrlS() {
	saveCharacter(true);
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
	} catch (e) {
		error(e);
	}
	loader.hide();
}

function saveCharacter(show) {
    
	se = false;
	
	try {
		s();
		if (show) {
			console.log(characterObj);
		}
		if (sessionStorage.getItem("::saved") !== "false") {
			dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::saved")).set(characterObj).then(() => {
				if (show) {
					note.open("Saved", 1000);
				}
			});
		} else {
			promptName();
		}
	} catch(e) {
		error(e);
	}
}

function loadCharacter(i) {
	try {
		if (i) {
			
			loader.show();
			
			dbUsers.child(sUid).child("characters").once("value",function(e){
				var dbContent = e.val();
				if (e.hasChild(i)) {
					var c = dbContent[i];
					console.log(c);
					l(c);
					sessionStorage.setItem("::saved",i);
					dbUsers.child(sUid).child("characters").child(i + "-info").once("value", function(e) {
						if (!e.hasChild("allowEdit")) {
							dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::saved") + "-info").child("allowEdit").set("0");
						} else {
							dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::saved") + "-info").once("value", function(e) {
								var options = e.val();
								$(".allowEdit").val(options.allowEdit);
							});
						}
					});
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

function del() {
	dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::saved") + "-info").once("value", function(e) {
		if (!e.hasChild("usedInCampaigns")) {
			if (confirm("Are you sure you want to delete this character sheet?")) {
				var characterId = sessionStorage.getItem("::openCharacter");
				dbUsers.child(sUid).child("characterList").once("value", function(e) {
					var list = e.val();
					var newList = [];
					for (var i = 0; i < list.length; ++i) {
						if (list[i] !== characterId) {
							newList.push(list[i]);
						}
					}
					dbUsers.child(sUid).child("characterList").set(newList);
				}).then(function() {
					dbUsers.child(sUid).child("characters").child(characterId).set(null);
					dbUsers.child(sUid).child("characters").child(characterId + "-info").set(null);
					openPage('characterList');
				});
			}
		} else {
			alert("You can't delete this character because it's in use in a campaign");
		}
	})
}

function onload() {
	loadCharacter(sessionStorage.getItem("::openCharacter"));
	$(".characterId").text(sessionStorage.getItem("::openCharacter"));
}

function saveOptions() {
	var allowEdit = $(".allowEdit").val();
	dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::saved") + "-info").child("allowEdit").set(allowEdit);
}
