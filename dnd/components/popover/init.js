(function( $ ){
   $.fn.popover = function(o) {
	   	if (o !== undefined && o.title !== undefined && o.content !== undefined) {
			$(this).attr("popover", "");
			$(this).attr("popover-title", o.title);
			$(this).attr("popover-content", o.content);
			
			popoverSetup(this);
		}
		return this;
   }; 
})( jQuery );

function strip(d) {
	var e = d.replace("px", "");
	var r = Number(e);
	return r;
}

$("*").each(function() {
	popoverSetup(this);
});

function popoverSetup(self) {
	if (!$(self).hasClass("setup")) {
		var attr = $(self).attr("popover");
		if (attr !== undefined) {
			var title = $(self).attr("popover-title");
			var content = $(self).attr("popover-content");

			$(self).on("mouseenter", function() {
				openPopover(title, content, self);
			});

			$(self).on("mouseleave", function() {
				closePopover(this);
			});
			
			$(self).addClass("setup");
		}
	}
}

function openPopover(title, content, here) {
	$(here).parent().append("<div class='wave--popover'><div class='title'><h1 class='titleContent'>TITLE</h1></div><div class='content'><p class='contentContent'>CONTENT CONTENT</p></div></div>");
	
	var offset = $(here).position();
	var left = (offset.left) + (.5 * strip($(here).css("width"))) - (.5 * strip($(".wave--popover").css("width")));
	var top = (offset.top) - (strip($(".wave--popover").css("height"))) - 10;
	var pos = {};

	pos["top"] = top;
	pos["left"] = left;
	
	$(".wave--popover .title .titleContent").text(title);
	$(".wave--popover .content .contentContent").text(content);
	$(".wave--popover").css("top", pos["top"] + "px");
	$(".wave--popover").css("left", pos["left"] + "px");
	$(".wave--popover").addClass("open");
}

function closePopover(here) {
	$(".wave--popover").removeClass("open");
	$(".wave--popover").remove();
}