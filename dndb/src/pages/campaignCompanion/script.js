var infoRef = firestore.collection("campaigns").doc(global.campaignId).collection("dm");

a.ev("Campaign companion", "Open companion", "user action", "");

Vue.component("sectionlist", {
	template: `<div class="entry" v-if="entries.length > 0">
		<h2>{{ displayname }}</h2>
		<div class="listItem">
			<input v-model="query" placeholder="Search" />
			<div class="btn">
				<button @click="toggleViewAll()"><span v-if="showAll == false">Show all</span><span v-else>Show limited</span></button>
			</div>
		</div>
		<div v-if="query == ''">
			<div v-if="showAll == false">
				<div class="listItem" v-for="entry in limitedList">
					<div @click="toggleOpen(entry)" class="shared">
						<h1 class="noOverflow">{{ entry.name }}</h1>
						<h2 style="font-style: italic;" v-if="entry.subtitle != ''">{{ entry.subtitle }}</h2>
					</div>
					<div v-if="entry.show == true" v-html="entry.computedDescription" class="markdown">
					</div>
				</div>
				<div class="listItem" v-if="entries.length > 5" style="cursor: pointer;" @click="toggleViewAll()">
					<h1>Show more</h1>
				</div>
			</div>
			<div v-if="showAll == true">
				<div class="listItem" v-for="entry in entries">
					<div @click="toggleOpen(entry)" class="shared">
						<h1 class="noOverflow">{{ entry.name }}</h1>
						<h2 style="font-style: italic;" v-if="entry.subtitle != ''">{{ entry.subtitle }}</h2>
					</div>
					<div v-if="entry.show == true" v-html="entry.computedDescription" class="markdown">
					</div>
				</div>
				<div class="listItem" v-if="entries.length > 5" style="cursor: pointer;" @click="toggleViewAll()">
					<h1>Show less</h1>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="listItem" v-for="entry in queriedList">
				<div @click="toggleOpen(entry)" class="shared">
					<h1 class="noOverflow">{{ entry.name }}</h1>
					<h2 style="font-style: italic;" v-if="entry.subtitle != ''">{{ entry.subtitle }}</h2>
				</div>
				<div v-if="entry.show == true" v-html="entry.computedDescription" class="markdown">
				</div>
			</div>
		</div>
	</div>`,
	props: ["internalname", "displayname"],
	data: function() {
		return {
			entries: [],
			showAll: false,
			query: ""
		}
	},
	methods: {
		toggleViewAll() {
			this.showAll = !this.showAll;
		},
		toggleOpen(entry) {
			var index = this.entries.indexOf(entry);
			this.entries[index].show = !this.entries[index].show;
			a.ev("Campaign companion", "Open entry", "user interaction", "");
		}
	},
	computed: {
		limitedList: function() {
			return this.entries.slice(0, 5);
		},
		queriedList: function() {
			var query = this.query.toLowerCase();
			return this.entries.filter(function (item) {
				if (item.name === undefined) {
					return false;
				} else {
					if (item.name.toLowerCase().includes(query) || item.subtitle.toLowerCase().includes(query) || item.description.toLowerCase().includes("\`" + query)) {
						return true;
					} else {
						return false;
					}
				}
			});
		}
	},
	created: async function() {
		var query = await createQuery(infoRef.doc(this.internalname).collection("players").orderBy("name", "asc"));
		if (query.length > 0) {
			this.entries = query;

			vueInstance.allEntries = vueInstance.allEntries.concat(query);
		}
	}
})

var vueInstance = new Vue({
	el: "#app",
	data: {
		query: "",
		allEntries: []
	},
	computed: {
		allEntriesQueried() {
			var query = this.query.toLowerCase();
			return this.allEntries.filter(function (item) {
				if (item.name === undefined) {
					return false;
				} else {
					if (item.name.toLowerCase().includes(query) || item.subtitle.toLowerCase().includes(query) || item.description.toLowerCase().includes("\`" + query)) {
						return true;
					} else {
						return false;
					}
				}
			});
		}
	},
	methods: {
		back() {
			openPage("campaign");
		},
		toggleOpen(entry) {
			var index = this.allEntries.indexOf(entry);
			this.allEntries[index].show = !this.allEntries[index].show;
		}
	}
});
