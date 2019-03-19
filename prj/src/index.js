import Vue from "vue";
import vueRouter from "vue-router";

import app from "./app.vue";
import routes from "./routes.js";

const router = new vueRouter({
    routes
});

// Finalize
let i = new Vue({
    router,
    render: h => h(app)
}).$mount("#app");
