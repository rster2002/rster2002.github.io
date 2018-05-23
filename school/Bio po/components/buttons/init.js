var colorFunction = function(color) {
	console.log(color);
	$("button.wave.flat").css("color", color.action);
	$("button.wave.prime").css("background-color", color.action);
}

elementLoaded("button.wave", function(here) {
	$("button.wave").each(function() {
		if (!$(this).hasClass("setup")) {
			if (!$(this).hasClass("prime")) {
				$(this).addClass("flat");
			}
			$(this).addClass("setup");
		}
	})
});

waveColor.unshift(colorFunction);
