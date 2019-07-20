<template lang="html">
	<div class="empty">
		<div class="wrapper">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
@import "../default.stylus";

.empty {
	width: 100%;
	height: 100%;

	.wrapper {
		display: inline-block;
		position: relative;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);

		& > p {
			margin: 4px 0px;
			font-family: defaultFont;
			font-size: 16px;
			color: #252525;
			text-align: center;
		}

		& > img {
			width: 280.25px;
			height: 194.5px;
		}
	}
}

</style>
