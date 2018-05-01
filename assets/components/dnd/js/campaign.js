loader.show();
$(".innerPage").ready(() => {
    $(".characterContainer").load("../assets/components/dnd/pages/characterSheet.html");
	
	$("#partyId").text(sessionStorage.getItem("::party"));
});
var partyId = sessionStorage.getItem("::party");
var sUid = sessionStorage.getItem("::uid");
var isDM = false;


timer = setInterval(function() {
	if (sessionStorage.getItem("::openPage") === "campaign") {
		if (loadedUid === sUid) {
			save();
		}
	}
}, 15000);

console.log("party.js");

loadedUid = false;

function ctrlS() {
	if (loadedUid) {
		save(false);
	}
}

// get campaign info
if (sessionStorage.getItem("::join") !== "true") {
	dbCampaign.child(partyId).once("value",(e) => {
		update(e.val());
	});
} else {
	sessionStorage.setItem("::join", "false");
}

dbCampaign.child(partyId).child("liveState").on("value", (u) => {
	if (u.val() === "update") {
		dbCampaign.child(partyId).once("value",(e) => {
			var partyContent = e.val();
			update(partyContent);
			dbCampaign.child(partyId).child("liveState").set("resting");
		});
	} else if (u.val() === "changeId") {
		alert("The campaign id was changed");
		openPage("campaignMenu");
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
	
	// sets isDM var and shows hidden buttons
	if (sUid === dmUid) {
		isDM = true;
		
		$(".changeId").show();
		$(".delete").show();
	} else {
		$(".leave").show();
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
					
					if (sUid === lUid) {
						selfl(characterObj);
					} else if (isDM) {
						dbUsers.child(loadedUid).child("characters").child(characterName + "-info").once("value", function(inf) {
							var content = inf.val();
							if (inf.hasChild("allowEdit")) {
								allowEdit = content["allowEdit"];
							} else {
								dbUsers.child(loadedUid).child("characters").child(characterName + "-info").child("allowEdit").set("0");
								allowEdit = "0";
							}
							
							
							if (allowEdit === "1") {
								selfl(characterObj);
							} else {
								l(characterObj);
							}
						});
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

function save(showNote) {
	if (isDM === false) {
		if (loadedUid === sUid) {
			s();
			dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::saved")).set(characterObj);
			if (showNote) {
				note.open("Saved " + $("#form96_1").val(), 1000);
			}
		} else {
			error("You are trying to save a character sheet that isn't yours!")
		}
	} else if (isDM === true) {
		try {
			s();
			dbUsers.child(loadedUid).child("characters").child(sessionStorage.getItem("::saved")).set(characterObj);
			if (showNote) {
				note.open("Saved " + $("#form96_1").val(), 1000);
			}
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

// DM functions

function changeId() {
	
	// Creates a function required later
	function updateList(wUid) {
		
		// gets the players campaign list
		dbUsers.child(wUid).child("campaigns").once("value", c => {
			var l = c.val();

			// creates a new empty list
			var re = [];
			for (var camp = 0; camp < l.length; ++camp) {
				
				// gets the campaign in the list
				var campaignName = l[camp];
				
				// checks if the campaign in the list is the same as the chaning id
				if (campaignName === partyId) {
					
					// if true add the new id instead of the old one
					re.unshift(newId);
				} else {
					
					// if false just add it to the new list
					re.unshift(campaignName);
				}
			}
			
			// pushes the new list to the database
			dbUsers.child(wUid).child("campaigns").set(re);
		});
	}
	
	// checks if the currect user is the DM of the party
	if (isDM) {
		
		// Prompts a new id
		var newId = prompt("Type the new campaign id");
		
		// checks if its a valid id
		if (newId !== undefined || newId !== "" || newId !== false) {
			
			// gets the campaigns
			dbCampaign.once("value", a => {
				
				// checks if there is a campaign with that id already
				if (a.hasChild(newId)) {
					
					// alerts the user that that id is already in use and stops the function
					alert("This id is already in use!");
					return;
				} else {
					
					// gets the playerlist form the campaign
					dbCampaign.child(partyId).child("playerList").once("value", l => {
						var playerList = l.val();
						
						// for every user update their campaign list
						for (var i = 0; i < playerList.length; ++i) {
							var wUid = playerList[i];

							updateList(wUid);
						}

					}).then(function() {
						
						// when all the users campaign lists are updated, migrate the campaign data to the new id
						dbCampaign.child(partyId).once("value", (d) => {
							
							// gets the data from the old id
							data = d.val();

							// adds it to the new id
							dbCampaign.child(newId).set(data);
							
							// sets the liveState to 'changeId' to users need to reconnect
							dbCampaign.child(partyId).child("liveState").set("changeId");
							
							// deletes the old id
							dbCampaign.child(partyId).set(null);
						});
					});
				}
			});
		}
	} else {
		error("You are not the DM! But you are a hacker (unless you're not)");
	}
}


function kick(ban, f) {
	function next() {
		dbCampaign.child(partyId).child(loadedUid).child("character").once("value", function(e) {
			var character = e.val();
			dbUsers.child(loadedUid).child("characters").child(character + "-info").child("usedInCampaigns").once("value", function(c) {
				var list = c.val();
				var newList = [];
				if (list === undefined) {
					for (var i = 0; i < list.length; ++i) {
						if (list[i] !== partyId) {
							newList.unshift(list[i]);
						}
					}
					dbUsers.child(loadedUid).child("characters").child(character + "-info").child("usedInCampaigns").set(newList);
				}
				
			}).then(function() {
				dbCampaign.child(partyId).once("value",function(e) {
					var partyContent = e.val();
					var partyArray = partyContent.playerList;
					rePlayerList = [];
					for (var i = 0; i < partyArray.length; ++i) {
						if (partyArray[i] === loadedUid) {
							console.log("kicked: " + partyArray[i]);
						} else {
							rePlayerList.push(partyArray[i]);
						}
					}
				}).then(function() {
					dbUsers.child(loadedUid).once("value", e => {
						var dbContent = e.val();
						var campaignsArray = dbContent.campaigns;
						reCampaignList = [];
						for (var i = 0; i < campaignsArray.length; ++i) {
							if (campaignsArray[i] === partyId) {
								console.log("removed " + partyId + " from users party list");
							} else {
								reCampaignList.push(campaignsArray[i]);
							}
						}
					}).then(function() {
						dbUsers.child(loadedUid).child("campaigns").set(reCampaignList);
						dbCampaign.child(partyId).child("playerList").set(rePlayerList);
						dbCampaign.child(partyId).child(sUid).set(null);
						dbCampaign.child(partyId).child("liveState").set("update");

						if (f !== undefined) {
							f();
						}
					});
				});
			});
		});
//		dbCampaign.child(partyId).child("liveState").set("update");
		

		$(".kick").hide();
		$(".ban").hide();
		$(".save").hide();
	}
	
	if (ban) {
		next();
	} else {
//		uijs.box.open({
//			title: "Confirm",
//			content: "Are you sure you want to kick this person?",
//			btnTrue: "Yes",
//			btnFalse: "no",
//			onTrue: next()
//		})
		if (confirm("Are you sure you want to kick this person?")) {
			next();
		}
	}
}

function ban() {
	if (confirm("Are you sure you want to ban this person?")){
		dbCampaign.child(partyId).once("value",(e) => {
			var partyContent = e.val();
			if (e.hasChild("banList")) {
				banList = partyContent.banList;
			} else {
				banList = [];
			}
			
			banList.unshift(loadedUid);
			
			dbCampaign.child(partyId).child("banList").set(banList);
			dbCampaign.child(partyId).child(loadedUid).set(null);


			kick(true);
		});
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

function del() {
	if (confirm("Are you sure you want to delete this campaign?")) {
		if (confirm("Are you realy sure you want to delete this campaign?")) {
			dbCampaign.child(partyId).once("value", function(e) {
				var content = e.val();
				var playerList = content.playerList;
				var dM = content.DM;
				for (var i = 0; i < playerList.length; ++i) {
					var player = playerList[i];
					if (!player === dM) {
						loadedUid = player;
						kick(true);
					}
				}
				
				loadedUid = dM;
				kick(true);
				dbCampaign.child(partyId).set(null);
				openPage("campaignMenu");
			});
		}
	}
}

function leave() {
	if (confirm("Are you sure you want to leave this campaign?")) {
		loadedUid = sUid;
		kick(true, function() {
			openPage("campaignMenu");
		});
	}
}

function onload() {
	loader.hide();
}