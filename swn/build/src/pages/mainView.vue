<template lang="html">
	<div>
		<appdrawer v-on:closedrawer="closeDrawer()" :show="showDrawer">
			<draweruser
				:icon="user.icon"
				:username="user.username"
				:secondary="user.email"></draweruser>
			<divider></divider>
		</appdrawer>
		<appbar>
			<barbtn @menu="toggleDrawer()" @back="goBack()" menu="true" @click="toggleDrawer()">menu</barbtn>
			<bartitle minus="1">{{ barTitle }}</bartitle>
		</appbar>
		<mainView>
			<transition name="page">
				<router-view></router-view>
			</transition>
		</mainView>
	</div>
</template>

<script>
import { appbar, barbtn, bartitle, mainView, appdrawer, draweruser, divider } from "@components";

import { fb } from "@js/firebase.js";

function routeUpdate(t) {
	t.barTitle = t.$route.meta.title;
}

export default {
	components: {
		appbar,
		barbtn,
		bartitle,
		mainView,
		appdrawer,
		draweruser,
		divider
	},
	data() {
		return {
			showDrawer: false,
			barTitle: "dashboard",
			user: {
				username: "",
				icon: "",
				email: ""
			}
		}
	},
	watch: {
		"$route": function() {
			routeUpdate(this);
		}
	},
	methods: {
		toggleDrawer() {
			this.showDrawer = !this.showDrawer
		},
		closeDrawer() {
			this.showDrawer = false;
		},
		goBack() {
			window.history.back();
		}
	},
	created() {

		var t = this;
		fb.auth().onAuthStateChanged(function(user) {
			console.log(user);
		    if (user === null) {
				console.log("NO USER");
		        t.$router.push({ path: "/" });
		    } else {
				var u = t.user;
				u.username = user.displayName;
				u.icon = user.photoURL;
				u.email = user.email;

				sessionStorage.setItem("u", JSON.stringify({
					uid: user.uid,
					username: user.displayName
				}));
		    }
		});

		routeUpdate(this);
	}
}
</script>

<style lang="stylus">

.page-enter-active {
	transition: 350ms cubic-bezier(0.0, 0.0, 0.2, 1) all;
}

.page-enter {
	opacity: 0;
	transform: scale(0.95);
}

.page-enter-to {
	opacity: 1;
	transform: scale(1);
}

.view > div {
	height: 100%;
	width: 100%;
}

</style>
