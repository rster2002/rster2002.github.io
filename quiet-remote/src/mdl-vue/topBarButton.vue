<template>
    <button class="mdl topBarButton" @click="handleClickEvent()">
        <icon>
            <slot></slot>
        </icon>
    </button>
</template>

<script>
import vueChannel from "vue-channel";

import icon from "./icon.vue";

export default {
    props: ["action"],
    components: {
        icon
    },
    methods: {
        handleClickEvent() {
            this.$emit("click");

            if (this.action !== undefined) {
                vueChannel(this.action)
                    .set({
                        trigger: Math.random(),
                        origin: this
                    });
            }
        }
    }
}
</script>

<style lang="scss" scoped>

@import "./config.scss";

.topBarButton {
    height: 64px;
    width: 64px;

    margin: 0;
    padding: 0;
    float: left;

    border: 0;
    outline: 0;
    background-color: transparent;
    color: $topBarFontColor;
    font-size: 24px;
    cursor: pointer;
}

</style>

<style lang="scss">

.topBarButton + .topBarTitle h1.overwritableByButton {
    padding: 0px 4px;
}

</style>