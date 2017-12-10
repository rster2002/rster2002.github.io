$(".characterSheetContainer").load("../assets/components/dnd/pages/characterSheet.html");
var partyId = sessionStorage.getItem("::partyId");
var uid = sessionStorage.getItem("::uid");

console.log("party.js");

dbParty.child(partyId).on("value",function(e){
	var dbContent = e.val();
	var playerArray = dbContent.playerList;
	console.log(dbContent);
	for (var i = 0; i < playerArray; ++i) {
		if (dbContent[playerArray[i]] !== "DM::" + uid) {
			console.log(dbContent[playerArray[i]])
		} else {
			console.log("Found DM");
			console.log(dbContent[playerArray[i]]);
		}
	}
});