import Vue from "vue";
import vueRouter from "vue-router";
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import { plugin } from "vue-function-api";

// Checks whether or not the current enviorment is production or not
if (process.env.NODE_ENV !== "development") {
    // Initializes Sentry with vue intergration
    Sentry.init({
        dsn: 'https://48beac98d6464c3d8ee3576c175e96cd@sentry.io/1545994',
        integrations: [new Integrations.Vue({ Vue, attachProps: true, logErrors: true })],
        environment: process.env.NODE_ENV
    });
}

// Imports the base app component and routes
import app from "./app.vue";
import routes from "./routes.js";

// Tells vue to use the function api and 'vue-shortkey' library
Vue.use(plugin);
Vue.use(require("vue-shortkey"));

// Creates a new router to be used by vue and assigned to the app. Gets the routes from './routes.js'
const router = new vueRouter({
	routes
});


// Initialize the Vue app
let i = new Vue({
	router,
	render: h => h(app)
}).$mount("#app");
