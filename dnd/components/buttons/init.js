$("button.wave--button").each(function(index){
	setupButton(this);
});

function setupButton(here) {
	if (!$(here).hasClass("setup")) {
		var iconFront = $(here).attr("icon-left");
		if (iconFront !== undefined) {
			$(here).prepend("<i class='material-icons wave--right'>" + iconFront + "</i>")
		}

		var iconBack = $(here).attr("icon-right");
		if (iconBack !== undefined) {
			$(here).append("<i class='material-icons wave--left'>" + iconBack + "</i>")
		}

		var icon = $(here).attr("icon");
		if (iconBack === undefined && iconFront === undefined && icon !== undefined) {
			$(here).append("<i class='material-icons wave--center'>" + icon + "</i>")
		}
		
		$(here).addClass("setup");
	}
}

(function( $ ){
   $.fn.button = function() {
	   setupButton(this);
	   return this;
   }; 
})( jQuery );