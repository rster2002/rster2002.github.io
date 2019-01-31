Array.prototype.isolate = function(first, second) {

    let temp = [];

	console.log(first, second)

    this.forEach((a, i) => {

		console.log(a, i);

        if (i >= first && i <= second) {
			console.log("Pushed")
            temp.push(a);
        }
    });

    return temp;

}

Array.prototype.flatten = function() {

    let temp = [];

    this.forEach(a => {

        if (typeof a === "object" && Array.isArray(a)) {

            temp = temp.concat(a);

        }

    });

    return temp;

}

function isolate(input, boundries) {


	boundries = boundries.split("...");

	var firstLookup = boundries[0];
	var secondLookup = boundries[1];
    var words = input.split(" ");

	console.log(words);

    words = words.map(a => {

        let i = a.split(",");

        return i;

    });

	console.log(words);

    words = words.flatten();


	var firstBound;
    var secondBound;

    console.log(words);

	let temp = [];

	words.forEach(a => {
		if (a !== "") {
			temp.push(a);
		}
	});

	words = temp;

    words.forEach((a, i) => {
        if (a.includes(firstLookup)) {
            firstBound = i;
        } else if (a.includes(secondLookup)) {
            secondBound = i;
        }
    });

	console.log(firstBound, secondBound);

	temp = [];

	words.forEach(a => {

		a = a.replace(firstLookup, "");
		a = a.replace(secondLookup, "");

		temp.push(a);

	});

	words = temp;

	console.log(words);

    words = words.isolate(firstBound, secondBound);

	temp = [];

	words.forEach(a => {

		if (a !== "") {
			temp.push(a);
		}

	});

	words = temp;

    return words;

}

console.log(isolate(input, "(...)"));
