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

<style lang="scss" scoped>
@import "./config.scss";

.title {
    height: 64px;
    
	float: left;

	h1 {
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		margin: 0;
		padding: 0px 4px;

		color: $appbarFontColor;
		font-family: $appbarFontFamily;
		font-size: $appbarFontSize;
        font-weight: $appbarFontWeight;
        letter-spacing: $appbarLetterSpacing;
		text-transform: $appbarFontTransform;
	}
}

</style>
