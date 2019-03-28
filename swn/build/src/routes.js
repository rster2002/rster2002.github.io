import Vue from "vue";
import vueRouter from "vue-router";

// import mainView from "./pages/mainView.vue"
//
// // Pages
// import loginPage from "./pages/login.vue";
// import dashboardPage from "./pages/dashboard.vue";
// import charactersPage from "./pages/characters.vue";
// import shipsPage from "./pages/ships.vue";

// Setup router
Vue.use(vueRouter);

const routes = [
	{ path: "/login", component: () => import("./pages/login.vue").then(m => m.default) },
	{ path: "/", component: () => import("./pages/mainView.vue").then(m => m.default),
		children: [
			{ path: "/", meta: {title: "dashboard"}, component: () => import("./pages/dashboard.vue").then(m => m.default) },
			{ path: "/characters", meta: {title: "characters"}, component: () => import("./pages/characters.vue").then(m => m.default) },
			{ path: "/ships", meta: {title: "ships"}, component: () => import("./pages/ships.vue").then(m => m.default) }
		]
	}
]

export default routes;
