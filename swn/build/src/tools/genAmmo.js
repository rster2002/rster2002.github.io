var text = `Ammo, 20 rounds 10 1# 2
Ammo, missile 50 1 3
Power cell, type A 10 1# 4
Power cell, type B 100 1 4
Solar recharger 500 3 4
Telekinetic generator 250 2 4`

var descriptions = {
    "Ammo,_20_rounds": `A few worlds are too primitive or too
resource-poor to manufacture ammunition, but
the vast majority of worlds provide cartridges in
almost every conceivable caliber and make. Most
local gunsmiths can load ammunition to any specification required by a buyer`,
    "Ammo,_missile": `Some characters might have reason to pack along a man-portable rocket launcher,
or have one mounted on their favorite gravcar.
Heavy weapons and their ammunition are usually
outlawed for civilians on most worlds, but this
price is for locales where missiles can be bought.`,
    "Power_cell,_type_A": `One of the few standardized artifacts inherited from before the Silence, power cells are
small cylindrical objects designed to take and hold
electrical charges. Type A cells are usually used for
personal equipment, and the larger type B cells
for vehicles and heavy gear. The engineering for
the cells is substantially different, and they cannot
be exchanged or recharge each other without a
trained tech’s modifications or a converter unit.
Power cells can be recharged off a ship’s power
plant or other grid. Recharging requires 30 minutes for a type A cell or 24 hours for a type B cell.`,
    "Power_cell,_type_B": `One of the few standardized artifacts inherited from before the Silence, power cells are
small cylindrical objects designed to take and hold
electrical charges. Type A cells are usually used for
personal equipment, and the larger type B cells
for vehicles and heavy gear. The engineering for
the cells is substantially different, and they cannot
be exchanged or recharge each other without a
trained tech’s modifications or a converter unit.
Power cells can be recharged off a ship’s power
plant or other grid. Recharging requires 30 minutes for a type A cell or 24 hours for a type B cell.`,
    "Solar_recharger": `This recharger unfolds into a 2 meter
by 2 meter square field of solar cells. Granted a
primary star of roughly Earth-like intensity, it can
recharge one type A power cell per day.`,
    "Telekinetic_generator": `While this device assumes the
presence of a trained telekinetic, it isn’t strictly
psitech, as its operation is quite simple. A telekinetic user pushes a resistance bar within the generator, causing a flow of electricity to recharge an
attached power cell. Any telekinetic with Telekinesis-1 skill or better can recharge a cell with fifteen minutes of concentration. In an emergency, a
character with at least Strength 10 can operate the
generator manually, though they need to succeed
on a difficulty 8 Con/Exert skill check in order to
keep up the pace for an hour. Failure means that
the character must rest for at least an hour before
trying again. The generator can charge one type
A power cell at a time.`
}

var ammoTypes = {
    "Ammo,_20_rounds": "bullet",
    "Ammo,_missile": "rocket",
    "Power_cell,_type_A": "powercellA",
    "Power_cell,_type_B": "powercellB",
    "Solar_recharger": "rechargeA",
    "Telekinetic_generator": "rechargeA"
}

function toNr(a) {

    if (a.includes(",")) {
        a = a.split(",");
        a = a.join("");
    }

    return Number(a);

}

var lines = text.split("\n");
var ammoEntries = {};

lines.forEach(ammo => {

    ammo = ammo.split(" ");

    let ammoObj = {};
    let shouldGroup =  false;

    ammoObj.tl = Number(ammo.pop());

    let enc = ammo.pop();
    if (enc.includes("#")) {
        shouldGroup = true;
        enc = enc.replace("#", "");
    }
    ammoObj.enc = Number(enc);

    ammoObj.cost = toNr(ammo.pop());

    let name = ammo.join(" ");
    let internalName = ammo.join("_");

    ammoObj.descriptions = descriptions[internalName];
    ammoObj.internalName = internalName;
    ammoObj.name = name;
    ammoObj.equipmentType = "ammo";
    ammoObj.ammoType = ammoTypes[internalName];

    ammoEntries[internalName] = ammoObj;

    if (shouldGroup) {
        let packageName = `Package (${ammoObj.name})`;
        let internalName = `packet-${ammoObj.internalName}`;
        
        ammoEntries[internalName] = {
            name: packageName,
            internalName: internalName,
            equipmentType: "package",
            packageType: "ammo",
            enc: 1,
            cost: ammoObj.cost * 3,
            tl: ammoObj.tl,
            contents: [
                ammoObj,
                ammoObj,
                ammoObj
            ]
        }
    }
});

const fs = require("fs");
const path = require("path");
const beautify = require("json-beautify");

fs.writeFile(path.resolve(process.cwd(), "../json/ammo.json"), beautify(ammoEntries, null, 4, 10), err => console.log(err));