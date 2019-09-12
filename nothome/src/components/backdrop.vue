<template>
    <div class="backdrop">
        <div class="bar">
            <slot name="bar"></slot>
        </div>
        <transition name="surfaceContentTransition">
            <div class="surfaceContent" v-if="showContent">
                <slot name="surfaceContent"></slot>
            </div>
        </transition>
        <div class="surface">
            <div class="head">
                <p>Subtitle</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["showContent"]
}
</script>

<style lang="scss">

@import "./config.scss";

.backdrop {
    height: 100%;
    width: 100%;

    background-color: $backdropBackgroundColor;

    .bar {
        height: 54px;
        width: 100%;

        .btn {
            height: 54px;
            width: 54px;
        }

        .title {
            height: 54px;
        }
    }

    .surfaceContent {
        height: calc(100% - 102px);
        width: 100%;
    }

    .surface {
        height: calc(100% - 54px);
        width: 100%;

        background-color: $backdropSurfaceColor;
        border-top-left-radius: $backdropBorderRadius;
        border-top-right-radius: $backdropBorderRadius;

        .head {
            height: 48px;
            width: 100%;

            p {
                position: relative;
                top: 50%;
                transform: translateY(-50%);
                padding: 0px 16px;
                margin: 0;

                font-family: $backdropTitleFontFamily;
                font-weight: $backdropTitleFontWeight;
                font-size: $backdropTitleFontSize;
                letter-spacing: $backdropTitleLetterSpacing;
                text-transform: $backdropTitleFontTransform;
                color: #5b5b5b;
            }
        }
    }
}

.surfaceContentTransition-active {
    position: relative;
    transition: 10s linear all;
}

.surfaceContentTransition-enter {
    top: -200%;
}

.surfaceContentTransition-enter-to {
    top: 0%;
}

</style>