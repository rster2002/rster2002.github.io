<template>
    <div>
        <cardgrid>
            <!-- <card d style="grid-column: 1 / 5; grid-row: 1 / 2">
                <primaryTitle>
                    <h1>Group</h1>
                </primaryTitle>
            </card>
            <card d style="grid-column: 5 / 13; grid-row: 1 / 2">
                
                
            </card> -->
            <card d style="grid-column: 11 / 13; grid-row: 1 / 2">
                <primaryTitle>
                    <h1>Players</h1>
                </primaryTitle>
                <div>
					<div class="listItem" v-for="player in players" :key="player.user.uid">
                        <h1 class="interactive" @click="player.open = !player.open"><dropdownindicator :val="player.open"></dropdownindicator> {{ player.user.username }}</h1>
                        <dropdowncontent :show="player.open">
                            <actions>
                                <button @click="openCharacter(player)">open character</button>
                            </actions>
                        </dropdowncontent>
					</div>
				</div>
            </card>
            <div style="grid-column: 1 / 11; grid-row: 1 / 2">
                <div class="characterSheetWrapper" v-if="loadedCharacter.character !== ''">
                    <characterSheet :userUid="loadedCharacter.uid" :characterId="loadedCharacter.character"></characterSheet>
                </div>
                <empty class="emptyWrapper" v-if="loadedCharacter.character === ''">
                    <h1>No character loaded</h1>
                </empty>
            </div>
            <card d style="grid-column: 11 / 13; grid-row: 2 / 7">
                <primaryTitle>
                    <h1>Ships</h1>
                </primaryTitle>
                <div>
                    <div class="listItem" v-for="ship in ships" :key="ship.id">
                        <h1 class="interactive" @click="ship.open = !ship.open"><dropdownindicator :val="ship.open"></dropdownindicator> {{ ship.name }}</h1>
                        <dropdowncontent :show="ship.open">
                            <actions>
                                <button @click="openShip(ship)">open character</button>
                            </actions>
                        </dropdowncontent>
					</div>
                </div>
                <actions>
                    <button class="primary" @click="newShip()">add ship</button>
                </actions>
            </card>
            <card d style="grid-column: 1 / 11; grid-row: 2 / 3" v-if="showShip.captain">
                <primaryTitle>
                    <h1>Captain</h1>
                </primaryTitle>
                <textbox v-model="ship.name" label="Ship name"></textbox>
                <actions>
                    <button @click="saveShip()">Save</button>
                </actions>
            </card>
            <card d style="grid-column: 1 / 11; grid-row: 3 / 4" v-if="showShip.engineer">
                <primaryTitle>
                    <h1>Engineer</h1>
                </primaryTitle>
            </card>
            <card d style="grid-column: 1 / 11; grid-row: 4 / 5" v-if="showShip.scientist">
                <primaryTitle>
                    <h1>Scientist</h1>
                </primaryTitle>
            </card>
            <card d style="grid-column: 1 / 11; grid-row: 5 / 6" v-if="showShip.pilot">
                <primaryTitle>
                    <h1>Pilot</h1>
                </primaryTitle>
            </card>
            <card d style="grid-column: 1 / 11; grid-row: 6 / 7" v-if="showShip.weaponMaster">
                <primaryTitle>
                    <h1>Weapon Master</h1>
                </primaryTitle>
            </card>
        </cardgrid>
    </div>
</template>

<script>
import { card, cardgrid, primaryTitle, dropdownindicator, dropdowncontent, actions, empty, textbox } from "@components";

import { fs, qu } from "@js/firebase.js";
import { user, genId } from "@js/global.js";

import characterSheet from "./character.vue";

async function updatePage(t) {

    var players = await qu(fs.collection(`groups/${t.$route.params.groupid}/users`));
    players = players.filter(a => {return a.character !== null});
    players = players.map(a => {return {...a, open: false}});
    t.players = players;

    players.forEach(player => {
        if (player.user.uid === user().uid && player.character !== null) {
            t.openCharacter(player);
        }
    });

    let ships = await qu(fs.collection(`groups/${t.$route.params.groupid}/ships`));

    t.ships = ships.map(a => {
        return {...a, open: false}
    });

}

export default {
    components: {
        card,
        primaryTitle,
        cardgrid,
        dropdownindicator,
        dropdowncontent,
        actions,
        characterSheet,
        empty,
        textbox
    },
    data() {
        return {
            players: [],
            ships: [],
            ship: {},
            loadedCharacter: {
                uid: "",
                character: ""
            },
            showShip: {
                captain: false,
                engineer: false,
                scientist: false,
                pilot: false,
                weaponMaster: false
            }
        }
    },
    watch: {
        "$route": function() {
            updatePage(this);
        }
    },
    methods: {
        openCharacter(player) {
            // this.$router.push(`/character/${player.user.uid}/${player.character}`)
            this.loadedCharacter.uid = player.user.uid;
            this.loadedCharacter.character = player.character;
        },
        newShip() {
            let shipId = "ship-" + genId();
            let shipObj = {
                name: "New ship",
                id: shipId,
                hull: "",
                open: false
            }

            fs.collection(`groups/${this.$route.params.groupid}/ships`)
                .doc(shipId)
                .set(shipObj)
                .then(() => {
                    this.ships.push(shipObj);
                });
        },
        openShip(ship) {
            this.ship = Object.assign({}, this.ship, ship);

            this.showShip.captain = true;
            this.showShip.engineer = true;
            this.showShip.scientist = true;
            this.showShip.pilot = true;
            this.showShip.weaponMaster = true;
        },
        saveShip() {

            fs.collection(`groups/${this.$route.params.groupid}/ships`)
                .doc(this.ship.id)
                .update(this.ship);
        }
    },
    created() {
        updatePage(this);
    }
}
</script>

<style lang="stylus">

@import "../default.stylus";

.listItem {
	padding: 8px 16px;
	width: calc(100% - 32px);
	border-bottom: 1px solid dividerColor;
	// display: inline-block;

	&:first-child {
		border-top: 1px solid dividerColor;
	}

	h1 {
		color: black;
		font-family: defaultFont;
		font-size: 16px;
		font-weight: 900;
		margin: 6px 0px;
	}
}

.dropdownInd {
	transform: translateY(4px) rotate(0deg);
	transition: 200ms cubic-bezier(0.4, 0.0, 0.2, 1) transform;

	&.d {
		transform: translateY(4px) rotate(180deg);
	}
}

.interactive {
    cursor: pointer;
}

.characterSheetWrapper .cardGrid {
    padding: 0;
}

.emptyWrapper {
    background-color: #fff;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12);
    border-radius: standardRadius;

    h1 {
        font-family: defaultFont;
        color: rgba(#000, 0.3);
        margin: 0;
    }
}

@media only screen and (min-width: 1000px) {
    .characterSheetWrapper {
        margin-right: -32px;
    }
}

</style>