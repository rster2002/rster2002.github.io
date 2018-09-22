$(document).ready(() => {
	wave.config({
		path: "../assets/js/library/material-wave/"
	}).import([
		"elevation"
	]).color({
		action: "rgb(0,128,255)"
	});
});

if (localStorage.getItem("firebaseui::rememberedAccounts")) {
	location.href = "../assets/components/dnd/login.html";
}
