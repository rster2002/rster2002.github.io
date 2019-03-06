import Vue from "vue";
import vueRouter from "vue-router";
import store from "./store.js";

import app from "./app.vue";
import routes from "./routes.js";

const router = new vueRouter({
	routes
});

// Finalize
new Vue({
	router,
	store,
	render: h => h(app)
}).$mount("#app");
