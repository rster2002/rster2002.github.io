vueInstance = new Vue({
	el: "#vueDashboard",
	data: {
		recent: [],
		upcomming: []
	},
	methods: {
		openCharacter(character) {
			var characterId = character.id;
			userRef.collection("characters").doc(characterId).update({
				lastEdited: Date.now()
			}).then(function() {
				sessionStorage.setItem("::openCharacter", characterId);
				progress.hide();
				openPage("characterEditor");
			});
		}
	}
});

async function refresh() {

	function addRecent(obj) {
		var rtrn = {};
		Object.assign(rtrn, obj);
		console.log(rtrn);
		userRef.collection("characters").doc(obj.id).collection("data").doc("characterObj").get().then(doc => {
			if (doc && doc.exists) {
				rtrn.characterName = doc.data()["96_1"];
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

			}
		})
	}

	vueInstance.recent = [];
	vueInstance.upcomming = [];
	var query = await createQuery(userRef.collection("characters").orderBy("lastEdited", "desc").limit(3));
	for (var i = 0; i < query.length; ++i) {
		addRecent(query[i]);
	}

	var query = await createQuery(userRef.collection("campaigns"));
	for (var i = 0; i < query.length; ++i) {
		addUpcomming(query[i]);
	}
}

refresh();
