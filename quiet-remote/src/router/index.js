import Vue from 'vue'
import VueRouter from 'vue-router'
import mainView from '../views/mainView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Main",
        component: mainView
    }
]

const router = new VueRouter({
    routes
});

export default router
