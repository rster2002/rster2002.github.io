var colorFunction = function(color) {
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

			if (!$(this).hasClass("icon")) {
				var t = $(this).text();
				var rtrnt = t.toUpperCase();
				$(this).text(rtrnt);
			} else {
				var t = $(this).text();
				var rtrnt = "<i class='material-icons'>" + t + "</i>";
				$(this).html(rtrnt);
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
console.log(waveEngineComponents);
waveEngineComponents["buttons"] = function(fn) {
	activeComp = "buttons";
	fn(waveModulator);
};
waveEngineSettings["buttons"] = {
	changable: "button.wave"
};
