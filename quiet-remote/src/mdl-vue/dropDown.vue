<template>
    <section class="mdl dropDown">
        <div class="mdl dropDownHead">
            <p @click="toggleOpen()">
                <icon :class="{active: internalOpen}">
                    menu-up
                </icon>
                {{ label }}
            </p>
        </div>
        <transition name="dropDownContent">
            <div class="mdl dropDownContent" v-if="internalOpen">
                <slot></slot>
            </div>
        </transition>
    </section>
</template>

<script>
import icon from "./icon.vue";

export default {
    props: ["value", "label"],
    components: {
        icon
    },
    data() {
        return {
            internalOpen: false
        }
    },
    watch: {
        value() {
            this.internalOpen = this.value;
        }
    },
    methods: {
        toggleOpen() {
            this.internalOpen = !this.internalOpen;

            this.$emit("input", this.internalOpen);
        }
    },
    created() {
        if (this.value !== undefined) {
            this.internalOpen = this.value;
        }
    }
}
</script>

<style lang="scss" scoped>

@import "./config.scss";

.dropDown {
    width: 100%;

    .dropDownHead {
        height: 40px;
        width: 100%;

        p {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            margin: 0;

            font-size: 16px;
            font-family: $dropDownFontFamily;

            .icon {
                transform: translateY(4px) rotate(0deg);

                font-size: 20px;
                transition: 200ms cubic-bezier(0.4, 0.0, 0.2, 1) transform;

                &.active {
                    transform: translateY(4px) rotate(180deg);
                }
            }
        }
    }
}

.dropDownContent-enter-active {
	transition: 200ms cubic-bezier(0.4, 0.0, 0.2, 1) all;
}

.dropDownContent-enter {
	opacity: 0;
	transform: translateY(-16px);
}

.dropDownContent-enter-to {
	opacity: 1;
	transform: translateY(0);
}

</style>