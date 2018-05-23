waveColor.push(function(color) {
	$("div.wave.background .top").css("background-color", color.base);
});

$(document).ready(() => {
	var temp = $("title").text();
	if (temp !== undefined) {
		title = temp;
	} else {
		title = "Title";
	}
	var rtrnHtml = $("body").html();
	$("body").wrapInner(function() {
		return "<div class='wave background'><div class='header'><h1>" + title + "</h1></div><div class='top'></div><div class='bottom'>" + rtrnHtml + "</div></div>"
	});
});
