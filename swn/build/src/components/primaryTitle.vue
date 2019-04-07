<template lang="html">
	<div @click="$emit('click')" class="header" :style="{ cursor: cursor }">
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: ["cursor"]
}
</script>

<style lang="stylus">
@import "../default.stylus";

.header {
	width: calc(100% - 16px);
	padding: 16px;
	position: relative;

	h1 {
		margin: 0;
		padding: 0;
		font-family: defaultFont;
		font-size: 20px;
		font-weight: 500;
		width: 50%;
	}

	h2 {
		margin: 0;
		margin-top: 4px;
		padding: 0;
		font-size: 16px;
		font-family: defaultFont;
		font-weight: 400;

		color: secondaryFontColor;
	}

	.w {
		position: absolute;
		top: 16px;
		right: 32px;

		h1 {
			float: right;
			width: auto;
			margin-left: 16px;
		}
	}
}

</style>
