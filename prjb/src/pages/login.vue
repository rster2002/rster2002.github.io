<template lang="html">
	<div>
		<h1>Login</h1>
		<!-- <h2>Subtitle</h2> -->
		<div class="itemsWrapper" @click="login()">
			<v-colm color="#000042" class="full">
				<h1>Login with</h1>
				<p>Google</p>
			</v-colm>
		</div>
	</div>
</template>

<script>
import vColm from "../components/vColm.vue";
import {cfb, fb} from "../js/firebase.js";

import {genId} from "../js/global.js";

export default {
	components: {
		"v-colm": vColm
	},
	methods: {
		login() {
			console.log("HEY!!");
			var provider = new cfb.auth.GoogleAuthProvider();
			fb.auth().signInWithPopup(provider).then(r => {

			});
		}
	}
}
</script>

<style lang="css" scoped>
</style>
