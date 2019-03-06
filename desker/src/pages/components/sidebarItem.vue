<template lang="html">
	<div class="item i">
		<div class="icon">
			<img :src="u" class="i" />
		</div>
		<div class="text">
			<p><slot></slot></p>
		</div>
	</div>
</template>

<script>
export default {
	props: ["icon"],
	computed: {
		u() {
			return "./src/pages/icons/" + this.icon + ".png";
		}
	}
}
</script>
