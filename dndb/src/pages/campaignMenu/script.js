if (DEV) {
	console.log("partyMenu.js");
}
sUid = sessionStorage.getItem("::uid");

obj = {};

var vueInstance = new Vue({
	el: '#vueGrid',
	data: {
		campaigns: []
	},
	methods: {
		openCampaign: function(name) {
			join(name);
		}
	}
})

function checkInput(input) {
	if (input === "" || input === '' || input === undefined || input === null) {
		return false;
	} else {
		return input;
	}
}

function expandFab() {
	$(".fab").toggleClass("expand");
}

setTimeout(function() {
	$(".fab").addClass("show");
}, 300);

var loaded = function() {
	$(".fab").on("click", function() {
		if (!$(".fab").hasClass("expand")) {
			$(".fab").addClass("expand");
			$(".expandedBackground").show();
			setTimeout(function() {
				$(".fab").append($(".add").html());
			}, 60);
		}
	});
}

function closeFab() {
	$(".fab .contents").remove();
	$(".fab .campaignId").remove();
	if ($(".fab").hasClass("expand")) {
		$(".expandedBackground").hide();
		$(".fab").removeClass("expand");
	}
}

function invalidId() {
	$(".fab .campaignId").addClass("invalid");
	setTimeout(function() {
		$(".fab .campaignId").removeClass("invalid");
	}, 500);
}

// adds listerer to join btn

var localCampaigns = {};

async function addList(id, place) {
	firestore.collection("campaigns").doc(id).get().then(async function(doc) {
		if (doc && doc.exists) {
			var campaignObj = doc.data();
			// var campaignName = campaignObj.name;
			// var playerArray = await createQuery(firestore.collection("campaigns").doc(id).collection("users").where("type", "==", "player"));
			// console.log(id, place, campaignObj, playerArray);
			// localCampaigns[place] = campaignName;

			vueInstance.campaigns.push(campaignObj);

			// $(".campaignList").append();
			//
			// $("#campaign" + campaignName).on("click", function() {
			// 	join($(this).attr("campaign-name"));
			// })
			// if (playerArray[0] !== undefined) {
			// 	var players = playerArray.length;
			// } else {
			// 	$(".partyList").append("<div class='party' onclick='clickParty(" + place + ")'><h1>" + campaignName + "</h1><p>There are no players in this campaign</p></div>");
			// }
		} else {
			error("Error when fetching campaign, maybe it doesn't exists anymore");
			hide();
		}
	}).catch(function(e) {
		error(e);
	});


//	var players = playerArray.length;
//	localCampaigns[place] = name;

//	dbCampaign.child(id).once("value",e => {
//		try {
//			var party = e.val();
//			var playerArray = party.playerList;
//			var players = playerArray.length;
//			players -= 1;
//			localcampaigns[place] = id;
//			$(".partyList").append("<div class='party' onclick='clickParty(" + place + ")'><h1>" + id + "</h1><p>" + players + " players in this campaign</p></div>");
//		} catch(e) {
//			error(e);
//		}
//	});
}

async function getCampaigns() {
	var campaigns = await createQuery(userRef.collection("campaigns").orderBy("name", "desc"));
	if (campaigns) {
		for (var i = 0; i < campaigns.length; ++i) {
			var campaignObj = campaigns[i];
			addList(campaignObj.id, i);
		}
	}
}

function fillCampaignList() {
	// $(".partyList").append("<div class='createParty'><div class='deletable'><h1>Add Campaign</h1></div><div class='addParty'><input id='partyId' placeholder='party id' type='text'><button id='join'>Join</button><button id='host'>Create</button></div></div>");
	$(".createParty").on("click",function(){
		$(".deletable").hide();
		$(".addParty").show();
	});

	$("#join").on("click", async function(){
		var campaignName = await $("#partyId").val();
		var query = await createQuery(firestore.collection("campaigns").where("name", "==", campaignName));
		if (query[0] !== undefined) {
			var campaignObj = query[0];
			var campaignId = campaignObj.id;
			join(campaignName, false);
		}
	});


	// adds lisener to host btn
	$("#host").on("click",function(){
		host($("#partyId").val());
	});

	getCampaigns();
}

fillCampaignList();


function clickParty(index) {
	var campaignName = localCampaigns[index];
	join(campaignName, false);
}

/*
host checklist

/ check if the party id is already in use

/ create the party in the database
/ create a playerlist with only the dm's uid listed
/ add an 'DM' with the 'uid' to the 'partyId'
/ add the party id to the users party list
*/

