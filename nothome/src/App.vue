<template>
    <backdrop :showContent="showCategories">
        <template v-slot:bar>
            <barbtn @click="showCategories = !showCategories">
                menu
            </barbtn>
            <bartitle minus="1">
                Homework
            </bartitle>
        </template>
        <template v-slot:surfaceContent>
            <div v-if="showCategories">
                helloworld
            </div>
        </template>
    </backdrop>
</template>

<script>
import backdrop from "./components/backdrop.vue";
import barbtn from "./components/barbtn.vue";
import bartitle from "./components/bartitle.vue";

export default {
    components: {
        backdrop,
        barbtn,
        bartitle
    },
    data() {
        return {
            showCategories: false
        }
    }
}
</script>

<style>

body, html {
    height: 100%;
    width: 100%;

    margin: 0;
    padding: 0;
}

</style>