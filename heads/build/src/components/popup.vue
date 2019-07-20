<template lang="html">
	<transition name="scim">
		<div class="popup" v-if="internalShow">
			<transition name="content" appear>
				<div class="popupContent" @click.self="close()">
					<slot></slot>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
export default {
	props: ["show"],
	data() {
		return {
			internalShow: false
		}
	},
	watch: {
		show() {
			this.internalShow = this.show === true || this.show === "true";
		}
	},
	methods: {
		close() {
			this.$emit("close");
		}
	},
	created() {
		this.internalShow = this.show === true || this.show === "true";
	}
}
</script>

<style lang="stylus" scoped>

.popup {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 20;
	background-color: rgba(#000000, .5);

	height: 100%;
	width: 100%;

	.popupContent {
		width: 100%;
		height: 100%;

		overflow: hidden;
		overflow-y: auto;
	}
}

.scim-enter-active, .scim-leave-active, .content-enter-active, .content-leave-active {
	transition: 200ms cubic-bezier(0.4, 0.0, 0.2, 1) all;
}

.scim-enter, .scim-leave-to {
	opacity: 0;
}

.scim-enter-to. .scim-leave {
	opacity: 1;
}

.content-enter, .content-leave-to {
	opacity: 0;
	transform: translateY(32px);
}

.content-enter-to, .content-leave {
	opacity: 1;
	transform: translateY(0px);
}

</style>
