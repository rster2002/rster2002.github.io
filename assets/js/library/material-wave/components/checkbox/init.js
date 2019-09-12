waveColor.push((color) => {
	$(".wave.checkbox").css("border", color.action + " solid 2px");
	waveCheckboxColor = color.action;
});
waveCheckboxes = 0;

elementLoaded("input.wave:checkbox", () => {
	function waveCreateCheckboxes()
});

waveCreateCheckboxes = function() {
	$("input:checkbox.wave").each((index, item) => {
		if (!$(item).hasClass("setup")) {
			waveCheckboxes += 1;
			waveSetupCheckbox(item, waveCheckboxes);
		}
	});
}

function waveSetupCheckbox(here, ii) {
	$(here).addClass("setup");
	$(here).hide();
	$(here).wrap("<div class='wave checkbox' id='checkbox" + ii + "'></div>");
	// $(item).attr("id", "checkbox" + waveCheckboxes);
	waveCheckboxesAddInput(ii);
}

function waveCheckboxesAddInput(i) {
	var s = "#checkbox" + i;
	if ($(s).parent().hasClass("radio")) {
		$(s).append("<i class='material-icons'>lens</i>")
	} else {
		$(s).append("<i class='material-icons'>check</i>")
	}
	if ($(s).parent().hasClass("radio")) {
		$(s).on("click", () => {
			$(s).parent().children(".wave.checkbox").each((index, k) => {
				if ($(k).attr("id") !== s) {
					$(k).children("i").removeClass("checked");
					$(k).children("input:checkbox").attr("checked", false);
					$(k).removeClass("checked");
					$(k).css("background-color", "transparent");
				}
			})
		});
	}
	$(s).on("click", () => {
		if ($(s).hasClass("checked")) {
			$(s).children("i").removeClass("checked");
			$(s).children("input:checkbox").attr("checked", false);
			setTimeout(() => {
				$(s).removeClass("checked");
				$(s).css("background-color", "transparent");
			}, 100);
		} else {
			$(s).addClass("checked");
			$(s).children("input:checkbox").attr("checked", true);
			$(s).css("background-color", waveCheckboxColor);
			setTimeout(() => {
				$(s).children("i").addClass("checked");
			}, 50);
		}
	});

}
