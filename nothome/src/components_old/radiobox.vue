<template>
    <div class="radio" :class="{ c: internalState }" @click="ck()">
        <div class="rad"></div>
    </div>
</template>

<script>
export default {
    props: ["value", "alive"],
    data() {
        return {
            internalState: false,
            intAlive: true
        }
    },
    watch: {
        value() {
            if (this.value === "true" || this.value === true) {
                this.internalState = true;
            } else {
                this.internalState = false;
            }

            if (this.alive !== undefined) {
                this.intAlive = this.alive;
            }
        }
    },
    methods: {
        ck() {
            if (this.intAlive) {
                this.internalState = !this.internalState;
                this.$emit('input', this.internalState);
            }
        }
    },
    created() {
        if (this.value === "true" || this.value === true) {
            this.internalState = true;
        } else {
            this.internalState = false;
        }

        if (this.alive !== undefined) {
            this.intAlive = this.alive;
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

