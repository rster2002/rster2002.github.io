<template>
    <div class="mdl topBarTitle" :style="{width: computedWidth}">
        <h1 class="overwritableByButton">
            <slot></slot>
        </h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            computedWidth: ""
        }
    },
    watch: {
        $slots() {
            this.computeWidth();
        }
    },
    methods: {
        computeWidth() {
            var subtractPixels = document.querySelectorAll(".topBar .topBarButton").length * 64;
            this.computedWidth = `calc(100% - ${subtractPixels}px)`;
        }
    },
    created() {
        this.$nextTick(() => {
            this.computeWidth();
        });
    }
}
</script>

<style lang="scss" scoped>

@import "./config.scss";

.topBarTitle {
    height: 100%;
    width: 100%;

    float: left;

    h1 {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        padding: 0px 22px;
        margin: 0;

        font-family: $topBarFontFamily;
        font-weight: $topBarFontWeight;
        font-size: $topBarFontSize;
        text-transform: $topBarFontTransform;
        letter-spacing: $topBarLetterSpacing;
        color: $topBarFontColor;
    }
}

</style>