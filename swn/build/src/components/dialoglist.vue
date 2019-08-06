<template>
    <transition name="scim">
        <div class="scim" v-if="internalShow" @click.self="$emit('close')">
            <transition name="dialog" appear>
                <div v-if="internalShow" class="dialog">
                    <div class="head">
                        <h1>{{ title }}</h1>
                    </div>
                    <div class="contentWrapper">
                        <slot></slot>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    props: ["show", "title", "value"],
    data() {
        return {
            internalShow: false
        }
    },
    watch: {
        show() {
            if (this.show === "true" || this.show === true) {
                this.internalShow = true;
            } else {
                this.internalShow = false;
            }
        }
    },
    created() {
        if (this.show === "true" || this.show === true) {
            this.internalShow = true;
        } else {
            this.internalShow = false;
        }
    }
}
</script>

<style lang="stylus">

@import "../default.stylus";

.scim {

    position: fixed;
	top: 0;
	left: 0;
	z-index: 20;
	background-color: rgba(#000000, .32);

	height: 100%;
	width: 100%

    .dialog {
        position: fixed;
        z-index: 21;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        max-height: 70%;

        width: 280px;
        background-color: #ffffff;
        box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);
        border-radius: 4px;

        padding: 0px 24px;

        .head {
            width: 100%;
            height: 64px;

            h1 {
                margin: 0;

                font-family: defaultFont;
                font-size: 20px;
                color: #000000de;
                position: relative;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        .contentWrapper {
            overflow-y: auto;
            overflow-x: hidden;

            .optionList {
                width: 100%;

                border-top: 2px solid dividerColor;
                border-bottom: 2px solid dividerColor;
            }

            .actions {
                display: inline-block;
                height: 52px;
                padding: 0;


                button {
                    float: right;
                    margin-top: 8px;
                    margin-bottom: 8px;

                    &:not(.primary) {
                        box-shadow: 0 0 0 0 rgba(0,0,0,.2), 0 0 0 0 rgba(0,0,0,.14), 0 0 0 0 rgba(0,0,0,.12);
                        background-color: transparent;
                        color: secondaryColor;

                        &:hover {
                            background-color: rgba(#e5e5e5, .2);
                        }
                    }
                }  
            }

            .listItem {
                height: 48px;
                padding: 0;
                border: 0;
            }
        }
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

.dialog-enter-active {
	transition: 150ms cubic-bezier(0.0, 0.0, 0.2, 1) all;
}

.dialog-leave-active {
	transition: 100ms cubic-bezier(0.0, 0.0, 0.2, 1) all;
}

.dialog-enter {
	opacity: 0;
	transform: scale(0.9);
}

.dialog-enter-to {
	opacity: 1;
	transform: scale(1);
}

.dialog-leave {
    opacity: 1;
}

.dialog-leave-to {
    opacity: 0;
}

</style>
