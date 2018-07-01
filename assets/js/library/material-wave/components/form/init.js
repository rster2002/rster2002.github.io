(function( $ ){
	$.fn.getValues = function() {
		var rtrn = {};
		var autoKey = 0;
		function getKey(here) {
			var key = $(here).attr("key");
			if (key === undefined) {
				key = autoKey;
				autoKey += 1;
			}
			return key;
		}

		$(this).find("input:text").each(function() {
			var key = getKey(this)
			rtrn[key] = $(this).val();
		});

		$(this).find("input:checkbox").each(function() {
			var key = getKey(this);
			rtrn[key] = $(this).is(":checked");
		});

		return rtrn;
	};
})( jQuery );
