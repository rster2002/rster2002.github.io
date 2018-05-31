$("html").scroll(function () {
	var scrolled = $(".innerPage").scrollTop();
	var bar = $(".menubar");
	if (scrolled === 0) {
		if (bar.hasClass("floating")) {
			bar.removeClass("floating");
		}
	} else if (scrolled > 0) {
		if (!bar.hasClass("floating")) {
			bar.addClass("floating")
		}
	}
});
