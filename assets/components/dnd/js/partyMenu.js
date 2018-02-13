console.log("partyMenu.js");
sUid = sessionStorage.getItem("::uid");


function checkInput(input) {
	if (input === "" || input === '' || input === undefined || input === null) {
		return false;
	} else {
		return input;
	}
}


// adds listerer to join btn

var localParties = {};

function addList(id, place) {
	dbParty.child(id).once("value",e => {
		console.log(id);
		try {
			var party = e.val();
			var playerArray = party.playerList;
			var players = playerArray.length;
			players -= 1;
			localParties[place] = id;
			$(".partyList").append("<div class='party' onclick='clickParty(" + place + ")'><h1>" + id + "</h1><p>" + players + " players in this party</p></div>");
		} catch(e) {
			error(e);
		}
	});
}

dbUsers.child(sUid).once("value",e => {
	// adds 'add party' to list
	$(".partyList").append("<div class='createParty'><div class='deletable'><h1>Add party</h1></div><div class='addParty'><input id='partyId' placeholder='party id' type='text'><button id='join'>Join</button><button id='host'>Create</button></div></div>");
	
	// adds items to list
	var dbContent = e.val();
	console.log(dbContent);
	if (dbContent !== undefined) {
		var partiesArray = dbContent.parties;
		if (partiesArray !== undefined) {
			console.log(partiesArray);
			for (var i = 0; i < partiesArray.length; ++i) {
				var partyId = partiesArray[i]
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
	var partyId = localParties[index];
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
	dbParty.once("value",(e) => {
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
				dbParty.child(partyId).set(partyObj);
			} catch(e) {
				error(e);
			}dm.hellw;
			
			// adds the party
			try {
				dbUsers.child(sUid).once("value",(e) => {
					var dbContent = e.val();
					
					if (e.hasChild("parties")) {
						var parties = dbContent.parties;
					} else {
						var parties = [];
					}
					
					parties.unshift(partyId);
					dbUsers.child(sUid).child("parties").set(parties);
				});
			} catch(e) {
				error(e);
			}
			
			// continues to the party screen
			try {
				sessionStorage.setItem("::party",partyId);
				openPage("party");
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
	
	// checks if the party exits
	dbParty.once("value",(e) => {
		if (e.hasChild(partyId)) {
			dbParty.child(partyId).once("value",(e) => {
				
				// checks if the player already exists in the party
				if (e.hasChild(sUid)) {
					
					// continues the user through to the party screen
					sessionStorage.setItem("::party",partyId);
					openPage("party");
				} else {
					
					banned = false;
					
					// checks if the user is banned
					dbParty.child(partyId).once("value",(e) => {
						
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
						// gives an input for typing the character
						var character = prompt("Type a character to use in the party");

						// checks if the input is valid
						if (checkInput(character)) {

							// checks if the character exists in the users account
							dbUsers.child(sUid).child("characters").once("value",(e) => {
								if (e.hasChild(character)) {

									// catches the party obj from the database
									dbParty.child(partyId).once("value",(e) => {
										var dbContent = e.val();

										dbContent[sUid] = character;
										var playerList = dbContent.playerList;
										playerList.unshift(sUid);
										dbContent["playerList"] = playerList;
										console.log(dbContent);

										dbParty.child(partyId).set(dbContent);
										
										dbUsers.child(sUid).once("value",(e) => {
											var c = e.val();
											if (e.hasChild("parties")) {
												parties = c.parties;
											} else {
												parties = [];
											}
											
											parties.unshift(partyId);
											console.log(parties);
											dbUsers.child(sUid).child("parties").set(parties);
											dbParty.child(partyId).child("liveState").set("update");
											
											sessionStorage.setItem("::party",partyId);
											openPage("party");
										});
									});
								} else {
									alert("Couldn't find this character!");
									return;
								}
							});
						} else {
							alert("The input was invalid");
							return;
						}
					}
				}
			});
		} else {
			alert("Couldn't find this party id");
			return;
		}
	});
}
