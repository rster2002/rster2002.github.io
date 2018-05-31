$("div.wave.card").each(function(index) {
	$(this).wrap("<div class='wave--placer' id='cardWrapper" + index + "'></div>");
	$(this).attr("id", "card" + index);
	var size = $(this).attr("size");
	if (size === undefined) {
		s = 1;
	} else {
		s = Number(size);
	}
	var head = $(this).children(".head");
	var icon = head.children("icon");
	var c = icon.text();
	icon.wrap("<div class='icon--wrapper'><i class='material-icons'></i></div>");
	var action = $(this).children(".action");
	action.wrap("<div class='action--wrapper'></div>");
	action.wrapInner("<p></p>");
	
	if (s === 1) {
		$("#card" + index).css("width", "80%");
		$("#cardWrapper" + index).css("width", "25%");
	} else if (s === 2) {
		$("#card" + index).css("width", "90%");
		$("#cardWrapper" + index).css("width", "50%");
	} else if (s === 3) {
		$("#card" + index).css("width", "93%");
		$("#cardWrapper" + index).css("width", "75%");
	} else if (s === 4) {
		$("#card" + index).css("width", "95%");
		$("#cardWrapper" + index).css("width", "100%");
	}
});