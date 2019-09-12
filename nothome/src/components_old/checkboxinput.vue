<template>
    <div class="outerCheckboxInput">
        <div class="innerCheckboxInput">
            <div class="checkboxWrapper">
                <checkbox v-model="innerstate"></checkbox>
            </div>
            <div class="textWrapper">
                <p>{{ label }}</p>
            </div>
        </div>
    </div>
</template>

<script>

import checkbox from "./checkbox.vue";

function updateInnerstate(state) {

    state.innerstate = state.value;

}

export default {
    props: ["value", "label"],
    components: {
        checkbox
    },
    data() {
        return {
            innerstate: false
        }
    },
    watch: {
        value() {
            updateInnerstate(this);
        },
        innerstate() {
            this.$emit("input", this.innerstate);
        }
    },
    created() {
        updateInnerstate(this);
    }
}
</script>

<style lang="stylus" scoped>

@import "../default.stylus";

textboxWrapperHeight = 32px;

.outerCheckboxInput {
    height: textboxWrapperHeight;
    width: 100%;

    .innerCheckboxInput {
        height: textboxWrapperHeight;
        width: 90%;

        position: relative;

        margin: 32px;
        margin-left: auto;
        margin-right: auto;

        .checkboxWrapper {
            height: textboxWrapperHeight;
            width: textboxWrapperHeight;
            float: left;

            .checkbox {
                position: relative;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .textWrapper {
            height: textboxWrapperHeight;
            width: "calc(100% - %s)" % textboxWrapperHeight;
            float: left;

            p {
                margin: 0px;
                padding: 0px 8px;
                font-size: 16px;

                font-family: defaultFont;
                color: defaultFontColor;

                position: relative;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
}

</style>