async function host(campaignName) {

	show();

	var exists = await createQuery(firestore.collection("campaigns").where("name", "==", campaignName));

	if (exists[0] === undefined) {
		var campaignId = "party-" + genId();

		sessionStorage.setItem("::campaignId", campaignId);
		sessionStorage.setItem("::campaignName", campaignName);

		firestore.collection("campaigns").doc(campaignId).set({
			name: campaignName,
			DM: sUid,
			createdAt: Date.now(),
			private: false,
			id: campaignId
		}).then(function() {
			firestore.collection("campaigns").doc(campaignId).collection("users").doc(sUid).set({
				type: "DM",
				id: sUid
			}).then(function() {
				userRef.collection("campaigns").doc(campaignId).set({
					name: campaignName,
					id: campaignId
				}).then(function() {
					sessionStorage.setItem("::party", campaignId);
					sessionStorage.setItem("::cache", campaignId);
					openPage("campaign");
					hide();
				});
			});
		});
	} else {
		alert("This id is already in use!");
		hide();
	}
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

async function join(campaignName) {
	show();
	if (campaignName) {
		// creates a query to check if a campaign with that campaign name exists
		var query = await createQuery(firestore.collection("campaigns").where("name", "==", campaignName));
		if (query[0] !== undefined) {
			var campaign = query[0];

			// gets the shared campaign obj
			var campaignId = campaign.id;
			var campaignName = campaign.name;
			sessionStorage.setItem("::campaignId", campaignId);
			sessionStorage.setItem("::campaignName", campaignName);

			// creates a query to check if the user is banned
			var bannedQuery = await createQuery(firestore.collection("campaigns").doc(campaignId).collection("banList").where("uid", "==", sUid));
			if (bannedQuery[0] === undefined) {

				// creates a query to see if the current user already joined the campaign
				var userQuery = await createQuery(firestore.collection("campaigns").doc(campaignId).collection("users").where("id", "==", sUid));
				if (userQuery[0] !== undefined) {
					hide();
					sessionStorage.setItem("::firstTimeJoin", false);
					openPage("campaign");
				} else {
					hide();
					selectCharacter();
				}
			} else {
				alert("You are banned from this campaign");
				hide();
			}
		} else {
			alert("Can't find this campaign");
			hide();
		}
	}
}

var charactersObj = {};

function addToList(i, characterId) {
	userRef.collection("characters").doc(characterId).get().then(function(doc) {
		if (doc && doc.exists) {
			var characterInfo = doc.data();
			userRef.collection("characters").doc(characterId).collection("data").doc("characterObj").get().then(function(doc) {
				if (doc && doc.exists) {
					var characterObj = doc.data();
					var characterName = characterObj["96_1"];
					additional = "";
					if (characterInfo.dupe !== undefined) {
						additional += "<p>Dupe: " + characterInfo.dupe + "</p>"
					}

					$(".selectCharacter .inner").append("<div class='item'><div class='card shadow-4' onclick='afterSelect(" + i + ")'><h1>" + characterName + "</h1>" + additional + "</div></div>");
					charactersObj[i] = characterId;
				}
			})
		} else {
			alert("Couldn't fetch character");
			hide();
		}
	});
}

async function selectCharacter() {
	$(".selectCharacter").show();

	var characterQuery = await createQuery(userRef.collection("characters"));
	if (characterQuery[0] !== undefined) {
		for (var i = 0; i < characterQuery.length; ++i) {
			var obj = characterQuery[i];
			addToList(i, obj.__id);
		}
	} else {
		$(".selectCharacter .inner").append("<div class='noCharacter'><h1>You don't have a character!</h1><p>Create one in the character editor.</p></div>");
		hide();
	}
}

function afterSelect(index) {

	show();
	$("selectCharacter").hide();

	var character = charactersObj[index];
	var campaignId = sessionStorage.getItem("::campaignId");
	var campaignName = sessionStorage.getItem("::campaignName");

	if (confirm("Are you sure you want to use this character")) {
		userRef.collection("campaigns").doc(campaignId).set({
			name: campaignName,
			id: campaignId,
			added: Date.now()
		}).then(function() {
			userRef.collection("characters").doc(character).collection("usedInCampaigns").add({
				campaignId: campaignId,
				campaignName: campaignName
			});
		}).then(function() {
			firestore.collection("campaigns").doc(campaignId).collection("users").doc(userInformation.uid).set({
				id: sUid,
				banned: false,
				character: character,
				type: "player"
			}).then(function() {
				sessionStorage.setItem("::party", campaignId);
				hide();
				sessionStorage.setItem("::firstTimeJoin", true);
				openPage("campaign");
			}).catch(err => {
				error(err);
			});
		});
	}
}

function joinDialog() {
	var i = prompt("Enter campaign id");
	join(i)
}

function hostDialog() {
	var i = prompt("Enter campaign id");
	host(i)
}
