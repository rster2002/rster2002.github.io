loader.show();
$(".innerPage").ready(() => {
	$(".characterContainer").load("../assets/components/dnd/pages/characterSheet.html");
});

var campaignId = sessionStorage.getItem("::campaignId");
var campaignName = sessionStorage.getItem("::campaignName");
var sUid = sessionStorage.getItem("::uid");
var isDM = false;

progress.show();

//firestore.collection("campaigns").doc(campaignId).get().then(function(doc) {
//	if (doc && doc.exists) {
//
//	} else {
//		error("Couldn't fetch campaign");
//		progress.hide();
//	}
//});


console.log("party.js");

loadedUid = false;

function ctrlS() {
	if (loadedUid) {
		save(true);
	}
}

// get campaign info
if (sessionStorage.getItem("::join") !== "true") {
	firestore.collection("campaigns").doc(campaignId).get().then(function(doc) {
		if (doc && doc.exists) {
			var data = doc.data();
			$("#partyId").text(data.name);
			update(data);
		} else {
			error("Couldn't fetch campaign");
			progress.hide();
		}
 	});
} else {
	sessionStorage.setItem("::join", "false");
}

// on change
firestore.collection("campaigns").doc(campaignId).onSnapshot(function (doc) {

	progress.show();

	if (doc && doc.exists) {
		var campaignContent = doc.data();
		if (campaignContent.liveState === "update") {
			update(campaignContent);
			firestore.collection("campaigns").doc(campaignId).update({
				liveState: "resting"
			});
		} else if (campaignContent.liveState === "changeId") {
			alert("The campaign id was changed");
			openPage("campaignMenu");
		}
	} else {
		error("Couldn't fetch campaign");
		progress.hide();
	}
});

async function update(partyContent) {

	progress.show();

	async function addToList(id, characterId) {

		firestore.collection("users").doc(id).get().then(function(doc) {
			if (doc && doc.exists) {
				var playerInfo = doc.data();
				firestore.collection("users").doc(id + "/characters/" + characterId + "/data/characterObj").get().then(function(doc) {
					if (doc && doc.exists) {
						var characterObj = doc.data();
						var characterName = characterObj["96_1"];
						var username = playerInfo.username;
						var usericon = playerInfo.usericon;

						var onclick = "loadCharacter('" + id + "')";
						$(".innerList").append("<div class='player' onclick=" + onclick + "><img src=" + usericon + "><h1>" + characterName + "</h1></div>");
					} else {
						error("Couldn't fetch character object");
						progress.hide();
					}
				})
			} else {
				error("Couldn't fetch user");
				progress.hide();
			}
		})
	}

	// gets the DM uid
	var dmQuery = await createQuery(firestore.collection("campaigns").doc(campaignId).collection("users").where("type", "==", "DM"));
	var dmUid = dmQuery[0]["id"];

	firestore.collection("users").doc(dmUid).get().then(function(doc) {
		if (doc && doc.exists) {
			var dmObj = doc.data();
			$("#DMusericon").attr("src", dmObj.usericon);
			$("#DMusername").text(dmObj.username);
		} else {
			error("Couldn't find DM");
			progress.hide();
		}
	})

	// sets isDM var and shows hidden buttons
	if (sUid === dmUid) {
		isDM = true;

		$(".changeId").show();
		$(".delete").show();
		$(".showBanned").show();
	} else {
		isDM = false;
		$(".leave").show();
	}


	// updates the player list
	var playerList = await createQuery(firestore.collection("campaigns").doc(campaignId).collection("users").where("type", "==", "player"));

	// clears the list
	$(".innerList").remove();
	$(".playerList").append("<div class='innerList'></div>");


	// for every player in the player list, add it to the ui

	for (var i = 0; i < playerList.length; ++i) {
		var playerId = playerList[i]["id"];
		var playerCharacter = playerList[i]["character"];
		var w = playerList[i];
		addToList(playerId, playerCharacter);
	}

	progress.hide();
}

pages = {
	1: 106,
	2: 16,
	3: 214
}

