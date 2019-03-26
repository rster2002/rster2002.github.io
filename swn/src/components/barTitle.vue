<template lang="html">
	<div class="title" :style="{ width: c }">

	</div>
</template>

<script>
export default {
	props: ["minus"],
	computed: {
		c() {
			console.log(Number(this.minus));
			return `calc(100% - ${54 * Number(this.minus)})`;
		}
	}
}
</script>

<style lang="stylus" scoped>

.title {
	height: 54px;
}

</style>
