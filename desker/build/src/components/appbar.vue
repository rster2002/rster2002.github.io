<template>
    <div class="appbar">
        <div class="logo">
            <img src="@img/logo.png" />
        </div>
        <barbtn title="dashboard">Dashboard</barbtn>
        <barbtn title="projects">Projects</barbtn>
        <barbtn title="settings">Settings</barbtn>
    </div>
</template>

<script>
import barbtn from "./barbtn.vue";

export default {
    components: {
        barbtn
    }
}
</script>

<style lang="scss" scoped>

$barheight: 64px;

.appbar {
    width: 100%;
    height: $barheight;

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
}

</style>
