console.log("partyMenu.js");
sUid = sessionStorage.getItem("::uid");

obj = {};

function checkInput(input) {
	if (input === "" || input === '' || input === undefined || input === null) {
		return false;
	} else {
		return input;
	}
}


// adds listerer to join btn

var localcampaigns = {};

function addList(id, place) {
	dbCampaign.child(id).once("value",e => {
		console.log(id);
		try {
			var party = e.val();
			var playerArray = party.playerList;
			var players = playerArray.length;
			players -= 1;
			localcampaigns[place] = id;
			$(".partyList").append("<div class='party' onclick='clickParty(" + place + ")'><h1>" + id + "</h1><p>" + players + " players in this campaign</p></div>");
		} catch(e) {
			error(e);
		}
	});
}

dbUsers.child(sUid).once("value",e => {
	// adds 'add party' to list
	$(".partyList").append("<div class='createParty'><div class='deletable'><h1>Add Campaign</h1></div><div class='addParty'><input id='partyId' placeholder='party id' type='text'><button id='join'>Join</button><button id='host'>Create</button></div></div>");
	
	// adds items to list
	var dbContent = e.val();
	console.log(dbContent);
	if (dbContent !== undefined) {
		var campaignsArray = dbContent.campaigns;
		if (campaignsArray !== undefined) {
			console.log(campaignsArray);
			for (var i = 0; i < campaignsArray.length; ++i) {
				var partyId = campaignsArray[i]
				addList(partyId, i);
			}
		}
	}
	
	// add button hooks
	$(".createParty").on("click",function(){
		$(".deletable").hide();
		$(".addParty").show();
	});
	
	$("#join").on("click",function(){
		join($("#partyId").val(),false);
	});
	
	
	// adds lisener to host btn
	$("#host").on("click",function(){
		host($("#partyId").val());
	});
});

function clickParty(index) {
	var partyId = localcampaigns[index];
	join(partyId,false);
}

/*
host checklist

/ check if the party id is already in use

/ create the party in the database
/ create a playerlist with only the dm's uid listed
/ add an 'DM' with the 'uid' to the 'partyId'
/ add the party id to the users party list
*/

function host(partyId) {
	
	// checks if there is a party with the same party id in the database
	dbCampaign.once("value",(e) => {
		if (e.hasChild(partyId)) {
			alert("This party id is already in use!");
			return;
		} else {
			
			// creates and pushes the party to the database
			try {
				var partyObj = {};
				var playerList = [];
				playerList.unshift(sUid);
				partyObj["playerList"] = playerList;
				partyObj["DM"] = sUid;
				partyObj[sUid] = "DM";
				console.log(partyObj);
				dbCampaign.child(partyId).set(partyObj);
			} catch(e) {
				error(e);
			};
			
			// adds the party
			try {
				dbUsers.child(sUid).once("value",(e) => {
					var dbContent = e.val();
					
					if (e.hasChild("campaigns")) {
						var campaigns = dbContent.campaigns;
					} else {
						var campaigns = [];
					}
					
					campaigns.unshift(partyId);
					dbUsers.child(sUid).child("campaigns").set(campaigns);
				});
			} catch(e) {
				error(e);
			}
			
			// continues to the party screen
			try {
				sessionStorage.setItem("::party",partyId);
				openPage("campaign");
			} catch(e) {
				error(e);
			}
		}
	});
}

/*
join checklist:

/ checks if the party exists
/ checks if the player is already in the database
/ ask for the character
/ checks if the character exists

- add the uid to the playerlist of the party
- add the uid linked with the character to the party
- add the party to the party list
*/

