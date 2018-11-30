var vueInstance = new Vue({
	el: "#vueProfile",
	data: {
		username: userInformation.username,
		profileImage: userInformation.profileImage,
		userId: userInformation.userId,
		view: {
			permissions: false
		},
		editing: {
			username: ""
		}
	},
	methods: {
		toggleVisible(entry) {
			this.view[entry] = !this.view[entry];
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
