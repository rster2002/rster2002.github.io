<template lang="html">
	<div class="wrapper">
		<div class="col1">
			<div class="card"></div>
		</div>
		<div class="col1">
			<div class="card" id="gr">
				<h1>Events</h1>
				<div class="listItem" v-for="event in events">
					<img :src="event.img" />
					<p v-html="event.title"></p>
				</div>
				<div @click="loadMore()" class="listItem" v-if="batch === 30">
					<p class="center">Load more</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import {mac} from "../js/global.js";
import eventMapper from "../js/eventMapper.js";

function loadContent(t) {
	var params = t.$route.params;
	var page = t.page;

	mac(`/repos/${params.user}/${params.repo}/events`, {page}).then(r => {
		var e = r.filter(a => {
			if (a.type === "CreateEvent") {
				var refType = a.payload["ref_type"];
				if (refType === "tag") {
					return false;
				} else if (refType === "repository") {
					return false;
				} else if (refType === "branch" && a.payload.ref === "master") {
					return false;
				}
			}

			return true;
		});

		e = e.map(eventMapper);

		t.batch = e.length;
		t.events = [...t.events, ...e];
	});
}

function initPage(t) {
	var params = t.$route.params;
	loadContent(t);
}

export default {
	data() {
		return {
			events: [],
			batch: 0,
			page: 1
		}
	},
	methods: {
		loadMore() {
			this.page++;
			loadContent(this);
		}
	},
	created() {
		initPage(this);
	}
}
</script>

<style lang="stylus" scoped>
#gr {
	height: calc(100% - 64px);
}

.center {
	text-align: center;
	width: 100% !important;
}
</style>
