<template>
    <div class="popup" @click.self="close()" v-if="value">
        <div class="popupCard">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ["value"],
    methods: {
        close() {
            this.$emit("input", false)
        }
    }
}
</script>


<style lang="scss">

.popup {

    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 6;

    height: 100%;
    width: 100%;

    background-color: rgba(#000, 0.2);

    .popupCard {

        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 70%;
        height: 70%;

        max-width: 935px;

        background-color: #fff;

        background-color: #fff;
        -webkit-box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);
        -moz-box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);
        box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);

        border-radius: 5px;

        padding: 32px;

        h1 {
            margin: 0;
            font-family: $default-font;
            font-size: 48px;
        }

    }

}

</style>

