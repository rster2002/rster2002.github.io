<template lang="html">
	<div class="btn" @click="$emit('click')">
		<div class="icon">
			<span class="material-icons">
				{{ icon }}
			</span>
		</div>
		<div class="text">
			<p><slot></slot></p>
		</div>
	</div>
</template>

<script>
export default {
	props: ["icon"]
}
</script>

<style lang="scss" scoped>

@import "./config.scss";

$btnHeight: 40px;

.btn {
	height: $btnHeight;
	width: calc(100% - 16px);

	margin: 8px 8px;

	color: $drawerbtnFontColor;
	border-radius: $drawerbtnBorderRadius;
	cursor: pointer;

	.icon {
		height: $btnHeight;
		width: $btnHeight;

		float: left;

		span {
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.text {
		height: $btnHeight;
		width: calc(100% - #{$btnHeight});
		float: left;

		p {
			width: calc(100% - 32px);

			position: relative;
			top: 50%;
			transform: translateY(-50%);
			margin: 0;
			padding: 0px 16px;

			font-family: $drawerbtnFontFamily;
		}
	}

	&.s {
		background-color: rgba($drawerbtnFontColor, .1);
	}
}

</style>
