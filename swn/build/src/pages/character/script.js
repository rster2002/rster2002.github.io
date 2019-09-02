import marked from "marked";

import { card, primaryTitle, actions, textbox, checkbox, popup, snackbar, searchbar, confirmationdialog, dropdownindicator, dropdowncontent } from "@components";
import itemStats from "./components/itemStats.vue";
import itemEditor from "./components/itemEditor.vue";

import toi from "./components/toi.vue";
import steps from "./components/steps.vue";
import emptyCharacter from "./empty.js";

import { attackBonus } from "./shared.js";

import { user, genId } from "@js/global.js";
import { fs } from "@js/firebase.js";

import foci from "@json/foci.json";
import equipment from "@json/equipment.js";
import rangedWeapons from "@json/weapons/ranged.json";
import meleeWeapons from "@json/weapons/melee.json";
import companion from "@json/companion.json";
import ammoItems from "@json/ammo.json";
import psionics from "@json/psionics.js";

const equipmentBuild = {
    armor: {}
};

const psionicsBuild = {};

// http://localhost:8886/#/character/bbRweWpKoed3dLYecbiKuzZQ0562/character-keBs9zQrdaAXcB4qZq6a68QzFomfzONG
function updateInstance(t) {
    var params = t.$route.params;
    t.info.ownerUid = params.ownerUid;
    t.info.characterId = params.characterId;

    if (t.userUid !== undefined) {
        t.info.ownerUid = t.userUid;
    }

    if (t.characterId !== undefined) {
        t.info.characterId = t.characterId;
    }

    if (user().uid === t.info.ownerUid) {
        t.m.allowEdit = true;
    } else {
        t.m.allowEdit = false;
    }

    function fill(a, b) {
        if (Array.isArray(b)) {
            b.forEach(c => a.push(c));
        } else {
            var entries = Object.entries(b);

            entries.forEach(ent => {
                if (typeof ent[1] === "object") {
                    fill(a[ent[0]], ent[1]);
                } else {
                    if (a !== undefined) {
                        a[ent[0]] = ent[1];
                    }
                }
            });
        }
    }

    if (t.info.ownerUid !== "" && t.info.characterId !== "") {
        fs.collection(`users/${t.info.ownerUid}/characters/${t.info.characterId}/d`).doc("data").get().then(a => {
            if (a && a.exists) {
                var d = a.data();
                fill(t.c, rebuildCharacter(d));
            }
        });
    }
}

function rebuildCharacter(a) {
    // Rebuilds the character object with descriptions and large chunks of text
    console.log("Rebuilding");

    console.log(a);

    // Checks whether of not the object form the database contains equipment or not
    if (a.equipment !== undefined) {
        // Adds additional information about the item
        a.equipment = a.equipment.map(a => {
            var list;
            var add = {};

            // Checks what list to use to look in when searching for the additional data and any additional information that it should add to the equipment object
            if (a.equipmentType === "armor") {
                list = equipmentBuild.armor;
            } else if (a.equipmentType === "rangedWeapon") {
                list = rangedWeapons;
                if (a.magazinesLeft === undefined) {
                    add = { magazinesLeft: 0 };
                }
            } else if (a.equipmentType === "meleeWeapon") {
                list = meleeWeapons;
                if (a.skill === undefined) {
                    add = { skill: "stab" };
                }
            } else if (a.equipmentType === "ammoItems") {
                list = ammoItems;
            }

            // Checks whether or not it should search a list for additional data. It should NOT search when its a custom item, because the internal name is random and does not match anywhere
            let i = a.customItem === undefined ? list[a.internalName] : {};
            
            // Adds some additional values used by the UI (vue)
            return { ...Object.assign(i, a), ...add, open: false, edit: false };
        });
    }

    if (a.foci !== undefined) {
        a.foci = a.foci.map(a => {
            return { ...Object.assign(foci[a.internalName], a), open: false };
        });
    }

    if (a.psionics !== undefined) {
        a.psionics = a.psionics.map(a => {
            // Gets the base obj form the app
            var obj = psionicsBuild[a.internalTitle];

            // Replaces any base data, with data from the database
            let i = Object.assign(obj, a);

            // validates and repairs techniques where needed
            i.techniques = i.techniques.map(a => {
                if (a.choicen === undefined) {
                    a.choicen = false;
                }

                return {...a, open: false};
            });

            // Rebuilds techniques
            i.selectedTechniques = i.selectedTechniques.map(technique => {
                console.log(technique);
                // If a technique is choicen, it should not show up in the 'add technique' list
                i.techniques[technique.index].choicen = true;
                return { ...obj.techniques[technique.index], open: false, choicen: true, index: technique.index };
            });

            return { ...i, open: false, showPopup: false };
        });
    }

    return a;
}