function join(partyId) {
	
	sessionStorage.setItem("::cached", partyId)
	
	// checks if the party exits
	dbCampaign.once("value",(e) => {
		if (e.hasChild(partyId)) {
			dbCampaign.child(partyId).once("value",(e) => {
				
				// checks if the player already exists in the party
				if (e.hasChild(sUid)) {
					
					// continues the user through to the party screen
					sessionStorage.setItem("::party",partyId);
					openPage("campaign");
				} else {
					
					banned = false;
					
					// checks if the user is banned
					dbCampaign.child(partyId).once("value",(e) => {
						
						if (e.hasChild("banList")) {
							var c = e.val();
							var banList = c.banList;
							
							for (var i = 0; i < banList.length; ++i) {
								if (sUid === banList[i]) {
									alert("You've been banned from this party!");
									banned = true;
								}
							}
						}
					});
					if (!banned) {
						selectCharacter();
					}
				}
			});
		} else {
			alert("Couldn't find this party id");
			return;
		}
	});
}

function selectCharacter() {
	$(".selectCharacter").show();
	dbUsers.child(sUid).once("value", function(e) {
		if (e.hasChild("characterList")) {
			dbUsers.child(sUid).child("characterList").once("value", function(e) {
				var characterList = e.val();
				for (var i = 0; i < characterList.length; ++i) {
					addTolist(i, characterList[i]);
				}
			});
		} else {
			$(".selectCharacter .inner").append("<div class='noCharacter'><h1>You don't have a character!</h1><p>Create one in the character editor.</p></div>");
		}
	});
}

function addTolist(i, characterId) {
	dbUsers.child(sUid).child("characters").child(characterId).once("value", function(c) {
		var characterObj = c.val();
		var characterName = characterObj["96_1"];
		$(".selectCharacter .inner").append("<div class='item'><div class='card shadow-4' onclick='afterSelect(" + i + ")'><h1>" + characterName + "</h1></div></div>");
		obj[i] = characterId;
	})
}

function afterSelect(index) {
	$("selectCharacter").hide();
	
	character = obj[index];
	partyId = sessionStorage.getItem("::cached");
	
	if (confirm("Are you sure you want to use this character?")) {
		// checks if the character exists in the users account
		dbUsers.child(sUid).child("characters").once("value",(e) => {
			if (e.hasChild(character)) {

				// catches the whole party obj from the database
				dbCampaign.child(partyId).once("value",(e) => {
					
					var dbContent = e.val();
					o = dbContent;
					
					// creates an empty object that is filled later
					chaObj = {};
					
					// sets the character
					chaObj["character"] = character;
					
					// adds the new joined user to the campaign object
					dbContent[sUid] = chaObj;
					
					// gets the party list
					var playerList = dbContent.playerList;
					
					// adds the players uid to the list
					playerList.unshift(sUid);
					
					// adds the new list to the campaign object
					dbContent["playerList"] = playerList;
					console.log(dbContent);

					// uploads the updates campaign object
					dbCampaign.child(partyId).set(dbContent);

					dbUsers.child(sUid).once("value",(e) => {
						var c = e.val();
						if (e.hasChild("campaigns")) {
							campaigns = c.campaigns;
						} else {
							campaigns = [];
						}

						campaigns.unshift(partyId);
						console.log(campaigns);
						dbUsers.child(sUid).child("campaigns").set(campaigns);
						dbCampaign.child(partyId).child("liveState").set("update");

						sessionStorage.setItem("::party",partyId);
						openPage("campaign");
					}).then(function() {
							dbUsers.child(sUid).child("characters").child(character).once("value", function(e) {
								if (e.hasChild("usedInCampaigns")) {
									dbUsers.child(sUid).child("characters").child(character).child("usedInCampaigns").once("value", function(c) {
										var list = c.val();
										list.unshift(partyId);
										dbUsers.child(sUid).child("characters").child(character).child("usedInCampaigns").set(list);
									});
								} else {
									var list = [];
									list.unshift(partyId);
									dbUsers.child(sUid).child("characters").child(character).child("usedInCampaigns").set(list);
								}
							});
						}
					);
				});
			} else {
				alert("Couldn't find this character!");
				return;
			}
		});
	}
}