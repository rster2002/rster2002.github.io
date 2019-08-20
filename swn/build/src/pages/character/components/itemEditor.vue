<template>
    <div>
        <div v-if="loaded === true">
            <textbox v-model="internalEdit.name" label="Name"></textbox>
            <textbox v-model="internalEdit.enc" label="Encumbrance" type="number"></textbox>
            <textbox v-model="internalEdit.cost" label="Cost" type="number"></textbox>
            <textbox v-model="internalEdit.tl" label="Tech Level" type="number"></textbox>
            <div v-if="internalEdit.equipmentType === 'rangedWeapon'">
                <textbox v-model="internalEdit.dmg.die" label="Damage Die"></textbox>
                <textbox v-model="internalEdit.dmg.mod" label="Base Damage Modifier" type="number"></textbox>
                <textbox v-model="internalEdit.attr" label="Attribute" type="select">
                    <option>Dex</option>
                    <option>Str</option>
                    <option>Str/Dex</option>
                </textbox>
                <textbox v-model="internalEdit.range.normal" label="Range" type="number"></textbox>
                <textbox v-model="internalEdit.range.max" label="Max Range" type="number"></textbox>
                <textbox v-model="internalEdit.reloadTime" label="Reload Time" type="number"></textbox>
                <textbox v-model="internalEdit.magazine" label="Magazine Size" type="number"></textbox>
                <checkboxinput v-model="internalEdit.burstFire" label="Burst mode"></checkboxinput>
            </div>
            <div v-if="internalEdit.equipmentType === 'meleeWeapon'">
                <textbox v-model="internalEdit.dmg.die" label="Damage Die"></textbox>
                <textbox v-model="internalEdit.dmg.mod" label="Base Damage Modifier" type="number"></textbox>
                <textbox v-model="internalEdit.attr" label="Attribute" type="select">
                    <option>Dex</option>
                    <option>Str</option>
                    <option>Str/Dex</option>
                </textbox>
                <textbox v-model="internalEdit.skill" label="Skill" type="select">
                    <option>stab</option>
                    <option>punch</option>
                </textbox>
                <checkboxinput v-model="has.shock" label="Deals shock damage"></checkboxinput>
                <div v-if="has.shock">
                    <textbox v-model="internalEdit.shock.dmg" label="Shock damage" type="number"></textbox>
                    <textbox v-model="internalEdit.shock.ac" label="Shock AC" type="number"></textbox>
                </div>
            </div>
            <div v-if="internalEdit.equipmentType === 'armor'">
                <textbox v-model="internalEdit.type" label="Type" type="select">
                    <option>primative</option>
                    <option>street</option>
                    <option>combat</option>
                    <option>powered</option>
                </textbox>
                <textbox v-model="internalEdit.ac" label="Armor Class" type="number"></textbox>
                <textbox v-model="internalEdit.bonus" label="AC Bonus" type="number"></textbox>
            </div>
            <actions>
                <button @click="save()" class="primary">save</button>
                <button @click="$emit('discard')">discard</button>
            </actions>
        </div>
    </div>
</template>

<script>

import { genId } from "@js/global.js";
import { textbox, actions, checkboxinput } from "@components";

function loaded(t) {

    let loadedItem = t.value;

    if (t.value.equipmentType === "meleeWeapon") {
        if (t.value.shock !== null) {
            t.has.shock = true;
        } else {
            t.has.shock = false;
            loadedItem.shock = {dmg: 0, ac: 0}
        }
    }

    t.internalEdit = Object.assign({}, t.internalEdit, loadedItem);
    t.loaded = true;
}

export default {
    components: {
        textbox,
        actions,
        checkboxinput
    },
    props: ["value"],
    data() {
        return {
            internalEdit: {},
            has: {
                shock: false
            },
            loaded: false
        }
    },
    watch: {
        value() {
            loaded(this);
        }
    },
    methods: {
        save() {

            let itemObj = this.internalEdit;

            if (this.internalEdit.equipmentType === "meleeWeapon" && this.has.shock === false) {
                itemObj.shock = null;
            }

            console.log(itemObj);

            this.$emit("save", {
                ...itemObj,
                internalName: "customItem-" + genId(),
                customItem: true,
                edit: false
            });
        }
    },
    created() {
        loaded(this);
    }
}
</script>

<style>

</style>