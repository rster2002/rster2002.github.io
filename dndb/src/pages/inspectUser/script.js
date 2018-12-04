var uRef = firestore.collection("users").doc(global.inspectUserUid);

var vueInstance = new Vue({
	el: "#vueProfile",
	data: {
		username: userInformation.username,
		profileImage: userInformation.profileImage,
		userId: userInformation.userId,
		uid: "",
		view: {
			permissions: false
		},
		editing: {
			username: ""
		},
		characters: []
	},
	methods: {
		toggleVisible(entry) {
			let index = this.characters.indexOf(entry);
			this.characters[index].show = !this.characters[index].show;
		},
		copyId() {
			const el = document.createElement('textarea');
			el.value = this.userId;
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
			skb("Id copied");
		},
		viewCharacter(character) {
			global.openCharacter({
				uid: global.inspectUserUid,
				characterId: character.id
			});
		},
		changeUsername() {
			if (this.editing.username !== "") {
				global.alert({
					text: "Are you sure you want to change your username?",
					btn1: "change",
					btn2: "cancel",
					btn1fn: function() {
						userRef.update({
							username: vueInstance.editing.username
						}).then(e => {
							firestore.collection("userId").doc(vueInstance.userId).update({
								username: vueInstance.editing.username
							}).then(e => {
								a.ev("Profile", "username changed", "user action", "");
								skb("Username changed")
							});
						})
					}
				})
			} else {
				skb("You have to provide a name")
			}
		}
	}
});

firestore.collection("users").doc(global.inspectUserUid).get().then(async function(doc) {
	if (doc && doc.exists) {
		let data = doc.data();
		vueInstance.username = data.username;
		vueInstance.uid = global.inspectUserUid;
		vueInstance.profileImage = data.usericon;
		vueInstance.userId = data.userId;

		let query = await createQuery(uRef.collection("characters"));
		console.log(query);
		if (query.length > 0) {
			for (var i = 0; i < query.length; ++i) {
				let character = query[i];
				console.log(character);
				uRef.collection("characters").doc(character.id).collection("data").doc("characterObj").get().then(doc => {
					if (doc && doc.exists) {
						character.name = doc.data()["96_1"];
						character.show = false;
						character.showEdited = new Date(character.lastEdited).toString();
						character.showCreated = new Date(character.createdAt).toString();
						console.log(character);
						vueInstance.characters.push(character);
					}
				});
			}
		}
	}
});
