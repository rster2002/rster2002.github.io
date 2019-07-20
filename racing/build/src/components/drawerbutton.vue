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

<style lang="stylus" scoped>
@import "../default.stylus";

btnHeight = 40px;

.btn {
	width: calc(100% - 16px);
	margin: 8px 8px;
	height: btnHeight;
	border-radius: standardRadius;

	cursor: pointer;

	color: defaultFontColor;

	.icon {
		height: btnHeight;
		width: btnHeight;
		float: left;

		span {
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.text {
		width: "calc(100% - %s)" % btnHeight;
		height: btnHeight;
		float: left;

		p {
			width: calc(100% - 32px);
			margin: 0;
			padding: 0px 16px;

			position: relative;
			top: 50%;
			transform: translateY(-50%);

			font-family: defaultFont;
		}
	}

	&.s {
		background-color: rgba(secondaryColor, .1);
	}
}

</style>
