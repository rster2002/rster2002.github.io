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
		}
	}
})
