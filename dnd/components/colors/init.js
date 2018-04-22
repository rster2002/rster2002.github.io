$("*").each(function(index) {
	var val = $(this).attr("color-egg");
	if (val !== undefined) {
		var colorEgg = val.split(" ");

		var color = [];
		for (var i = 0; i < colorEgg.length; ++i) {
			var check = colorEgg[i];
			if (check !== "") {
				color.push(check);
			}
		}
		
		if (color[0].includes("#") && color[1] === "->" && color[2].includes("#")) {
			var s = $(this).attr("style");
			s+= "background-color: " + color[2] + "; background-image: linear-gradient(315deg, " + color[2] + " 0%, " + color[0] + " 74%);";
			$(this).attr("style", s);
		}
	}
});

//background-color: #eec0c6;
//background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
