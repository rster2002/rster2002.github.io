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
})
