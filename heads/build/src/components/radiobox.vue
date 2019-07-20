<template>
    <div class="radio" :class="{ c: internalState }" @click="ck()">
        <div class="rad"></div>
    </div>
</template>

<script>
export default {
    props: ["checked"],
    data() {
        return {
            internalState: false
        }
    },
    watch: {
        checked() {
            if (this.checked === "true" || this.checked === true) {
                this.internalState = true;
            } else {
                this.internalState = false;
            }
        }
    },
    methods: {
        ck() {
            this.internalState = !this.internalState;
            this.$emit('change', this.internalState);
        }
    },
    created() {
        if (this.checked === "true" || this.checked === true) {
            this.internalState = true;
        } else {
            this.internalState = false;
        }
    }
}
</script>

<style lang="stylus" scoped>

@import "../default.stylus";

.radio {
    height: 16px;
    width: 16px;

    border-radius: 50%;
    border: 2px solid #00000089;

    background-color: transparent;

    transition: cubic-bezier(0.4, 0.0, 0.2, 1) border-color 100ms;

    .rad {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);

        height: 10px;
        width: 10px;

        border-radius: 50%;
        background-color: secondaryColor;

        transition: cubic-bezier(0.4, 0.0, 0.2, 1) transform 100ms;
    }
}

.radio.c {
    border-color: secondaryColor;

    .rad {
        transform: translate(-50%, -50%) scale(1);
    }
}

</style>

