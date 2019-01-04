vueInstance = new Vue({
	el: "#vueDashboard",
	data: {
		recent: [],
		upcomming: [],
		completedQueries: false
	},
	methods: {
		openCharacter(character) {
			var characterId = character.id;
			userRef.collection("characters").doc(characterId).update({
				lastEdited: Date.now()
			}).then(function() {

				a.ev("Dashboard", "Open character (dashboard)", "user interaction", `characterId: ${characterId}`);
				global.openCharacter({
					uid: userInformation.uid,
					characterId: characterId,
					view: false
				});
			});
		},
		openCampaign(campaign) {
			a.ev("Dashboard", "Open campaign (dashboard)", "user interaction", `campaignName: ${campaign.info.name}`)
			join(campaign.info.name);
		}
	},
	computed: {
		nextUpcomming() {
			return this.upcomming.sort(function(a, b) {
				return a.countDownTime + b.countDownTime;
			}).slice(0, 3);
		},
		loaded() {
			if (this.completedQueries === true) {
				if (this.recent.length === 0 && this.recent.length === 0) {
					return true;
				} else {
					return false;
				}
			}
		}
	}
});

async function refresh() {

	var timers = [];

	function addRecent(obj) {
		var rtrn = {};
		Object.assign(rtrn, obj);
		console.log(rtrn);
		userRef.collection("characters").doc(obj.id).collection("data").doc("characterObj").get().then(doc => {
			if (doc && doc.exists) {
				let characterObj = doc.data();
				rtrn.characterName = characterObj["96_1"];
				if (rtrn.characterName === "") {
					rtrn.characterName === "- unnamed character -";
				}

				var info = "";
				var race = characterObj["95_1"];
				var classAndLevel = characterObj["94_1"];
				var r = classAndLevel.split(" ");
				r[r.length - 1] = "";
				var rrr = "";
				for (var rep = 0; rep < r.length; ++rep) {
					rrr += r[rep] + " ";
				}
				var Class = rrr.toLowerCase();
				info += race + " " + Class;
				info += rtrn.dupe !== undefined ? " (dupe: " + rtrn.dupe + ")" : "";

				rtrn.description = info;
				console.log(rtrn);
				vueInstance.recent.push(rtrn);
			} else {
				error("Could not get character object");
			}
		})
	}

	function addUpcomming(obj) {
		var rtrn = {};
		Object.assign(rtrn, obj);
		firestore.collection("campaigns").doc(obj.id).collection("misc").doc("timer").get().then(doc => {
			if (doc && doc.exists) {
				var sessionDate = doc.data().countDownDate;
				var countDownDate = new Date(sessionDate).getTime();
				var now = new Date().getTime();
				console.log(rtrn);
				if (now < countDownDate) {
					vueInstance.upcomming.push({
						sessionDate: sessionDate,
						countDownDate: countDownDate,
						text: rtrn.name + " - " + sessionDate,
						info: rtrn
					});
				}
			}
		});
	}

	vueInstance.recent = [];
	vueInstance.upcomming = [];
	var characterQuery = await createQuery(userRef.collection("characters").orderBy("lastEdited", "desc").limit(3));
	for (var i = 0; i < characterQuery.length; ++i) {
		addRecent(characterQuery[i]);
	}

	var campaignQuery = await createQuery(userRef.collection("campaigns"));
	for (var i = 0; i < campaignQuery.length; ++i) {
		addUpcomming(campaignQuery[i]);
	}

	vueInstance.completedQueries = true;

	setTimeout(startVueTimers, 500)
}

function startVueTimer(item) {
	var itemObj = vueInstance.nextUpcomming[vueInstance.nextUpcomming.indexOf(item)];
	console.log(itemObj);
	setInterval(function() {
		var now = new Date().getTime();
		var c = new Date(itemObj.sessionDate).getTime();
		var distance = c - now;

		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Display the result in the element with id="demo"
		itemObj.text = itemObj.info.name + " - " + days + "d " + hours + "h " + minutes + "m " + seconds + "s";

		// If the count down is finished, write some text
		if (distance < 0) {
			if (distance < -3600000) {
				itemObj.text = "No time set";
			} else {
				itemObj.text = "Game time";
			}
		}
	}, 1000);
}

function startVueTimers() {
	var p = vueInstance.nextUpcomming;
	for (var i = 0; i < p.length; ++i) {
		startVueTimer(p[i]);
	}
}

async function join(campaignName) {
	console.log(campaignName);
	if (campaignName) {
		// creates a query to check if a campaign with that campaign name exists
		var query = await createQuery(firestore.collection("campaigns").where("name", "==", campaignName));
		if (query[0] !== undefined) {
			var campaign = query[0];

			// gets the shared campaign obj
			var campaignId = campaign.id;
			var campaignName = campaign.name;
			global.campaign = {};
			global.campaign.id = campaignId;
			global.campaign.name = campaignName;

			// creates a query to check if the user is banned
			var bannedQuery = await createQuery(firestore.collection("campaigns").doc(campaignId).collection("banList").where("uid", "==", userInformation.uid));
			if (bannedQuery[0] === undefined) {

				// creates a query to see if the current user already joined the campaign
				var userQuery = await createQuery(firestore.collection("campaigns").doc(campaignId).collection("users").where("id", "==", userInformation.uid));
				if (userQuery[0] !== undefined) {
					sessionStorage.setItem("::firstTimeJoin", false);
					openPage("campaign");
				} else {
					selectCharacter();
				}
			} else {
				alert("You are banned from this campaign");
			}
		} else {
			alert("Can't find this campaign");
		}
	}
}

refresh();
