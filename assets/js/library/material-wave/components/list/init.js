elementLoaded("ul.wave > li", function() {
	$("ul.wave > li").each(function() {
		if (!$(this).hasClass("setup")) {
			$(this).addClass("setup");
			if ($(this).addClass("expandable")) {
				$(this).find(".shared").on("click", function() {
					$(this).parent().toggleClass("open");
				})
			}
		}
	});
})
