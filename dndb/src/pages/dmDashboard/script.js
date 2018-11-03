var dmRef = firestore.collection("campaigns").doc(global.campaignId).collection("dm");

Vue.component("dmlist", {
	template: `
	<div class="lane">
		<div class="entry">
			<h2>Add entry</h2>
			<slot name="input"></slot>
			<div class="btn">
				<button @click="addToList()">Add</button>
			</div>
		</div>

		<div class="entry">
			<h2>Entries</h2>
			<div class="listItem">
				<input v-model="query" placeholder="Search" />
			</div>
			<div class="listItem" v-for="entry in filteredEntries">
				<div v-if="entry.editing != true">
					<div class="shared" @click="openEntry(entry)">
						<h1>{{ entry.name }}</h1>
						<h2 style="font-style: italic;" v-if="entry.subtitle != ''">{{ entry.subtitle }}</h2>
					</div>
					<div v-if="entry.show == true" v-html="entry.computedDescription" class="markdown">
					</div>
					<div style="margin-top: 24px; width: calc(100% - 4px); border: 2px solid #ff3030; border-radius: 10px; padding: 8px 0px;" v-if="entry.show == true && entry.dmDescription != ''">
						<h3 style="margin-top: 12px;">Private notes</h3>
						<div v-html="entry.computedDmDescription" class="markdown">
						</div>
					</div>
					<div v-if="entry.show == true" class="btn">
						<button @click="toggleOpen(entry)"><span v-if="entry.open == true">Hide from players</span><span v-if="entry.open == false">Reveal to players</span></button>
						<button @click="startEdit(entry)">Edit</button>
						<button @click="deleteEntry(entry);" class="danger">Delete</button>
					</div>
				</div>
				<div v-if="entry.editing == true">
					<h2>Edit entry</h2>
					<slot name="input"></slot>
					<button class="full" @click="saveEdit(entry)">Save</button>
				</div>
			</div>
		</div>
	</div>`,
	props: ["working", "section"],
	data() {
		return {
			entries: [],
			query: ""
		}
	},
	computed: {
		filteredEntries: function() {
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
	methods: {
		addToList() {
			var entry = Object.assign({}, vueInstance.working);
			console.log(entry);
			var id = genId();
			entry.__id = id;
			entry.editing = false;
			entry.show = false;
			entry.open = false;

			entry.computedDescription = marked(entry.description, { sanitize: true });
			entry.computedDmDescription = marked(entry.dmDescription, { sanitize: true })

			dmRef.doc(this.section).collection("dm").doc(id).set(entry).then(() => {
				skb("Entry created");
			}).catch(e => thr(e));

			this.entries.push(entry);

			var resetWorking = {
				name: "",
				subtitle: "",
				description: "",
				dmDescription: ""
			}

			var entries = Object.entries(resetWorking);
			for (var i = 0; i < entries.length; ++i) {
				vueInstance.working[entries[i][0]] = entries[i][1];
			}
		},
		openEntry(entry) {
			var index = this.entries.indexOf(entry);
			this.entries[index].show = !this.entries[index].show;
		},
		toggleOpen(entry) {
			var index = this.entries.indexOf(entry);
			var current = this.entries[index];
			var open = current.open;
			var id = current.__id;
			if (open === false) {
				if (confirm("You are about to reveal this information to the players so they can see it. Are you sure?")) {
					this.entries[index].open = true;
					var push = Object.assign({}, entry);
					push.dmDescription = "";
					push.computedDmDescription = "";
					push.show = false;
					dmRef.doc(this.section).collection("players").doc(id).set(push).then(() => {
						skb("Entry revealed to players");
					}).catch(e => thr(e));

					dmRef.doc(this.section).collection("dm").doc(id).update({open: true}).then(() => {}).catch(e => thr(e));
				}
			} else {
				this.entries[index].open = false;
				dmRef.doc(this.section).collection("players").doc(id).delete().then(() => {
					skb("Entry hidden from players");
				}).catch(e => thr(e));

				dmRef.doc(this.section).collection("dm").doc(id).update({open: false}).then(() => {}).catch(e => thr(e));
			}
		},
		deleteEntry(entry) {
			var index = this.entries.indexOf(entry);
			var id = entry.__id;
			if (confirm("Are you sure you want to delete this entry?")) {
				dmRef.doc(this.section).collection("dm").doc(id).delete().then(() => {
					skb("Entry deleted");
				}).catch(e => thr(e));

				if (entry.open === true) {
					dmRef.doc(this.section).collection("players").doc(id).delete().catch(e => thr(e));
				}

				this.entries.splice(index, 1);
			}
		},
		startEdit(entry) {
			var index = this.entries.indexOf(entry);
			vueInstance.working = entry;
			this.entries[index].editing = true;
		},
		saveEdit(entry) {
			var index = this.entries.indexOf(entry);
			var push = Object.assign({}, vueInstance.working);
			var id = push.__id;
			push.editing = false;
			push.show = false;

			push.computedDescription = marked(push.description, { sanitize: true });
			push.computedDmDescription = marked(push.dmDescription, { sanitize: true })

			dmRef.doc(this.section).collection("dm").doc(id).update(push).then(() => {
				skb("Entry updated");
			}).catch(e => thr(e));

			if (push.open === true) {
				dmRef.doc(this.section).collection("players").doc(id).update(push).catch(e => thr(e));
			}


			console.log(index, push);
			push.show = true;
			var entries = Object.entries(push);
			for (var i = 0; i < entries.length; ++i) {
				this.entries[index][entries[i][0]] = entries[i][1];
			}
		}
	},
	created: async function() {
		var query = await createQuery(dmRef.doc(this.section).collection("dm").orderBy("name", "desc"));
		if (query.length > 0) {
			this.entries = query;
		}
	}
})

var vueInstance = new Vue({
	el: "#vueInstance",
	data: {
		campaignId: "",
		campaignName: "",
		openedSection: "",
		working: {
			name: "",
			subtitle: "",
			description: "",
			dmDescription: ""
		}
	},
	methods: {
		openSection(section, title) {
			$(".wave.bar.top").prepend(`
				<div class="section temp" style="display: none;">
					<button onclick="vueInstance.closeSection();">
						<i class="material-icons">arrow_back</i>
					</button>
				</div>
				<div class="section text temp" style="display: none; width: calc(100% - 128px);">
					<h1></h1>
				</div>
			`);
			$(".wave.bar.top .section.temp h1").text(title);
			$(".wave.bar.top .section.main").hide();
			$(".wave.bar.top .section.temp").show();
			$("#section-" + section).show();
			this.openedSection = section;
		},
		closeSection() {
			$(".wave.bar.top .section.temp").remove();
			$(".wave.bar.top .section.main").show();
			$("#section-" + this.openedSection).hide();
		},
		back() {
			openPage("campaign");
		}
	}
});

$(".wave.bar.top .section:nth-of-type(1)").addClass("main");
$(".wave.bar.top .section:nth-of-type(2)").addClass("main");

vueInstance.campaignId = global.campaignId;
vueInstance.campaignName = global.campaignName;
