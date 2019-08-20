var text = `Small primitive weapon 1d4 1 point/AC 15 Str/Dex 0 1 0
Medium primitive weapon 1d6+1 2 points/AC 13 Str/Dex 20 1 0
Large primitive weapon 1d8+1 2 points/AC 15 Str 30 2 0
Small advanced weapon 1d6 1 point/AC 15 Str/Dex 40 1 4
Medium advanced weapon 1d8+1 2 points/AC 13 Str/Dex 60 1 4
Large advanced weapon 1d10+1 2 points/AC 15 Str 80 2 4
Stun baton 1d8 1 point/AC 15 Str/Dex 50 1 4
Suit ripper 1d6 None Str/Dex 75 1 4
Unarmed attack 1d2 None Str/Dex - - -`;

var lines = text.split("\n");
var weapons = {};

lines.forEach(weapon => {

    var weaponObj = {
        equipmentType: "meleeWeapon"
    };
    weapon = weapon.split(" ");

    let tl = weapon.pop();
    weaponObj.tl = tl === "-" ? null : Number(tl);

    let enc = weapon.pop();
    weaponObj.enc = enc === "-" ? null : Number(enc);

    let cost = weapon.pop();
    weaponObj.cost = cost === "-" ? null : Number(cost);

    weaponObj.attr = weapon.pop();

    let shock = weapon.pop();

    if (shock !== "None") {
        let shockAc  = shock;
        weapon.pop();
        let shockDmg = weapon.pop();

        weaponObj.shock = {
            ac: shockAc,
            dmg: shockDmg
        }
    } else {
        weaponObj.shock = null;
    }

    let dmg = weapon.pop();
    if (dmg.includes("+")) {
        dmg = dmg.split("+");

        weaponObj.dmg = {
            die: dmg[0],
            mod: Number(dmg[1])
        };

    } else {
        weaponObj.dmg = {
            die: dmg,
            mod: 0
        };
    }

    let name = weapon.join(" ");
    let internalName = weapon.join("_");

    weaponObj.name = name;
    weaponObj.internalName = internalName;

    weapons[internalName] = weaponObj;

});

const fs = require("fs");
const path = require("path");

fs.writeFile(path.resolve(process.cwd(), "./export.json"), JSON.stringify(weapons), err => console.log(err));