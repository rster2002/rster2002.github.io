<template lang="html">
	<div>
		<sidebar :show="showSidebar" class="ex">
			<!-- <sidebar-item icon="dashboard">Dashboard</sidebar-item>
			<sidebar-item icon="done">Tasks</sidebar-item>
			<sidebar-item icon="calendar">Timeline</sidebar-item> -->
			<div class="card" v-if="selected.name !== ''">
				<h1>{{ selected.name }}</h1>
				<p v-if="selected.description !== ''">{{ selected.description }}</p>
				<button @click="open()">open</button>
			</div>
			<div class="card" v-if="selected.events.length !== 0">
				<div class="listItem" v-for="event in selected.events">
					<p v-html="event.title"></p>
					<!-- <p><span class="tag blue">hey</span> some other</p> -->
				</div>
			</div>
			<sidebar-item @click="signOut()" class="btm" icon="exit">Log out</sidebar-item>
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

import {mac, signOut} from "./js/global.js";
import eventMapper from "./js/eventMapper.js";

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
			var e = repo.events.filter(a => {
				if (a.type === "CreateEvent") {
					var refType = a.payload["ref_type"];
					if (refType === "tag") {
						return false;
					} else if (refType === "repository") {
						return false;
					} else if (refType === "branch" && a.payload.ref === "master") {
						return false;
					}

				} else if (a.type === "PullRequestEvent") {
					return false;
				}

				return true;
			});
			e = e.slice(0, 5);

			console.log(e);
			var r = e.map(eventMapper);

			this.selected.events = r;
		},
		open() {
			mac("/user").then(r => {
				// this.$router.push({path: "repo", params: {user: r.login, repo: this.selected.name}});
				this.$router.push({path: `repo/${r.login}/${this.selected.name}/dashboard`});
			});
		},
		signOut
	},
	created() {
		mac("/users/rster2002/repos").then(r => {
			console.log(r);
			this.repos = r

			this.repos.forEach((a, i) => {
				mac(`/repos/$user/${a.name}/events`)
					.then(r => this.repos[i].events = r);
			});
		});
	}
}
</script>

<style lang="stylus" scoped>
</style>
