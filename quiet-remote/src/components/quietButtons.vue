<template>
    <div class="quietButtons">
        <button v-for="button in buttons" :key="button.id" :style="{height: rowPercentage()}" @click="buttonPress(button)">
            <div class="verticalWrapper">
                <icon>{{ button.icon }}</icon>
                <p>{{ button.name }}</p>
            </div>
        </button>
        <button id="quietExitButton" :style="{height: rowPercentage()}" @click="exitQuietButtons()">
            <div class="verticalWrapper">
                <icon>fullscreen-exit</icon>
                <p>Exit</p>
            </div>
        </button>
    </div>
</template>

<script>
import vueChannel from "vue-channel";
import { icon } from "../components.js";
import { db } from "../js/global.js";
import actionRunner from "../js/actionRunner.js";

const exitButtonsSound = new Audio("./sound/state-change-down.wav");

export default {
    components: {
        icon
    },
    data() {
        return {
            rowsTotal: 0,
            buttons: []
        }
    },
    methods: {
        rowPercentage() {
            var rows = Math.ceil((this.buttons.length + 1) / 2);

            console.log(rows);

            return 100 / rows + "%";
        },
        exitQuietButtons() {
            exitButtonsSound.play();

            this.$emit("exit");
        },
        buttonPress(button) {
            actionRunner(button.action);

            document.querySelector(".quietButtons").classList.add("peek");

            setTimeout(() => {
                document.querySelector(".quietButtons").classList.remove("peek");
            }, 2000)
        }
    },
    created() {
        var buttons = db.buttons;

        if (buttons !== null) {
            this.buttons = buttons;
        }
    }
}
</script>

<style lang="scss" scoped>

.quietButtons {
    height: 100%;
    width: 100%;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 16;

    background-color: #000000;

    button {
        height: 128px;
        width: 50%;

        border: 0;
        outline: 0;
        background-color: transparent;

        .verticalWrapper {
            color: #ffffff;
            opacity: 0;
            transition: 500ms linear opacity;

            .icon {
                font-size: 48px;
            }

            p {
                margin: 4px;
                font-family: "Roboto", sans-serif;
            }
        }

        &#quietExitButton {
            position: fixed;
            right: 0px;
            bottom: 0px;
        }
    }
}

.quietButtons.peek button .verticalWrapper {
    opacity: 0.3;
}

</style>