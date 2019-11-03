<template>
    <header class="mdl topBar">
        <slot></slot>
    </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

@import "./config.scss";

.topBar {
    height: 64px;
    width: 100%;

    z-index: $topBarZIndex;

    background-color: $topBarBackgroundColor;
    box-shadow: $topBarElevation;
}

</style>

<style lang="scss">

.topBar + .mainView {
    height: calc(100% - 66px);
}

</style>