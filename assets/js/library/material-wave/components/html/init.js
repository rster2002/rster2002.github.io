$("html").append("<div class='waveRuler'></div>");

wave["ruler"] = {
	width: function() {
		return waveRemovePx($(".waveRuler").css("width"));
	},
	height: function() {
		return waveRemovePx($(".waveRuler").css("height"))
	},
	sides: function() {
		var rtrn = {};
		rtrn["height"] = wave.ruler.height();
		rtrn["width"] = wave.ruler.width();
		return rtrn;
	}
}
