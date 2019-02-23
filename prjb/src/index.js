import Vue from "vue";
import vueRouter from "vue-router";
import store from "./store.js";

import app from "./app.vue";
// Pages
import loginPage from "./pages/login.vue";
import dashboardPage from "./pages/dashboard.vue";
import devPage from "./pages/dev.vue";

// Setup router
Vue.use(vueRouter);

const routes = [
	{path: "/", component: loginPage},
	{path: "/dashboard", component: dashboardPage},
	{path: "/dev", component: devPage}
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
