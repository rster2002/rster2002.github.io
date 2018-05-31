function toggleSidenav() {
	$("div.wave--sidenavWrapper").toggleClass("show");
	$("div.wave--sidenav").toggleClass("open");
}

function closeSidenav() {
	$("div.wave--sidenavWrapper").removeClass("show");
	$("div.wave--sidenav").removeClass("open");
}

function setUserinfo(username, usericon) {
	$(".wave--sidenav .userinfo .username").text(username);
	$(".wave--sidenav .userinfo .usericon").attr("src", usericon);
}

$("div.wave--sidenav").wrap("<div class='wave--sidenavWrapper'></div>");
$("div.wave--sidenavWrapper").append("<div class='wave--invisible' onclick='closeSidenav();'></div>");
$("div.wave--sidenav .userinfo").wrapInner("<div class='pos'></div>");
$("div.wave--sidenav .items button").wrapInner("<div class='p'></div>");
$("div.wave--sidenav .items button .p").wrapInner("<p></p>");

$("div.wave--sidenav .items button").each(function() {
	var icon = $(this).attr("icon");
	if (icon !== undefined) {
		$(this).prepend("<div class='i'><i class='material-icons'>" + icon + "</i></div>");
	}
});