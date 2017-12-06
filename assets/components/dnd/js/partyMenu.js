$("#btnJoin").on("click",function(){
	join($("join").val(),$("character").val());
});

function join(partyId,character) {
	dbParty.once("value",function(e){
		var dbContent = e.val();
		var playerList = dbContent.playerList;
		for (var i = 0; i < playerList.length; ++i) {
			if (playerList[i] === uid) {
				existend = true;
			} else {
				existend = false;
			}
		}
		if (existend === false) {
			playerList.unshift(uid);
			
		}
	});
}

$("#btnHost").on("click",function(){
	var partyId = $("#host").val();
	if (partyId !== '' && partyId !== null && partyId !== undefined) {
		dbParty.once("value",function(e){
			if (e.hasChild(partyId)) {
				alert("This party id is already in use");
				return;
			} else {
				dbParty.child(partyId).set("");
				join()
			}
		});
	}
});

{
	playerList: [
		"uid1",
		"uid2"
	],
	players: {
		"uid1": "character1",
		"uid2": "character2"
	}
}