$("input.wave--input").each(function(index){
	$(this).wrap("<div class='wave--input input" + index + "'></div>");
	if ($(this).attr("icon-left") !== undefined) {
		$(".input" + index).prepend("<i class='material-icons'>" + $(this).attr("icon-left") + "</i>")
	}
})