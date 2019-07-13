<template>
    <div class="barbtn" @click="$emit('click')">
        <p :class="{ current: current }"><slot></slot></p>
    </div>
</template>

<script>
export default {
    props: ["title"],
    data() {
        return {
            current: false
        }
    },
    watch: {
        "$route": function(to) {
            this.current = to.meta.title === this.title;
        }
    },
    created() {
        this.current = this.$router.currentRoute.meta.title === this.title;
    }
}
</script>

<style lang="scss" scoped>

div.barbtn {
    padding: 0px 20px;
    cursor: pointer;

    p {
        color: #212121;
        font-size: 18px;
        font-family: $default-font;
        margin: 0;
        position: relative;
        top: 50%;
        transform: translateY(-50%);

        &.current {
            // border-bottom: 1px solid #212121;
            // padding-bottom: 3px;
            font-weight: bold;
        }
    }
}

</style>
