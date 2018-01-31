(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-102147810-1', 'auto');
ga('send', 'pageview');

function logout() {
	localStorage.removeItem("firebaseui::rememberedAccounts");
	location.href="../dnd.html";
}

loader = {
	show: function() {
		$(".loader-background").show();
		$(".loader").show();
	},
	hide: function() {
		$(".loader-background").hide();
		$(".loader").hide();
	}
}

function openPage(page) {
	loader.show();
	$(".innerPage").remove();
	$(".page").load("../assets/components/dnd/pages/" + page + ".html");
	loader.hide();
}

function cal(number) {
	var i = roundDown(number);
	var r = i;
	return r;
}

function roundDown(number) {
	var i = String(number);
	var r = i.split(".");
	return Number(r[0]);
}

function getSelected(selector) {
	var e = document.getElementById("selector");
	return e.options[e.selectedIndex].text;
}

function error(error) {
	
	loader.hide();
	
	$("#error").text(error);
	$(".error-background").fadeIn();
	ga('send', 'event', "dnd-error", error);
}

function closeError() {
	$(".error-background").fadeOut();
}