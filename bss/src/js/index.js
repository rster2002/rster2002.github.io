function highlight(text) {

	var words = text.split(" ");
	var rtrn = [];
	var first = false;

	words.forEach(a => {

		if (a === "{{") {
			rtrn.push(`<span class="bssexpression">{{`);
		} else if (a === "}}") {
			rtrn.push(`}}</span>`);
		} else if (!isNaN(a)) {
			rtrn.push(`<span class="number">${a}</span>`)
		} else if (a === "=" || a === "+" || a === "-" || a === "*" || a === "/" || a === "+=" || a === "-=" || a === "*=" || a === "/=" || a === "%=" || a === "%" || a === "=>") {
			rtrn.push(`<span class="handeler">${a}</span>`);
		} else {
			if (!first) {
				rtrn.push(`<span class="bsscommand">${a}</span>`);
				first = true;
			} else {
				rtrn.push(`<span class="">${a}</span>`);
			}
		}

	});

	return rtrn.join(" ") + "<br/>";

}
