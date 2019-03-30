<template lang="html">
	<div class="card">
		<slot></slot>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
@import "../default.stylus";

.card {
	width: calc(100% - 32px);

	margin: 16px;
	margin-left: auto;
	margin-right: auto;
	padding: 1px 0px;

	max-width: 400px;
	border-radius: standardRadius;

	background-color: forGroundColor;
	// border: 2px solid borderColor;

	box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);

	p {
		padding: 0px 16px;
		width: calc(100% - 32px);
		overflow: hidden;
		white-space: normal;

		font-family: defaultFont;
		color: defaultFontColor;
	}

	.img {
		border-radius: standardRadius standardRadius 0 0;
		width: 100%;
		height: 250px;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}
}

</style>
