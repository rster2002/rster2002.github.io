shown = false;
console.log("game.js");
partyId = sessionStorage.getItem("::p");
dbParty.child(partyId).on("value",function(e){
	$(".userList").remove();
	$(".outerUserList").append("<div class='userList'></div>");
	partyContent = e.val();
	var playerList = partyContent.playerList;
	var players = partyContent.players;
	for (i = 0; i < playerList.length; i++) {
		console.log(i);
		userUid = playerList[i];
		var player = players[userUid];
		if (player.type === "DM") {
			$(".userList").append("<div class='player' style='background-color:gray'><img src=" + player.userIcon + "><h1>" + player.username + "</h1><div>");
		} else {
			$(".userList").append("<div class='player' onclick='showCharacter(" + i + ")'><img src=" + player.userIcon + "><h1>" + player.username + "</h1><div>");
		}
	}
	if (shown !== false){
		showCharacter(shown);
	}
});

function load(page) {
	$(".insidePage").remove();
	$(".infoPage").load("../assets/components/dnd/pages/" + page + ".html");
}


function showCharacter(uid) {
	shown = uid;
	load("characterSheet");
	var playerList = partyContent.playerList;
	var p = playerList[uid];
	var players = partyContent.players;
	var player = players[p];
	var c = player.character;
	
	$("#name").text(c.name);
	$("#sex").text(c.sex);
	$("#class").text(c.class);
}

//$(".userList").append("<div class='player'><img src=" + dbContent.usericon + "><h1>" + dbContent.username + "</h1><div>");