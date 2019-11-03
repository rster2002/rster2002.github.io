<template>
    <main id="mdlApp">
        <slot></slot>
    </main>
</template>

<style lang="scss">

@import "./config.scss";

html, body, #mdlApp {
    height: 100%;
    width: 100%;

    margin: 0;
    padding: 0;
    overflow: hidden;

    background-color: $backgroundColor;
}

</style>