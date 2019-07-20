<template>
    <div id="mainView">
        <appbar></appbar>
        <router-view></router-view>
    </div>
</template>

<script>
import { fb } from "@js/firebase.js";
import { signOut } from "@js/global.js";
import appbar from "@component/appbar.vue";

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("js", new Date());

gtag("config", "UA-102147810-4");

import { env } from "@js/global.js";

function routeUpdate(t, to, from) {
	fb.auth().onAuthStateChanged(function(user) {
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
        appbar
    },
    data() {
        return {
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
	created() {
		routeUpdate(this);
	}
}
</script>

<style lang="scss">

#mainView {
    width: 100%;
    height: 100%;

    & > div.view {
        width: 100%;
        height: calc(100% - 114px);
    }
}

</style>
