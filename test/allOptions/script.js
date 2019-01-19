var array = [1, 2, 3];


function allOptions(array, options) {

	var options = Object.assign({
		includeSelf: false
	}, options);
	console.log(options);

	var rtrn = [];

	array.forEach(a => rtrn.push([a]));

	array.forEach((a, index) => {
		array.forEach((b, upper) => {
			let i = [a];

			if (options.includeSelf === false) {
				if (index !== upper) {
					i.push(b);
					rtrn.push(i);
				}
			} else {
				i.push(b);
				rtrn.push(i);
			}

		})
	});

	rtrn.push(array);
	return rtrn;

}

console.log(allOptions(array));
