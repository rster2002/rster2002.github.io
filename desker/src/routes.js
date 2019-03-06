import Vue from "vue";
import vueRouter from "vue-router";

// Pages
import loginPage from "./pages/login.vue";
import reposPage from "./pages/repos.vue";

// Setup router
Vue.use(vueRouter);

const routes = [
	{path: "/", component: loginPage},
	{path: "/repos", component: reposPage}
]

export default routes;
