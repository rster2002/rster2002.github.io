import Vue from "vue";
import vueRouter from "vue-router";

// import mainView from "./pages/mainView.vue"
//
// // Pages
// import loginPage from "./pages/login.vue";
// import dashboardPage from "./pages/dashboard.vue";
// import charactersPage from "./pages/characters.vue";
// import shipsPage from "./pages/ships.vue";

// Setup router
Vue.use(vueRouter);

const routes = [
    {
        path: "/", component: () => import("./pages/mainView.vue").then(m => m.default),
        children: [
            { path: "/", component: () => import("./pages/index.vue").then(m => m.default) },
            {
                path: "/docs", component: () => import("./pages/docs.vue").then(m => m.default),
                children: [
                    { path: "/", component: () => import("./pages/docs/index.vue").then(m => m.default) },
                    { path: "getting-started", component: () => import("./pages/docs/getting-started.vue").then(m => m.default) },
                    { path: "commands", component: () => import("./pages/docs/commands.vue").then(m => m.default) }
                ]
            }
        ]
    }
]

export default routes;
