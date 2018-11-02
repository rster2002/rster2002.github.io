$('.head').parallax({imageSrc: './img/header.jpg'});

$(document).ready(() => {
	wave.config({
		path: "../../assets/js/library/material-wave/"
	}).import([
		"elevation"
	]);
});
