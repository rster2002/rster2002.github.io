pages = {
	1: 106,
	2: 16,
	3: 214
}

focused;

function inspectInputs() {
	fo(function(id) {
		alert(id);
	});
}

function fo(fn) {
	characterObj = {};
	focused = fn;
	for (var page = 0; page <= 3; ++page) {
		if (page > 0) {
			for (var i = 0; i <= pages[page]; ++i) {
				if (i > 0) {
					let selector = "form" + i + "_" + page;
					let element = document.getElementById(selector);

					let tag = element.tagName

					if (tag === "INPUT" || "TEXTAREA") {
						element.setAttribute("onfocus", "focused('" + selector + "')")
					}
				}
			}
		}
	}
}

function s() {
	characterObj = {};
	for (var page = 0; page <= 3; ++page) {
		if (page > 0) {
			for (var i = 0; i <= pages[page]; ++i) {
				if (i > 0) {
					var obj = $("#form" + i + "_" + page);
					if (obj.is("input")) {
						if (obj.is(":text")) {
							characterObj[i + "_" + page] = $(obj).val();
						}
					} else if (obj.is("textarea")) {
						characterObj[i + "_" + page] = $(obj).val();
					} else if ($("input#form" + i + "_" + page).is(":checkbox")) {
						characterObj[i + "_" + page] = $("input#form" + i + "_" + page).is(":checked");
					}
				}
			}
		}
	}
}

function l(characterObj) {
	for (var page = 0; page <= 3; ++page) {
		if (page > 0) {
			for (var i = 0; i <= pages[page]; ++i) {
				if (i > 0) {
					var obj = $("#form" + i + "_" + page);
					if (obj.is("input")) {
						if (obj.is(":text")) {
							$("input#form" + i + "_" + page).val(characterObj[i + "_" + page]);
						}
					} else if (obj.is("textarea")) {
						$("textarea#form" + i + "_" + page).val(characterObj[i + "_" + page]);
					} else if ($("input#form" + i + "_" + page).is(":checkbox")) {
						if (characterObj[i + "_" + page]) {
							$("input#form" + i + "_" + page).prop("checked",true);
							$("img#form" + i + "_" + page).attr("src","./src/pages/characterSheet/1/form/3011 0 ROn.png");
						}
					}
				}
			}
		}
	}
}

function lDisabled(characterObj) {
	for (var page = 0; page <= 3; ++page) {
		if (page > 0) {
			for (var i = 0; i <= pages[page]; ++i) {
				if (i > 0) {
					var obj = $("#form" + i + "_" + page);
					if (obj.is("input")) {
						if (obj.is(":text")) {
							$("input#form" + i + "_" + page).val(characterObj[i + "_" + page]);
							$("input#form" + i + "_" + page).attr("disabled","disabled");
						}
					} else if (obj.is("textarea")) {
						$("textarea#form" + i + "_" + page).val(characterObj[i + "_" + page]);
						$("textarea#form" + i + "_" + page).attr("disabled","disabled");
					} else if ($("input#form" + i + "_" + page).is(":checkbox")) {
						if (characterObj[i + "_" + page] === true) {
							$("input#form" + i + "_" + page).prop("checked",true);
							$("img#form" + i + "_" + page).attr("src","./src/pages/characterSheet/1/form/3011 0 ROn.png");
						} else {
							$("input#form" + i + "_" + page).prop("checked",false);
							$("img#form" + i + "_" + page).attr("src","./src/pages/characterSheet/1/form/3015 0 ROff.png");
						}
					}
				}
			}
		}
	}
}
