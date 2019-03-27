import Vue from "vue";
import vueRouter from "vue-router";

import mainView from "./pages/mainView.vue"

// Pages
import loginPage from "./pages/login.vue";
import dashboardPage from "./pages/dashboard.vue";
import charactersPage from "./pages/characters.vue";
import shipsPage from "./pages/ships.vue";

// Setup router
Vue.use(vueRouter);

const routes = [
	{ path: "/login", component: loginPage },
	{ path: "/", component: mainView,
		children: [
			{ path: "/", component: dashboardPage },
			{ path: "/characters", component: charactersPage},
			{ path: "/ships", component: shipsPage}
		]
	}
]

export default routes;
