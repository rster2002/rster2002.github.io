<template lang="html">
    <div class="wrapper">
        <div class="col1">
            <div class="card">
                <h1>{{ selected.title }}</h1>
                <div class="iconList" v-if="selected.selected">
                    <icon-text icon="account" v-if="selected.assignee.length !== 0">
                        <p>
                            <span v-for="assignee in selected.assignee" class="chip">
								<img :src="assignee.avatar_url" />
								{{ assignee.login }}
							</span>
                        </p>
                    </icon-text>
                    <icon-text icon="label" v-if="selected.labels.length !== 0">
                        <p>
                            <span v-for="label in selected.labels" class="label" :style="{ backgroundColor: '#' + label.color, color: c(label.color) }">
								{{ label.name }}
							</span>
                        </p>
                    </icon-text>
                    <icon-text icon="description">
                        <span v-html="toMarkdown(selected.body)"></span>
                    </icon-text>
					<icon-text icon="">
                        <button>Close</button>
                    </icon-text>
                </div>
            </div>
        </div>
        <div class="col1">
            <div class="card" id="gr">
                <h1>Tasks</h1>
                <div @click="select(task)" class="listItem" v-for="task in tasks">
                    <p v-html="task.a"></p>
                </div>
                <div @click="loadMore()" class="listItem" v-if="batch === 30">
                    <p class="center">Load more</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import marked from "marked";

import iconText from "@component/iconText.vue";

import { mac } from "@js/global.js";

function loadContent(t) {
    var params = t.$route.params;
    var page = t.page;

    mac(`/repos/${params.user}/${params.repo}/issues`, { page }).then(r => {
        r = r.map(a => {
            a.a = "";

            if (a.labels.length > 0) {
                var label = a.labels[0];
                a.a += `<span class="tag" style="background-color: #${label.color}; color: ${t.c(label.color)};">${label.name}</span>`;
            }

            a.a += a.title;

            return a;
        });
        t.tasks = [...t.tasks, ...r];
    });
}

function initPage(t) {
    loadContent(t);
}

export default {
    components: {
        "icon-text": iconText
    },
    data() {
        return {
            tasks: [],
            batch: 0,
            page: 1,
            selected: {
                title: "Nothing selected",
                body: "",
                assignee: [],
                labels: [],
                selected: false
            }
        };
    },
    methods: {
        loadMore() {},
        select(task) {
            this.selected.selected = true;
            this.selected.title = task.title;
            this.selected.body = task.body;
            this.selected.assignee = task.assignees;
            this.selected.labels = task.labels;
        },
        c(f) {
            function hexToRgb(hex) {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
                    hex
                );
                return result
                    ? {
                          r: parseInt(result[1], 16),
                          g: parseInt(result[2], 16),
                          b: parseInt(result[3], 16)
                      }
                    : null;
            }

            var rgb = hexToRgb(f);

            if (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 > 186) {
                return "#000000";
            } else {
                return "#ffffff";
            }
        },
        toMarkdown(a) {
            return marked(a, { sanitize: true });
        }
    },
    created() {
        initPage(this);
    }
};
</script>

<style lang="stylus" scoped>
#gr {
	height: calc(100% - 64px);
}
</style>