function compressCharacter(a) {
    // Filters out any non-user content, like descriptions and stats

    console.log("COMPRESSING", a);
    var r = Object.assign({}, a);

    // Processes the characters equipment
    r.equipment = a.equipment.map(a => {
        let add = {};

        // If the item is not a custom item, it should compress the item to it's bare minimum
        if (a.customItem === undefined) {
            // Checks the equipment type of the item and sets some additional (type specific) data to be stored
            if (a.equipmentType === "rangedWeapon") {
                add = { magazinesLeft: a.magazinesLeft }
            }
    
            if (a.equipmentType === "meleeWeapon") {
                add = { skill: a.skill };
            }
    
            if (a.internalName.includes("bulletBox")) {
                add = { shots: a.shots }
            }
    
            return {
                "$caried": a.$caried,
                equipmentType: a.equipmentType,
                internalName: a.internalName,
                ...add
            }
        } else if (a.customItem === true) {
            // If the item is a custom item, it should store the whole item
            return a;
        }
    });

    // Processes the characters foci
    r.foci = a.foci.map(a => {
        return {
            currentLvl: a.currentLvl,
            internalName: a.internalName
        }
    });

    // Processes the characters psionic skills
    r.psionics = a.psionics.map(a => {
        return {
            level: a.level,
            internalTitle: a.internalTitle,
            selectedTechniques: a.selectedTechniques.map(a => {
                // Processes the psionic skill's 
                return {
                    internalName: a.internalName,
                    index: a.index
                }
            })
        }
    });

    console.log(r);

    return r;
}

function toMod(a) {
    // Used to convert a number to a modifier
    if (a >= 0) {
        return "+" + a;
    } else {
        return a;
    }
}

