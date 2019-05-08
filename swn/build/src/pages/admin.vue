<template lang="html">
    <div>
        <card>
            <primaryTitle>
                <h1>Users</h1>
            </primaryTitle>
        </card>
    </div>
</template>

<script>
import { card, primaryTitle } from "@components";

import { fs, qu } from "@js/firebase.js";

export default {
    components: {
        card,
        primaryTitle
    },
    data() {
        return {
            users: []
        }
    },
    async created() {
        var i = await qu(fs.collection("users").limit(20).orderBy("lastLogin", "desc"));
        console.log(i);
    }
}
</script>

<style lang="css" scoped>
</style>
