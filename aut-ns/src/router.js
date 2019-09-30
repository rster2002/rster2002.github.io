import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import dashboard from "./views/dashboard.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            component: App,
            children: [
                {
                    path: "/",
                    name: "dashboard",
                    component: dashboard
                }
            ]
        }
    ]
});
