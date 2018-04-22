$("p, h1, h2, h3, h4, h5").each(function(index) {
	var icon = $(this).attr("icon");
	if (icon !== undefined) {
		$(this).prepend("<i class='wave--icon material-icons'>" + icon + "</i>");
	}
});