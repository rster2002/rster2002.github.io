<template>
    <transition name="contentDropdown">
        <div v-if="v">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    props: ["show"],
    data() {
        return {
            v: false
        }
    },
    watch: {
        show() {
            if (this.show === true || this.show === "true") {
                this.v = true;
            } else {
                this.v = false;
            }
        }
    },
    created() {
        if (this.show === true || this.show === "true") {
            this.v = true;
        } else {
            this.v = false;
        }
    }
}
</script>

<style lang="stylus" scoped>
.contentDropdown-enter-active {
	transition: 200ms cubic-bezier(0.4, 0.0, 0.2, 1) all;
}

.contentDropdown-enter {
	opacity: 0;
	transform: translateY(-16px);
}

.contentDropdown-enter-to {
	opacity: 1;
	transform: translateY(0);
}
</style>
