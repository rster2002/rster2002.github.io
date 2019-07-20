<template>
    <div class="view settings">
        <h1>Settings</h1>
        <div class="grid">
            <card>
                <div class="settingWrapper">
                    <p class="material-icons">group</p>
                    <p>Members</p>
                </div>
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

<style lang="scss" scoped>

.view.settings {
    .grid {
        padding: 0px 48px;
        width: calc(100% - 94px);
    }

    .card {
        float: left;
        width: calc(25% - 65px);
        margin: 16px;
        cursor: pointer;
    }

    .settingWrapper {
        height: 64px;
        width: 64px;

        margin-left: auto;
        margin-right: auto;

        p {
            margin: 0;

            &.material-icons {
                position: relative;
                left: 50%;
                transform: translateX(-50%);

                font-size: 48px;
            }
            
            &:not(.material-icons) {
                font-family: $default-font;
            }
        }
    }
}

</style>
