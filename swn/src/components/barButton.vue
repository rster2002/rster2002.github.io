<template lang="html">
	<div class="btn">
		<p class="material-icons"><slot></slot></p>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>

.btn {
	height: 54px;
	width: 54px;

	p {
		margin: 0;
		color: #ffffff;
		font-size: 24px;

		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}

</style>
