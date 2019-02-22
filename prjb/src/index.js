import Vue from "vue";
import app from "./app.vue";
import vueRouter from "vue-router";

// Pages
import dashboardPage from "./pages/dashboard.vue";

// Setup router
Vue.use(vueRouter);

const routes = [
	{path: "/", component: dashboardPage}
]

const router = new vueRouter({
	routes
});

// Finalize
new Vue({
	router,
	render: h => h(app)
}).$mount("#app");
