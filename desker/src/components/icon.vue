<template>
    <div class="icon">
        <img :src="iconValue" />
    </div>
</template>

<script>
export default {
    props: ["icon"],
    computed: {
        iconValue() {
            return `./src/icons/${this.icon}.png`;
        }
    }
}
</script>

<style lang="stylus" scoped>

.icon img {
    height: 60%;
    width: 60%;

    position: relative;
    top: 50%;
    left: 50%;
}

</style>