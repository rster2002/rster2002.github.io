import Vue from "vue";
import vueRouter from "vue-router";

import app from "./app.vue";
import routes from "./routes.js";

Vue.use(require("vue-shortkey"));

const router = new vueRouter({
    routes
});


// Finalized
let i = new Vue({
    router,
    render: h => h(app)
}).$mount("#app");
