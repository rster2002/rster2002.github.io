(function( $ ){
	$.fn.getValues = function(type) {
		var rtrn;
		var autoKey = 0;

		if (type === "array") {
			rtrn = [];
		} else {
			rtrn = {};
		}

		function getKey(here) {
			var key = $(here).attr("key");
			if (key === undefined) {
				key = autoKey;
				autoKey += 1;
			}
			return key;
		}

		function addToRtrn(key, value) {
			if (type === "array") {
				var obj = {};
				obj["key"] = key;
				obj["value"] = value;
				rtrn.push(obj);
			} else {
				rtrn["key"] = value;
			}
		}

		$(this).find("input:text").each(function() {
			var key = getKey(this);
			var value = $(this).val();
			addToRtrn(key, value);
		});

		$(this).find("input:checkbox").each(function() {
			var key = getKey(this);
			var value = $(this).is(":checked");
			addToRtrn(key, value);
		});

		return rtrn;
	};
})( jQuery );
