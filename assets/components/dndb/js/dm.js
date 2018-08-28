console.log("s")

var vueGrid = new Vue({
	el: "#vueGrid",
	data: {
		campaigns: []
	},
	methods: {
		openCampaign(id) {
			sessionStorage.setItem("::open", id);
			openPage("dmDashboard");
		}
	}
})

async function reloadList() {
	$(".card").remove();
	var query = await createQuery(firestore.collection("campaigns").where("DM", "==", uid).orderBy("name", "desc"));
	if (query[0] === undefined) {
		$(".noContent").show();
	} else {
		for (var i = 0; i < query.length; ++i) {
			vueGrid.campaigns.push(query[i]);
			// var campaign = query[i];
			// $("#campaignGrid").append("");
			// $("#campaign" + campaign.id).on("click", function() {
			// 	var id = $(this).attr("id").replace("campaign", "");
			// 	sessionStorage.setItem("::open", id);
			// 	openPage("dmDashboard");
			// });
		}
	}
}

reloadList();
