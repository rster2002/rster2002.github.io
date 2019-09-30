<template>
    <page>
        <input v-model="trainNumber" placeholder="Trein nr" />
        <button @click="makeSearch()">Search</button>
    </page>
</template>

<script>
import page from "../components/page.vue";

import nsCall from "../js/nsCall.js";

export default {
    components: {
        page
    },
    data() {
        return {
            trainNumber: ""
        }
    },
    methods: {
        async makeSearch() {
            var responce = await nsCall("https://gateway.apiportal.ns.nl/virtual-train-api/api/v1/trein/" + this.trainNumber);

            console.log(responce);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>