$(".characterSheetContainer").load("../assets/components/dnd/pages/characterSheet.html");
var partyId = sessionStorage.getItem("::partyId");
var uid = sessionStorage.getItem("::uid");
var sUid = sessionStorage.getItem("::uid");

console.log("party.js");

dbParty.child(partyId).on("value",function(e){
	$(".side .inner").remove();
	$(".side").append("<div class='inner'></div>")
	var dbContent = e.val();
	console.log(dbContent);
	var array = dbContent.playerList;
	for (var i = 0; i < array.length; ++i) {
		tUid = array[i];
		console.log("---")
		if (array[i].includes("DM::")) {
			console.log("Found DM");
		} else {
			console.log("Found user");
			dbUsers.child(array[i]).once("value",function(e){
				var dbUsersContent = e.val();
				console.log(dbUsersContent.username + " " + dbUsersContent.usericon + " " + dbUsersContent.uid);
				var onclick = "loadCharacter('" + dbUsersContent.uid + "')";
				$(".side .inner").append("<img src=" + dbUsersContent.usericon + " onclick=" + onclick + ">")
			});
		}
		console.log(tUid);
	}
});

pages = {
	1: 106,
	2: 16,
	3: 214
}

function loadCharacter(uid) {
	dbParty.child(partyId).once("value",function(e){
		var dbContent = e.val();
		try {
			var characterName = dbContent[uid];
			dbUsers.child(uid).child("characters").once("value",function(e){
				var dbCharacter = e.val();
				var characterObj = dbCharacter[characterName];
				console.log(characterObj);
				try {
					if (uid === sUid) {
						sessionStorage.setItem("::saved",characterName);
						selfl(characterObj);
					} else {
						l(characterObj);
					}
				} catch(e) {
					error(e);
				}
			})
		} catch(e) {
			error(e);
		}
	})
}

function l(characterObj) {
	$("#save").hide();
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
						if (characterObj[i + "_" + page]) {
							$("input#form" + i + "_" + page).prop("checked",true);
							$("img#form" + i + "_" + page).attr("src","1/form/3011 0 ROn.png");
						}
					}
				}
			}
		}
	}
}

function selfl(characterObj) {
	$("#save").show();
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
						if (characterObj[i + "_" + page]) {
							$("input#form" + i + "_" + page).prop("checked",true);
							$("img#form" + i + "_" + page).attr("src","1/form/3011 0 ROn.png");
						}
					}
				}
			}
		}
	}
}

function save() {
	s();
	console.log(characterObj);
	dbUsers.child(uid).child("characters").child(sessionStorage.getItem("::saved")).set(characterObj);
	alert("Saved character sheet");
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