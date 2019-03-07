<template lang="html">
	<div>
		<sidebar>
			<sidebar-item @click="openSection('dashboard')" icon="dashboard">Dashboard</sidebar-item>
			<sidebar-item @click="openSection('events')" icon="events">Events</sidebar-item>
			<sidebar-item @click="openSection('builds')" icon="build">Builds</sidebar-item>
			<sidebar-item @click="openSection('tasks')" icon="done">Tasks</sidebar-item>
			<sidebar-item @click="goto()" class="btm" icon="home">Home</sidebar-item>
		</sidebar>
		<page>
			<router-view></router-view>
		</page>
	</div>
</template>

<script>
import sidebar from "./components/sidebar.vue";
import sidebarItem from "./components/sidebarItem.vue";
import page from "./components/page.vue";

import {mac, signOut} from "./js/global.js";
import {fb} from "./js/firebase.js";

export default {
	components: {
		sidebar,
		page,
		"sidebar-item": sidebarItem
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
			this.$router.push({path: `/repo/${params.user}/${params.repo}/${s}`});
		},
		goto() {
			this.$router.push({path: "/repos"});
		}
	}
}
</script>

<style lang="stylus" scoped>
</style>
