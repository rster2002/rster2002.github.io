var text = `
primative
Shield 13/+1 bonus 10 2 0
Leather jacks, thick hides, quilted armor 13 10 1 0
Cuirass, brigandine, linothorax, half-plate 15 50 1 1
Full plate, layered mail 17 100 2 1*-
street
Warpaint 12 300 0 4
Armored Undersuit 13 600 0 4
Secure Clothing 13 300 1 4
Armored Vacc Suit 13 400 2 4
Deflector Array 18 30,000 0 5*-
combat
Force Pavis 15/+1 bonus 10,000 1 5
Security Armor 14 700 1 4
Woven Body Armor 15 400 2 3
Combat Field Uniform 16 1,000 1 4
Icarus Harness 16 8,000 1 4*-
powered
Vestimentum 18 15,000 0 5
Assault Suit 18 10,000 2 4
Storm Armor 19 20,000 2 5
Field Emitter Panoply 20 40,000 1 5`


var obj = {};

function replaceAll(c, a, b) {
	let temp = c.split(a);
	temp = temp.join(b);
	return temp;
}

var sections = text.split("*-");
console.log(sections);

sections.forEach(s => {
	var rows = s.split("\n");

	rows.shift();
	var type = rows.shift();
	console.log(rows, type);

	rows.forEach(a => {
		console.log(a);
		a = a.replace(" bonus", "");
		a = a.split(" ");
		let tl = a.pop();
		let enc = a.pop();
		let cost = replaceAll(a.pop(), ",", "");
		let bonus = 0;
		let ac = a.pop();
		let name = a.join(" ");
		if (ac.includes("/")) {
			ac = ac.split("/");
			bonus = Number(replaceAll(ac[1], "+", ""));
			ac = Number(ac[0]);
		} else {
			ac = Number(ac);
		}

		let internalName = replaceAll(name.toLowerCase(), " ", "_");

		obj[internalName] = {
			tl: Number(tl),
			enc: Number(enc),
			cost: Number(cost),
			internalName,
			bonus,
			ac,
			name,
			type,
			equipmentType: "armor"
		}
	});
});

console.log(JSON.stringify(obj));
