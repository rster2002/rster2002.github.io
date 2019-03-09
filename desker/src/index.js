import Vue from "vue";
import vueRouter from "vue-router";
import store from "./store.js";

import app from "./app.vue";
import routes from "./routes.js";

import {mac} from "./pages/js/global.js";

import {fb, fs} from "./pages/js/firebase.js";

const router = new vueRouter({
	routes
});

// Finalize
let i = new Vue({
	router,
	store,
	render: h => h(app),
	watch: {
		"$route": function() {
			var i = JSON.parse(sessionStorage.getItem("user"));
			if (i.auth !== undefined) {
				this.$router.push({path: "/"});
			}
		}
	}
}).$mount("#app");

fb.auth().onAuthStateChanged(function(user) {
	if (user === null) {
		sessionStorage.setItem("user", JSON.stringify({auth: false}));
		i.$router.push({path: "/"});
	} else {
		fs.collection(`users/${user.uid}/private`).doc("token").get().then(a => {
			sessionStorage.setItem("auth", a.data().token);

			mac("/user").then(r => sessionStorage.setItem("gitUser", JSON.stringify(r)));
		});
		sessionStorage.setItem("user", JSON.stringify(user));
	}
});
