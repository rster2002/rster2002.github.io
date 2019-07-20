<template>
    <div class="view task">
        <div class="left">
            <div v-if="edit === false">
                <h1>{{ task.body.title }}</h1>
                <p style="margin-bottom: 50px;">{{ task.body.description }}</p>
                <p style="color: rgba(0, 0, 0, 0.7)">Progress</p>
                <p style="color: rgba(0, 0, 0, 0.7)" class="moveback">0%</p>
                <div class="bar total">
                    <div class="progress" :style="{ width: progress(task) }"></div>
                </div>
                <p v-if="task.dueBy !== null" style="color: rgba(0, 0, 0, 0.7)">This task is due at {{ parseDate(task.dueBy) }}</p>
                <div class="btns" style="margin-top: 16px;">
                    <btn @click="edit = true">edit</btn>
                    <btn @click="deleteTask()" class="d">delete</btn>
                </div>
            </div>
            <div v-else>
                <h1>Edit task</h1>
                <textbox label="Title" v-model="task.body.title" maxlength="50"></textbox>
                <textbox label="Description" type="textarea" v-model="task.body.description" maxlength="500"></textbox>
                <div class="dateInputs">
                    <textbox type="select" v-model="datepicker.day" label="day" helpertext="Due by">
                        <option v-for="day in options.day" :key="day">{{ day }}</option>
                    </textbox>
                    <textbox type="select" v-model="datepicker.month" label="month">
                        <option v-for="month in options.month" :key="month">{{ month }}</option>
                    </textbox>
                    <textbox type="select" v-model="datepicker.year" label="year">
                        <option v-for="year in options.year" :key="year">{{ year }}</option>
                    </textbox>
                    <textbox type="select" v-model="datepicker.hour" label="hour">
                        <option v-for="hour in options.hour" :key="hour">{{ hour }}</option>
                    </textbox>
                    <textbox type="select" v-model="datepicker.minute" label="minute">
                        <option v-for="minute in options.minute" :key="minute">{{ minute }}</option>
                    </textbox>
                </div>
                <div class="btns">
                    <btn @click="updateTask()">Save</btn>
                    <btn @click="edit = false" class="d">Discard</btn>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="grid">
                <card v-for="task in subtasks" :key="task.id" @click="opentask(task)">
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
                <card class="add" @click="newSubTask()">
                    <h1 class="material-icons">add</h1>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
import textbox from "@component/textbox.vue";
import btn from "@component/btn.vue";
import card from "@component/card.vue";

import { fs, cfb, fsc, qu } from "@js/firebase.js";
import { user, genId } from "@js/global.js";

import { updatePrj } from "./utils.js";

const increment = cfb.firestore.FieldValue.increment(1);

async function updatePage(t) {
    var session = sessionStorage.getItem("::temp");

    if (session !== null) {
        let data = JSON.parse(session);

        Object.assign(t.task, data);

        console.log(data);

        if (data.dueBy !== null) {
            var date = new Date(data.dueBy)
            console.log(date);
            t.datepicker.day = date.getDay();
            t.datepicker.month = date.getMonth() + 1;
            t.datepicker.year = date.getFullYear();
            t.datepicker.hour = date.getHours();
            t.datepicker.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        }

        sessionStorage.removeItem("::temp");
    } else {
        fs.collection("projects")
            .doc(t.$route.params.prjid)
            .collection("tasks")
            .doc(t.$route.params.taskid)
            .get()
            .then(doc => {
                if (doc && doc.exists) {
                    let data = doc.data();
                    Object.assign(t.task, data);

                    console.log(data);

                    if (data.dueBy !== null) {
                        var date = new Date(data.dueBy)
                        console.log(date);
                        t.datepicker.day = date.getDay();
                        t.datepicker.month = date.getMonth() + 1;
                        t.datepicker.year = date.getFullYear();
                        t.datepicker.hour = date.getHours();
                        t.datepicker.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                    }
                    
                }
            });
    }

    var query = await qu(
        fs.collection("projects")
            .doc(t.$route.params.prjid)
            .collection("tasks")
            .where("parent", "==", t.$route.params.taskid)
    );

    t.subtasks = query;
}

