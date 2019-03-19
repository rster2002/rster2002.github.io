import Vue from "vue";
import vueRouter from "vue-router";

// Pages
import loginPage from "./pages/login.vue";
import gamePage from "./pages/game.vue";

// Setup router
Vue.use(vueRouter);

const routes = [
    { path: "/", component: loginPage },
	{ path: "/game", component: gamePage }
];

export default routes;
