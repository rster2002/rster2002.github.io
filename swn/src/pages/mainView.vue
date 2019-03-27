<template lang="html">
	<div>
		<appdrawer v-on:closedrawer="closeDrawer()" :show="showDrawer">
			<draweruser
				:icon="user.icon"
				:username="user.username"
				:secondary="user.email"></draweruser>
		</appdrawer>
		<appbar>
			<barbtn @click="toggleDrawer()">menu</barbtn>
			<bartitle minus="1">Dashboard</bartitle>
		</appbar>
		<mainView>
			<transition name="page">
				<router-view></router-view>
			</transition>
		</mainView>
	</div>
</template>

<script>
import { appbar, barbtn, bartitle, mainView, appdrawer, draweruser } from "@components";

import { fb } from "@js/firebase.js";

export default {
	components: {
		appbar,
		barbtn,
		bartitle,
		mainView,
		appdrawer,
		draweruser
	},
	data() {
		return {
			showDrawer: false,
			user: {
				username: "",
				icon: "",
				email: ""
			}
		}
	},
	methods: {
		toggleDrawer() {
			this.showDrawer = !this.showDrawer
		},
		closeDrawer() {
			this.showDrawer = false;
		}
	},
	created() {
		var t = this;
		fb.auth().onAuthStateChanged(function(user) {
		    if (user === null) {
		        sessionStorage.setItem("user", JSON.stringify({ auth: false }));
		        i.$router.push({ path: "/" });
		    } else {
				console.log(user);
				var u = t.user;
				u.username = user.displayName;
				u.icon = user.photoURL;
				u.email = user.email;
		    }
		});
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
