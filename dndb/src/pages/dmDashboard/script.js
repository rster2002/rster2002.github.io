var dmRef = firestore.collection("campaigns").doc(global.campaignId).collection("dm");

Vue.component("dmlist", {
	template: `
	<div class="lane">
		<div class="entry" style="margin-bottom: 46px;">
			<h2>Entries</h2>
			<input v-model="query" placeholder="Search" />
			<div class="listItem" v-for="entry in filteredEntries" v-bind:class="{open: entry.open}">
				<div v-if="entry.editing != true">
					<div class="shared" @click="openEntry(entry)">
						<h1 class="noOverflow">{{ entry.name }}</h1>
						<h2 style="font-style: italic;" v-if="entry.subtitle != ''"><span v-if="section === 'items'">Ammount: </span>{{ entry.subtitle }}</h2>
					</div>
					<div v-if="entry.show == true" v-html="toMarkdown(entry.description)" class="markdown">
					</div>
					<div style="margin-top: 24px; width: calc(100% - 4px); border: 2px solid #ff3030; border-radius: 10px; padding: 8px 0px;" v-if="entry.show == true && entry.dmDescription != ''">
						<h3 style="margin-top: 12px;">Private notes</h3>
						<div v-html="toMarkdown(entry.dmDescription)" class="markdown">
						</div>
					</div>
					<div v-if="entry.show == true" class="btn icn">
						<button @click="deleteEntry(entry);"><span class="material-icons">delete</span></button>
						<button @click="startEdit(entry)"><span class="material-icons">edit</span></button>
						<button @click="toggleOpen(entry)"><span v-if="entry.open == true" class="material-icons">visibility_off</span><span v-if="entry.open == false" class="material-icons">visibility</span></button>
					</div>
				</div>
				<div v-if="entry.editing == true">
					<h2>Edit entry</h2>
					<slot name="input"></slot>
					<button class="full" @click="saveEdit(entry)">Save</button>
				</div>
			</div>
			<button class="wave fab" @click="addEntry()">
				<i class="material-icons">add</i>
			</button>
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
					if (item.name.toLowerCase().includes(query) || item.subtitle.toLowerCase().includes(query) || item.description.toLowerCase().includes("\`" + query) || item.dmDescription.toLowerCase().includes("\`" + query)) {
						return true;
					} else {
						return false;
					}
				}
			});
		}
	},
	methods: {
		toMarkdown(i) {
			return marked(i, {sanitize: true});
		},
		addEntry() {
			this.entries.push({
				name: "",
				description: "",
				editing: true,
				open: false,
				show: true,
				__id: genId()
			});
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
			global.i = {
				t: this,
				index: this.entries.indexOf(entry),
				current: this.entries[index],
				open: current.open,
				id: current.__id,
				entry: entry
			}
			if (open === false) {
				if (this.section === "items") {

					var usersPermitted = global.campaign.users.filter(a => {
						return a.permitted;
					});

					if (usersPermitted.length > 0) {

						let r = [];

						usersPermitted.forEach(a => {
							a.image = a.profile.usericon;
							a.name = a.profile.username;
							r.push(a);
						});

						global.t = this;

						global.alert({
							type: "userList",
							users: r,
							text: "Reveal to",
							btn1: "add",
							btn2: "cancel",
							btn1fn: function(arr) {

								var item = Object.assign({}, entry);
								item.tags = [];
								item.color = "rgba(0, 0, 0, .1)";
								item.tag = "";
								item.count = item.subtitle;
								let k = item.description;
								console.log(item, k);
								k = k.split("\n");
								item.description = k;
								item.dmDescription = "";
								item.computedDmDescription = "";
								item.pinned = false;
								item.shown = false;
								item.__id = genId();

								global.a = arr;

								global.alert({
									text: "Are you sure you want to add this item to the inventory of the selected users? You can't remove it once it's added.",
									btn1: "add",
									btn2: "cancel",
									btn1fn: function() {

										var arr = global.a;

										console.log(arr);

										arr.forEach(a => {
											console.log(a, item);
											tRef = firestore.collection("users").doc(a.id).collection("characters").doc(a.character);

											tRef.collection("inventory").doc(item.__id).set(item).then(e => {
												tRef.collection("channels").doc("inventory").set({
													status: "dm-added"
												}).then(e => {
													skb("Item added to inventory");

													console.log(`%c Item added %c`, "padding: 1px; border-radius: 3px; color: white; background-color: #30ff30;", "background-color: transparent;");
												});
											});
										});
									}
								})
							}
						});
					} else {
						global.alert({
							text: "None of your players have given you permission to write to their character.",
							btn1: "ok"
						});
					}

				} else {
					global.alert({
						text: "Are you sure you want to reveal this entry to your players?",
						btn1: "reveal",
						btn2: "cancel",
						btn1fn: function() {

							var t = global.i.t;
							var index = global.i.index;
							var current = global.i.current;
							var open = global.i.open;
							var id = global.i.id;
							var entry = global.i.entry;

							t.entries[index].open = true;
							var push = Object.assign({}, entry);
							push.dmDescription = "";
							push.computedDmDescription = "";
							push.show = false;
							dmRef.doc(t.section).collection("players").doc(id).set(push).then(() => {
								skb("Entry revealed to players");
								a.ev("DM Dashboard", "DM Dashboard", "Entry revealed to players", "user action", "");
							}).catch(e => thr(e));

							dmRef.doc(t.section).collection("dm").doc(id).update({open: true}).then(() => {}).catch(e => thr(e));
						}
					});
				}
			} else {
				this.entries[index].open = false;
				dmRef.doc(this.section).collection("players").doc(id).delete().then(() => {
					skb("Entry hidden from players");
					a.ev("DM Dashboard", "Entry hidden from players", "user action", "");
				}).catch(e => thr(e));

				dmRef.doc(this.section).collection("dm").doc(id).update({open: false}).then(() => {}).catch(e => thr(e));
			}
		},
		deleteEntry(entry) {
			var index = this.entries.indexOf(entry);
			var id = entry.__id;
			global.i = {
				id: entry.__id,
				index: this.entries.indexOf(entry),
				entry: entry,
				t: this
			}

			global.alert({
				text: "Are you sure you want to delete this entry?",
				btn1: "delete",
				btn2: "cancel",
				btn1fn: function() {

					var t = global.i.t;
					var id = global.i.id
					var index = global.i.index;
					var entry = global.i.entry;


					dmRef.doc(t.section).collection("dm").doc(id).delete().then(() => {
						skb("Entry deleted");
					}).catch(e => thr(e));

					if (entry.open === true) {
						dmRef.doc(t.section).collection("players").doc(id).delete().catch(e => thr(e));
					}

					var indexAll = vueInstance.allEntries.indexOf(entry);
					vueInstance.allEntries.splice(indexAll, 1);

					t.entries.splice(index, 1);
				}
			});
		},
		startEdit(entry) {
			var index = this.entries.indexOf(entry);
			var entries = Object.entries(entry);
			for (var i = 0; i < entries.length; ++i) {
				vueInstance.working[entries[i][0]] = entries[i][1];
			}
			this.entries[index].editing = true;
		},
		saveEdit(entry) {
			var index = this.entries.indexOf(entry);
			var push = Object.assign(entry, vueInstance.working);
			var id = entry.__id;
			push.editing = false;
			push.show = false;

			// push.computedDescription = marked(push.description, { sanitize: true });
			// push.computedDmDescription = marked(push.dmDescription, { sanitize: true })

			dmRef.doc(this.section).collection("dm").doc(id).set(push).then(() => {
				skb("Entry updated");
			}).catch(e => thr(e));

			if (push.open === true) {
				dmRef.doc(this.section).collection("players").doc(id).set(push).catch(e => thr(e));
			}


			console.log(index, push);
			push.show = true;
			var entries = Object.entries(push);
			for (var i = 0; i < entries.length; ++i) {
				this.entries[index][entries[i][0]] = entries[i][1];
			}

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
		}
	},
	created: async function() {
		var query = await createQuery(dmRef.doc(this.section).collection("dm").orderBy("name", "asc"));
		if (query.length > 0) {
			this.entries = query;

			vueInstance.allEntries = vueInstance.allEntries.concat(query);
		}
	}
})

var vueInstance = new Vue({
	el: "#vueInstance",
	data: {
		campaignId: "",
		campaignName: "",
		openedSection: "",
		query: "",
		allEntries: [],
		working: {
			name: "",
			subtitle: "",
			description: "",
			dmDescription: ""
		}
	},
	computed: {
		allEntriesQueried() {
			var query = this.query.toLowerCase();
			return this.allEntries.filter(function (item) {
				if (item.name === undefined) {
					return false;
				} else {
					if (item.name.toLowerCase().includes(query) || item.subtitle.toLowerCase().includes(query) || item.description.toLowerCase().includes("\`" + query) || item.dmDescription.toLowerCase().includes("\`" + query)) {
						return true;
					} else {
						return false;
					}
				}
			});
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
		},
		openEntry(entry) {
			var index = this.allEntries.indexOf(entry);
			this.allEntries[index].show = !this.allEntries[index].show;
		}
	}
});

$(".wave.bar.top .section:nth-of-type(1)").addClass("main");
$(".wave.bar.top .section:nth-of-type(2)").addClass("main");

vueInstance.campaignId = global.campaignId;
vueInstance.campaignName = global.campaignName;
