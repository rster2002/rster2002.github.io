<template>
    <div class="view">
        <navbar></navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import { navbar } from "@components";

export default {
    components: {
        navbar
    }
}
</script>

<style lang="scss" scoped>

.view {
    height: 100%;
    width: 100%;
}

</style>

