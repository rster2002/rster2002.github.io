<template lang="html">
	<div class="fab">
		<p class="material-icons"><slot></slot></p>
	</div>
</template>

<style lang="stylus" scoped>
@import "../default.stylus";

.fab {
	position: fixed;
	right: 32px;
	bottom: 32px;

	width: 54px;
	height: 54px;
	border-radius: 50%;

	background-color: secondaryColor;

	box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);

	p {
		margin: 0;
		font-size: 24px;
		font-weight: 400;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #ffffff;
	}
}

</style>
