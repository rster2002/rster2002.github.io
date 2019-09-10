import Vue from "vue";
import vueRouter from "vue-router";

// Setup router
Vue.use(vueRouter);

const routes = [
    { path: "/login", component: () => import("./pages/login.vue").then(m => m.default) },
    { path: "/p/r/:prjid", component: () => import("./pages/prj/apps/reportbug.vue").then(m => m.default) },
    {
        path: "/", component: () => import("./pages/mainView.vue").then(m => m.default),
        children: [
            { path: "/", meta: { title: "dashboard" }, component: () => import("./pages/dashboard.vue").then(m => m.default) },
            { path: "projects", meta: { title: "projects" }, component: () => import("./pages/projects.vue").then(m => m.default) },
            { path: "settings", meta: { title: "settings" }, component: () => import("./pages/settings.vue").then(m => m.default) },
            {
                path: "/project/:prjid", meta: { title: "project" }, component: () => import("./pages/project.vue").then(m => m.default),
                children: [
                    { path: "overview", meta: { title: "prj-overview" }, component: () => import("./pages/prj/overview.vue").then(m => m.default) },
                    { path: "timeline", meta: { title: "prj-timeline" }, component: () => import("./pages/prj/timeline.vue").then(m => m.default) },
                    { path: "tasks", meta: { title: "prj-tasks" }, component: () => import("./pages/prj/tasks.vue").then(m => m.default) },
                    { path: "apps", meta: { title: "prj-apps" }, component: () => import("./pages/prj/apps.vue").then(m => m.default) },
                    { path: "apps/bugreporting", meta: { title: "app-bugreporting" }, component: () => import("./pages/prj/apps/bugreporting.vue").then(m => m.default) },
                    { path: "settings", meta: { title: "prj-settings" }, component: () => import("./pages/prj/settings.vue").then(m => m.default) },
                    { path: "task/:taskid", meta: { title: "prj-task" }, component: () => import("./pages/prj/task.vue").then(m => m.default) }
                ]
            }
        ]
    }
]

export default routes;
