<template lang="html">
	<div class="wrapper">
		<div class="col1">
			<div class="card">
				<h1>{{ selected.name }}</h1>
				<div class="iconList" v-if="selected.active">
					<icon-text icon="key">
						<p>{{ selected.token }}</p>
					</icon-text>
					<icon-text icon="power">
						<p>
							In use:
							<span v-if="selected.claimed" class="label" style="background-color: #019226; color: #ffffff;">yes</span>
							<span v-else class="label" style="background-color: #ff3030;">no</span>
						</p>
					</icon-text>
					<icon-text icon="server" v-if="selected.payload !== ''">
						<span v-html="selected.payload"></span>
					</icon-text>
					<icon-text icon="events" v-if="selected.events.length !== 0">
						<div v-for="event in selected.events" style="margin-bottom: 16px;">
							<p><b>{{ event.eventId }}</b></p>
							<span v-html="event.$html"></span>
						</div>
					</icon-text>
				</div>
			</div>
		</div>
		<div class="col1">
			<div class="card">
				<div @click="selectWorker(worker)" class="listItem" v-for="worker in workers">
					<p>{{ worker.name }}</p>
				</div>
				<div class="listItem" @click="createToken()">
					<p class="center">New worker</p>
				</div>
				<!-- <div class="listItem" @click="test()">
					<p class="center">Test</p>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
import iconText from "../components/iconText.vue";

import {genId} from "../js/global.js";
import {fs, qu} from "../js/firebase.js";

async function initPage(t) {
	var repo = JSON.parse(sessionStorage.getItem("cRepo"));
	var r = await qu(`repos/${repo.owner.login}->${repo.name}/workers`);
	t.workers = r;
}

export default {
	components: {
		"icon-text": iconText
	},
	data() {
		return {
			workers: [],
			selected: {
				name: "Nothing selected",
				token: "",
				payload: "",
				events: [],
				claimed: false,
				active: false
			}
		}
	},
	watch: {
		"$route": function() {
			initPage(this);
		}
	},
	methods: {
		createToken() {
			var token = genId();
			var repo = JSON.parse(sessionStorage.getItem("cRepo"));
			var content = {
				claimed: false,
				name: token,
				hasEvents: false,
				token
			};

			fs.collection(`repos/${repo.owner.login}->${repo.name}/workers`).doc(token).set(content);

			this.workers.push(content);
		},
		test() {
			var i = prompt("a");
			var repo = JSON.parse(sessionStorage.getItem("cRepo"));
			fs.collection(`repos/${repo.owner.login}->${repo.name}/workers`).doc(i).set({
				claimed: true,
				token: i
			});
		},
		async selectWorker(worker) {

			var repo = JSON.parse(sessionStorage.getItem("cRepo"));

			this.selected.name = worker.name;
			this.selected.token = worker.token;
			this.selected.claimed = worker.claimed;
			this.selected.active = true;

			let i = false;
			if (worker.payload !== undefined) {
				i = true;
			}

			this.selected.hasPayload = i;
			var payloadText = "";

			if (i) {
				if (worker.payload.sessionStart !== undefined && worker.payload.sessionStop !== undefined && worker.payload.sessionDurration !== undefined) {
					function msToTime(s) {
						var ms = s % 1000;
						s = (s - ms) / 1000;
						var secs = s % 60;
						s = (s - secs) / 60;
						var mins = s % 60;
						var hrs = (s - mins) / 60;

						return hrs + 'h:' + mins + 'm:' + secs + '.' + ms;
					}

					function toDate(m) {
						var date = new Date(m);
						var year = date.getFullYear();
						var month = ("0" + (date.getMonth() + 1)).slice(-2);
						var day = ("0" + date.getDate()).slice(-2);
						return `${day}-${month}-${year}`;
					}

					worker.payload.duration = msToTime(worker.payload.sessionDurration);
					worker.payload.start = toDate(worker.payload.sessionStart);
				}

				var entries = Object.entries(worker.payload);

				entries.forEach(a => {
					payloadText += `<p><b>${a[0]}:</b> ${a[1]}</p>`;
				});
			}

			this.selected.payload = payloadText;

			var query = await qu(`repos/${repo.owner.login}->${repo.name}/workers/${worker.token}/events`);
			var events;
			if (query.length > 0) {
				events = query.map(a => {
					if (a.sessionStart !== undefined && a.sessionStop !== undefined && a.sessionDurration !== undefined) {
						function msToTime(s) {
							var ms = s % 1000;
							s = (s - ms) / 1000;
							var secs = s % 60;
							s = (s - secs) / 60;
							var mins = s % 60;
							var hrs = (s - mins) / 60;

							return hrs + 'h:' + mins + 'm:' + secs + '.' + ms;
						}

						function toDate(m) {
							var date = new Date(m);
							var year = date.getFullYear();
							var month = ("0" + (date.getMonth() + 1)).slice(-2);
							var day = ("0" + date.getDate()).slice(-2);
							return `${day}-${month}-${year}`;
						}

						a.duration = msToTime(a.sessionDurration);
						a.start = toDate(a.sessionStart);
					}

					delete a.__id;
					var entries = Object.entries(a);
					a.$html = "";
					entries.forEach(c => {
						a.$html += `<p><b>${c[0]}:</b> ${c[1]}</p>`;
					});

					return a;
				});
			} else {
				events = [];
			}

			this.selected.events = events;
		}
	},
	created() {
		initPage(this);
	}
}
</script>

<style lang="stylus" scoped>
.center {
	text-align: center;
	width: 100% !important;
}
</style>
