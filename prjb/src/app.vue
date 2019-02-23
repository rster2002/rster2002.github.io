<template lang="html">
	<div class="page">
		<div class="mainHeader" v-bind:style="{ backgroundImage: 'url(' + randomImg + ')' }">
			<div class="textWrapper">
				<h1 v-if="coins !== '-1'">{{ displayCoins }}</h1>
				<h1 v-else>Login</h1>
				<h2>{{ underHeader }}</h2>
			</div>
		</div>
		<div class="content">
			<router-view></router-view>
			<h2>{{ sessionid }}</h2>
		</div>
	</div>
</template>

<script>

import bigInt from "big-integer";
import vColm from "./components/vColm.vue";

import {genId} from "./js/global.js";

import {fb, fs, cfb} from "./js/firebase.js";

const a = bigInt;

export default {
	components: {
		"v-colm": vColm
	},
	data() {
		return {
			underHeader: ""
		}
	},
	computed: {
		coins() {
			console.log(this.$store.state.coins);
			return this.$store.state.coins;
		},
		sessionid() {
			return this.$store.state.sessionid;
		},
		randomImg() {
			var images = [
				"https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				"https://images.pexels.com/photos/414513/pexels-photo-414513.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				"https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				"https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				"https://images.pexels.com/photos/302804/pexels-photo-302804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				"https://images.pexels.com/photos/733475/pexels-photo-733475.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
				"https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				"https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				"https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				"https://images.pexels.com/photos/589840/pexels-photo-589840.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				"https://images.pexels.com/photos/129105/pexels-photo-129105.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				"https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				"https://images.pexels.com/photos/70365/forest-sunbeams-trees-sunlight-70365.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				"https://images.pexels.com/photos/462149/pexels-photo-462149.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				"https://images.pexels.com/photos/392586/pexels-photo-392586.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				"https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
			]

			var index = Math.floor(Math.random() * images.length);
			return images[index];
		},
		displayCoins() {
			if (this.coins.length > 0 && this.coins !== "-1") {
				var coins = bigInt(this.coins);
				console.log(coins);
				function c(a, b) {
					console.log(a, b);
					if (b === "0") {
						b = "1";
					}
					let i = Math.round(a.over(b).toJSNumber() * 100) / 100;
					return i.toFixed(1);
				}

				var boundries = ["0"];
				var symbols = ["", "K", "M", "B", "T", "Q", "QT", "S", "ST", "O", "N", "D", "U", "DU", "TR", "QU", "QD", "SD", "SP", "OC", "ND", "VT"];
				var names = ["Coins", "Thousant", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion", "Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion"];
				for (var i = 3; i <= 63; i += 3) {
					boundries.push("10e" + (i - 1));
				}

				console.log(boundries);

				var rtrn = "I";
				this.underHeader = "Infinity";

				boundries.forEach((a, i) => {
					let b = boundries[i + 1];
					if (b !== undefined) {
						console.log(a, b, i, coins, coins.geq(a), coins.lt(b));
						if (coins.geq(a) && coins.lt(b)) {
							rtrn = c(coins, a) + " " + symbols[i];
							this.underHeader = names[i];
						}
					}
				});
				console.log(rtrn);
				return rtrn;
			} else {
				return "Nothing";
			}
		}
	},
	created() {
		var t = this;
		cfb.auth().onAuthStateChanged(function(user) {
			if (user !== null) {
				console.log(user);
				console.log(t.$store);
				var sessionid = genId()
				t.$store.state.username = user.displayName;
				t.$store.state.uid = user.uid;
				t.$store.state.sessionid = sessionid;

				console.log(t.$router);
				t.$router.push({path: "/dashboard"});

				t.$store.state.coins = "1000000";

				fs.collection("users").doc(user.uid).set({
					username: user.displayName,
					uid: user.uid,
					lastOnline: Date.now()
				});

				fs.collection("users").doc(user.uid).collection("private").doc("session").set({
					sessionid
				});
			} else {
				console.log("NULL");
			}
		});
	}
}
</script>

<style lang="stylus">

@import "./global.stylus";

.page {
	width: 100%;
	height: 100%;
	overflow-y: auto;

	.mainHeader {
		width: 100%;
		min-height: 100px;
		max-height: 400px;
		height: 50%;
		background-image: url(https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
		background-repeat: no-repeat;
		background-size: cover;

		.textWrapper {
			position: relative;
			top: 50%;
			transform: translateY(-50%);

			h1 {
				margin: 0;
				font-size: 46px;
				text-align: center;
				font-family: font;
				color: #ffffff;
				font-weight: 700;
			}

			h2 {
				margin: 0;
				font-family: font;
				text-align: center;
				font-size: 24px;
				color: #a2a2a2;
				font-weight: 400;
			}
		}
	}

	.content {
		radius = 15px;

		background-color: #ffffff;
		border-radius: radius radius 0px 0px;
		margin-top: "-%s" % radius;
		padding: 16px 0px;

		h1 {
			font-size: 18px;
			text-align: center;
			font-family: font;
			font-weight: 600;
			margin: 0;
			margin-top: 16px;
		}

		h2 {
			margin: 0;
			margin-top: 4px;
			margin-bottom: 16px;
			color: #8a8a8a;
			font-size: 14px;
			font-family: font;
			text-align: center;
			font-weight: 400;
		}

		.itemsWrapper {
			width: 100%;
			display: inline-flex;
			flex-flow: row wrap;
			align-items: stretch;
			justify-content: space-around;
		}
	}
}

</style>
