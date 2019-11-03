<template>
    <app>
        <topBar>
            <topBarButton @click="goQuiet()">
                power-sleep
            </topBarButton>
            <topBarTitle>
                hue-remote
            </topBarTitle>
        </topBar>
        <mainView>
            <div v-if="bridge.connected">
                <card>
                    <h1>Quick buttons</h1>
                    <div class="quietButtonsSetup">
                        <button v-for="(button, index) in buttons" :key="button.id" @click="editButton(index, button)">
                            <div class="verticalWrapper">
                                <icon :icon="button.icon"></icon>
                                <p>{{ button.name }}</p>
                            </div>
                        </button>
                        <button @click="newButton()">
                            <div class="verticalWrapper">
                                <icon>
                                    plus
                                </icon>
                                <p>Add new</p>
                            </div>
                        </button>
                    </div>
                </card>
                <card>
                    <h1>Debug</h1>
                    <p><b>HUE Bridge</b> {{ bridge.ip }}</p>
                    <p><b>Token</b> {{ bridge.token }}</p>
                    <p><b>clientId</b> {{ bridge.clientId }}</p>
                </card>
                <card>
                    <h1>Users</h1>
                    <listItem v-for="user in users" :key="user.id">
                        <p>{{ user.name }}</p>
                        <button @click="deleteUser(user)">
                            delete
                        </button>
                    </listItem>
                </card>
            </div>
            <card v-if="!bridge.connected">
                <h1>Debug info</h1>
                <p><b>HUE Bridge</b> {{ bridge.ip }}</p>
                <div v-if="show.awaitingBridge">
                    <p><b>Awaiting bridge</b></p>
                    <p>Press the button on your philips hue bridge and then tap on 'connect'</p>
                    <button @click="tokenRequest()">Connect</button>
                    <p v-if="bridge.output !== ''"><b>Output</b> {{ bridge.output }}</p>
                </div>
            </card>
        </mainView>
        <quietButtons v-if="show.quietButtons" @exit="show.quietButtons = false"></quietButtons>
        <div class="configButton" v-if="show.editButton">
            <button @click="show.editButton = false">back</button>
            <textBox label="Button Name" v-model="editingButton.name"></textBox>
            <textBox label="Icon" v-model="editingButton.icon"></textBox>
            <actionEditor v-model="editingButton.action"></actionEditor>
            <button @click="saveEdits()">Save</button>
            <button @click="deleteButton()">Delete</button>
        </div>
    </app>
</template>

<script>
import vueChannel from "vue-channel";

import { app, topBar, topBarTitle, topBarButton, mainView, card, icon, textBox, listItem } from "../components.js";
import quietButtons from "../components/quietButtons.vue";
import actionEditor from "../components/actionEditor.vue";
import { genId, db } from "../js/global.js";

const lockToButtonsSound = new Audio("./sound/state-change-up.wav");

