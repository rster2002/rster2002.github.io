var campaignId = global.campaign.id;
var campaignName = global.campaign.name;
var campaignRef = firestore.collection("campaigns").doc(campaignId);
var sUid = sessionStorage.getItem("::uid");
var isDM = false;

var vueInstance = new Vue({
	el: "#vueInstance",
	data: {
		spinning: true,
		self: {},
		players: [],
		welcomeText: "",
		isDM: false,
		timerOutput: "",
		permissionGranted: true,
		campaignName: "",
		dm: {
			uid: "",
			profileImage: "",
			username: ""
		},
		currentUser: {
			uid: "",
			profileImage: "",
			username: "",
			characterId: ""
		},
		datePicker: {
			days: [],
			months: [],
			years: [],
			hours: [],
			minutes: []
		},
		pickedDate: {
			day: 1,
			month: "Jan",
			year: 2018,
			hour: 0,
			minute: 0
		},
		houserules: [],
		editingRule: {
			title: "",
			description: ""
		},
		countDownDate: "Jan 1, 2018 12:00:00"
	},
	methods: {
		setTime() {
			var m = String(this.pickedDate.minute)[1] === undefined ? "0" + String(this.pickedDate.minute) : String(this.pickedDate.minute);
			var h = String(this.pickedDate.hour)[1] === undefined ? "0" + String(this.pickedDate.hour) : String(this.pickedDate.hour);
			var d = this.pickedDate.month + " " + this.pickedDate.day + ", " + this.pickedDate.year + " " + h + ":" + m + ":00";
			firestore.collection("campaigns").doc(campaignId).collection("misc").doc("timer").set({
				countDownDate: d,
				pickedDate: this.pickedDate
			}).then(() => {
				showSnackbar("Set session date");
			}).catch(err => {
				error(err);
			});
		},
		togglePlayerOpen(player) {
			this.players[this.players.indexOf(player)].open = !this.players[this.players.indexOf(player)].open;
		},
		kick(player, ban, f) {

			var loadedUid = player.id;
			var loadedCharacter = player.character;

			function next() {
				a.ev("Campaign", "player kicked", "user interaction", `Campaign: ${campaignId}, User kicked: ${loadedUid}`);
				firestore.collection("campaigns").doc(campaignId + "/users/" + loadedUid).delete().then(function() {
					firestore.collection("users").doc(loadedUid).collection("campaigns").doc(campaignId).delete().then(function() {
						firestore.collection("users").doc(loadedUid + "/characters/" + loadedCharacter + "/usedInCampaigns/" + campaignId).delete().then(function() {
							firestore.collection("campaigns").doc(campaignId).update({
								liveState: "update"
							}).then(function() {
								$(".kick").hide();
								$(".ban").hide();
								$(".save").hide();

								if (ban !== "self") {
									getPlayerList();
								}

								if (f !== undefined) {
									if (typeof f === "function") {
										f();
									} else {
										openPage(f);
									}
								}
							}).catch(err => {
								error(err);
							});
						}).catch(err => {
							error(err);
						});
					}).catch(err => {
						error(err);
					});
				}).catch(err => {
					error(err);
				});
			}

			if (ban === true) {
				next();
			} else if (ban === "self") {
				global.alert({
					text: "Are you sure you want to leave this campaing?",
					btn1: "leave",
					btn2: "cancel",
					btn1fn: function() {
						next();
					}
				});
			} else {
				global.alert({
					text: "Are you sure you want to kick this player?",
					btn1: "kick",
					btn2: "cancel",
					btn1fn: function() {
						next();
					}
				});
			}
		},
		viewCharacter(user) {
			if (user.id === uid) {
				global.openCharacter({
					uid: user.id,
					characterId: user.character,
					view: false
				});
			} else {
				global.openCharacter({
					uid: user.id,
					characterId: user.character,
					view: true
				});
			}
		},
		addHouserule() {
			let houserule = Object.assign({}, this.editingRule);
			houserule.description = houserule.description.split("\n");
			houserule.__id = genId();
			campaignRef.collection("houserules").doc(houserule.__id).set(houserule).catch(e => thr(e));
			this.houserules.push(houserule);
		},
		editRule(rule) {
			var index = this.houserules.indexOf(rule);
			let description = this.houserules[index].description;
			this.houserules[index].adescription = description.join("\n");
			this.houserules[index].editing = true;
		},
		saveRule(rule) {
			var index = this.houserules.indexOf(rule);
			var d = rule.adescription.split("\n");
			var rtrn = [];
			for (var p = 0; p < d.length; ++p) {
				var temp = d[p];
				if (temp === "") {
					temp = " ";
				}
				rtrn.push(temp);
			}
			this.houserules[index].description = rtrn;
			this.houserules[index].editing = false;
			campaignRef.collection("houserules").doc(this.houserules[index].__id).set(this.houserules[index]).then(e => skb("Rule saved")).catch(e => thr(e));
		},
		deleteRule(rule) {
			global.i = {
				t: this,
				rule: rule
			}
			global.alert({
				text: "Are you sure you want to delete this houserule?",
				btn1: "delete",
				btn2: "cancel",
				btn1fn: function() {

					var t = global.i.t;
					var rule = global.i.rule;

					var index = t.houserules.indexOf(rule);
					var id = t.houserules[index].__id;
					console.log([index, id]);
					campaignRef.collection("houserules").doc(id).delete().then(e => skb("Rule deleted")).catch(e => thr(e));
					t.houserules.splice(index, 1);
				}
			})
		},
		toggleRule(item) {
			item.opened = !item.opened;
		},
		openDashboard() {
			global.campaignId = campaignId;
			global.campaignName = campaignName;
			openPage("dmDashboard");
		},
		openInformation() {
			global.campaignId = campaignId;
			global.campaignName = campaignName;
			openPage("campaignCompanion");
		},
		openStory() {
			global.campaignId = campaignId;
			global.campaignName = campaignName;
			openPage("dmStory");
		},
		dismiss() {
			this.permissionGranted = true;
		},
		grantPermission() {
			global.t = this;
			getProfile(this.dm.uid, function(e) {
				userRef.collection("characters").doc(global.t.currentUser.characterId).collection("permissions").doc(e.uid).set(e).then(e => {
					global.t.permissionGranted = true;
					skb("Permission granted");
				});
			})
		},
		changeCampaignName() {
			if (this.campaignName === "") {
				alert("This name is invalid");
			} else {

				global.t = this;

				global.alert({
					text: "Are you sure you want to change the name of the campaign",
					btn1: "change",
					btn2: "cancel",
					btn1fn: function() {
						campaignRef.update({
							name: global.t.campaignName
						}).then(e => {
							skb("Campaign name changed");
						});
					}
				});
			}
		},
		deleteCampaign() {
			if (this.players.length > 0) {
				alert("You have to kick every player out of the party to be able to delete the campaign");
			}
		}
	}
});

