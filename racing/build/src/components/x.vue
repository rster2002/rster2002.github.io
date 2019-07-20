<template>
    <p class="x" @click="$emit('click')"><span class="material-icons">close</span></p>   
</template>

<style lang="stylus" scoped>
.x {
	display: inline-block;
	width: 24px;
	position: absolute;
	right: 0px;
	cursor: pointer;
	z-index: 21;
}
</style>
