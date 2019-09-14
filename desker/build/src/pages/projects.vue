<template>
    <div class="view">
        <h1>Your projects</h1>
        <grid size="12xA" gap="16px">
            <card v-for="project in projects" :key="project.id" @click="openprj(project)">
                <h1>{{ project.name }}</h1>
            </card>
        </grid>
    </div>
</template>

<script>
import card from "@component/card.vue";
import popup from "@component/popup.vue";
import textbox from "@component/textbox.vue";
import btn from "@component/btn.vue";
import grid from "@component/grid.vue";

import { fs, u, qu } from "@js/firebase.js";
import { genId, user, makeApiCall } from "@js/global.js";

export default {
    components: {
        card,
        popup,
        textbox,
        btn,
        grid
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

        this.projects = repos;
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
    width: calc(100% - 128px);
    
    padding: 0px 64px;
}

</style>
