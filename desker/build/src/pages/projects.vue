<template>
    <div class="view">
        <h1>Your projects</h1>
        <div class="grid">
            <card>
                <h1>Some project</h1>
                <p>Progress</p>
                <div class="bar">
                    <div class="progress" style="width: 40%;"></div>
                </div>
                <div class="footer">
                    <div class="text">

                    </div>
                </div>
            </card>
            <card class="add">
                <h1 class="material-icons">add</h1>
            </card>
        </div>
    </div>
</template>

<script>
import card from "@component/card.vue";

export default {
    components: {
        card
    }
}
</script>

<style lang="scss">

.view > h1 {
    margin: 50px 0px;
    padding: 0px 64px;
    font-family: $default-font;
    font-size: 40px;
}

.grid {
    // display: inline-grid;
    // grid-template-columns: repeat(4, 1fr);
    // grid-template-rows: auto;
    // grid-gap: 32px 32px;
    padding: 0px 48px;
    /* height: calc(100% - 128px); */
    width: calc(100% - 128px);
}

.card {
    float: left;
    width: 25%;
    margin: 16px;

    h1:not(.material-icons) {
        font-size: 24px;
        margin: 0;
        font-family: $default-font;
        color: #000;
    }

    p {
        font-family: $default-font;
        font-size: 16px;
        margin: 0;
        margin-top: 16px;
        margin-bottom: 8px;

        color: rgba(#000, 0.7);
    }

    .bar {
        width: 100%;
        height: 8px;
        border-radius: 4px;

        background-color: rgba(#000, 0.1);

        .progress {
            height: 8px;
            min-width: 8px;
            border-radius: 4px;

            background-color: #212121;
        }
    }

    &.add {

        $clr: rgba(#000000, 0.3);

        background-color: transparent;

        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;

        border: 2px solid $clr;

        cursor: pointer;

        h1 {
            color: $clr;
            text-align: center;
            width: 100%;
            margin: 0;

            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}

</style>
