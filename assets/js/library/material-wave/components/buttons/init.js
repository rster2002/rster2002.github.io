var colorFunction = function(color) {
	console.log(color);
	$("button.wave.flat").css("color", color.action);
	$("button.wave.prime").css("background-color", color.action);
}

elementLoaded("button.wave", function(here) {
	$("button.wave").each(function() {
		if ($(this).hasClass("setup") !== true) {
			$(this).addClass("setup");
			if (!$(this).hasClass("prime")) {
				$(this).addClass("flat");
			}

			if ($(this).attr("icon-right") !== undefined) {
				$(this).append("<i class='material-icons right'>" + $(this).attr("icon-right") + "</i>")
			}

			if ($(this).attr("icon-left") !== undefined) {
				$(this).append("<i class='material-icons left'>" + $(this).attr("icon-left") + "</i>")
			}
		}
	})
});

waveColor.unshift(colorFunction);
