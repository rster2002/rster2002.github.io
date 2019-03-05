import Vue from "vue";
import vueRouter from "vue-router";
import store from "./store.js";

import app from "./app.vue";
// Pages
import loginPage from "./pages/login.vue";

// Setup router
Vue.use(vueRouter);

const routes = [
	{path: "/", component: loginPage}
]

const router = new vueRouter({
	routes
});

// Finalize
new Vue({
	router,
	store,
	render: h => h(app)
}).$mount("#app");
