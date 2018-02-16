loader.show();
$(".innerPage").ready(() => {
    $(".characterContainer").load("../assets/components/dnd/pages/characterSheet.html");
	
	$("#partyId").text(sessionStorage.getItem("::party"));
});
var partyId = sessionStorage.getItem("::party");
var sUid = sessionStorage.getItem("::uid");
var isDM = false;

console.log("party.js");

dbCampaign.child(partyId).once("value",(e) => {
	update(e.val());
	loader.hide();
});

dbCampaign.child(partyId).child("liveState").on("value", (u) => {
	if (u.val() === "update") {
		dbCampaign.child(partyId).once("value",(e) => {
			var partyContent = e.val();
			update(partyContent);
			dbCampaign.child(partyId).child("liveState").set("resting");
		});
	}
});

function update(partyContent) {
	
	function addToList(ww, characterw) {
		dbUsers.child(ww).once("value",(u) => {
			var userContent = u.val();
			var characterName = userContent.characters[characterw]["96_1"];
			var username = userContent.username;
			var usericon = userContent.usericon;
			var onclick = "loadCharacter('" + userContent.uid + "')";
			
			$(".innerList").append("<div class='player' onclick=" + onclick + "><img src=" + usericon + "><h1>" + characterName + "</h1></div>");
		});
	}
	
	// gets the DM uid
	dmUid = partyContent.DM;
	
	// sets isDM var
	if (sUid === dmUid) {
		isDM = true;
	}
	
	
	// updates the player list
	var playerList = partyContent.playerList;
	
	// clears the list
	$(".innerList").remove();
	$(".playerList").append("<div class='innerList'></div>");
	
	
	// for every player in the player list, add it to the ui
	for (var i = 0; i < playerList.length; ++i) {
		var w = playerList[i];
		if (w !== dmUid) {
			var character = partyContent[w]["character"];
			console.log(w + " " + character);
			addToList(w, character);
		}
	}
	
	// adds the DM's info to the page
	dbUsers.child(dmUid).once("value", (u) => {
		var userinfo = u.val();
		$("#DMusericon").attr("src", userinfo.usericon);
		$("#DMusername").text(userinfo.username);
	})
}

// $(".innerList").append("<div class='player' onclick=" + onclick + "><img src=" + dbUsersContent.usericon + "><h1>" + dbUsersContent.username + "</h1></div>")

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
		dbCampaign.child(partyId).child(lUid).once("value",(e) => {
			var playerObj = e.val();
			var characterName = playerObj.character;
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
		dbCampaign.child(partyId).once("value",function(e) {
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
			dbCampaign.child(partyId).child("playerList").set(rePlayerList);
		});

		dbUsers.child(loadedUid).once("value", e => {
			var dbContent = e.val();
			var campaignsArray = dbContent.campaigns;
			var rePartyList = [];
			for (var i = 0; i < campaignsArray.length; ++i) {
				if (campaignsArray[i] === partyId) {
					console.log("removed " + partyId + " from users party list");
				} else {
					reCampaignList.push(campaignsArray[i]);
					console.log("skipped: " + campaignsArray[i]);
				}
			}
			dbUsers.child(loadedUid).child("campaigns").set(rePartyList);
		});
		$(".kick").hide();
		$(".save").hide();
	}
}

function ban() {
	if (confirm("Are you sure you want to ban this person?")) {
		dbCampaign.child(partyId).once("value",(e) => {
			var partyContent = e.val();
			if (e.hasChild("banList")) {
				banList = partyContent.banList;
			} else {
				banList = [];
			}
			
			banList.unshift(loadedUid);
			console.log(banList);
			
			dbCampaign.child(partyId).child("banList").set(banList);
			dbCampaign.child(partyId).child(loadedUid).set(null);
			
			
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