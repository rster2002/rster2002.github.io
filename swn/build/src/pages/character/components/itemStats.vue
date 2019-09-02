<template>
    <div>
        <div class="row">
            <div class="stat">
                <div class="mod">
                    <h1 v-if="item.cost !== null">{{ item.cost }}c</h1>
                    <h1 v-else>-</h1>
                </div>
                <div class="label">
                    <p>Cost</p>
                </div>
            </div>
            <div class="stat">
                <div class="mod">
                    <h1 v-if="item.enc !== null">{{ item.enc }}</h1>
                    <h1 v-else>-</h1>
                </div>
                <div class="label">
                    <p>Encumbrance</p>
                </div>
            </div>
            <div class="stat">
                <div class="mod">
                    <h1 v-if="item.tl !== null">{{ item.tl }}</h1>
                    <h1 v-else>-</h1>
                </div>
                <div class="label">
                    <p>Tech level</p>
                </div>
            </div>
        </div>
        <div class="row" v-if="item.equipmentType == 'armor'">
            <div class="stat">
                <div class="mod">
                    <h1>{{ item.ac }}<span v-if="item.bonus !== 0">/+{{ item.bonus }}</span></h1>
                </div>
                <div class="label">
                    <p>Armor class</p>
                </div>
            </div>
            <div class="stat">
                <div class="mod">
                    <h1>{{ item.type }}</h1>
                </div>
                <div class="label">
                    <p>Type</p>
                </div>
            </div>
        </div>
        <div class="row" v-if="item.equipmentType == 'rangedWeapon'">
            <div class="stat">
                <div class="mod">
                    <h1>{{ itemDamage(item) }}</h1>
                </div>
                <div class="label">
                    <p>Damage</p>
                </div>
            </div>
            <div class="stat">
                <div class="mod">
                    <h1>{{ attackBonus(item) }}</h1>
                </div>
                <div class="label">
                    <p>Attack Bonus</p>
                </div>
            </div>
            <div class="stat">
                <div class="mod">
                    <h1>{{ item.range.normal }}/{{ item.range.max }}</h1>
                </div>
                <div class="label">
                    <p>Range</p>
                </div>
            </div>
        </div>
        <div class="row" v-if="item.equipmentType == 'rangedWeapon'">
            <div class="stat">
                <div class="mod">
                    <h1>{{ item.reloadTime }} main action<span v-if="item.reloadTime > 1">s</span></h1>
                </div>
                <div class="label">
                    <p>Reload time</p>
                </div>
            </div>
            <div class="stat">
                <div class="mod">
                    <h1 v-if="item.burstFire">Yes</h1>
                    <h1 v-else>No</h1>
                </div>
                <div class="label">
                    <p>Burst Fire</p>
                </div>
            </div>
            <div class="stat">
                <div class="mod">
                    <h1 v-if="item.magazine !== -1">{{ item.magazine }}</h1>
                    <h1 v-if="item.magazine === -1">N/A</h1>
                </div>
                <div class="label">
                    <p>Magazine size</p>
                </div>
            </div>
        </div>
        <div class="row" v-if="item.internalName.includes('bulletBox')">
            <div class="stat">
                <div class="mod">
                    <h1>{{ item.shots }}</h1>
                </div>
                <div class="label">
                    <p>Shots</p>
                </div>
            </div>
        </div>
        <div class="row" v-if="item.equipmentType === 'meleeWeapon'">
            <div class="stat">
                <div class="mod">
                    <h1>{{ itemDamage(item) }}</h1>
                </div>
                <div class="label">
                    <p>Damage</p>
                </div>
            </div>
            <div class="stat">
                <div class="mod">
                    <h1>{{ attackBonus(item) }}</h1>
                </div>
                <div class="label">
                    <p>Attack Bonus</p>
                </div>
            </div>
            <div class="stat">
                <div class="mod">
                    <h1 v-if="item.shock !== null && item.shock !== false">{{ item.shock.dmg }} point/AC {{ item.shock.ac }}</h1>
                    <h1 v-else>None</h1>
                </div>
                <div class="label">
                    <p>Shock</p>
                </div>
            </div>
        </div>
        <div class="description" v-if="hasDescription">
            <p>{{ item.description }}</p>
        </div>
    </div>
</template>

<script>

function toMod(a) {
    if (a >= 0) {
        return "+" + a;
    } else {
        return a;
    }
}

import { attackBonus } from "../shared.js";

export default {
    props: ["item", "c"],
    data() {
        return {
            hasDescription: false
        }
    },
    computed: {
        level() {
            // Calculates the current level of the player based on the xp

            var xp = this.c.xp;
            if (xp < 3) {
                return 1;
            } else if (xp >= 3 && xp < 6) {
                return 2;
            } else if (xp >= 6 && xp < 12) {
                return 3;
            } else if (xp >= 12 && xp < 18) {
                return 4;
            } else if (xp >= 18 && xp < 27) {
                return 5;
            } else if (xp >= 27 && xp < 39) {
                return 6;
            } else if (xp >= 39 && xp < 54) {
                return 7;
            } else if (xp >= 54 && xp < 72) {
                return 8;
            } else if (xp >= 72 && xp < 93) {
                return 9;
            } else if (xp >= 93 && xp < 117) {
                return 10;
            } else if (xp >= 117) {
                return 10 + Math.floor(((xp - 93) / 24));
            }
        }
    },
    methods: {
        attackBonus,
        toMod(a) {
            return toMod(a);
        },
        calMod(s) {
            // Returns the mod of an attribute score as a number
            if (s <= 3) {
                return -2;
            } else if (s >= 4 && s <= 7) {
                return -1;
            } else if (s >= 8 && s <= 13) {
                return 0;
            } else if (s >= 14 && s <= 17) {
                return 1;
            } else if (s >= 18) {
                return 1;
            }
        },
        itemDamage(item) {

            let mod = item.dmg.mod;
            let attr = 0;

            if (item.attr === "Str/Dex") {
                attr = this.c.attributes.str;

                if (this.c.attributes.dex > attr) {
                    attr = this.c.attributes.dex;
                }
            } else if (item.attr === "Str") {
                attr = this.c.attributes.str;
            } else if (item.attr === "Dex") {
                attr = this.c.attributes.dex;
            }

            mod += this.calMod(attr);

            if (item.equipmentType === "meleeWeapon") {
                if (item.skill === "punch") {
                    let skill = this.c.skills.punch;
    
                    if (skill.trained === false) {
                        mod--;
                    } else {
                        mod -= skill.level;
                    }
                }
            }

            if (mod === 0) {
                return item.dmg.die;
            } else {
                if (mod > 0) {
                    return item.dmg.die + "+" + mod;
                } else {
                    return item.dmg.die + mod;
                }
            }
        }
    },
    created() {
        console.log(this.item);
        if (this.item.description !== undefined) {
            this.hasDescription = true;
        }
    }
}
</script>

<style lang="stylus" scoped>

@import "../../../default.stylus";

.row {
	width: 100%;
	height: 78px;

	.stat {
		width: 33.3333333333%;
		height: 100%;

		float: left;

		.mod {
			width: 100%;
			height: 70%;

			h1 {
				margin: 0;
				font-family: defaultFont;
				padding: 0;
				text-align: center;

				position: relative;
				top: 50%;
				transform: translateY(-50%);
			}
		}

		.label {
			width: 100%;
			height: 30%;

			p {
				width: 100%;
				margin: 0;
				font-family: defaultFont;
				padding: 0;
				text-align: center;
				font-size: 12px;

				position: relative;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
}

</style>
