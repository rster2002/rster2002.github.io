<template>
    <div class="drawertitle">
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

@import "./config.scss";

.drawertitle {
    height: 56px;
    width: 100%;

    margin-bottom: 8px;

    h1 {
        height: 36px;

        margin: 0;
        padding: 0px 16px;

        font-family: $drawertitlePrimaryFontFamily;
        font-weight: $drawertitlePrimaryFontWeight;
        font-size: $drawertitlePrimaryFontSize;
        letter-spacing: $drawertitlePrimaryLetterSpacing;
        text-transform: $drawertitlePrimaryFontTransform;
        line-height: 36px;
    }

    h2 {
        height: 20px;

        margin: 0;
        padding: 0px 16px;

        font-family: $drawertitleSecondaryFontFamily;
        font-weight: $drawertitleSecondaryFontWeight;
        font-size: $drawertitleSecondaryFontSize;
        letter-spacing: $drawertitleSecondaryLetterSpacing;
        text-transform: $drawertitleSecondaryFontTransform;
    }
}

</style>