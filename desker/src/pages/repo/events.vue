<template lang="html">
    <div class="wrapper">
        <div class="col1">
            <div class="card">
                <h1 v-html="selected.name"></h1>
                <div class="iconList" v-if="selected.show">
                    <icon-text v-if="selected.type === 'PushEvent'" icon="push">
						<div class="card" v-for="commit in selected.commits">
							<h3>{{ commit.title }}</h3>
							<span class="markdown" v-html="commit.body"></span>
						</div>
					</icon-text>
                </div>
            </div>
        </div>
        <div class="col1">
            <div class="card" id="gr">
                <h1>Events</h1>
                <div class="listItem" v-for="event in events" @click="select(event)">
                    <img :src="event.img" />
                    <p v-html="event.title"></p>
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

import { mac, replaceAll } from "@js/global.js";
import eventMapper from "@js/eventMapper.js";

function loadContent(t) {
    var params = t.$route.params;
    var page = t.page;

    mac(`/repos/${params.user}/${params.repo}/events`, { page }).then(r => {
        var e = r.filter(a => {
            if (a.type === "CreateEvent") {
                var refType = a.payload["ref_type"];
                if (refType === "tag") {
                    return false;
                } else if (refType === "repository") {
                    return false;
                } else if (refType === "branch" && a.payload.ref === "master") {
                    return false;
                }
            }

            return true;
        });

        e = e.map(eventMapper);

        t.batch = e.length;
        t.events = [...t.events, ...e];
    });
}

function initPage(t) {
    var params = t.$route.params;
    loadContent(t);
}

export default {
    components: {
        "icon-text": iconText
    },
    data() {
        return {
            events: [],
            batch: 0,
            page: 1,
            selected: {
				show: false,
                name: "Nothing selected",
				type: "",
				commits: []
            }
        };
    },
    methods: {
        loadMore() {
            this.page++;
            loadContent(this);
        },
        select(event) {
			this.selected.show = true;
            this.selected.name = event.title;
			this.selected.type = event.type;

			if (event.type === "PushEvent") {
				var commits = event.payload.commits;
				commits = commits.reverse();

				commits.map(commit => {
					var message = commit.message;
					message = message.split("\n");
					var title = message[0];

					message.shift();

					var body = marked(message.join("\n"), { sanitize: true });

					body = replaceAll(body, "\n\n", "<br/>");

					commit.title = title;
					commit.body = body;

					return commit;
				});
				this.selected.commits = commits;
			}
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

.center {
	text-align: center;
	width: 100% !important;
}
</style>
