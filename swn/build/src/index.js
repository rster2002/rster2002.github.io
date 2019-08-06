import Vue from "vue";
import vueRouter from "vue-router";

import { plugin } from "vue-function-api";

import { fb, fs } from "@js/firebase.js";

import app from "./app.vue";
import routes from "./routes.js";

Vue.use(plugin);
Vue.use(require("vue-shortkey"));

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
