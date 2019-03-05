import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

var i = new Vuex.Store({
	state: {
		username: "",
		uid: "",
		sessionid: "",
		coins: "-1"
	},
	mutations: {
		setUsername(state, payload) {
			state.username = payload;
		}
	}
})

export default i;
