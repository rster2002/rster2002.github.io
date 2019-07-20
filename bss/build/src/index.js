import Vue from "vue";
// import { plugin } from 'vue-function-api'
import vueRouter from "vue-router";

// import MyPlugin from "./testplugin.js"

import app from "./app.vue";
import routes from "./routes.js";

Vue.use(require("vue-shortkey"));
// Vue.use(plugin);

const router = new vueRouter({
    routes
});


// Finalized
let i = new Vue({
    router,
    render: h => h(app)
}).$mount("#app");

// if ("serviceWorker" in navigator) {
//     window.addEventListener("load", () => {
//         navigator.serviceWorker.register("/sw.js").then(() => console.log("registarted")).catch(() => console.error("failed"));
//     });
// }
