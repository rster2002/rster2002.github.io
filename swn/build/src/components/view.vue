<template lang="html">
	<div class="view">
		<slot></slot>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>

.view {
	padding-top: 64px;
	height: calc(100% - 64px);
	width: 100%;
}

</style>
