var vueInstance = new Vue({
	el: "#vueInstance",
	data: {
		campaignId: "",
		campaignName: ""
	},
	methods: {
		openSection(section) {
			$(".wave.bar.top").append(`
				<div class="section temp" style="display: none;">
					<button onclick="vueInstance.closeSection();">
						<i class="material-icons">arrow_back</i>
					</button>
				</div>
				<div class="section text temp" style="display: none; width: calc(100% - 64px);">
					<h1></h1>
				</div>
			`);
			$(".wave.bar.top .section.temp h1").text(section);
			$(".wave.bar.top .section.main").hide();
			$(".wave.bar.top .section.temp").show();
		},
		closeSection() {
			$(".wave.bar.top .section.temp").remove();
			$(".wave.bar.top .section.main").show();
		}
	}
});

$(".wave.bar.top .section").addClass("main");

vueInstance.campaignId = global.campaignId;
vueInstance.campaignName = global.campaignName;
