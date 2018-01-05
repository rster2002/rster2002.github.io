console.log("partyMenu.js")
uid = sessionStorage.getItem("::uid")


// adds listerer to join btn
$("#btnJoin").on("click",function(){
	join($("#join").val(),false);
});

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
							if (player === uid) {
								exist = true;
							}
							console.log(player + " " + playerList[i] + " " + sessionStorage.getItem("::uid") + " " + exist);
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
							playerList.unshift("DM::" + sessionStorage.getItem("::uid"));
						} else {
							playerList.unshift(sessionStorage.getItem("::uid"));
						}


						if (host === false) {
							var input = prompt("Type the name of the character you want to use in this party.");


							if (input === "" || input === null || input === false || input === undefined) {
								alert("You haven't typed anything, how rude!");
								return;
							} else {
								dbUsers.child(sessionStorage.getItem("::uid")).child("characters").once("value",function(e){
									var dbContent = e.val();
									console.log(input);
									console.log(dbContent);
									if (e.hasChild(input)) {
										dbParty.child(partyId).child(sessionStorage.getItem("::uid")).set(input);
									} else {
										alert("Can't find this character.");
										cancel = true;
										return;
									}
								});
							}
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

// adds lisener to host btn
$("#btnHost").on("click",function(){
	// gets party id and checkes it
	var partyId = $("#host").val();
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