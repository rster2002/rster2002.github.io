<template lang="html">
	<div class="btn" @click="$emit('click')">
		<p class="material-icons"><slot></slot></p>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>

.btn {
	height: 64px;
	width: 64px;
	float: left;
	cursor: pointer;

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
