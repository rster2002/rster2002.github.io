<template>
    <div class="view tasks">
        <h1>Tasks</h1>
        <div class="grid">
            <card v-for="task in tasks" :key="task.id" @click="opentask(task)">
                <h1 v-if="task.body.title === ''">Untitled task</h1>
                <h1 v-else>{{ task.body.title }}</h1>
                <p>Progress</p>
                <div class="bar">
                    <div class="progress" :style="{ width: progress(task) }"></div>
                </div>
                <div class="footer">
                    <div class="text">
                        <p>Last activity was {{ activity(task) }} ago by</p>
                    </div>
                    <div class="user">
                        <img :src="task.lastModifiedBy.usericon" />
                    </div>
                </div>
            </card>
            <card class="add" @click="newTask">
                <h1 class="material-icons">add</h1>
            </card>
        </div>
    </div>
</template>

<script>
import card from "@component/card.vue";
import popup from "@component/popup.vue";

import { user, genId } from "@js/global.js";
import { fs, cfb, fsc, qu } from "@js/firebase.js";

import { updatePrj } from "./utils.js";

const increment = cfb.firestore.FieldValue.increment(1);

export default {
    components: {
        card
    },
    data() {
        return {
            tasks: []
        }
    },
    methods: {
        newTask() {
            var id = genId();

            var taskRef = fs.collection("projects")
                .doc(this.$route.params.prjid)
                .collection("tasks")
                .doc(id);

            var countRef = fs.collection("projects")
                .doc(this.$route.params.prjid)
                .collection("projectData")
                .doc("tasks");

            var batch = fsc.batch();

            batch.set(taskRef, {
                id,
                createdBy: user(),
                lastModifiedBy: user(),
                layer: 0,
                parent: "root",
                rootParents: [],
                createdAt: Date.now(),
                lastModifiedAt: Date.now(),
                tags: [],
                dueBy: null,
                subtasks: 0,
                subtasksDone: 0,
                body: {
                    title: "New task",
                    description: ""
                }
            });

            batch.set(countRef, { current: increment, totalEver: increment }, { merge: true });

            batch.commit().then(() => {
                    updatePrj(this.$route.params.prjid);
                    this.$router.push(`/project/${this.$route.params.prjid}/task/${id}`);
                });
        },
        progress(prj) {
            if (prj.subtasksDone === 0) {
                return "0%";
            } else {
                var percentage = Math.round(prj.subtasksDone / prj.subtasks * 100);
                return percentage + "%";
            }
        },
        activity(prj) {
            var now = Date.now();
            var distance = now - prj.lastModifiedAt;
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
        opentask(task) {

            sessionStorage.setItem("::temp", JSON.stringify(task));
            let i = `./task/${task.id}`;
            console.log(i);
            this.$router.push(i);

        }
    },
    async created() {
        var prjid = this.$route.params.prjid;
        var query = await qu(
                fs.collection("projects")
                    .doc(prjid)
                    .collection("tasks")
                    .where("parent", "==", "root")
            );

        this.tasks = query;
    }
}
</script>

<style lang="scss">

.view.tasks {
    .grid {
        // display: inline-grid;
        // grid-template-columns: repeat(4, 1fr);
        // grid-template-rows: auto;
        // grid-gap: 32px 32px;
        padding: 0px 48px;
        /* height: calc(100% - 128px); */
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
}

</style>
