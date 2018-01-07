console.log("partyMenu.js");
sUid = sessionStorage.getItem("::uid");


// adds listerer to join btn

var localParties = {};

function addList(id, place) {
	dbParty.child(id).once("value",e => {
		console.log(id);
		try {
			var party = e.val();
			var playerArray = party.playerList;
			var players = playerArray.length;
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
		// gets party id and checkes it
		var partyId = $("#partyId").val();
		if (partyId === "") {
			alert("Party id is empty");
			return;
		} else if (partyId.length > 15) {
			alert("Party id is to long");
			return;
		}
		if (partyId !== '' && partyId !== null && partyId !== undefined) {
			dbParty.once("value",function(e){
				if (e.hasChild(partyId)) {
					alert("This party id is already in use");
					return;
				} else {
					dbParty.child(partyId).child("playerList").set("");
					join(partyId,true);
				}
			});
		}
	});
});

function clickParty(index) {
	var partyId = localParties[index];
	join(partyId,false);
}

function join(partyId,host) {
	cancel = false;
	dbParty.once("value",function(e){
		var dbContent = e.val();
		
		// checks if there is a party with that id
		if (e.hasChild(partyId)) {
			// gets party data from firebase
			dbParty.child(partyId).once("value",function(e){
				var dbContent = e.val();
				
				// checks if playerList is empty
				try {
					if (dbContent.playerList === "") {
						playerList = [];
					} else {
						playerList = dbContent.playerList;
					}
				} catch(e) {
					error(e);
				}
				
				try {
					exist = false;
					// checks if uid already exists in firebase
					if (playerList.length !== 0) {
						for (var i = 0; i < playerList.length; ++i) {
							if (playerList[i].includes("DM::")) {
								player = playerList[i].replace("DM::","");
							} else {
								player = playerList[i];
							}
							if (player === sUid) {
								exist = true;
							}
							console.log(player + " " + playerList[i] + " " + sUid + " " + exist);
						}
					} else {
						exist = false;
					}
				} catch(e) {
					error(e);
				}
				
				// creates user if not found in firebase
				try {
					if (exist === false && exist !== true) {
						if (host === true) {
							playerList.unshift("DM::" + sUid);
						} else {
							playerList.unshift(sUid);
						}


						if (host === false) {
							var input = prompt("Type the name of the character you want to use in this party.");


							if (input === "" || input === null || input === false || input === undefined) {
								alert("You haven't typed anything, how rude!");
								cancel = true
								return;
							} else {
								dbUsers.child(sUid).child("characters").once("value",function(e){
									var dbContent = e.val();
									console.log(input);
									console.log(dbContent);
									if (e.hasChild(input)) {
										dbParty.child(partyId).child(sUid).set(input);
									} else {
										alert("Can't find this character.");
										cancel = true;
										return;
									}
								});
							}
						}

						if (cancel !== true) {
							dbUsers.child(sUid).once("value",e => {
								var dbContent = e.val();
								if (dbContent.parties !== undefined) {
									upload = dbContent.parties;
								} else {
									upload = [];
								}
								upload.unshift(partyId);
								dbUsers.child(sUid).child("parties").set(upload);
							});
						}
						
						
						// pushes all data to firebase
						if (cancel !== true) {
							dbParty.child(partyId).child("playerList").set(playerList);
						}
					} else {
						console.log("exists")
					}
				} catch(e) {
					error(e);
				}
				sessionStorage.setItem("::partyId", partyId);
				openPage("party");
			});
		} else {
			alert("Cant find this party id.");
			return;
		}
	});
}
