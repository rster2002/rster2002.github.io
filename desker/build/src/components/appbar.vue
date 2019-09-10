<template>
    <div class="appbar">
        <div class="logo">
            <img src="@img/logo.png" />
        </div>
        <barbtn title="dashboard" @click="navTo('')">Dashboard</barbtn>
        <barbtn title="projects" @click="navTo('projects')">Projects</barbtn>
        <barbtn title="settings" @click="navTo('settings')">Settings</barbtn>
        <div class="divider" v-if="showPrjNav()"></div>
        <barbtn title="prj-overview" @click="prjNav('overview')" v-if="showPrjNav()">Overview</barbtn>
        <barbtn title="prj-timeline" @click="prjNav('timeline')" v-if="showPrjNav()">Timeline</barbtn>
        <barbtn title="prj-tasks" @click="prjNav('tasks')" v-if="showPrjNav()">Tasks</barbtn>
        <barbtn title="prj-apps" @click="prjNav('apps')" v-if="showPrjNav()">Apps</barbtn>
        <barbtn title="prj-settings" @click="prjNav('settings')" v-if="showPrjNav()">Settings</barbtn>
    </div>
</template>

<script>
import barbtn from "./barbtn.vue";

export default {
    components: {
        barbtn
    },
    methods: {
        navTo(p) {
            this.$router.push({ path: `/${p}` });
        },
        prjNav(p) {
            this.$router.push(`/project/${this.$route.params.prjid}/${p}`);
        },
        showPrjNav() {
            return this.$route.meta.title.includes("prj-") || this.$route.meta.title.includes("app-");
        }
    }
}
</script>

<style lang="scss" scoped>

$barheight: 64px;

.appbar {
    width: 100%;
    height: $barheight;
    position: relative;

    background-color: white;
    -webkit-box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);
    -moz-box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);
    box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);

    & > div {
        float: left;
        height: $barheight;
    }

    .logo {
        width: $barheight;

        img {
            width: 70%;
            height: 70%;
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    
    .divider {
        width: 1px;
        background-color: rgba(#000000, .1);
    }
}

</style>
