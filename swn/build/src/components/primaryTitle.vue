<template lang="html">
	<div class="header">
		<slot></slot>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
@import "../default.stylus";

.header {
	width: 100%;
	padding: 16px;

	h1 {
		margin: 0;
		padding: 0;
		font-family: defaultFont;
		font-size: 20px;
		font-weight: 500;
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
}

</style>
