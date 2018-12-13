var vueInstance = new Vue({
	el: "#storyInstance",
	data: {
		currentChapter: {
			name: ""
		},
		chapters: [],
		openedSection: ""
	},
	methods: {
		addChapter() {
			this.chapters.push({
				name: "",
				description: "",
				closed: false,
				entries: []
			});

			skb("Added chapter");
		},
		openChapter(chapter) {
			$(".wave.bar.top").prepend(`
				<div class="section temp" style="display: none;">
					<button onclick="vueInstance.closeChapter();">
						<i class="material-icons">arrow_back</i>
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

			this.currentChapter.name = chapter.name;
		},
		closeChapter() {
			$(".wave.bar.top .section.temp").remove();
			$(".wave.bar.top .section.main").show();
			$("#chapter").hide();
		}
	}
});

$(".wave.bar.top .section:nth-of-type(1)").addClass("main");
$(".wave.bar.top .section:nth-of-type(2)").addClass("main");
