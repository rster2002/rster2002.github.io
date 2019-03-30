<template lang="html">
	<div>
		<appdrawer v-on:closedrawer="closeDrawer()" :show="showDrawer">
			<draweruser
				:icon="user.icon"
				:username="user.username"
				:secondary="user.email"></draweruser>
			<divider></divider>
			<drawerbtn
				@click="signOut()"
				icon="exit_to_app">Logout</drawerbtn>
		</appdrawer>
		<appbar>
			<barbtn
				@menu="toggleDrawer()"
				@back="goBack()"
				menu="true"
				@click="toggleDrawer()">menu</barbtn>
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
import { appbar, barbtn, bartitle, mainView, appdrawer, draweruser, divider, drawerbtn } from "@components";

import { fb } from "@js/firebase.js";
import { signOut } from "@js/global.js";

function routeUpdate(t) {
	fb.auth().onAuthStateChanged(function(user) {
		console.log(user);
		if (user === null) {
			console.log("NO USER");
			t.$router.push({ path: "/login" });
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
		divider,
		drawerbtn
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
		},
		signOut() {
			signOut(this)
		}
	},
	created() {
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
