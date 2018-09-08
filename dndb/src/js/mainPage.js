console.log("tic")

function createParty() {
	var partyId = $("#createPartyId").val();
	dbParty.child(partyId).set("open");
	p = partyId;
	var array = [];
	array.unshift(uid);
	dbUsers.child(uid).once("value",function(e){
		var dbContent = e.val();
		dbParty.child(partyId).child("players").child(uid).child("username").set(dbContent.username);
		dbParty.child(partyId).child("players").child(uid).child("userIcon").set(dbContent.usericon);
		dbParty.child(partyId).child("players").child(uid).child("type").set("DM");
		dbParty.child(partyId).child("playerList").set(array);
		sessionStorage.setItem("::p",partyId);
		openPage("game");
	});
}

function joinParty() {
	partyId = $("#joinPartyId").val();
	
	dbParty.child(partyId).once("value",function(e){
		var partyContent = e.val();
		var arrayContent = partyContent.playerList;
		if (e.hasChild("players")) {
			if (e.hasChild("players/" + uid)) {
				openPage("game");
			} else {
				dbUsers.child(uid).once("value",function(e){
					var dbContent = e.val();
					dbParty.child(partyId).child("players").child(uid).child("character").set(dbContent.Character);
					dbParty.child(partyId).child("players").child(uid).child("username").set(dbContent.username);
					dbParty.child(partyId).child("players").child(uid).child("userIcon").set(dbContent.usericon);
					dbParty.child(partyId).child("players").child(uid).child("type").set("player");
				});
				arrayContent.unshift(uid);
				dbParty.child(partyId).child("playerList").set(arrayContent);
				openPage("game");
			}
		}
	});
	sessionStorage.setItem("::p",partyId);
}