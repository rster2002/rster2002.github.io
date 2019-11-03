<template>
    <section class="mdl cardContainer">
        <slot></slot>
    </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

@import "./config.scss";

.cardContainer {
    width: $cardWidth;

    margin-left: $cardMarginLeft;
    margin-right: $cardMarginRight;
    margin-top: $cardMarginTop;
    margin-bottom: $cardMarginBottom;
    padding-left: $cardPaddingLeft;
    padding-right: $cardPaddingRight;
    padding-top: $cardPaddingTop;
    padding-bottom: $cardPaddingBottom;

    background-color: $cardSurfaceColor;
    border-radius: $cardBorderRadius;
    box-shadow: $cardElevation;
}

</style>

<style lang="scss">

@import "./config.scss";

.cardContainer {
    & > * {
        &:first-child {
            margin-top: $cardMarginCompareTo - $cardPaddingTop;
        }

        &:last-child {
            margin-bottom: $cardMarginCompareTo - $cardPaddingBottom;
        }
    }

    & > h1 {
        margin: 0;
        margin-left: $cardMarginCompareTo - $cardPaddingLeft;
        margin-right: $cardMarginCompareTo - $cardPaddingRight;
        margin-bottom: $cardMarginCompareTo;

        font-size: $cardHeader1FontSize;
        font-family: $cardHeader1FontFamily;
        font-weight: $cardHeader1FontWeight;
        text-transform: $cardHeader1FontTransform;
        letter-spacing: $cardHeader1LetterSpacing;
        color: $cardHeader1FontColor;

        & + h2 {
            font-size: $cardSubtitleFontSize;
            font-family: $cardSubtitleFontFamily;
            font-weight: $cardSubtitleFontWeight;
            text-transform: $cardSubtitleFontTransform;
            letter-spacing: $cardSubtitleLetterSpacing;
            color: $cardSubtitleFontColor;

            & + p {
                margin-top: 18px;
            }
        }

        & + p {
            margin-top: 18px;
        }
    }

    h2 {
        margin: 0;

        & + p {
            margin-top: 18px;
        }
    }

    p {
        margin: 0;

        font-size: $cardBodyFontSize;
        font-family: $cardBodyFontFamily;
        font-weight: $cardBodyFontWeight;
        text-transform: $cardBodyFontTransform;
        letter-spacing: $cardBodyLetterSpacing;
        color: $cardBodyFontColor;
    }

    & > .listItem {
        width: calc(100% + 32px);

        margin-left: -16px;
    }
}

</style>