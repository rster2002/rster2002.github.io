<template lang="html">
	<div class="wrapper">
		<div class="inner dp10" :style="{backgroundColor: color}">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	props: ["color"]
}
</script>

<style lang="stylus" scoped>

@import "../global.stylus";

.wrapper {
	height: 100%;
	flex-basis: 50%;

	.inner {
		width: 80%;
		height: 80%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 15px;

		h1 {
			margin: 0;
			color: #ffffff;
			width: 100%;
			text-align: left;
			width: calc(100% - 32px);
			padding: 16px;
		}

		p {
			font-family: font;
			color: #ffffff;
			font-size: 44px;
			text-align: center;
			margin: 8px 0px;
		}
	}
}

@media screen and (min-width: 700px) {
	.wrapper {
		flex-basis: 25%;
	}
}

@media screen and (min-width: 1300px) {
	.wrapper {
		flex-basis: 12.5%;
	}
}
</style>
