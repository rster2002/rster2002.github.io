<template>
    <div class="listDialog">
        <div class="dialog">
            <primaryTitle>
                <h1>Dialog</h1>
            </primaryTitle>
            <!-- <actions>
                <button>Choose</button>
                <button>Cancel</button>
            </actions> -->
        </div>
    </div>
</template>

<script>

import primaryTitle from "./primaryTitle.vue";
import actions from "./actions.vue";

export default {
    components: {
        primaryTitle,
        actions
    }
}
</script>

<style lang="stylus" scoped>

.listDialog {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;

    z-index: 24;
    background-color: rgba(#000000, .32);

    .dialog {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        background-color: #ffffff;

        max-height: 70%;
        width: 280px;

        box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);
        border-radius: 4px;

        .header {
            border-bottom: 1px #cecece solid;
        }

        .actions {
            button {
                float: right;
                margin-left: 0;
                margin-right: 8px;
            }
        }
    }
}

</style>