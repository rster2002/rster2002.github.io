import Vue from "vue";
import vueRouter from "vue-router";

// Pages
import loginPage from "./pages/login.vue";
import reposPage from "./pages/repos.vue";
import repoPage from "./pages/repo.vue";

import repoDashboard from "./pages/repo/dashboard.vue";
import repoEvents from "./pages/repo/events.vue";
import repoTasks from "./pages/repo/tasks.vue";
import repoWorkers from "./pages/repo/workers.vue";
import repoTimeline from "./pages/repo/timeline.vue";

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
			{path: "events", component: repoEvents},
			{path: "tasks", component: repoTasks},
			{path: "workers", component: repoWorkers},
			{path: "timeline", component: repoTimeline},
		]
	},
]

export default routes;
