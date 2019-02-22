import Vue from "vue";
import vueRouter from "vue-router";
import store from "./store.js";

import app from "./app.vue";

import dashboard from "./pages/dashboard.vue";

Vue.use(vueRouter);

var routes = [
	{path: "/", component: dashboard}
]

var router = new vueRouter({
	routes
});

new Vue({
	router,
	store,
	render: h => h(app)
}).$mount("#app");