export default {
    props: ["userUid", "characterId"],
    components: {
        card,
        primaryTitle,
        actions,
        textbox,
        checkbox,
        popup,
        snackbar,
        searchbar,
        itemStats,
        itemEditor,
        confirmationdialog,
        toi,
        steps,
        dropdownindicator,
        dropdowncontent
    },
    data() {
        return {
            listener: () => {},
            content: {
                foci: [],
                equipment: [],
                psionics: [],
                weapons: {
                    ranged: [],
                    melee: []
                },
                ammo: []
            },
            companion: [],
            query: "",
            p: {
                save: false
            },
            popup: {
                focus: false,
                equipment: false,
                armor: false,
                rangedWeapons: false,
                meleeWeapons: false,
                search: false,
                psionics: false,
                breakdown: false,
                misc: false
            },
            info: {
                ownerUid: "",
                characterId: ""
            },
            m: {
                allowEdit: false,
                edit: false,
                breakdown: []
            },
            c: emptyCharacter
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
        },
        speed() {
            // Checks wether 'useManual' is in use and if not calculates the speed of the player based on the equipment the player has

            if (!this.c.settings.useManual) {
                if (this.totalStowedItems > this.c.attributes.str || this.totalReadiedItems > Math.floor(this.c.attributes.str / 2)) {
                    return 7;
                } else {
                    return 10;
                }
            } else {
                return this.c.manual.speed;
            }
        },
        fociList() {
            return this.content.foci.filter(a => !a.selected);
        },
        ac() {
            if (!this.c.settings.useManual) {
                // Calculates the Armor Class of the player
                let i = 10 + this.calMod(this.c.attributes.dex);

                // Checks if the player is wearing armor
                if (this.equipedArmor) {
                    var a = this.equipedArmor;

                    // Checks for an array. If it is an array, the player had armor and a shield of some kind
                    if (Array.isArray(a)) {
                        // Calculates the armorclass

                        let c = 0;
                        a.forEach(armor => {
                            if (armor.bonus === 0) {
                                c += armor.ac;
                            } else {
                                c += armor.bonus;
                            }
                        });

                        return c + this.calMod(this.c.attributes.dex);
                    } else {
                        // Checks wether the armor class of the player is already higher than the ac of the equipment (shield) and if it is, instead adds the bonus of that item
                        if (i >= a.ac) {
                            return i + a.bonus;
                        } else {
                            return a.ac + this.calMod(this.c.attributes.dex);
                        }
                    }
                } else {
                    return i;
                }
            } else {
                return this.c.manual.ac;
            }
        },
        readyEnc() {
            // The max amount the player can ready without an penalty
            return Math.floor(this.c.attributes.str / 2);
        },
        readiedItems() {
            // Filters the items into one list
            return this.c.equipment.filter(a => a.$caried === "ready");
        },
        stowedItems() {
            // Filters the items into one list
            return this.c.equipment.filter(a => a.$caried === "stowed");
        },
        totalStowedItems() {
            // The total enc of items the player has readied
            var s = 0;
            this.stowedItems.forEach(a => a.enc !== null ? s += a.enc : s += 0);
            return s;
        },
        totalReadiedItems() {
            // The total enc of items the player has stowed
            var s = 0;
            this.readiedItems.forEach(a => a.enc !== null ? s += a.enc : s += 0);
            return s;
        },
        equipedArmor() {
            // Returns the equiped armor the player is wearing
            var i = this.readiedItems.filter(a => a.equipmentType === "armor");
            if (i.length > 0) {
                if (i.length === 2) {
                    return i;
                } else {
                    return i[0];
                }
            } else {
                return false;
            }
        },
        bestResult() {
            // The best result is where an search item's name exactly matches the query
            var query = this.query;
            if (query === "") {
                return []
            }

            return this.companion.filter(a => {
                return a.title.toLowerCase() === query;
            });
        },
        searchResults() {
            // Returns items with the query in its title
            var query = this.query;
            if (query === "") {
                return []
            }

            return this.companion.filter(a => {
                return a.title.toLowerCase() !== query && a.title.toLowerCase().includes(query);
            });
        },
        relatedResults() {
            // Returns items where the query is in the 'related' array
            var query = this.query;
            if (query === "") {
                return []
            }

            return this.companion.filter(a => {
                let r = false;

                if (a.title.toLowerCase() !== query && a.title.toLowerCase().includes(query) === false) {
                    a.related.forEach(b => {
                        if (b.toLowerCase().includes(query)) {
                            r = true;
                        }
                    });
                }

                return r;
            });
        }
    },
    methods: {
        initializeListener() {
            this.listener = fs
                .collection(`users/${this.info.ownerUid}/characters/${this.info.characterId}/d`)
                .doc("data")
                .onSnapshot(doc => {

                    function update(a, b) {
                        if (Array.isArray(b)) {
                            a = b;
                        } else {
                            var entries = Object.entries(b);

                            entries.forEach(ent => {
                                if (ent[1] === null) {
                                    a[ent[0]] = ent[1];
                                } else if (typeof ent[1] === "object") {
                                    update(a[ent[0]], ent[1]);
                                } else {
                                    if (a !== undefined) {
                                        a[ent[0]] = ent[1];
                                    }
                                }
                            });
                        }
                    }

                    // fill(this.c, emptyCharacter);
                    update(this.c, rebuildCharacter(doc.data()));
                    console.log("UPDATE", doc.data())
                });
        },
        unsubscribeListener() {
            this.listener();
        },
        toMarkdown(a) {
            return marked(a, { sanitize: true });
        },
        toggleVal(a, b) {
            console.log(a, b);
            a[b] = !a[b];
        },
        test() {
            // Function for using vue to run some test code
            a
        },
        save() {
            var t = this;
            // Checks if it's a save from its owner
            if (t.m.allowEdit) {
                // If it is, then it saves it like normal
                fs.collection(`users/${t.info.ownerUid}/characters/${t.info.characterId}/d`).doc("data").set(compressCharacter(t.c)).then(a => {
                    fs.collection(`users/${t.info.ownerUid}/characters`).doc(t.info.characterId).update({
                        name: t.c.name
                    }).then(a => {
                        t.p.save = true;
                        setTimeout(() => {
                            t.p.save = false;
                        }, 3000)
                    });
                });
            } else {
                // If it is not, it instead prompts the user if they want to copy the character to their own account
                if (confirm("Are you sure you want to copy this character to your own account?")) {
                    var id = "character-" + genId();
                    fs.collection(`users/${user().uid}/characters/${id}/d`).doc("data").set(t.c).then(a => {
                        fs.collection(`users/${user().uid}/characters`).doc(id).set({
                            id,
                            createdAt: Date.now(),
                            lastModified: Date.now(),
                            name: t.c.name,
                            owner: user().uid
                        }).then(a => {
                            t.$router.push({ path: `/character/${user().uid}/${id}` });
                            alert("Copied")
                        });
                    });
                }
            }
        },
        del() {
            // Checks with the user whether or not they are really sure they want to delete their character
            if (confirm("Are you sure you want do delete your character?")) {
                // Removes the document where the character itself is stored and the document in the "characters" collection, which is used to display general information
                fs.collection(`users/${this.info.ownerUid}/characters/${this.info.characterId}/d`).doc("data").delete().then(a => {
                    fs.collection(`users/${this.info.ownerUid}/characters/`).doc(this.info.characterId).delete().then(a => {
                        this.$router.push({ path: "/characters" });
                    });
                });
            }
        },
        toggleEdit() {
            // Shorthand function to toggle the character sheet between edit and play mode
            this.m.edit = !this.m.edit;
        },
        toggleSearch() {
            // Shorthand function to toggle the search popup
            this.popup.search = !this.popup.search;
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
                return 2;
            }
        },
        mod(s) {
            // Returns the mod of an attribute score as a string
            var modifier = this.calMod(s);
            if (modifier > 0) {
                return "+" + modifier;
            } else {
                return modifier;
            }
        },
        savingThrow(a) {
            // Checks whether to use manual values or if it should calculate it
            if (!this.c.settings.useManual) {
                var s1, s2, u;

                // Gets the pairs of attributes to use for that saving throw
                if (a === "physical") {
                    s1 = this.c.attributes.str;
                    s2 = this.c.attributes.con;
                } else if (a === "evasion") {
                    s1 = this.c.attributes.dex;
                    s2 = this.c.attributes.int;
                } else if (a === "mental") {
                    s1 = this.c.attributes.cha;
                    s2 = this.c.attributes.wis;
                }

                // Checks whether one is bigger than the other
                if (s1 >= s2) {
                    u = this.calMod(s1);
                } else {
                    u = this.calMod(s2);
                }

                // Calculates the final score
                return 15 - (this.level - 1) - u;
            } else {
                var s = this.c.manual.savingThrows[a];
                return s;
            }
        },
        sklAdd(s) {
            // Adds 1 to the provided skill
            var skill = this.c.skills[s];
            if (skill.lvl < 4) {
                skill.lvl++;
            }
        },
        sklRmv(s) {
            // Subtracts 1 from the provided skill
            var skill = this.c.skills[s];
            if (skill.lvl > 0) {
                skill.lvl--;
            }
        },
        skillMod(s) {
            // Returns the mod of the given skill
            var skill = this.c.skills[s];
            if (skill.trained) {
                return "+" + skill.lvl;
            } else {
                return "-1";
            }
        },
        addFocus(f) {
            // Removes the reactivity from the object, so new entries won't be linked
            let i = Object.assign({}, f);

            // Adds the focus to the character with some default values
            this.c.foci.push(Object.assign(i, {
                open: false,
                currentLvl: 1
            }));
        },
        removeFocus(f) {
            // Removes the given focus from the list of used foci
            var index = this.c.foci.indexOf(f);
            this.c.foci.splice(index, 1);
        },
        changeFocus(f) {
            // Function for toggling between level 1 and 2
            if (f.currentLvl === 1) {
                f.currentLvl = 2;
            } else {
                f.currentLvl = 1;
            }
        },
        hpc(a) {
            // Method for incrementing or decrementing the effort
            if (a === "+") {
                if (this.c.hp < this.c.hpMax) {
                    this.c.hp++;
                }
            } else if (a === "-") {
                if (this.c.hp > 0) {
                    this.c.hp--;
                }
            }
        },
        efc(a) {
            // Method for incrementing or decrementing the effort
            if (a === "+") {
                if (this.c.effort.current < this.c.effort.max) {
                    this.c.effort.current++;
                }
            } else if (a === "-") {
                if (this.c.effort.current > 0) {
                    this.c.effort.current--;
                }
            }
        },
        addItem(a, b) {
            // Method for adding an item from the item list
            let allow = false;

            // Checks how the item should be added and checks whether when it adds the item, exeeds the max allowance
            if (b === "stowed") {
                if (this.totalStowedItems + a.enc <= this.c.attributes.str + 4) {
                    allow = true;
                }
            } else if (b === "ready") {
                if (this.totalStowedItems + a.enc <= this.readyEnc + 2) {
                    allow = true;
                }
            }

            // Adds some standard values used by vue (will not be stored)
            var item = { ...a, $caried: b, open: false, edit: false };

            // If the item is of equipment type 'rangedWeapon', it sets its magazines left to the max size of one magazine
            if (a.equipmentType === "rangedWeapon") {
                item.magazinesLeft = item.magazine;
            }

            // Adds the item to the equipment of the character if all checks passed
            if (allow) {
                this.c.equipment.push(Object.assign({}, item));
            }
        },
        deleteItem(a, b = false) {
            // Checks with the user if they want to delete the item. The confirm can be overwritten by setting the second parameter to true
            if (b || confirm("Are you sure you want to delete this item from your inventory?")) {
                var index = this.c.equipment.indexOf(a);
                this.c.equipment.splice(index, 1);
            }
        },
        readyItem(a) {
            // Checks whether or not the user can ready the item
            if ((this.totalReadiedItems - 2) + a.enc <= this.readyEnc) {
                // Checks whether the user already has armor equiped (readied)
                if (a.equipmentType === "armor" && this.equipedArmor) {
                    if (Array.isArray(this.equipedArmor) === false) {
                        // Checks whether or now the armor piece that is about to be readied has a bonus score. If it has, it allows it to be added
                        if (a.bonus > 0 || this.equipedArmor.bonus > 0) {
                            a.open = false;
                            a.$caried = "ready";
                        } else {
                            alert("You can only equip one set of armor");
                        }
                    } else {
                        alert("You can only equip one set of armor");
                    }
                } else {
                    // If the equipment is not armor, it closes the dropdown content and sets the caried state to 'ready'
                    a.open = false;
                    a.$caried = "ready";
                }
            }
        },
        stowItem(a) {
            // Checks whether or not the user can stow the item
            if ((this.totalStowedItems - 2) + a.enc <= this.c.attributes.str) {
                // Closes the dropdown content and sets the caried state to 'stowed'
                a.open = false;
                a.$caried = "stowed";
            }
        },
        attackBonus,
        search(a) {
            // Small method for setting the search query
            var query = a.toLowerCase();
            this.query = query;
        },
        toMod(a) {
            // If a is positive, it adds a "+" sign
            return toMod(a);
        },
        addPsionic(p) {
            // Adds the selected psionic skill to the users character with some variables used by vue
            var obj = { ...p, open: false, level: 0, selectedTechniques: [], showPopup: false };
            var techniques = obj.techniques;

            // Created a array which contains all the available techniques
            obj.techniques = [];

            techniques.forEach(a => {
                obj.techniques.push({ ...a, open: false, choicen: false });
            });

            // Adds the whole object to the users character
            this.c.psionics.push(obj);
        },
        psionicUp(p) {
            // Checks whether the level if the psionic skill is lower than 4 (max is 5) and increases the level
            if (p.level < 4) {
                p.level++;
            }
        },
        psionicDown(p) {
            // Checks whether the level if the psionic skill is higher than 0 (min is 0) and increases the level
            if (p.level > 0) {
                p.level--;
            }
        },
        chooseTechnique(p, t) {
            var index = p.techniques.indexOf(t);
            p.selectedTechniques.push({ ...t, open: false, index });

            t.choicen = true;
        },
        removeTechnique(p, t) {
            console.log(p, t)
            p.techniques[t.index].choicen = false;
            p.techniques[t.index].open = false;

            var index = p.selectedTechniques.indexOf(p);
            p.selectedTechniques.splice(index, 1);
        },
        removePsionic(p) {
            if (confirm("Are you sure you want to delete this skill?")) {
                var index = this.c.psionics.indexOf(p);
                this.c.psionics.splice(index, 1);
            }
        },
        showBreakdown(a) {
            if (a === "ac") {
                if (this.equipedArmor) {
                    var a = this.equipedArmor;

                    var r = [];

                    if (Array.isArray(a)) {
                        a.forEach(armor => {
                            if (armor.bonus === 0) {
                                r.push({
                                    value: armor.ac,
                                    label: "Base armor (" + armor.name + ")"
                                });
                            } else {
                                r.push({
                                    value: armor.bonus,
                                    label: "Bonus (" + armor.name + ")"
                                });
                            }
                        });
                    } else {
                        let i = 10 + this.calMod(this.c.attributes.dex);
                        if (i >= a.ac) {
                            r.push({
                                value: 10,
                                label: "Base"
                            });

                            r.push({
                                value: a.bonus,
                                label: "Bonus (" + a.name + ")"
                            });
                        } else {
                            r.push({
                                value: a.ac,
                                label: "Base armor (" + a.name + ")"
                            });
                        }
                    }

                    r.push({
                        value: this.calMod(this.c.attributes.dex),
                        label: "Dex modifier"
                    });

                    this.m.breakdown = r;
                } else {
                    this.m.breakdown = [
                        {
                            value: 10,
                            label: "Base"
                        },
                        {
                            value: this.calMod(this.c.attributes.dex),
                            label: "Dex modifier"
                        }
                    ]
                }
            } else if (a === "speed") {

                var r = [
                    {
                        value: 10,
                        label: "Base"
                    }
                ]

                if (this.totalStowedItems > this.c.attributes.str || this.totalReadiedItems > Math.floor(this.c.attributes.str / 2)) {
                    r.push({
                        value: -3,
                        label: "Heavily packed"
                    });
                }

                this.m.breakdown = r;
            } else if (a.equipmentType === "rangedWeapon") {
                let skillBonus;

                let skill = this.c.skills.shoot;

                if (skill.trained === false) {
                    skillBonus = -2;
                } else {
                    skillBonus = skill.lvl;
                }

                this.m.breakdown = [
                    {
                        value: Math.floor(this.level / 2),
                        label: "Level / 2 rounded down"
                    },
                    {
                        value: skillBonus,
                        label: "Skill (shoot)"
                    },
                    {
                        value: this.calMod(this.c.attributes.dex),
                        label: "Dex modifier"
                    },
                    {
                        value: this.c.attackBonus,
                        label: "Extra attack bonus"
                    }
                ]
            }

            this.popup.breakdown = true;
        },
        reloadWeapon(item) {
            var magazines = this.c.equipment.filter(a => a.internalName === "magazine" && a.$caried === "ready");
            var bulletBoxes = this.c.equipment.filter(a => a.internalName.includes("bulletBox") && a.$caried === "ready" && a.forWeapon === undefined);
            var specificBulletBoxes = this.c.equipment.filter(a => a.internalName.includes("bulletBox") && a.$caried === "ready" && a.forWeapon === item.internalName);

            bulletBoxes = [...bulletBoxes, ...specificBulletBoxes];

            if (magazines.length > 0) {
                var magazine = magazines[0];
                this.deleteItem(magazine, true);
                item.magazinesLeft = item.magazine;
            } else if (bulletBoxes.length > 0) {
                var bulletsGot = 0;
                var bulletsRequired = item.magazine;

                var getBulletsFromBox = (i) => {
                    var bulletBox = bulletBoxes[i];

                    if (bulletsRequired <= bulletBox.shots) {
                        bulletBox.shots -= bulletsRequired;
                        item.magazinesLeft += bulletsRequired;
                    } else if (bulletsRequired > bulletBox.shots) {
                        item.magazinesLeft += bulletBox.shots;
                        bulletsRequired -= bulletBox.shots;
                        bulletBoxes.shift();
                        this.deleteItem(bulletBox, true);
                        if (bulletBoxes[0] !== undefined) {
                            getBulletsFromBox(0);
                        }
                    }
                }

                getBulletsFromBox(0);
            } else {
                if (confirm("You don't bullets handy. Are you sure you want to violate the rules of the universe and reload your weapon.")) {
                    item.magazinesLeft = item.magazine;
                }
            }
        },
        useRangedWeapon(item) {
            if (item.magazinesLeft > 0) {
                item.magazinesLeft--;
            }
        },
        updateCost(item) {
            console.log(item);
            if (item.equipmentType === "ammoItems") {
                item.cost = item.basePrice * item.shots;
            }
        },
        mutate(a, b) {

            function fill(a, b) {
                if (Array.isArray(b)) {
                    b.forEach(c => a.push(c));
                } else {
                    var entries = Object.entries(b);

                    entries.forEach(ent => {
                        if (ent[1] === null) {
                            a[ent[0]] = ent[1];
                        } else if (typeof ent[1] === "object") {
                            fill(a[ent[0]], ent[1]);
                        } else {
                            if (a !== undefined) {
                                a[ent[0]] = ent[1];
                            }
                        }
                    });
                }
            }

            fill(a, b);
        },
        addContainer() {
            this.c.containers.push({
                name: "New container",
                id: genId(),
                size: 10,
                content: [],
                open: false
            });
        }
    },
    watch: {
        "$route": function () {
            updateInstance(this);
        },
        userUid() {
            updateInstance(this);
        }
    },
    created() {

        var entries = Object.entries(foci);

        var f = entries.map(a => { return { ...a[1], internalName: a[0], open: false } });
        this.content.foci = f;

        // var t = this;

        equipment.armor.then(a => {
            entries = Object.entries(a);
            var f = entries.map(b => { return { ...b[1], open: false } });
            f.forEach(b => this.content.equipment.push(b));
            equipmentBuild.armor = a;
        });

        var e = Object.entries(rangedWeapons);
        e.forEach(a => {
            this.content.weapons.ranged.push({ ...a[1], open: false });
        });

        var e = Object.entries(meleeWeapons);
        e.forEach(a => {
            this.content.weapons.melee.push({ ...a[1], open: false, skill: "stab" });
        });

        var e = Object.entries(companion);
        e.forEach(a => {
            this.companion.push(a[1]);
        });

        var e = Object.entries(psionics);
        e.forEach(a => {
            a[1].then(b => {
                this.content.psionics.push({ ...b, open: false });
                psionicsBuild[a[0]] = b;
            });
        });

        var e = Object.entries(ammoItems);
        e.forEach(a => {
            this.content.ammo.push({ ...a[1], open: false });
        });

        updateInstance(this);
    }
}