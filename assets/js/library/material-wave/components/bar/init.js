// $("body").prepend("<div class='wave pusher top'></div>");
var waveSections = 0;

$(".wave.top.bar").find("button").each(function() {
	if (!$(this).hasClass("setupBarDone")) {
		waveSections += 1;
		$(this).wrap("<div class='section'></div>");
		$(this).wrapInner("<i class='material-icons'></div>");
		if ($(this).hasClass("right")) {
			$(this).parent().css("float", "right");
		}
	}
});

$(".wave.top.bar").find("img").each(function() {
	if (!$(this).hasClass("setupBarDone")) {
		waveSections += 1;
		$(this).wrap("<div class='section'></div>");
		if ($(this).hasClass("right")) {
			$(this).parent().css("float", "right");
		}
	}
});

$(".wave.top.bar").find("h1").each(function() {
	if (!$(this).hasClass("setupBarDone")) {
		$(this).wrap("<div class='section text'></div>");
		$(this).parent().css("width", "calc(100% - " + (64 * waveSections) + "px)");
	}
})

var colorFunction = function(color) {
	if (typeof color.primary === "object") {
		$(".wave.top.bar").css("background-color", color["primary"]["back"]);
		$(".wave.top.bar button i").css("color", color["primary"]["front"]);
		$(".wave.top.bar h1").css("color", color["primary"]["front"]);
	} else {
		$(".wave.top.bar").css("background-color", color.primary);
	}
}

waveColor.push(colorFunction);

waveEngineComponents["bar"] = function(fn) {
	activeComp = "bar";
	fn(waveModulator);
};
waveEngineSettings["bar"] = {
	changable: ".wave.bar.top"
};

waveGlobalSettings.push({
	"corners": function(a) {
		if (a.shape === "rounded") {
			$(".wave.bar.top").css("border-bottom-right-radius", a.size);
			$(".wave.bar.top").css("border-bottom-left-radius", a.size);
		}
	}
})
