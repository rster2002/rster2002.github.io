import Vue from "vue";
import vueRouter from "vue-router";

import mainView from "./pages/mainView.vue"

// Pages
import loginPage from "./pages/login.vue";
import dashboardPage from "./pages/dashboard.vue";

// Setup router
Vue.use(vueRouter);

const routes = [
	{ path: "/login", component: loginPage },
	{ path: "/", component: mainView,
		children: [
			{ path: "/dashboard", component: dashboardPage }
		]
	}
]

export default routes;
