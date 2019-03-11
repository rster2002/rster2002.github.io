<template lang="html">
	<div>
		<transition name="scim">
			<div @click="$emit('click')" class="scim" v-if="show"></div>
		</transition>
		<transition name="popup">
			<div class="popup" v-if="show">
				<slot></slot>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	props: ["show"]
}
</script>

<style lang="stylus">
.popup {
	background-color: #e5e5e5;
	position: fixed;
	width: 70%;
	height: 70%;
	top: 50%;
	left: 50%;
	margin-left: auto;
	margin-right: auto;
	transform: translate(-50%, -50%);
	opacity: 1;
	border-radius: 15px;
	transition: all 150ms cubic-bezier(0.4, 0.0, 0.2, 1);
	z-index: 5;

	h1 {
		text-align: center;
		font-family: 'Montserrat', sans-serif;
	}

	p {
		width: 100%;
		white-space: normal;
		text-align: left;
		padding: 0px 16px;
	}
}

.popup-enter, .popup-enter-active {
	top: 55%;
	opacity: 0;
}

.popup-enter-to {
	top: 50%;
	opacity: 1;
}

.popup-leave {
	top: 50%;
	opacity: 1;
}

.popup-leave-to {
	top: 55%;
	opacity: 0;
}

.scim {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 4;
	background-color: rgba(0, 0, 0, .4);
	opacity: 1;
	top: 0;
	transition: all 150ms cubic-bezier(0.4, 0.0, 0.2, 1);
}

.scim-enter, .scim-leave-to {
	opacity: 0;
}

.scim-enter-to, .scim-leave {
	opacity: 1;
}
</style>
