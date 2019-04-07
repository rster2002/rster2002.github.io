var text = `
Primitive Bow 1d6 50/75 15 1 Dex 2 1
Advanced Bow 1d6 100/150 50 1 Dex 2 3
Conversion Bow 1d8 150/300 500 1 Dex 2 4
Grenade 2d6 10/30 25 N/A Dex 1 3
Crude Pistol 1d6 5/15 20 1@ Dex 1 2
Musket 1d12 25/50 30 1@ Dex 2 2
Revolver 1d8 30/100 50 6 Dex 1 2
Rifle 1d10+2 200/400 75 6 Dex 2 2
Shotgun 3d4 10/30 50 2 Dex 2 2
Semi-Auto Pistol 1d6+1 30/100 75 12 Dex 1 3
Submachine Gun 1d8* 30/100 200 20 Dex 1 3
Combat Rifle 1d12* 100/300 300 30 Dex 2 3
Combat Shotgun 3d4* 10/30 300 12 Dex 2 3
Sniper Rifle 2d8 1,000/2,000 400 1 Dex 2 3
Void Carbine 2d6 100/300 400 10 Dex 2 4
Mag Pistol 2d6+2 100/300 400 6 Dex 1 4
Mag Rifle 2d8+2 300/600 500 10 Dex 2 4
Spike Thrower 3d8* 20/40 600 15 Dex 2 4
Laser Pistol 1d6 100/300 200 10 Dex 1 4
Laser Rifle 1d10* 300/500 300 20 Dex 2 4
Thermal Pistol 2d6 25/50 300 5 Dex 1 4
Plasma Projector 2d8 50/100 400 6 Dex 2 4
Shear Rifle 2d8* 100/300 600 10 Dex 2 5
Thunder Gun 2d10 100/300 1,000 6 Dex 2 5
Distortion Cannon 2d12 100/300 1,250 6 Dex 2 5`


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