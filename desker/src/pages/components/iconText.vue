<template lang="html">
	<div class="section">
		<div class="icon">
			<div class="icnWrapper">
				<img :src="u" />
			</div>
		</div>
		<div class="text">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	props: ["icon"],
	computed: {
		u() {
			return `./src/pages/icons/${this.icon}.png`;
		}
	}
}
</script>

<style lang="css" scoped>
</style>
