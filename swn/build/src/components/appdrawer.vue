<template lang="html">
	<transition name="scim">
		<div @click="$emit('closedrawer')" class="drawerScim" v-if="show">
			<transition name="drawer" appear>
				<div class="drawer" v-if="show">
					<slot></slot>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
export default {
	props: ["show"]
}
</script>

<style lang="stylus" scoped>
@import "../default.stylus";

.drawerScim {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 8;
	background-color: rgba(0, 0, 0, .5);

	.drawer {
		height: 100%;
		width: 80%;
		max-width: 400px;
		background-color: navDrawerBackgroundColor;
	}
}

.scim-enter-active, .scim-leave-active, .drawer-enter-active, .drawer-leave-active {
	transition: 200ms cubic-bezier(0.4, 0.0, 0.2, 1) all;
}

.scim-enter, .scim-leave-to {
	opacity: 0;
}

.scim-enter-to, .scim-leave {
	opacity: 1;
}

.drawer-enter, .drawer-leave-to {
	transform: translateX(-100%);
}

.drawer-enter-to, .drawer-leave {
	transform: translateX(0%);
}

</style>