export default {
    components: {
        app,
        topBar,
        topBarTitle,
        topBarButton,
        mainView,
        card,
        quietButtons,
        icon,
        textBox,
        listItem,
        actionEditor
    },
    data() {
        return {
            show: {
                quietButtons: false,
                awaitingBridge: false,
                editButton: false
            },
            bridge: {
                ip: "",
                endpoint: "",
                token: "",
                clientId: "",
                connected: false,
                output: ""
            },
            editingButton: {
                name: "",
                icon: "",
                action: [
                    
                ]
            },
            users: [],
            buttons: []
        }
    },
    computed: {
        connected() {
            return this.bridge.connected;
        }
    },
    watch: {
        connected() {
            if (this.bridge.connected) {
                fetch(this.bridge.endpoint + "/config")
                    .then(r => r.json())
                    .then(response => {
                        var entries = Object.entries(response.whitelist);

                        this.users = entries.map(user => {
                            return {...user[1], id: user[0]}
                        });

                        db.users = this.users;
                    });
                
                fetch(this.bridge.endpoint + "/lights")
                    .then(r => r.json())
                    .then(response => {
                        var entries = Object.entries(response);

                        db.lights = entries.map(a => {
                            return {...a[1], hardwareId: a[0]}
                        });
                    });
            }
        }
    },
    methods: {
        goQuiet() {
            lockToButtonsSound.play();
            this.show.quietButtons = true;
        },
        newButton() {
            this.buttons.push({
                icon: "lightbulb",
                name: "New button",
                id: genId(),
                action: []
            });

            db.buttons = Object.assign([], this.buttons);
        },
        tokenRequest() {
            var clientId = genId(9);

            fetch(this.bridge.ip + "/api", {
                method: "POST",
                body: JSON.stringify({
                    devicetype: "quiet-hue#" + clientId
                })
            })
                .then(r => r.json())
                .then(j => {
                    var response = j[0];

                    console.log(response);

                    if ("error" in response) {
                        this.bridge.output = "Unable to authenticate, did you press the button on the HUE bridge before you tapped 'connect'?";
                    } else if ("success" in response) {
                        db.bridge = {
                            ip: this.bridge.ip,
                            token: response.success.username,
                            connected: Date.now(),
                            clientId
                        }

                        this.bridge.token = response.username;
                        this.bridge.clientId = clientId;

                        this.bridge.connected = true;
                        this.show.awaitingBridge = false;
                    }
                });
        },
        deleteUser(user) {
            if (confirm("Are you sure you want to delete this user? An application may not have access to your hue hub without having to reconnect to it.")) {
                fetch(this.bridge.endpoint + "/config/whitelist/" + user.id, {
                    method: "DELETE"
                })
                    .then(r => r.json())
                    .then(j => {
                        let index = this.users.indexOf(user);
                        this.users.splice(index, 1);
                    });
            }
        },
        editButton(index, button) {
            this.show.editButton = true;
            this.editingButton.name = button.name;
            this.editingButton.icon = button.icon;
            this.editingButton.action = button.action;
            this.editingButton.index = index;
        },
        saveEdits() {
            var index = this.editingButton.index;
            var editingButtonObject = this.editingButton;

            console.log(index, editingButtonObject, this.buttons[index]);

            this.buttons[index].name = editingButtonObject.name;
            this.buttons[index].icon = editingButtonObject.icon;
            this.buttons[index].action = editingButtonObject.action;

            db.buttons = this.buttons;

            this.show.editButton = false;
        },
        deleteButton() {
            var index = this.editingButton.index;
            this.buttons.splice(index, 1);

            db.buttons = this.buttons;

            this.show.editButton = false;
        }
    },
    created() {
        vueChannel("quietButtons")
            .set({
                rows: 3
            });

        if (db.bridge === null) {
            fetch("https://discovery.meethue.com/")
                .then(r => r.json())
                .then(j => {
                    if (j.length > 0) {
                        this.bridge.ip = "http://" + j[0].internalipaddress;

                        this.show.awaitingBridge = true;
                    }
                });
        } else {
            this.bridge.connected = true;
            this.bridge.ip = db.bridge.ip;
            this.bridge.token = db.bridge.token;
            this.bridge.clientId = db.bridge.clientId;
            this.bridge.endpoint = this.bridge.ip + "/api/" + this.bridge.token;
        }

        if (db.buttons !== null) {
            this.buttons = db.buttons;
        }
    }
}
</script>

<style lang="scss" scoped>

.quietButtonsSetup {
    width: 100%;

    display: inline-block;

    button {
        height: 128px;
        width: calc(50% - 16px);

        position: relative;
        margin: 8px;
        float: left;

        border: 2px solid #333333;
        border-radius: 5px;
        outline: 0;
        background-color: transparent;
        cursor: pointer;

        .verticalWrapper {
            .icon {
                font-size: 48px;
            }

            p {
                margin: 4px;
                font-family: "Roboto", sans-serif;
            }
        }
    }
}

.configButton {
    height: 100%;
    width: 100%;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 24;
    background-color: white;
    overflow-x: hidden;
    overflow-y: auto;

    & > .textBox {
        width: 95%;

        margin: 16px auto;
    }

    button {
        width: 95%;

        margin: 8px auto;
        padding: 8px;
        display: block;

        outline: 0;
        border: 2px solid #007263;
        background-color: transparent;
        color: #007263;
        border-radius: 5px;
    }
}

</style>