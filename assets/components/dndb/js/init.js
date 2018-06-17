$(document).ready(() => {
	wave.config({
		path: "../assets/js/library/material-wave/"
	}).import([
		"shadow",
		"buttons",
		"select",
		"dialog"
	]).then(() => {
		wave.engine((engine) => {
			engine.custom(".fab", (comp) => {
				comp.corners([
					{
						"place": "bottomLeft",
						"shape": "cut",
						"size": "1vh"
					},
					{
						"place": "bottomRight",
						"shape": "cut",
						"size": "1vh"
					}
				]);
			});
		});
	});
})
