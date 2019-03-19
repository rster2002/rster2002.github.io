import Vue from "vue";
import vueRouter from "vue-router";

// Pages
import projectPage from "./pages/project.vue";

// Setup router
Vue.use(vueRouter);

const routes = [
    { path: "/:project", component: projectPage }
];

export default routes;
