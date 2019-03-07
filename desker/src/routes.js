import Vue from "vue";
import vueRouter from "vue-router";

// Pages
import loginPage from "./pages/login.vue";
import reposPage from "./pages/repos.vue";
import repoPage from "./pages/repo.vue";

import repoDashboard from "./pages/repo/dashboard.vue";
import repoEvents from "./pages/repo/events.vue";

// Setup router
Vue.use(vueRouter);

const routes = [
	{path: "/", component: loginPage},
	{path: "/repos", component: reposPage},
	{
		path: "/repo/:user/:repo",
		component: repoPage,
		children: [
			{path: "dashboard", component: repoDashboard},
			{path: "events", component: repoEvents}
		]
	},
]

export default routes;
