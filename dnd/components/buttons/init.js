$("button.wave--button").each(function(index){
	var iconFront = $(this).attr("icon-left");
	if (iconFront !== undefined) {
		$(this).prepend("<i class='material-icons wave--right'>" + iconFront + "</i>")
	}
	
	var iconBack = $(this).attr("icon-right");
	if (iconBack !== undefined) {
		$(this).append("<i class='material-icons wave--left'>" + iconBack + "</i>")
	}
	
	var icon = $(this).attr("icon");
	if (iconBack === undefined && iconFront === undefined && icon !== undefined) {
		$(this).append("<i class='material-icons wave--center'>" + icon + "</i>")
	}
});