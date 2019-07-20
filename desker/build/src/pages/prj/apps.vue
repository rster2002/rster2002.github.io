<template>
    <div class="view apps">
        <h1>Apps</h1>
        <div class="grid">
            <card>
                <div class="appWrapper">
                    <p class="material-icons">poll</p>
                    <p>Feedback</p>
                </div>
            </card>
            <card @click="openApp('bugreporting')">
                <div class="appWrapper">
                    <p class="material-icons">bug_report</p>
                    <p>Bug reporting</p>
                </div>
            </card>
            <card>
                <div class="appWrapper">
                    <p class="material-icons">contact_support</p>
                    <p>Support</p>
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
    },
    methods: {
        openApp(app) {
            this.$router.push(`/project/${this.$route.params.prjid}/apps/${app}`);
        }
    }
}
</script>

<style lang="scss" scoped>

.view.apps {
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

    .appWrapper {
        display: inline-block;
        height: 64px;

        position: relative;
        left: 50%;
        transform: translateX(-50%);

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
