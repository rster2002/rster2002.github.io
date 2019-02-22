<template lang="html">
	<div class="header dp2">
		<p>{{ username }}</p>
	</div>
</template>

<script>
import store from "../store.js";

export default {
	data() {
		return {
			username: store.state.username
		}
	}
}
</script>

<style lang="stylus" scoped>
@import "../global.stylus";

.header {
	z-index: 10;
	position: fixed;
	width: 100%;
	height: 64px;
	background-color: #ffffff;
}

@media screen and (max-width: 600px) {
	.header {
		height: 54px;
	}
}

</style>
