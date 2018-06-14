var inputCounter = 0;
$("input.wave").each((index, item) => {
	console.log(item, index);
	if ($(item).attr("type") !== "checkbox") {
		inputCounter += 1;
		var pla = $(item).attr("placeholder");
		$(item).wrap("<div class='wave--input'></div>");
		if (pla !== undefined && $(item).hasClass("simple") !== true) {
			$(item).parent(".wave--input").prepend("<p>" + pla + "</p>");
			$(item).attr("placeholder", "");
		}
		$(item).parent(".wave--input").append("<div class='bar'><div class='color'></div></div>");
		$(item).parent(".wave--input").css("margin-top", "3%");
		$(item).parent(".wave--input").attr("id", "wave--input-" + inputCounter);
		console.log("#wave--input-" + inputCounter);
	}
});

setTimeout(() => {
	for (var i = 0; i <= inputCounter; ++i) {
		processInput(i);
	}
}, 100);

function processInput(i) {
	var selector = "#wave--input-" + i;
	if (i > 0) {
		$(selector).on("click", () => {
			console.log("Hello World");
			$("#wave--input-" + i + " input").focus();
		});

		$(selector + " input").focusin(() => {
			console.log("fire");
			$(selector + " p").addClass("move");
			$(selector + " .bar .color").addClass("show");
		});

		$(selector + " input").focusout(() => {
			var v = $(selector + " input").val();
			if (v === "") {
				$(selector + " p").removeClass("move");
				$(selector + " .bar .color").removeClass("show");
			}
		});
	}
}
