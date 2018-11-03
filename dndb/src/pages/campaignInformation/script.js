var infoRef = firestore.collection("campaigns").doc(global.campaignId).collection("dm");

Vue.component("sectionlist", {
	template: `<div class="entry" v-if="entries.length > 0">
		<h2>{{ displayname }}</h2>
		<div class="listItem">
			<input v-model="query" placeholder="Search" />
			<button @click="toggleViewAll()"><span v-if="showAll == false">Show all</span><span v-else>Show limited</span></button>
		</div>
		<div v-if="query == ''">
			<div v-if="showAll == false">
				<div class="listItem" v-for="entry in limitedList">
					<div @click="toggleOpen(entry)" class="shared">
						<h1>{{ entry.name }}</h1>
						<h2 style="font-style: italic;" v-if="entry.subtitle != ''">{{ entry.subtitle }}</h2>
					</div>
					<div v-if="entry.show == true" v-html="entry.computedDescription" class="markdown">
					</div>
				</div>
			</div>
			<div v-if="showAll == true">
				<div class="listItem" v-for="entry in entries">
					<div @click="toggleOpen(entry)" class="shared">
						<h1>{{ entry.name }}</h1>
						<h2 style="font-style: italic;" v-if="entry.subtitle != ''">{{ entry.subtitle }}</h2>
					</div>
					<div v-if="entry.show == true" v-html="entry.computedDescription" class="markdown">
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="listItem" v-for="entry in queriedList">
				<div @click="toggleOpen(entry)" class="shared">
					<h1>{{ entry.name }}</h1>
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
					return item.name.toLowerCase().includes(query);
				}
			});
		}
	},
	created: async function() {
		var query = await createQuery(infoRef.doc(this.internalname).collection("players").orderBy("name", "desc"));
		if (query.length > 0) {
			this.entries = query;
		}
	}
})

var vueInstance = new Vue({
	el: "#app",
	methods: {
		back() {
			openPage("campaign");
		}
	}
});
