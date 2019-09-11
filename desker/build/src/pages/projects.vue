<template>
    <div class="view">
        <h1>Your projects</h1>
        <div class="grid">
            <card v-for="project in projects" :key="project.id" @click="openprj(project)">
                <h1>{{ project.name }}</h1>
            </card>
        </div>
    </div>
</template>

<script>
import card from "@component/card.vue";
import popup from "@component/popup.vue";
import textbox from "@component/textbox.vue";
import btn from "@component/btn.vue";

import { fs, u, qu } from "@js/firebase.js";
import { genId, user, makeApiCall } from "@js/global.js";

export default {
    components: {
        card,
        popup,
        textbox,
        btn
    },
    data() {
        return {
            newprj: {
                name: "",
                description: ""
            },
            popup: {
                new: false
            },
            projects: []
        }
    },
    methods: {
        openprj(prj) {
            this.$router.push({ path: `/project/${prj.id}/overview` });
        }
    },
    async created() {
        var repos = await makeApiCall("/users/$user/repos");

        console.log(repos);
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
    padding: 0px 48px;
    width: calc(100% - 94px);
}

.card {
    float: left;
    width: calc(25% - 65px);
    margin: 16px;
    padding-bottom: 10px !important;
    cursor: pointer;

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

    .footer {
        height: 32px;
        width: 100%;
        margin-top: 8px;

        .text {
            width: calc(100% - 32px);
            height: 100%;
            float: left;

            p {
                margin: 0;
                font-size: 16px;
                font-family: $default-font;

                position: relative;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        .user {
            width: 32px;
            height: 100%;
            float: left;

            img {
                border-radius: 50%;
                height: 100%;
                width: 100%;
            }
        }
    }

    &.add {

        $clr: rgba(#000000, 0.3);

        height: 120px;

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

            font-size: 48px;

            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}

</style>
