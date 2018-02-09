$(".innerPage").ready(() => {
	$(".characterContainer").load("../assets/components/dnd/pages/characterSheet.html");
	
	$("#partyId").text(sessionStorage.getItem("::party"));
});
var partyId = sessionStorage.getItem("::party");
var sUid = sessionStorage.getItem("::uid");
var isDM = false;

console.log("party.js");

dbParty.child(partyId).child("playerList").on("value",(e) => {
	
	dbParty.child(partyId).once("value",(u) => {
		var dbContent = u.val();

		// checks if there is a DM
		if (!u.hasChild("DM")) {
			error("There was an error loading the party.");
			openPage("mainMenu");
		}

		var dmUid = dbContent.DM;
		sessionStorage.setItem("::dm",dmUid)
		console.log(dmUid);

		// gets the DM's user info
		dbUsers.child(dmUid).once("value",(v) => {
			var userinfo = v.val();

			$("#DMusericon").attr("src", userinfo.usericon);
			$("#DMusername").text(userinfo.username);
		});

		if (sUid === dmUid) {
			isDM = true;
		} else {
			isDM = false;
		}
	});

	
	var height = 0;
	list = {};
	$(".innerList").remove();
	$(".playerList").append("<div class='innerList'></div>");
	var playerList = e.val();
	
	var dm = sessionStorage.getItem("::dm");
	console.log(playerList);
	
	for (var i = 0; i < playerList.length; ++i) {
			tUid = playerList[i];
			console.log("---")
			if (tUid !== sessionStorage.getItem("::dm")) {
				console.log("Found user");
				dbUsers.child(playerList[i]).once("value",function(e){
					var dbUsersContent = e.val();
					console.log(dbUsersContent.username + " " + dbUsersContent.usericon + " " + dbUsersContent.uid);
					var onclick = "loadCharacter('" + dbUsersContent.uid + "')";
					$(".innerList").append("<div class='player' onclick=" + onclick + "><img src=" + dbUsersContent.usericon + "><h1>" + dbUsersContent.username + "</h1></div>")
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
	
	loader.show();
	
	var lUid = uid;
	loadedUid = uid;
	
	try {
		dbParty.child(partyId).child(lUid).once("value",(e) => {
			var characterName = e.val();
			sessionStorage.setItem("::saved", characterName);
			try {	
				dbUsers.child(lUid).child("characters").child(characterName).once("value",(e) => {
					var characterObj = e.val();
					console.log(characterObj);
					
					if (sUid === lUid) {
						selfl(characterObj);
					} else if (isDM) {
						selfl(characterObj);
						$(".kick").show();
						$(".ban").show();
					} else {
						l(characterObj);
					}
					
					loader.hide();
				})
			} catch(e) {
				error(e);
			}
		});
	} catch(e) {
		error(e);
	}
}

function l(characterObj) {
	$(".save").hide();
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
	$(".save").show();
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
		dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::saved")).set(characterObj);
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

function kick(ban) {
	if (ban) {
		next = true;
	} else {
		next = confirm("Are you sure you want to kick this person?");
	}
	
	if (next) {
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
		$(".kick").hide();
		$(".save").hide();
	}
}

function ban() {
	if (confirm("Are you sure you want to ban this person?")) {
		dbParty.child(partyId).once("value",(e) => {
			var partyContent = e.val();
			if (e.hasChild("banList")) {
				banList = partyContent.banList;
			} else {
				banList = [];
			}
			
			banList.unshift(loadedUid);
			console.log(banList);
			
			dbParty.child(partyId).child("banList").set(banList);
			dbParty.child(partyId).child(loadedUid).set(null);
			
			
			kick(true);
		})
	}
}

// some small functions

var visible = true;

function toggleCharacter() {
	if (visible) {
		visible = false;
		$(".characterContainer").hide();
		$("#toggle").text("Show character sheet");
		$(".save").hide();
		$(".kick").hide();
		$(".ban").hide();
	} else {
		visible = true;
		$(".characterContainer").show();
		$("#toggle").text("Hide character sheet");
	}
}