export default {
    components: {
        textbox,
        btn,
        card
    },
    data() {
        return {
            task: {
                id: "",
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
                    title: "",
                    description: ""
                }
            },
            datepicker: {
                day: 0,
                month: 0,
                year: 0,
                hour: 0,
                minute: 0
            },
            options: {
                day: [],
                month: [],
                year: [],
                hour: [],
                minute: []
            },
            subtasks: [],
            edit: false
        }
    },
    watch: {
        "$route": function() {
            updatePage(this)
        }
    },
    methods: {
        updateTask() {

            var dueDate = (t) => {
                if (t.datepicker.day > 0) {
                    var dp = t.datepicker;
                    var date = new Date(dp.year, dp.month - 1, dp.day, dp.hour, dp.minute, 0);
                    return date.valueOf();
                } else {
                    return null;
                }
            }

            fs.collection("projects")
                .doc(this.$route.params.prjid)
                .collection("tasks")
                .doc(this.$route.params.taskid)
                .update({...this.task, lastModifiedAt: Date.now(), id: this.$route.params.taskid, dueBy: dueDate(this)})
                .then(() => {
                    updatePrj(this.$route.params.prjid);
                    this.edit = false
                });
        },
        async deleteTask() {
            if (confirm("Are you sure you want to delete this task?")) {
                var query = await qu(
                    fs.collection("projects")
                        .doc(this.$route.params.prjid)
                        .collection("tasks")
                        .where("rootParents", "array-contains", this.task.id)
                );

                query.forEach(subtask => {
                    fs.collection("projects")
                        .doc(this.$route.params.prjid)
                        .collection("tasks")
                        .doc(subtask.id)
                        .delete();
                });

                fs.collection("projects")
                    .doc(this.$route.params.prjid)
                    .collection("tasks")
                    .doc(this.task.id)
                    .delete()
                    .then(() => {
                        this.$router.go(-1);
                    });
            }
        },
        parseDate(timestamp) {
            var date = new Date(timestamp);
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            var r = [];

            r.push(date.getDay());
            r.push(months[date.getMonth()]);
            r.push(date.getFullYear() + ",");

            let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            r.push(date.getHours() + ":" + minutes);

            return r.join(" ");
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
            let i = `/project/${this.$route.params.prjid}/task/${task.id}`;
            console.log(i);
            this.$router.push(i);

        },
        newSubTask() {
            var id = genId();
            var rootParents = this.task.rootParents;
            rootParents.push(this.task.id);

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
                layer: this.task.layer + 1,
                parent: this.task.id,
                rootParents: rootParents,
                createdAt: Date.now(),
                lastModifiedAt: Date.now(),
                tags: [],
                dueBy: null,
                subtasks: 0,
                subtasksDone: 0,
                body: {
                    title: "New subtask",
                    description: ""
                }
            });

            batch.set(countRef, { current: increment, totalEver: increment }, { merge: true });

            batch.commit().then(() => {
                    updatePrj(this.$route.params.prjid);
                    this.$router.push(`/project/${this.$route.params.prjid}/task/${id}`);
                });
        }
    },
    async created() {
        for (var i = 1; i <= 31; ++i) {
            this.options.day.push(i);
        }

        for (var i = 1; i <= 12; ++i) {
            this.options.month.push(i);
        }

        for (var i = 1990; i <= 2050; ++i) {
            this.options.year.push(i);
        }

        for (var i = 0; i <= 23; ++i) {
            this.options.hour.push(i);
        }

        for (var i = 0; i <= 59; ++i) {
            this.options.minute.push(i < 10 ? "0" + i : i);
        }

        updatePage(this);
    }
}
</script>

<style lang="scss">

.view.task {
    height: 100%;

    & > div > div {
        & > h1 {
            margin: 50px 0px;
            padding: 0px 64px;
            font-family: $default-font;
            font-size: 40px;
        }

        & > p {
            margin: 16px 0px;
            padding: 0px 64px;
            font-family: $default-font;
            font-size: 18px;

            &.moveback {
                margin-top: -38px;
                margin-bottom: 16px;
                text-align: right;
            }
        }

        .btns {
            margin-left: 56px;
        }

        .textboxWrapper {
            width: calc(100% - 64px);
            margin-left: 56px;
        }

        .dateInputs {
            width: calc(100% - 118px);
            display: inline-block;
            margin-left: 56px;

            .textboxWrapper {
                width: 20%;
                margin-left: 0;
                margin-right: 0;
                float: left;
            }
        }

        .bar.total {
            width: calc(100% - 128px);
            height: 8px;
            border-radius: 4px;
            background-color: rgba(0, 0, 0, 0.1);
            margin-left: 64px;

            .progress {
                height: 8px;
                min-width: 8px;
                border-radius: 4px;

                background-color: #212121;
            }

        }
    }

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
        width: calc(50% - 66px);
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

.left, .right {
    float: left;
    height: 100%;
}

.left {
    background-color: #fff;
    width: 40%;
}

.right {
    width: 60%;
}

</style>

