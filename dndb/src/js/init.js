$(document).ready(() => {
	wave.config({
		path: "../assets/js/library/material-wave/"
	}).import([
		"shadow",
		"buttons",
		"select",
		"dialog",
		"menu",
		"bar",
		"card",
		"grid",
		"elevation",
		"form"
	]).color({
		action: "rgb(0,128,255)"
	});
});

// if (navigator.serviceWorker) {
// 	navigator.serviceWorker.register("./src/js/serviceWorker.js").then(function(e) {
// 		console.log("Service worker registered with scope: ", e.scope);
// 	})
// }
