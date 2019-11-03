<template>
    <main class="mdl mainView">
        <slot></slot>
    </main>
</template>

<script>
export default {

}
</script>

<style lang="scss">

@import "./config.scss";

.mainView {
    height: calc(100% - 2px);
    width: 100%;
    
    padding: 2px 0px;

    background-color: $mainViewBackgroundColor;
    overflow-x: hidden;
    overflow-y: auto;
}

</style>