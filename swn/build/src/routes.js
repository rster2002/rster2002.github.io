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
			{ path: "/versions", meta: {title: "versions"}, component: () => import("./pages/versions.vue").then(m => m.default) },
			{ path: "/admin", meta: {title: "admin"}, component: () => import("./pages/admin.vue").then(m => m.default) },
			{ path: "/characters", meta: {title: "characters"}, component: () => import("./pages/characters.vue").then(m => m.default) },
			{ path: "/groups", meta: {title: "groups"}, component: () => import("./pages/groups.vue").then(m => m.default) },
			{ path: "/character/:ownerUid/:characterId", meta: {title: "character"}, component: () => import("./pages/character.vue").then(m => m.default) }
		]
	},
	{ path: "*", component: () => import("./pages/notfound.vue").then(m => m.default) }
]

export default routes;
