<template>
    <main>
        <div class="inner">
            <slot></slot>
        </div>
    </main>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

main {
    width: 100%;
    height: 100%;

    overflow-x: hidden;
    overflow-y: auto;

    .inner {
        width: 50%;

        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
}

</style>