var storyRef = firestore.collection("campaigns").doc(global.campaignId).collection("dm").doc("story").collection("chapters");

var vueInstance = new Vue({
	el: "#storyInstance",
	data: {
		currentChapter: {
			name: "",
			description: "",
			closed: false,
			hooks: [],
			__id: "",
			editing: false
		},
		chapters: [],
		openedSection: "",
		loading: false,
		im: ""
	},
	methods: {
		addChapter() {

			this.chapters.push({
				name: "Nameless chapter",
				description: "No description provided",
				closed: false,
				hooks: [],
				__id: genId(),
				editing: true
			});

			skb("Added new chapter");

		},
		openChapter(chapter) {

			$(".wave.bar.top").prepend(`
				<div class="section temp" style="display: none;">
					<button onclick="vueInstance.closeChapter();">
						<i class="material-icons">save</i>
					</button>
				</div>
				<div class="section text temp" style="display: none; width: calc(100% - 128px);">
					<h1>No name</h1>
				</div>
			`);

			if (chapter.name === "") {
				$(".wave.bar.top .section.temp h1").text("No name");
			} else {
				$(".wave.bar.top .section.temp h1").text(chapter.name);
			}

			$(".wave.bar.top .section.main").hide();
			$(".wave.bar.top .section.temp").show();
			$("#chapter").show();

			this.openedSection = chapter.name;

			vuePut(this.currentChapter, chapter);

		},
		closeChapter() {

			var chap = this.chapters.filter(a => {

				console.log(this.currentChapter);
				if (a.__id === this.currentChapter.__id) {
					return true;
				}
			});

			chap = chap[0];

			console.log(chap);

			vuePut(chap, this.currentChapter);

			if (this.currentChapter.editing === true) {
				$(".wave.bar.top .section.temp h1").text(this.currentChapter.name);
				this.currentChapter.editing = false;
			}

			this.currentChapter.hooks.forEach((a, i) => {
				this.currentChapter.hooks[i].opened = false;
				this.currentChapter.hooks[i].editing = false;
			});

			this.currentChapter.opened = false;

			this.loading = true;

			storyRef.doc(this.currentChapter.__id).set(this.currentChapter).then(e => {

				this.openedSection = "";

				$(".wave.bar.top .section.temp").remove();
				$(".wave.bar.top .section.main").show();

				$("#chapter").hide();

				this.loading = false;

			}).catch(e => {
				this.loading = false;
				throw new Error(e);
			});

		},
		deleteChapter() {

			global.t = this;

			global.alert({
				text: "Are you sure you want to delete this chapter and it's hooks?",
				btn1: "delete",
				btn2: "cancel",
				btn1fn: function() {
					t = global.t;

					let id = t.currentChapter.__id;

					t.loading = true;

					var chap = t.chapters.filter(a => {

						console.log(t.currentChapter);
						if (a.__id === t.currentChapter.__id) {
							return true;
						}
					});

					let index = t.chapters.indexOf(chap);

					t.chapters.splice(index, 1);


					storyRef.doc(id).delete().then(e => {
						skb("Chapter deleted");



						t.openedSection = "";

						$(".wave.bar.top .section.temp").remove();
						$(".wave.bar.top .section.main").show();

						$("#chapter").hide();

						t.loading = false;
					}).catch(e => {
						t.loading = false;
						throw new Error(e);
					});
				}
			});
		},
		editChapter() {
			$(".wave.bar.top .section.temp h1").text(this.currentChapter.name);
			this.currentChapter.editing = !this.currentChapter.editing;
		},
		addHook() {
			this.currentChapter.hooks.push({
				name: "Nameless hook",
				description: "No description available",
				opened: false,
				editing: false,
				done: false
			});
		},
		openHook(hook) {
			hook.opened = !hook.opened;
		},
		editHook(hook) {
			hook.editing = !hook.editing;
		},
		deleteHook(hook) {

			global.t = this;

			global.alert({
				text: "Are you sure you want to delete this hook?",
				btn1: "delete",
				btn2: "cancel",
				btn1fn: function() {

					let t = global.t;

					let index = t.currentChapter.hooks.indexOf(hook);
					t.currentChapter.hooks.splice(index, 1);
				}
			})
		},
		toggleClosed(chapter) {
			chapter.closed = !chapter.closed;
		},
		check(hook) {
			hook.done = !hook.done;
		},
		toMarked(a) {
			return marked(a, {sanitize: true});
		},
		exportContent() {
			var content = Object.assign([], this.chapters);

			function download(filename, text) {
				var element = document.createElement('a');
				element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
				element.setAttribute('download', filename);

				element.style.display = 'none';
				document.body.appendChild(element);

				element.click();

				document.body.removeChild(element);
			}

			download("chapters.json", JSON.stringify(content));
		},
		importContent() {
			this.loading = true;
			var content = JSON.parse(vueInstance.im);

			var chapterIds = this.chapters.map(a => a.__id);

			content.forEach(chapter => {

				chapter = Object.assign(chapter, {
					editing: false,
					opened: false
				});

				addChapter = (chapter) => {
					this.chapters.push(chapter);

					this.openChapter(chapter);
					this.closeChapter();
				};

				if (typeof chapter.__id !== "string") {
					chapter.__id = genId();

					addChapter(chapter);
				}

				if (chapterIds.indexOf(chapter.__id) === -1) {
					addChapter(chapter);
				}
			})

		}
	}
});

$(".wave.bar.top .section:nth-of-type(1)").addClass("main");
$(".wave.bar.top .section:nth-of-type(2)").addClass("main");

async function refresh() {
	let query = await createQuery(storyRef);
	console.log(query);
	if (query.length > 0) {
		vueInstance.chapters = query;
	}
}

refresh();
