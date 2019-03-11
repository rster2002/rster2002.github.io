<template lang="html">
	<div>
		<sidebar>
			<sidebar-item @click="openSection('dashboard')" icon="dashboard">Dashboard</sidebar-item>
			<sidebar-item @click="openSection('events')" icon="events">Events</sidebar-item>
			<!-- <sidebar-item @click="openSection('builds')" icon="build">Builds</sidebar-item> -->
			<sidebar-item @click="openSection('tasks')" icon="done">Tasks</sidebar-item>
			<sidebar-item @click="openSection('workers')" icon="group">Workers</sidebar-item>
			<sidebar-item @click="openSection('timeline')" icon="timeline">Timeline</sidebar-item>
			<sidebar-item @click="goto()" class="btm" icon="home">Home</sidebar-item>
		</sidebar>
		<page :icon="openPage.icon" :title="openPage.pageName">
			<router-view></router-view>
		</page>
	</div>
</template>

<script>
import sidebar from "./components/sidebar.vue";
import sidebarItem from "./components/sidebarItem.vue";
import page from "./components/page.vue";

import {mac, signOut} from "./js/global.js";
import {fb, fs} from "./js/firebase.js";

function initPage(t) {
	var params = t.$route.params;
	var user = JSON.parse(sessionStorage.getItem("user"));
	mac(`/repos/${params.user}/${params.repo}`).then(r => {
		sessionStorage.setItem("cRepo", JSON.stringify(r));
		fs.collection("repos").doc(`${params.user}->${params.repo}`).set({
			name: params.repo,
			fullName: r.full_name,
			owner: user.uid
		});
	});
}

export default {
	components: {
		sidebar,
		page,
		"sidebar-item": sidebarItem
	},
	data() {
		return {
			openPage: {
				icon: "dashboard",
				pageName: "dashboard"
			}
		}
	},
	watch: {
		"$route": function() {
			initPage(this);
		}
	},
	methods: {
		signOut,
		openSection(s) {
			var params = this.$route.params;
			var icons = {
				"tasks": "done",
				"workers": "group"
			}

			console.log(icons[s], s);
			if (icons[s] === undefined) {
				this.openPage.icon = s;
			} else {
				this.openPage.icon = icons[s];
			}

			this.openPage.pageName = s;

			this.$router.push({path: `/repo/${params.user}/${params.repo}/${s}`});
		},
		goto() {
			this.$router.push({path: "/repos"});
		}
	},
	created() {
		initPage(this);
	}
}
</script>

<style lang="stylus" scoped>
</style>
