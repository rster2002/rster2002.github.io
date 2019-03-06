<template lang="html">
	<div>
		<sidebar :show="showSidebar" class="ex">
			<!-- <sidebar-item icon="dashboard">Dashboard</sidebar-item>
			<sidebar-item icon="done">Tasks</sidebar-item>
			<sidebar-item icon="calendar">Timeline</sidebar-item> -->
			<div class="card" v-if="selected.name !== ''">
				<h1>{{ selected.name }}</h1>
				<p v-if="selected.description !== ''">{{ selected.description }}</p>
				<button>open</button>
			</div>
			<div class="card" v-if="selected.events.length !== 0">
				<div class="listItem" v-for="event in selected.events">
					<p v-html="event.title"></p>
					<!-- <p><span class="tag blue"><img src="./icons/done.png" /></span></p> -->
				</div>
			</div>
		</sidebar>
		<page class="ex">
			<div class="card">
				<div class="listItem" v-for="repo in repos" @click="select(repo)">
					<p>{{ repo.name }}</p>
				</div>
			</div>
		</page>
	</div>
</template>

<script>
import sidebar from "./components/sidebar.vue";
import sidebarItem from "./components/sidebarItem.vue";
import page from "./components/page.vue";

import {mac} from "./js/global.js";

export default {
	components: {
		sidebar,
		page,
		"sidebar-item": sidebarItem
	},
	data() {
		return {
			showSidebar: true,
			repos: [],
			selected: {
				name: "",
				description: "",
				events: []
			}
		}
	},
	methods: {
		select(repo) {
			this.selected.name = repo.name;
			this.selected.description = repo.description !== null ? repo.description : "";
			var e = repo.events.slice(0, 5);

			var r = e.map(a => {
				a.title = ``;

				if (a.event === "head_ref_deleted") {
					a.title += `<span class="tag red"><img src="./src/pages/icons/bin.png" /></span>`;
				} else if (a.event === "closed") {
					a.title += `<span class="tag blue"><img src="./src/pages/icons/done.png" /></span>`;
				} else if (a.event === "merged") {
					a.title += `<span class="tag orange"><img src="./src/pages/icons/merge.png" /></span>`;
				} else if (a.event === "referenced") {
					a.title += `<span class="tag purple"><img src="./src/pages/icons/at.png" /></span>`;
				} else if (a.event === "labeled") {
					a.title += `<span class="tag pink"><img src="./src/pages/icons/label.png" /></span>`;
				} else if (a.event === "assigned") {
					a.title += `<span class="tag green"><img src="./src/pages/icons/account.png" /></span>`;
				}

				a.title += a.issue.title;

				return a;
			});

			this.selected.events = r;
		}
	},
	created() {
		mac("/users/rster2002/repos").then(r => {
			console.log(r);
			this.repos = r

			this.repos.forEach((a, i) => {
				mac(`/repos/$user/${a.name}/issues/events`)
					.then(r => this.repos[i].events = r);
			});
		});
	}
}
</script>

<style lang="stylus" scoped>
</style>
