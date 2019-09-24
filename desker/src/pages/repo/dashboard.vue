<template lang="html">
    <div class="wrapper">
        <div class="col1">
            <div class="card m2">
                <h1 class="big">{{ generic.name }}</h1>
                <p v-if="generic.description !== ''">
                    {{ generic.description }}
                </p>
            </div>
            <div class="card m2">
                <h1>Recent events</h1>
                <div class="listItem" v-for="event in generic.events">
                    <img :src="event.img" />
                    <p v-html="event.title"></p>
                </div>
            </div>
        </div>
        <div class="col1"></div>
    </div>
</template>

<script>
import { mac, signOut } from "@js/global.js";
import { fb } from "@js/firebase.js";

import eventMapper from "@js/eventMapper.js";

function initPage(t) {
    console.log(t.$route.params.user, t.$route.params.repo);

    var params = t.$route.params;
    mac(`/repos/${params.user}/${params.repo}`).then(r => {
        t.repo = r;

        t.generic.name = r.name;

        if (r.description) {
            t.generic.description = r.description;
        }

        mac(`/repos/${params.user}/${params.repo}/events`).then(r => {
            var e = r.filter(a => {
                if (a.type === "CreateEvent") {
                    var refType = a.payload["ref_type"];
                    if (refType === "tag") {
                        return false;
                    } else if (refType === "repository") {
                        return false;
                    } else if (
                        refType === "branch" &&
                        a.payload.ref === "master"
                    ) {
                        return false;
                    }
                }

                return true;
            });

            e = e.map(eventMapper);

            t.generic.events = e;
        });
    });
}

export default {
    data() {
        return {
            repo: {},
            generic: {
                name: "",
                description: "",
                events: []
            }
        };
    },
    created() {
        initPage(this);
    }
};
</script>

<style lang="css" scoped></style>
