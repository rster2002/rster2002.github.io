var vueInstance;
$(document).ready(function() {
	vueInstance = new Vue({
		el: "#vueApp",
		data: {
			status: "",
			info: "",
			styling: {
				color: "#000000"
			}
		}
	});
});

console.log("Hello WOrold")

firestore.onSnapshot(e => {
	let d = e.data();
	if (d.status === "online") {
		vueInstance.styling.color = "#30f30f";
	} else {
		vueInstance.styling.color = "#ff3030"
	}

	vueInstance.status = d.status;
	vueInstance.info = d.info;
	vueInstance.lastUpdated = d.lastUpdated;
});
