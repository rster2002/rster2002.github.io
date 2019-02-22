<template lang="html">
	<div>
		<div>
			<p>Home</p>
			<input v-model="test" />
		</div>
	</div>
</template>

<script>

import store from "../store.js";
export default {
	data() {
		return {
			test: store.state.username
		}
	}
}
</script>

<style lang="css" scoped>
</style>
