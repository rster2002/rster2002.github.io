<template lang="html">
	<div>
		<div class="menu" v-if="menu">
			<div class="join">
				<h1>Join</h1>
			</div>
			<div class="host" @click="host()">
				<h1>Host</h1>
			</div>
		</div>
		<popup @click="setProp('hosting', false)" :show="hosting">
			<h1>Hosting</h1>
			<p>Share this id with your friend</p>
		</popup>
	</div>
</template>

<script>
import db from "../js/sdb.js";
import popup from "../components/popup.vue";

export default {
	components: {
		popup
	},
	data() {
		return {
			menu: true,
			hosting: false
		}
	},
	methods: {
		host() {
			this.hosting = true;
		},
		setProp(a, b) {
			this[a] = b;
		}
	}
}
</script>

<style lang="stylus" scoped>

.menu {
	width: 100%;
	height: 100%;
}

.host, .join {
	width: 100%;
	height: 50%;
	background-color: #000f47;

	h1 {
		margin: 0;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		text-align: center;
		color: #d7ef00;
		font-family: 'Montserrat', sans-serif;
		font-size: 48px;
	}
}

.host {
	background-color: #000b35;
}

.sellBtn {
	width: 100%;
	height: 50px;
	background-color: #000b35;

	p {
		margin: 0;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		text-align: center;
		font-family: 'Montserrat', sans-serif;
		color: white;
		font-size: 24px;
	}
}

p {
	font-family: 'Montserrat', sans-serif;
	font-weight: 600;
	white-space: normal;

	&.h {
		text-align: center;
	}
}

.card {
	width: 75%;
	padding: 16px 0px;
	background-color: #e5e5e5;
	border-radius: 15px;
	margin: 12px 0px;
	margin-left: auto;
	margin-right: auto;

	p {
		color: #000000;
		text-align: center;

		&.under {
			margin: 2px;
			color: #868686;
			font-size: 12px;
		}
	}
}

</style>
