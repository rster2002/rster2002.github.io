import Vue from "vue";
import vueRouter from "vue-router";

// Pages
import defaultPage from "./pages/default.vue";

// Setup router
Vue.use(vueRouter);

const routes = [
	{path: "/", component: defaultPage}
]

export default routes;
