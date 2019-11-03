<template>
    <div class="actionEditor">
        <div v-for="(action, index) in actions" :key="action.id" class="action">
            <dropDown :label="'Action' + (index + 1)">
                <textBox type="select" label="Type" v-model="action.type">
                    <option value="light">Light</option>
                    <option value="group">Group</option>
                </textBox>
                <textBox v-if="action.type === 'light'" type="select" label="Light" v-model="action.hardwareId">
                    <option v-for="light in lights" :key="'l' + light.hardwareId" :value="light.hardwareId">{{ light.name }}</option>
                </textBox>
                <div class="attibute" v-for="attribute in action.attributes" :key="attribute.id">
                    <textBox class="attributeSelect" label="Attribute" v-model="attribute.attribute" type="select">
                        <option value="powerState">Power</option>
                        <option value="color">Color</option>
                        <option value="brightness">Brightness</option>
                        <option value="transitionTime">Transition</option>
                    </textBox>
                    <textBox
                        class="valueSelect"
                        v-if="attribute.attribute === 'powerState'"
                        v-model="attribute.value"
                        label="Power State"
                        type="select"
                    >
                        <option value="on">On</option>
                        <option value="off">Off</option>
                    </textBox>
                    <textBox
                        class="valueSelect"
                        v-if="attribute.attribute === 'color'"
                        v-model="attribute.value"
                        label="Color"
                        type="text"
                    />
                    <textBox
                        class="valueSelect"
                        v-if="attribute.attribute === 'brightness'"
                        v-model="attribute.value" type="number"
                        label="Brightness"
                    />
                </div>
                <button @click="addAttribute(action)">Add attribute</button>
                <button @click="removeAction(action)">Remove action</button>
            </dropDown>
        </div>
        <button class="addAction" @click="addAction()">Add action</button>
    </div>
</template>

<script>
import { textBox, dropDown } from "../components.js";
import { genId, db } from "../js/global.js";

export default {
    props: ["value"],
    components: {
        textBox,
        dropDown
    },
    data() {
        return {
            actions: [],
            lights: []
        }
    },
    watch: {
        value() {
            this.actions = this.value;
        },
        actions() {
            this.$emit("input", this.actions);
        }
    },
    methods: {
        addAction() {
            this.actions.push({
                id: genId(),
                type: "light",
                hardwareId: "0",
                attributes: [],
                open: false
            });
        },
        removeAction(action) {
            var index = this.actions.indexOf(action);
            this.actions.splice(index, 1);
        },
        addAttribute(action) {
            action.attributes.push({
                attribute: "powerState",
                value: "on",
                id: genId()
            });
        }
    },
    created() {
        this.actions = this.value.map(action => {
            return {...action, open: false}
        });

        this.lights = db.lights;
    }
}
</script>

<style lang="scss" scoped>

.actionEditor {
    width: 95%;

    margin-left: auto;
    margin-right: auto;

    button {
        width: 100%;

        margin: 8px auto;
        padding: 8px;

        outline: 0;
        border: 2px solid #007263;
        background-color: transparent;
        color: #007263;
        border-radius: 5px;
    }

    .addAction {
        width: 100%;
    }

    .action, .attribute {
        width: calc(100% - 16px);
        padding: 8px;

        border: 2px solid #333333;
        border-radius: 5px;
    }

    .action {
        margin: 8px auto;

        h1 {
            margin: 8px auto;

            font-family: "Roboto", sans-serif;
            font-size: 1.25rem;
        }

        .textBox {
            margin: 16px auto;
        }

        .attributeSelect, .valueSelect {
            width: calc(50% - 8px);
            float: left;
        }

        .valueSelect {
            margin-left: 16px;
        }
    }
}

</style>