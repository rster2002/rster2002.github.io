import Vue from "vue";
import vueRouter from "vue-router";

// Setup router
Vue.use(vueRouter);

const routes = [
    { path: "/login", component: () => import("./pages/login.vue").then(m => m.default) },
    {
        path: "/", component: () => import("./pages/mainView.vue").then(m => m.default),
        children: [
            { path: "/dashboard", meta: { title: "dashboard" }, component: () => import("./pages/dashboard.vue").then(m => m.default) },
            { path: "/projects", meta: { title: "projects" }, component: () => import("./pages/projects.vue").then(m => m.default) },
            { path: "/settings", meta: { title: "settings" }, component: () => import("./pages/settings.vue").then(m => m.default) }
        ]
    }
]

export default routes;
