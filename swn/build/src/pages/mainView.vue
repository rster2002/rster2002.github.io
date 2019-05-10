<template lang="html">
	<div>
		<appdrawer v-on:closedrawer="closeDrawer()" :show="showDrawer">
			<draweruser
				:icon="user.icon || 'https://i.stack.imgur.com/ZQT8Z.png'"
				:username="user.username || 'anonymous'"
				:secondary="user.email"></draweruser>
			<divider></divider>
			<drawerbtn
				@click="$router.push({path: '/versions'})"
				icon="history">Versions</drawerbtn>
			<drawerbtn
				@click="leaveFeedback()"
				icon="feedback">Send Feedback</drawerbtn>
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

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("js", new Date());

gtag("config", "UA-102147810-4");

import { env } from "@js/global.js";

function routeUpdate(t, to, from) {
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
                username: user.displayName,
                usericon: user.photoURL
			}));
		}
	});

	t.barTitle = t.$route.meta.title;

	if (gtag !== undefined && env === "pro") {
		gtag("config", "UA-102147810-4", {
			"page_title": t.$route.meta.title,
			"page_path": t.$route.fullPath
		});
	}
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
		"$route": function(to, from) {
			routeUpdate(this, to, from);
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
		},
		leaveFeedback() {
			window.open('https://github.com/rster2002/rster2002.github.io/issues', '_blank')
		},
		icon(user) {
			return user.icon || "https://i.stack.imgur.com/ZQT8Z.png";
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
