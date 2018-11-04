var vueInstance = new Vue({
	el: "#vueProfile",
	data: {
		username: userInformation.username,
		profileImage: userInformation.profileImage,
		userId: userInformation.userId,
		view: {
			permissions: false
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
		}
	}
});
