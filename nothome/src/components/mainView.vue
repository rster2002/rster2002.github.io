<template lang="html">
	<div class="view">
		<slot></slot>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>

@import "./config.scss";

.view {
	height: calc(100% - 64px);
	width: 100%;

	padding-top: 64px;

    background-color: $backgroundColor;
}

</style>
