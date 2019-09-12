var colorFunction = function(color) {
	$("div.wave.card > div.actions button").css("color", color.action);
}

waveColor.unshift(colorFunction);
waveEngineComponents["card"] = function(fn) {
	activeComp = "card";
	fn(waveModulator);
};
waveEngineSettings["card"] = {
	changable: "div.wave.card"
};

waveGlobalSettings.push({
	"corners": function(a) {
		if (a.shape === "rounded") {
			$("div.wave.card").css("border-radius", a.size);
			$("div.wave.card > div.actions button").css("border-radius", a.size);
		}
	}
})
