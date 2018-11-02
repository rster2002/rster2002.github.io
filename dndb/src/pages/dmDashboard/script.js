var dmRef = firestore.collection("campaigns").doc(global.campaignId).collection("dm").doc("data");

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
			<div class="listItem" v-for="entry in entries">
				<div v-if="entry.editing != true">
					<div class="shared" @click="openEntry(entry)">
					<h1>{{ entry.name }}</h1>
					<h2 style="font-style: italic;" v-if="entry.subtitle != ''">{{ entry.subtitle }}</h2>
					</div>
					<div v-if="entry.show == true" v-html="entry.computedDescription" class="markdown">
					</div>
					<div v-if="entry.show == true" class="btn">
						<button @click="toggleOpen(entry)"><span v-if="entry.open == true">Hide from players</span><span v-if="entry.open == false">Reveal to players</span></button>
						<button @click="startEdit(entry)">Edit</button>
						<button class="danger">Delete</button>
					</div>
				</div>
				<div v-if="entry.editing == true">
					<slot name="input"></slot>
					<button class="full" @click="saveEdit()">Save</button>
				</div>
			</div>
		</div>
	</div>`,
	props: ["working", "section"],
	data() {
		return {
			entries: []
		}
	},
	methods: {
		addToList() {
			var entry = Object.assign({}, vueInstance.working);
			console.log(entry);
			var id = genId();
			entry.__id = id;
			entry.show = false;
			entry.open = false;

			entry.computedDescription = marked(entry.description, { sanitize: true });


			dmRef.collection(this.section).doc(id).set(entry).then(() => {
				skb("Entry created");
			}).catch(e => thr(e));

			this.entries.push(entry);
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
					dmRef.collection(this.section).doc(id).update({open: true}).then(() => {
						skb("Entry revealed to players");
					}).catch(e => thr(e));
				}
			} else {
				this.entries[index].open = false;
				dmRef.collection(this.section).doc(id).update({open: false}).then(() => {
					skb("Entry hidden from players");
				}).catch(e => thr(e));
			}
		},
		deleteEntry(entry) {
			var index = this.entries.indexOf(entry);
			var id = entry.__id;
			if (confirm("Are you sure you want to delete this entry?")) {
				this.entries.splice(index, 1);
				dmRef.collection(this.section).doc(id).delete().then(() => {
					skb("Entry deleted");
				}).catch(e => thr(e));
			}
		},
		startEdit(entry) {
			var index = this.entries.indexOf(entry);
			this.entries[index].editing = true;
		},
		saveEdit(entry) {

		}
	},
	created: async function() {
		var query = await createQuery(dmRef.collection(this.section).orderBy("name", "desc"));
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
			description: ""
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
		}
	}
});

$(".wave.bar.top .section:nth-of-type(1)").addClass("main");
$(".wave.bar.top .section:nth-of-type(2)").addClass("main");

vueInstance.campaignId = global.campaignId;
vueInstance.campaignName = global.campaignName;
