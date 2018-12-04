mdlvue = {
	r() {
		let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		var retn = "";
		let l = 26;
		for (var i = 0; i < l; i++) {
			var r = Math.floor(Math.random() * characters.length);
			retn += characters[r];
		}
		return retn;
	}
}

Vue.component("mdl-button", {
	template: `<button v-bind:id="intid" class="mdc-button" v-bind:class="{ 'mdc-button--raised': raised, 'mdc-button--outlined': outlined }"><i v-if="icon !== '' && icon !== undefined" class="material-icons mdc-button__icon" aria-hidden="true">{{ icon }}</i><slot></slot></button>`,
	props: {
		raised: Boolean,
		outlined: Boolean,
		icon: String
	},
	data: function() {
		return {
			intid: ""
		}
	},
	created() {

		let i = mdlvue.r();
		this.intid = i;

		Vue.nextTick(function() {
			console.log(i);
			mdc.ripple.MDCRipple.attachTo(document.querySelector("#" + i));
		});
	}
});

Vue.component("mdl-icon-btn", {
	template: `<button class="mdc-icon-button material-icons"><slot></slot></button>`
});

Vue.component("mdl-fab", {
	template: `<button v-bind:id="intid" class="mdc-fab" aria-label="Favorite">
		<span class="mdc-fab__icon material-icons">{{ icon }}</span>
	</button>`,
	props: {
		icon: String
	},
	data: function() {
		return {
			intid: ""
		}
	},
	created() {

		let i = mdlvue.r();
		this.intid = i;

		Vue.nextTick(function() {
			console.log(i);
			mdc.ripple.MDCRipple.attachTo(document.querySelector("#" + i));
		});
	}
});

var app = new Vue({
	el: "#app"
});
