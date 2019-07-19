import Vue from "vue";
import vueRouter from "vue-router";

// Setup router
Vue.use(vueRouter);

const routes = [
    { path: "/login", component: () => import("./pages/login.vue").then(m => m.default) },
    {
        path: "/", component: () => import("./pages/mainView.vue").then(m => m.default),
        children: [
        ]
    }
]

export default routes;
