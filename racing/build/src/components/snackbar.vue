<template lang="html">
	<transition name="bar">
		<div class="snackbar" v-if="internalShow">
            <p><slot></slot></p>
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
	created() {
		this.internalShow = this.show === true || this.show === "true";
	}
}
</script>

<style lang="stylus" scoped>

@import "../default.stylus";

.snackbar {
    position: fixed;
    z-index: 6;
    bottom: 24px;
    left: 24px;
    background-color: #323232;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);

    height: 48px;
    padding: 0px 16px;
    max-width: 344px;

    border-radius: standardRadius;

    p {
        margin: 0;
        padding: 0;
        font-family: defaultFont;
        color: #ffffffde;
        font-weight: 400;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
}

.bar-enter-active {
	transition: 150ms cubic-bezier(0.0, 0.0, 0.2, 1) all;
}

.bar-leave-active {
	transition: 100ms cubic-bezier(0.0, 0.0, 0.2, 1) all;
}

.bar-enter {
	opacity: 0;
	transform: scale(0.9);
}

.bar-enter-to {
	opacity: 1;
	transform: scale(1);
}

.bar-leave {
    opacity: 1;
}

.bar-leave-to {
    opacity: 0;
}

@media only screen and (max-width: 600px) {
	.snackbar {
        bottom: 8px;
        left: 8px;
        width: calc(100% - 48px);
        max-width: 10000px;
    }
}

</style>
