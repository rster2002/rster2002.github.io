<template>
    <div class="icon">
        <h6>
            <span class="mdi" :class="[ iconValue ]"></span>
        </h6>
    </div>
</template>

<script>
export default {
    props: ["icon"],
    computed: {
        iconValue() {
            return "mdi-" + this.icon
        }
    }
}
</script>

<style lang="stylus" scoped>

.icon h6 {
    font-size: 28px;
    margin: 0;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
}

</style>