// called when clicked on user
function loadCharacter(uid) {

	progress.show();

	loadedUid = uid;

	try {
		firestore.collection("campaigns").doc(campaignId + "/users/" + uid).get().then(function(doc) {
			if (doc && doc.exists) {
				var userInCampaign = doc.data();
				var characterId = userInCampaign.character;
				loadedCharacter = characterId;
				firestore.collection("users").doc(uid + "/characters/" + characterId + "/data/characterObj").get().then(function(doc) {
					if (doc && doc.exists) {
						var characterObj = doc.data();
						firestore.collection("users").doc(uid + "/characters/" + characterId).get().then(function(doc) {
							if (doc && doc.exists) {
								var characterInfo = doc.data();

								if (characterInfo.hasImg !== undefined && characterInfo.hasImg === true) {
									cloudStorage.child(loadedUid).child(sessionStorage.getItem("::saved")).getDownloadURL().then(function(url) {
										console.log(url);
										$('#form12_2').css('background-image', "url('" + url + "')");
									}).catch(function(err) {
										error(err);
									});
								}

								if (isDM) {
									$(".kick").show();
									$(".ban").show();

									if (characterInfo.allowEdit === undefined) {
										l(characterObj);
										progress.hide();
									} else if (characterInfo.allowEdit === "1") {
										selfl(characterObj);
										$(".save").show();
										progress.hide();
									} else {
										l(characterObj);
										progress.hide();
									}
								} else if (uid === sUid) {
									l(characterObj);
									hide();
								} else {
									l(characterObj);
								}
							}
						});
					}
				});
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

	progress.show();
	if (isDM === false) {
		if (loadedUid === sUid) {
			s();
			firestore.collection("users").doc(sUid + "/characters/" + sessionStorage.getItem("::saved") + "/data/characterObj").set(characterObj);
			if (showNote) {
				note.open("save", "Saved " + $("#form96_1").val(), 1000);
				progress.hide();
			}
		} else {
			error("You are trying to save a character sheet that isn't yours!")
		}
	} else if (isDM === true) {
		try {
			s();
			firestore.collection("users").doc(loadedUid + "/characters/" + sessionStorage.getItem("::saved") + "/data/characterObj").set(characterObj);
			if (showNote) {
				note.open("save", "Saved " + $("#form96_1").val(), 1000);
				progress.hide();
			}
		} catch(e) {
			error(e);
			progress.hide();
		}
	} else {
		error("You are the DM and not the DM! Superposition confirmed?!");
		progress.hide();
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

	show();

	function next() {
		firestore.collection("campaigns").doc(campaignId + "/users/" + loadedUid).delete().then(function() {
			firestore.collection("users").doc(loadedUid).collection("campaigns").doc(campaignId).delete().then(function() {
				firestore.collection("users").doc(loadedUid + "/characters/" + loadedCharacter + "usedInCampaigns" + campaignId).delete().then(function() {
					firestore.collection("campaigns").doc(campaignId).update({
						liveState: "update"
					}).then(function() {
						$(".kick").hide();
						$(".ban").hide();
						$(".save").hide();
						hide();

						if (f !== undefined) {
							f();
						}
					});
				});
			});
		});
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
		var reason = prompt("Type a reason for ban")
		if (reason) {
			firestore.collection("users").doc(loadedUid).get().then(function (doc) {
				if (doc && doc.exists) {
					var userData = doc.data();
					firestore.collection("campaigns").doc(campaignId).collection("banList").add({
						username: userData.username,
						usericon: userData.usericon,
						uid: userData.uid,
						userCode: userData.userCode,
						timeBanned: Date.now(),
						reason: reason
					}).then(function() {
						kick(true);
					});
				} else {
					error("Couldn't find this user");
					hide();
				}
			})
		}
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

async function toggleBanList() {
	if ($(".banList").hasClass("open")) {
		$(".listItemWrapper").remove();
		$(".showBanned h1").text("Show ban list");
		$(".banList").removeClass("open")
	} else {
		var banListQuery = await createQuery(firestore.collection("campaigns").doc(campaignId).collection("banList"));
		for (var i = 0; i < banListQuery.length; ++i) {
			var userObj = banListQuery[i];
			$(".banList").append("<div class='listItemWrapper centerHorizontal'><div class='listItem s2 rounded'><div class='icon'><img src='" + userObj.usericon + "'></div><div class='text'><div class='wrapper'><h1>" + userObj.username + "</h1><p>Reason: " + userObj.reason + "</p></div></div><div class='buttons'><div class='buttonsWrapper centerVertical'><button class='action pardon" + i + "' name='" + userObj.username + "'>pardon</button></div></div></div></div>");

			$(".pardon" + i).on("click", async function() {
				var name = $(this).attr("name");
				var banQuery = await createQuery(firestore.collection("campaigns").doc(campaignId).collection("banList").where("username", "==", name));
				console.log(name, banQuery);
				if (banQuery[0] !== undefined) {
					var docId = banQuery[0]["__id"];
					firestore.collection("campaigns").doc(campaignId).collection("banList").doc(docId).delete();
					$(this).parent().parent().parent().parent().remove();
					note.open("restore_from_trash", "Unbanned", 2000);
				}
			});
		}

		easeIn();
		$(".showBanned h1").text("Hide ban list");
		$(".banList").addClass("open")
	}
}

function onload() {
	loader.hide();
}

function easeOut() {
	var delay = 0;
	$(".listItem").each(function(index) {
		setC(this, delay);
		delay += 20;
	});
	$(".banList").removeClass("open");
}

function easeIn() {
	var delay = 0;
	$(".banList").addClass("open");
	$(".listItem").each(function(index) {
		setT(this, delay);
		delay += 20;
	});
}

function setT(here, wait) {
	setTimeout(function() {
		$(here).addClass("open");
	}, wait)
}

function setC(here, wait) {
	setTimeout(function() {
		$(here).removeClass("open");
	}, wait)
}
