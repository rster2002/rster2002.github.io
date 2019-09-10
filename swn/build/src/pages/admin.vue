<template lang="html">
    <div>
        <card>
            <primaryTitle>
                <h1>{{ title }}</h1>
            </primaryTitle>
            <div>
                <listitem v-for="user in users" :key="user.uid">
                    <h1 @click="user.open = !user.open"><dropdownindicator :val="user.open"></dropdownindicator>{{ user.username }}</h1>
                    <dropdowncontent :show="user.open">
                        <p><b>uid: </b> {{ user.uid }}</p>
                        <p><b>last login: </b> {{ toDate(user.lastLogin) }}</p>
                        <p><b>joined: </b> {{ toDate(user.joined) }}</p>
                    </dropdowncontent>
                </listitem>
            </div>
        </card>
    </div>
</template>

<script>
import { card, primaryTitle, listitem, dropdownindicator, dropdowncontent } from "@components";

import { fs, qu } from "@js/firebase.js";
import fdb from "@js/fastdb.js";
window.fdb = fdb;

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
            users: [],
            title: "Users"
        }
    },
    methods: {
        toDate(unix) {
            let i = new Date(unix);
            return i.toString();
        }
    },
    async created() {
        var users = await qu(fs.collection("users").limit(20).orderBy("lastLogin", "desc"));

        users.forEach(user => {
            this.users.push({...user, open: false});
        });

        var db = fdb("global");

        db.onStateSet(a => {
            this.title = a.title
        });
    }
}
</script>

<style lang="stylus" scoped>

.listItem h1 {
    cursor: pointer;
}

</style>
