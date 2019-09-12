<template lang="html">
	<transition name="scim">
		<div @click="$emit('input', false)" class="drawerScim" v-if="value">
			<transition name="drawer" appear>
				<div class="drawer" v-if="value">
					<slot></slot>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
export default {
    props: ["value"]
}
</script>

<style lang="scss" scoped>

@import "./config.scss";

.drawerScim {
	height: 100%;
    width: 100%;
    
	position: fixed;
	top: 0;
	left: 0;
	z-index: 16;

    background-color: rgba(0, 0, 0, .32);
    
	.drawer {
		height: 100%;
		width: 80%;
        max-width: 400px;

		background-color: $appdrawerBackgroundColor;
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
