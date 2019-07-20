const rangedWeapons = require("./weapons/ranged.json");

var weapons = Object.values(rangedWeapons);
var ammo = {
    magazine: {
        internalName: "magazine",
        name: "Magazine",
        enc: 1,
        tl: 1,
        cost: "N/A",
        equipmentType: "miscItem",
        description: "Used fully to reload any kind of ranged weapon that needs ammo."
    },
    "20bulletBox": {
        internalName: "20bulletBox",
        name: "20-Ammo Box",
        enc: 1,
        tl: 2,
        cost: 10,
        equipmentType: "miscItem",
        shots: 20,
        description: "Used to reload any kind of ranged weapon that needs ammo."
    }
};

weapons.forEach(a => {
    if (a.internalName !== "grenade") {
        ammo["bulletBox-" + a.internalName] = {
            internalName: `bulletBox-${a.internalName}`,
            name: `Ammo Box (${a.name})`,
            enc: 1,
            tl: 2,
            cost: (a.cost / 10) * 20,
            basePrice: a.cost / 10,
            equipmentType: "miscItem",
            shots: 20,
            forWeapon: a.internalName,
            description: `Used to reload a ${a.name.toLowerCase()}`
        }
    }
});

const fs = require("fs");
const path = require("path");

fs.writeFile(path.resolve(process.cwd(), "./misc.json"), JSON.stringify(ammo), () => {console.log("DONE")})