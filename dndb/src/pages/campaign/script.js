var campaignId = sessionStorage.getItem("::campaignId");
var campaignName = sessionStorage.getItem("::campaignName");
var campaignRef = firestore.collection("campaigns").doc(campaignId);
var sUid = sessionStorage.getItem("::uid");
var isDM = false;

var vueInstance = new Vue({
	el: "#vueInstance",
	data: {
		self: {},
		players: [],
		welcomeText: "",
		isDM: false,
		timerOutput: "",
		dm: {
			uid: "",
			profileImage: "",
			username: ""
		},
		currentUser: {
			uid: "",
			profileImage: "",
			username: ""
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

			show();

			var loadedUid = player.id;
			var loadedCharacter = player.character;

			function next() {
				a.ev("player kicked", "user interaction", `Campaign: ${campaignId}, User kicked: ${loadedUid}`);
				firestore.collection("campaigns").doc(campaignId + "/users/" + loadedUid).delete().then(function() {
					firestore.collection("users").doc(loadedUid).collection("campaigns").doc(campaignId).delete().then(function() {
						firestore.collection("users").doc(loadedUid + "/characters/" + loadedCharacter + "/usedInCampaigns/" + campaignId).delete().then(function() {
							firestore.collection("campaigns").doc(campaignId).update({
								liveState: "update"
							}).then(function() {
								$(".kick").hide();
								$(".ban").hide();
								$(".save").hide();
								hide();

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
				if (confirm("Are you sure you want to leave this campaign?")) {
					next();
				}
			} else {
				if (confirm("Are you sure you want to kick this person?")) {
					next();
				}
			}
		},
		viewCharacter(user) {
			global.viewCharacter(user.id, user.character);
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
			this.houserules[index].description = this.houserules[index].adescription.split("\n");
			this.houserules[index].editing = false;
			campaignRef.collection("houserules").doc(this.houserules[index].__id).set(this.houserules[index]).then(e => skb("Rule saved")).catch(e => thr(e));
		},
		deleteRule(rule) {
			if (confirm("Are you sure you want to delete this houserule?\nThis action can't be undone.")) {
				var index = this.houserules.indexOf(rule);
				var id = this.houserules[index].__id;
				console.log([index, id]);
				campaignRef.collection("houserules").doc(id).delete().then(e => skb("Rule deleted")).catch(e => thr(e));
				this.houserules.splice(index, 1);
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
			progress.hide();
		}
	});
}

async function getPlayerList() {

	vueInstance.players = [];
	function addToPlayerArray(user) {
		if (user.type === "player") {
			getProfile(user.id, rtrn => {
				user["profile"] = rtrn;
				getCharacter(user.id, user.character, characterObj => {
					console.log(user);
					user["characterObj"] = characterObj;
					user["characterObj"]["characterName"] = characterObj["96_1"];
					user["open"] = false;
					vueInstance.players.push(user);
				});
			});
		}
	}
	var query = await createQuery(campaignRef.collection("users"));
	if (query[0] !== undefined) {
		for (var i = 0; i < query.length; ++i) {
			var user = query[i];
			addToPlayerArray(user);
		}
	} else {
		error("Users query didn't return data");
	}
}

async function getHouserules() {
	var query = await createQuery(campaignRef.collection("houserules").orderBy("title", "desc"));
	if (query.length > 0) {
		vueInstance.houserules = query;
	}
}

getPlayerList();
getDm();
getHouserules();

vueInstance.currentUser = userInformation;
