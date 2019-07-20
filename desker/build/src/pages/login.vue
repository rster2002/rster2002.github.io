<template lang="html">
    <div>
        <h1 class="title">Desker</h1>
        <div class="box dp1">
            <h1>Login</h1>
            <div class="btn" @click="login()">
                <div class="icon">
                    <img src="@img/github-logo.png" />
                </div>
                <div class="text">
                    <p>Login with github</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { cfb, fb, fs } from "@js/firebase.js";

export default {
    methods: {
        login() {
            var t = this;
            var provider = new cfb.auth.GithubAuthProvider();
            provider.addScope("repo");
            fb.auth()
                .signInWithPopup(provider)
                .then(r => {
                    console.log(r);
                    var user = r.user;
                    fs.collection("users")
                        .doc(user.uid)
                        .get()
                        .then(a => {
                            function update() {
                                fs.collection("users")
                                    .doc(user.uid)
                                    .update({
                                        lastLogin: Date.now()
                                    });

                                fs.collection(`users/${user.uid}/private/`)
                                    .doc("token")
                                    .set({
                                        token: r.credential.accessToken
                                    });

                                sessionStorage.setItem(
                                    "auth",
                                    r.credential.accessToken
                                );
                                sessionStorage.setItem(
                                    "user",
                                    JSON.stringify(user)
                                );

                                t.$router.push({ path: "/" });
                            }

                            if (a && a.exists) {
                                update();
                            } else {
                                fs.collection("users")
                                    .doc(user.uid)
                                    .set({
                                        username: user.displayName,
                                        uid: user.uid,
                                        joined: Date.now()
                                    })
                                    .then(a => {
                                        update();
                                    });
                            }
                        });
                });
        }
    }
};
</script>

<style lang="scss" scoped>

h1.title {
	margin: 0;
	padding: 32px;
	font-family: 'Montserrat', sans-serif;
	font-weight: 700;
}

.box {
	padding: 16px;
	width: 20%;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 2px;
	background-color: #131313;
	color: #ffffff;

	h1 {
		font-family: 'Montserrat', sans-serif;
		font-weight: 400;
		margin: 0;
		margin-bottom: 16px;
	}

	$btnHeight: 36px;

	.btn {
		width: 100%;
		height: $btnHeight;
		background-color: #252525;
		border-radius: 2px;
		cursor: pointer;

		.icon {
			width: $btnHeight;
			height: $btnHeight;
			float: left;

			img {
				width: 70%;
				height: 70%;
				position: relative;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}

		.text {
			width: calc(100% - #{$btnHeight});
			height: $btnHeight;
			float: left;

			p {
				width: 100%;
				margin: 0;
				font-family: 'Montserrat', sans-serif;
				padding: 0px 8px;
				position: relative;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
}
</style>
