<template lang="html">
	<div class="title" :style="{ width: c }">
		<h1><slot></slot></h1>
	</div>
</template>

<script>
export default {
	props: ["minus"],
	computed: {
		c() {
			console.log(Number(this.minus));
			return `calc(100% - ${64 * Number(this.minus)}px)`;
		}
	}
}
</script>

<style lang="stylus" scoped>
@import "../default.stylus";

.title {
	height: 64px;
	float: left;

	h1 {
		margin: 0;
		position: relative;
		top: 50%;
		transform: translateY(-50%);

		font-size: 18px;
		font-family: defaultFont;
		font-weight: 500;
		color: #ffffff;

		padding: 0px 4px;

		text-transform: capitalize;
	}
}

</style>
