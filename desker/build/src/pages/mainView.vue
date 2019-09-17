<template>
    <div id="mainView">
        <appbar></appbar>
        <router-view></router-view>
    </div>
</template>

<script>
import vueChannel from "vue-channel";

import { fb, fs } from "@js/firebase.js";
import { signOut } from "@js/global.js";
import appbar from "@component/appbar.vue";

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("js", new Date());

gtag("config", "UA-102147810-4");

import { env } from "@js/global.js";

vueChannel("accessToken")
    .disposable(state => {
        fetch("https://api.github.com/user?access_token=" + state.token)
            .then(r => r.json())
            .then(j => 
                vueChannel("user")
                    .update(j)
            );
    });

function routeUpdate(t, to, from) {

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
        
        fb.auth().onAuthStateChanged(user => {
            if (user === null) {
                console.log("NO USER");
                this.$router.push({ path: "/login" });
            } else {

                this.user.username = user.displayName;
                this.user.icon = user.photoURL;
                this.user.email = user.email;

                vueChannel("user")
                    .set({
                        uid: user.uid,
                        username: user.displayName,
                        usericon: user.photoURL
                    });

                if (user.credential !== undefined) {
                    vueChannel("accessToken")
                        .set({ token: user.credential.accessToken });
                } else {
                    fs.collection("users")
                        .doc(user.uid)
                        .collection("private")
                        .doc("token")
                        .get()
                        .then(doc => {
                            if (doc && doc.exists) {
                                vueChannel("accessToken")
                                    .set({ token: doc.data().token })
                            }
                        });
                }
            }
        });
	}
}
</script>

<style lang="scss">

#mainView {
    width: 100%;
    height: 100%;

    & > div.view {
        width: 100%;
        height: calc(100% - 2px);

        padding: 1px 0px;
    }
}

</style>