vueInstance.self = userInformation;
vueInstance.self.id = userInformation.uid;
vueInstance.self.name = userInformation.username;

// initializes the datapicker
for (var i = 1; i <= 31; ++i) {
	vueInstance.datePicker.days.push(i);
}
vueInstance.datePicker.months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
]
for (var i = 2018; i <= 2100; ++i) {
	vueInstance.datePicker.years.push(i);
}
for (var i = 0; i <= 23; ++i) {
	vueInstance.datePicker.hours.push(i);
}
for (var i = 0; i <= 59; ++i) {
	vueInstance.datePicker.minutes.push(i);
}

// database stuff for datepicker
campaignRef.collection("misc").doc("timer").onSnapshot(doc => {
	if (doc && doc.exists) {
		vueInstance.countDownDate = doc.data().countDownDate;
		vueInstance.pickedDate = doc.data().pickedDate;
	} else {
		vueInstance.countDownDate = "Jan 1, 2018 12:00:00";
	}
});

// campaignRef.onSnapshot()


var x = setInterval(function() {
	var now = new Date().getTime();
	var c = new Date(vueInstance.countDownDate).getTime();
	var distance = c - now;

	// Time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// Display the result in the element with id="demo"
	vueInstance.timerOutput = days + "d " + hours + "h " + minutes + "m " + seconds + "s";

	// If the count down is finished, write some text
	if (distance < 0) {
		if (distance < -3600000) {
			vueInstance.timerOutput = "No time set";
		} else {
			vueInstance.timerOutput = "Game time";
		}
	}
}, 1000);

// change welcome message if this is first time joining
if (sessionStorage.getItem("::firstTimeJoin") === true) {
	vueInstance.welcomeText = "Welcome";
} else {
	vueInstance.welcomeText = "Welcome back";
}

var dmUid;
async function getDm() {
	var dmQuery = await createQuery(campaignRef.collection("users").where("type", "==", "DM"));
	dmUid = dmQuery[0]["id"];
	vueInstance.dm.uid = dmUid;
	vueInstance.isDM = dmUid === sUid ? true : false;

	firestore.collection("users").doc(dmUid).get().then(function(doc) {
		if (doc && doc.exists) {
			var dmObj = doc.data();
			vueInstance.dm.profileImage = dmObj.usericon;
			vueInstance.dm.username = dmObj.username;
		} else {
			error("Couldn't find DM");

		}
	});
}

async function getPlayerList() {

	vueInstance.players = [];
	global.campaign.users = [];
	async function addToPlayerArray(user) {
		if (user.type === "player") {
			getProfile(user.id, async function(rtrn){
				user["profile"] = rtrn;

				var permitted = await createQuery(firestore.collection("users").doc(user.id).collection("characters").doc(user.character).collection("permissions").where("uid", "==", vueInstance.dm.uid));

				console.log(permitted);

				if (permitted.length === 0) {
					user.permitted = false;
				} else if (permitted.length > 0) {
					user.permitted = true;
				}

				getCharacter(user.id, user.character, characterObj => {
					console.log(user);
					user["characterObj"] = characterObj;
					user["characterObj"]["characterName"] = characterObj["96_1"];
					user["open"] = false;
					global.campaign.users.push(user);
					vueInstance.players.push(user);
				});

				if (user.id === uid) {
					if (!user.permitted) {
						vueInstance.permissionGranted = false;
					}

					vueInstance.currentUser.characterId = user.character;
				}
			});
		}
	}
	var query = await createQuery(campaignRef.collection("users"));
	if (query[0] !== undefined) {
		for (var i = 0; i < query.length; ++i) {
			var user = query[i];
			addToPlayerArray(user);
		}

		vueInstance.spinning = false;
	} else {
		error("Users query didn't return data");
	}
}

async function getHouserules() {
	var query = await createQuery(campaignRef.collection("houserules").orderBy("title", "desc"));
	if (query.length > 0) {
		query.forEach(a => {
			a.opened = false;
			vueInstance.houserules.push(a);
		});
	}
}

getDm();
getPlayerList();
getHouserules();

vueInstance.currentUser = userInformation;
