$(".characterSheetContainer").load("../assets/components/dnd/pages/characterSheet.html");
var partyId = sessionStorage.getItem("::partyId");
var uid = sessionStorage.getItem("::uid");
var sUid = sessionStorage.getItem("::uid");
var isDM = false;

console.log("party.js");

dbParty.child(partyId).on("value",function(e){
	$(".side .inner").remove();
	$(".side").append("<div class='inner'></div>")
	var dbContent = e.val();
	console.log(dbContent);
	var array = dbContent.playerList;
	for (var i = 0; i < array.length; ++i) {
		tUid = array[i];
		console.log("---")
		if (array[i].includes("DM::")) {
			console.log("Found DM");
			var DMUid = array[i].replace("DM::","");
			if (sUid === DMUid) {
				isDM = true;
			}
		} else {
			console.log("Found user");
			dbUsers.child(array[i]).once("value",function(e){
				var dbUsersContent = e.val();
				console.log(dbUsersContent.username + " " + dbUsersContent.usericon + " " + dbUsersContent.uid);
				var onclick = "loadCharacter('" + dbUsersContent.uid + "')";
				$(".side .inner").append("<img src=" + dbUsersContent.usericon + " onclick=" + onclick + ">")
			});
		}
		console.log(tUid);
	}
});

pages = {
	1: 106,
	2: 16,
	3: 214
}

// called when clicked on user
function loadCharacter(uid) {
	
	// load the party from the database
	dbParty.child(partyId).once("value",function(e){
		
		// loads the data
		var dbContent = e.val();
		try {
			
			// sets the character name
			var characterName = dbContent[uid];
			
			// gets the character from the users characters
			dbUsers.child(uid).child("characters").once("value",function(e){
				var dbCharacter = e.val();
				var characterObj = dbCharacter[characterName];
				console.log(characterObj);
				try {
					
					// checks if the uid is the same as the uid used to load the character
					if (uid === sUid) {
						
						// if true set saved to charactername and self load the character
						sessionStorage.setItem("::saved",characterName);
						selfl(characterObj);
					} else if (isDM === true) {
						$("#kick").show();
						console.log(characterName);
						sessionStorage.setItem("::saved",characterName);
						loadedUid = uid;
						selfl(characterObj);
					} else {
						l(characterObj);
					}
				} catch(e) {
					error(e);
				}
			})
		} catch(e) {
			error(e);
		}
	})
}

function l(characterObj) {
	$("#save").hide();
	for (var page = 0; page <= 3; ++page) {
		if (page > 0) {
			for (var i = 0; i <= pages[page]; ++i) {
				if (i > 0) {
					var obj = $("#form" + i + "_" + page);
					if (obj.is("input")) {
						if (obj.is(":text")) {
							$("input#form" + i + "_" + page).val(characterObj[i + "_" + page]);
							$("input#form" + i + "_" + page).attr("disabled","disabled");
						}
					} else if (obj.is("textarea")) {
						$("textarea#form" + i + "_" + page).val(characterObj[i + "_" + page]);
						$("textarea#form" + i + "_" + page).attr("disabled","disabled");
					} else if ($("input#form" + i + "_" + page).is(":checkbox")) {
						if (characterObj[i + "_" + page] === true) {
							$("input#form" + i + "_" + page).prop("checked",true);
							$("img#form" + i + "_" + page).attr("src","1/form/3011 0 ROn.png");
						} else {
							$("input#form" + i + "_" + page).prop("checked",false);
							$("img#form" + i + "_" + page).attr("src","1/form/3015 0 ROff.png");
						}
					}
				}
			}
		}
	}
}

function selfl(characterObj) {
	$("#save").show();
	for (var page = 0; page <= 3; ++page) {
		if (page > 0) {
			for (var i = 0; i <= pages[page]; ++i) {
				if (i > 0) {
					var obj = $("#form" + i + "_" + page);
					if (obj.is("input")) {
						if (obj.is(":text")) {
							$("input#form" + i + "_" + page).val(characterObj[i + "_" + page]);
							$("input#form" + i + "_" + page).removeAttr("disabled");
						}
					} else if (obj.is("textarea")) {
						$("textarea#form" + i + "_" + page).val(characterObj[i + "_" + page]);
						$("textarea#form" + i + "_" + page).removeAttr("disabled");
					} else if ($("input#form" + i + "_" + page).is(":checkbox")) {
						if (characterObj[i + "_" + page] === true) {
							$("input#form" + i + "_" + page).prop("checked",true);
							$("img#form" + i + "_" + page).attr("src","1/form/3011 0 ROn.png");
						} else {
							$("input#form" + i + "_" + page).prop("checked",false);
							$("img#form" + i + "_" + page).attr("src","1/form/3015 0 ROff.png");
						}
					}
				}
			}
		}
	}
}

function save() {
	if (isDM === false) {
		s();
		console.log(characterObj);
		dbUsers.child(uid).child("characters").child(sessionStorage.getItem("::saved")).set(characterObj);
		alert("Saved character sheet");
	} else if (isDM === true) {
		try {
			s();
			console.log(characterObj);
			console.log(loadedUid);
			dbUsers.child(loadedUid).child("characters").child(sessionStorage.getItem("::saved")).set(characterObj);
			alert("Saved " + sessionStorage.getItem("::saved"));
		} catch(e) {
			error(e);
		}
	} else {
		error("You are the DM and not the DM! Superposition confirmed?!");
	}
}

function s() {
	characterObj = {};
	for (var page = 0; page <= 3; ++page) {
		if (page > 0) {
			for (var i = 0; i <= pages[page]; ++i) {
				if (i > 0) {
					var obj = $("#form" + i + "_" + page);
					if (obj.is("input")) {
						if (obj.is(":text")) {
							characterObj[i + "_" + page] = $(obj).val();
						}
					} else if (obj.is("textarea")) {
						characterObj[i + "_" + page] = $(obj).val();
					} else if ($("input#form" + i + "_" + page).is(":checkbox")) {
						characterObj[i + "_" + page] = $("input#form" + i + "_" + page).is(":checked");
					}
				}
			}
		}
	}
}

function kick() {
	if (confirm("Are you sure you want to kick this person?") === true) {
		dbParty.child(partyId).once("value",function(e) {
			var partyContent = e.val();
			console.log(partyContent);
			var partyArray = partyContent.playerList;
			var rePlayerList = [];
			for (var i = 0; i < partyArray.length; ++i) {
				if (partyArray[i] === loadedUid) {
					console.log("kicked: " + partyArray[i]);
				} else {
					rePlayerList.push(partyArray[i]);
					console.log("skipped: " + partyArray[i])
				}
			}
			dbParty.child(partyId).child("playerList").set(rePlayerList);
		});

		dbUsers.child(loadedUid).once("value", e => {
			var dbContent = e.val();
			var partiesArray = dbContent.parties;
			var rePartyList = [];
			for (var i = 0; i < partiesArray.length; ++i) {
				if (partiesArray[i] === partyId) {
					console.log("removed " + partyId + " from users party list");
				} else {
					rePartyList.push(partiesArray[i]);
					console.log("skipped: " + partiesArray[i]);
				}
			}
			dbUsers.child(loadedUid).child("parties").set(rePartyList);
		});
		$("#kick").hide();
		$("#save").hide();
	}
}