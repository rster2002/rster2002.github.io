var text = `Heavy Machine Gun 3d6# 500/2,000 5,000 10 3 Dex 3
Rocket Launcher 3d10 2,000/4,000 4,000 1 2 Dex 3
Demo Charge 3d10 20/40 250 - 1 - 3
Railgun 3d8# 4,000/8,000 8,000 20 * Dex 4
Anti-Vehicle Laser 3d10 2,000/4,000 10,000 15 * Dex 4
Hydra Array 3d6# 4,000/8,000 20,000 10 * Dex 4
Wheatcutter Belt 2d12 10/20 10,000 5 * Dex 4
Vortex Cannon 5d12 1,000/2,000 75,000 5 * Dex 5`;

var descriptions = {
    "Heavy_Machine_Gun": `**_Heavy machine guns_** represent a large family of air- or
water-cooled projectile weapons that are usually fed
with belts of linked ammunition. HMGs require a vehicle mounting or emplaced firing position for effective
results. An HMG magazine contains enough ammunition for 10 rounds of firing, but each round of firing
eats 25 credits worth of projectile ammunition.`,
    "Rocket_Launcher": `**Rocket launchers** cover a wide variety of man-portable missile launchers of varying degrees of sophistication. The weapons are usually equipped with basic
tracking sensors, but are of limited accuracy against human-sized targets. Rocket launchers take a -4 hit penalty against targets of human size or smaller. Unlike most
Heavy weapons, rocket launchers can be shoulder-fired
without a prepared emplacement to support them.`,
    "Demo_Charge": `**_Demo Charges_** are the general run of placed explosives beloved of terrorists and adventurers the world
over. The usual variety can be detonated by radio
signals, timers, or electrical charges, and inflict their
damage on any objects within twenty meters, with an
Evasion saving throw for half damage. Victims within
forty meters take half damage, with an Evasion save
for none. The charge is sufficient to blow a four-meter
wide hole in anything short of a reinforced wall. PCs
with a background in demolitions or Fix-0 skill can
shape the charge so it directs the blast in only one direction, sparing all but two meters of the rest.`,
    "Railgun": `**_Railguns_** are simply scaled-up versions of personal
mag rifles. They accelerate large metallic slugs along
the weapon’s barrel, creating a steady spray of hypervelocity rounds. Ammunition sufficient for one round
of firing costs 50 credits.`,
    "Anti-Vehicle_Laser": `**_Anti-vehicle lasers_** are less useful against soft targets,
but excel at penetrating vehicle armor. Against vehicles
and other hard-skinned targets, damage is rolled twice
and the better result is used.`,
    "Hydra_Array": `**_Hydra arrays_** sequence a number of missile
launchers to fire at once. The gunner designates up to
three targets and can then make three rolls to hit divided among them. Each successful hit on a target allows
the gunner to roll damage once, but only the highest
damage roll is applied to the target. Thus, if all three
volleys were aimed at a single target and two of them
hit, the gunner would roll damage twice and apply the
best result. A volley from the array costs 150 credits.`,
    "Wheatcutter_Belt": `**_Wheatcutter belts_** are one of several different antipersonnel measures often installed on gravtanks and
other fighting vehicles. When triggered, a belt of explosives fires off a scything blast of shrapnel on any side
of the vehicle. All creatures within 10 meters of that
side of the vehicle must make an Evasion save for half
damage. Those within 20 meters take half damage, and
can make an Evasion save to take none at all. Wheatcutter belts do not ignore a vehicle’s Armor like other
Heavy weapons do. Reloading a wheatcutter belt costs
200 credits per round.`,
    "Vortex_Cannon": `**_Vortex cannons_** use controlled gravitic shear planes
to cause a target to simply fall apart into component
fragments. The cannons are silent in operation, but so
heavy and complex that they can only be mounted on
gravtanks and other similar dedicated fighting vehicles.`
}

var lines = text.split("\n");

var weapons = {};

function toNr(a) {

    if (a.includes(",")) {
        a = a.split(",");
        a = a.join("");
    }

    return Number(a);

}

lines.forEach(weapon => {

    weapon = weapon.split(" ");

    let weaponObj = {};

    weaponObj.tl = Number(weapon.pop());
    
    let attr = weapon.pop();
    if (attr === "-") {attr = "None"}
    weaponObj.attr = attr;

    let enc = weapon.pop();
    if (enc === "*") {enc = null};
    weaponObj.enc = enc;

    let mag = weapon.pop();
    if (mag === "-") {mag = null};
    weaponObj.magazine = Number(mag);

    let cost = weapon.pop();
    cost = cost.replace(",", "");
    weaponObj.cost = Number(cost);

    let range = weapon.pop();
    range = range.split("/");
    weaponObj.range = {
        normal: toNr(range[0]),
        max: toNr(range[1])
    }

    let dmg = weapon.pop();
    let fireToSuppress = false;
    if (dmg.includes("#")) {
        fireToSuppress = true;
        dmg = dmg.replace("#", "");
    }

    weapon.fireToSuppress = fireToSuppress;
    weapon.dmg = {
        die: dmg,
        mod: 0
    }

    let name = weapon.join(" ");
    let internalName = weapon.join("_");

    let description = descriptions[internalName];
    description = description.split("\n");
    description = description.join(" ");
    weaponObj.description = description;
    weaponObj.name = name;
    weaponObj.equipmentType = "heavyWeapon";

    weapons[internalName] = weaponObj;

});

const fs = require("fs");
const path = require("path");
const beautify = require("json-beautify");

fs.writeFile(path.resolve(process.cwd(), "../json/weapons/heavy.json"), beautify(weapons, null, 4, 10), err => console.log(err));