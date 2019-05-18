<template lang="html">
    <div>
        <card>
            <primaryTitle>
                <h1>Users</h1>
            </primaryTitle>
            <div>
                <listitem v-for="user in users" :key="user.uid">
                    <h1 @click="user.open = !user.open"><dropdownindicator :val="user.open"></dropdownindicator>{{ user.username }}</h1>
                    <dropdowncontent :show="user.open">
                        <p><b>uid: </b> {{ user.uid }}</p>
                        <p><b>last login: </b> {{ user.lastLogin }}</p>
                        <p><b>joined: </b> {{ user.joined }}</p>
                    </dropdowncontent>
                </listitem>
            </div>
        </card>
    </div>
</template>

<script>
import { card, primaryTitle, listitem, dropdownindicator, dropdowncontent } from "@components";

import { fs, qu } from "@js/firebase.js";

export default {
    components: {
        card,
        primaryTitle,
        listitem,
        dropdownindicator,
        dropdowncontent
    },
    data() {
        return {
            users: []
        }
    },
    async created() {
        var users = await qu(fs.collection("users").limit(20).orderBy("lastLogin", "desc"));

        users.forEach(user => {
            this.users.push({...user, open: false});
        });
    }
}
</script>

<style lang="stylus" scoped>

.listItem h1 {
    cursor: pointer;
}

</style>
