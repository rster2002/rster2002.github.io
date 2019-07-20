<template>
    <div class="view">
        <h1>Your projects</h1>
        <div class="grid">
            <card v-for="project in projects" :key="project.id" @click="openprj(project)">
                <h1>{{ project.name }}</h1>
                <p>Progress</p>
                <div class="bar">
                    <div class="progress" :style="{ width: progress(project) }"></div>
                </div>
                <div class="footer">
                    <div class="text">
                        <p>Last activity was {{ activity(project) }} ago by</p>
                    </div>
                    <div class="user">
                        <img :src="project.lastActivityBy.usericon" />
                    </div>
                </div>
            </card>
            <card class="add" @click="popup.new = true">
                <h1 class="material-icons">add</h1>
            </card>
        </div>
        <popup v-model="popup.new">
            <h1>New project</h1>
            <textbox label="Name" v-model="newprj.name" helpertext="Give your project a name" maxlength="40"></textbox>
            <textbox label="Description" v-model="newprj.description" type="textarea" helpertext="A description of what your project is about" maxlength="500"></textbox>
            <btn @click="addPrj()">add</btn>
        </popup>
    </div>
</template>

<script>
import card from "@component/card.vue";
import popup from "@component/popup.vue";
import textbox from "@component/textbox.vue";
import btn from "@component/btn.vue";

import { fs, u, qu } from "@js/firebase.js";
import { genId, user } from "@js/global.js";

export default {
    components: {
        card,
        popup,
        textbox,
        btn
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
        addPrj() {
            var nameValid = this.newprj.name.length > 0 && this.newprj.name.length <= 40;
            var descriptionValid = this.newprj.description.length <= 500;

            if (nameValid && descriptionValid) {
                var id = genId();

                u().collection("projects").doc(id).set({
                    id,
                    name: this.newprj.name,
                    description: this.newprj.description,
                    owner: user()
                });

                fs.collection("projects").doc(id).set({
                    created: Date.now(),
                    createdBy: user(),
                    progressDone: 0,
                    progressTotal: 0,
                    lastActivity: Date.now(),
                    lastActivityBy: user(),
                    id,
                    name: this.newprj.name,
                    description: this.newprj.description,
                    owner: user(),
                    members: [user().uid]
                }).then(() => {
                    fs.collection("projects")
                        .doc(id)
                        .collection("members")
                        .doc(user().uid)
                        .set({
                            ...user(),
                            workload: 0,
                            assignedTasks: 0,
                            maxWorkloadPerDay: 0,
                            userType: "default"
                        });
                });
            }
        },
        activity(prj) {
            var now = Date.now();
            var distance = now - prj.lastActivity;
            var surfix = "ms";

            if (distance >= 1000) {distance = Math.round(distance / 1000); surfix = "second"};
            if (distance >= 60 && surfix == "second") {distance = Math.round(distance / 60); surfix = "minute"};
            if (distance >= 60 && surfix == "minute") {distance = Math.round(distance / 60); surfix = "hour"};
            if (distance >= 24 && surfix == "hour") {distance = Math.round(distance / 24); surfix = "day"};
            if (distance >= 7 && surfix == "day") {distance = Math.round(distance / 7); surfix = "week"};
            if (distance >= 4 && surfix == "week") {distance = Math.round(distance / 4); surfix = "month"};
            if (distance >= 12 && surfix == "month") {distance = Math.round(distance / 12); surfix = "year"};

            if (distance > 1) {surfix += "s"};

            return distance + " " + surfix;
        },
        progress(prj) {
            if (prj.progressTotal === 0) {
                return "0%";
            } else {
                var percentage = Math.round(prj.progressDone / prj.progressTotal * 100);
                return percentage + "%";
            }
        },
        openprj(prj) {
            this.$router.push({ path: `/project/${prj.id}/overview` });
        }
    },
    async created() {
        var query = await qu(u().collection("projects"));
        
        query.forEach(a => {
            fs.collection("projects").doc(a.id).get().then(a => {
                if (a && a.exists) {
                    this.projects.push(a.data());
                }
            });
        });
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
    padding: 0px 48px;
    width: calc(100% - 94px);
}

.card {
    float: left;
    width: calc(25% - 65px);
    margin: 16px;
    padding-bottom: 10px !important;
    cursor: pointer;

    h1:not(.material-icons) {
        font-size: 24px;
        margin: 0;
        font-family: $default-font;
        color: #000;
    }

    p {
        font-family: $default-font;
        font-size: 16px;
        margin: 0;
        margin-top: 16px;
        margin-bottom: 8px;

        color: rgba(#000, 0.7);
    }

    .bar {
        width: 100%;
        height: 8px;
        border-radius: 4px;

        background-color: rgba(#000, 0.1);

        .progress {
            height: 8px;
            min-width: 8px;
            border-radius: 4px;

            background-color: #212121;
        }

    }

    .footer {
        height: 32px;
        width: 100%;
        margin-top: 8px;

        .text {
            width: calc(100% - 32px);
            height: 100%;
            float: left;

            p {
                margin: 0;
                font-size: 16px;
                font-family: $default-font;

                position: relative;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        .user {
            width: 32px;
            height: 100%;
            float: left;

            img {
                border-radius: 50%;
                height: 100%;
                width: 100%;
            }
        }
    }

    &.add {

        $clr: rgba(#000000, 0.3);

        height: 120px;

        background-color: transparent;

        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;

        border: 2px solid $clr;

        cursor: pointer;

        h1 {
            color: $clr;
            text-align: center;
            width: 100%;
            margin: 0;

            font-size: 48px;

            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}

</style>
