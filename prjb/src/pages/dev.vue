<template lang="html">
	<div>
		<h1>Make api call</h1>
		<input v-model="path" />
		<button @click="makeCall()">Call</button>
		<h2>Responce</h2>
		<p>{{ responce }}</p>
	</div>
</template>

<script>
import {makeApiCall} from "../js/global.js";
export default {
	data() {
		return {
			path: "",
			responce: ""
		}
	},
	methods: {
		makeCall() {
			let i = this.path.replace("$uid", this.$store.state.uid);
			makeApiCall(i).then(a => this.responce = a);
		}
	}
}
</script>

<style lang="css" scoped>
</style>
