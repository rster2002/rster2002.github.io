function toMod(a) {
    // Used to convert a number to a modifier
    if (a >= 0) {
        return "+" + a;
    } else {
        return a;
    }
}

function attackBonus(item) {
    var skill, skillBonus, attr;

    // Checks what type of weapon is used and stores the relavant score
    if (item.equipmentType === "rangedWeapon") {
        skill = this.c.skills.shoot;
    } else if (item.equipmentType === "meleeWeapon") {
        skill = this.c.skills[item.skill];
    }

    // Checks whether of not the character is trained in the relavant score, and if not: apply an -2 penalty
    if (skill.trained === false) {
        skillBonus = -2;
    } else {
        skillBonus = skill.lvl;
    }

    // Checks what attribute to use
    if (item.attr === "Str/Dex") {
        // Gets the highest of Strength of Dexterity
        attr = this.c.attributes.str;

        if (this.c.attributes.dex > attr) {
            attr = this.c.attributes.dex;
        }
    } else if (item.attr === "Str") {
        // Returns Strength
        attr = this.c.attributes.str;
    } else if (item.attr === "Dex") {
        // Return Dexterity
        attr = this.c.attributes.dex;
    } else if (item.attr === "None") {
        attr = "None";
    }

    // Checks whether or not the item can be used to make an attack
    if (attr !== "None") {
        // The total modifier is half of the characters level (rounded down) + their skill bonus (or penalty) + their relavant attribute modifier + the characters base attack bonus
        return toMod(Math.floor(this.level / 2) + skillBonus + this.calMod(attr) + Number(this.c.attackBonus));
    } else {
        return "—";
    }
}

export {
    attackBonus
}