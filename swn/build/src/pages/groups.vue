<template lang="html">
	<div>
        <dialoglist @close="showCharacter = false" :show="showCharacter" title="Select Character:">
            <div class="optionList">
                <listitem v-for="character in characters" :key="character.id">
                    <div class="checkboxWrapper">
                        <radiobox></radiobox>
                    </div>
                    <div class="textWrapper">
                        <h1>{{ character.name }}</h1>
                    </div>
                </listitem>
            </div>
            <actions>
                <button>pick</button>
                <button>cancel</button>
            </actions>
        </dialoglist>
		<empty v-if="groups.length == 0">
			<img src="@svg/empty.svg" />
			<p>So empty</p>
		</empty>
		<cardgrid class="animated">
            <transition-group name="itemAnimation">
                <card v-for="(group, index) in groups" :key="group.id" :style="{ gridRow: row(index), gridColumn: column(index) }">
                    <primaryTitle>
                        <h1>{{ group.name }}</h1>
                    </primaryTitle>
                    <div>
                        <p v-if="group.description !== ''">{{ group.description }}</p>
                    </div>
                    <actions>
                        <button @click="openGroup(group)">open</button>
                    </actions>
                </card>
            </transition-group>
        </cardgrid>
		<fab @click="popup.create = true">add</fab>
        <popup @close="popup.create = false" :show="popup.create">
            <card>
                <x @click="popup.create = false"></x>
                <primaryTitle>
                    <h1>Join group</h1>
                    <h2>Join the adventure</h2>
                </primaryTitle>
                <div>
                    <textbox class="lessMargin" @change="jid" vname="joinId" label="id" helpertext="Is provided by your DM"></textbox>
                </div>
                <actions>
                    <button @click="joinGroup()" class="primary">Join</button>
                </actions>
            </card>
            <card>
                <primaryTitle>
                    <h1>New group</h1>
                    <h2>Let the adventure begin!</h2>
                </primaryTitle>
                <div>
                    <textbox class="lessMargin" @change="processChange" vname="name" label="Name" maxlength=32 helpertext="* required"></textbox>
                    <textbox class="lessMargin" @change="processChange" vname="description" label="Description" maxlength=200 type="textarea"></textbox>
                </div>
                <actions>
                    <button @click="postGroup()" class="primary">Create</button>
                </actions>
            </card>
        </popup>
        <snackbar :show="snackbar.complete">
            Group created
        </snackbar>
	</div>
</template>

<script>
import { card, primaryTitle, actions, empty, fab, popup, textbox, snackbar, x, cardgrid, dialoglist, listitem, radiobox } from "@components";
import { genId, user } from "@js/global.js";
import { fs, fsc, qu } from "@js/firebase.js";

export default {
	components: {
		card,
		primaryTitle,
		actions,
		empty,
        fab,
        popup,
        textbox,
        snackbar,
        x,
        cardgrid,
        dialoglist,
        listitem,
        radiobox
	},
	data() {
		return {
            groups: [],
            characters: [],
            showCharacter: false,
            popup: {
                create: false
            },
            snackbar: {
                complete: false
            },
            newGroup: {
                name: "",
                description: ""
            },
            joinId: ""
		}
    },
    methods: {
        processChange(a) {
            this.newGroup[a.key] = a.value;
        },
        jid(a) {
            this.joinId = a.value;
        },
        row(i) {
            var r = Math.floor(i / 4) + 1;
            return `${r} / ${r + 1}`;
        },
        column(i) {
            var r = (i % 4) * 3 + 1;
            return `${r} / ${r + 3}`;
        },
        postGroup() {
            if (this.newGroup.name !== "") {

                // Create an id for the group
                var id = "group-" + genId();
                console.log(id);
                // Creates the document in the group collection
                fs.collection("groups").doc(id).set({
                    id,
                    name: this.newGroup.name,
                    description: this.newGroup.description,
                    players: 0,
                    dm: user(),
                    created: Date.now()
                }).then(a => {
                    // Creates the data object for the group
                    let obj = {
                        id,
                        name: this.newGroup.name,
                        description: this.newGroup.description,
                        joined: Date.now(),
                        lastOpened: Date.now()
                    }

                    // Creates a batch to make sure the documents are added to the group and user
                    var batch = fsc.batch();
                    batch.set(fs.collection(`users/${user().uid}/groups`).doc(id), obj);
                    batch.set(fs.collection(`groups/${id}/users`).doc(user().uid), {
                        user: user(),
                        character: null,
                        joined: Date.now()
                    });

                    batch.commit().then(() => {
                        this.groups.push(obj);
                        this.popup.create = false;
                        this.snackbar.complete = true;
                        setTimeout(() => {
                            this.snackbar.complete = false;
                        }, 4000);
                    }); 
                });
            } else {
                alert("This group should have a (awesome) name.");
            }
        },
        async joinGroup() {
            var id = this.joinId;
            var query = await qu(fs.collection("groups").where("id", "==", id));

            if (query.length === 1) {
                var group = query[0];
                var query = await qu(fs.collection(`groups/${group.id}/users`).where("user.uid", "==", user().uid));

                if (query.length === 0) {
                    var characters = await qu(fs.collection(`users/${user().uid}/characters`).orderBy("lastModified", "desc"));
                    console.log(characters);

                    this.popup.create = false;

                    if (characters.length > 0) {
                        this.characters = characters;
                        this.showCharacter = true;
                    }

                    // group-lFE11QpfuBJrn7y9ov2A1ypCNHmHPBsI

                    // var batch = fsc.batch();
                    // batch.set(fs.collection(`users/${user().uid}/groups`).doc(group.id));
                } else {
                    alert("You already joined this group");
                }
            } else {
                alert("Can't find group")
            }
        },
        openGroup(group) {

        }
    },
    async created() {
        var query = await qu(fs.collection(`users/${user().uid}/groups`).orderBy("lastOpened", "desc"));
    }
}
</script>

<style lang="stylus" scoped>
.itemAnimation-enter-active {
	transition: 250ms cubic-bezier(0.4, 0.0, 0.2, 1) all;
}

.itemAnimation-enter {
	opacity: 0;
	transform: translateY(32px);
}

.itemAnimation-enter-to {
	opacity: 1;
	transform: translateY(0px);
}
</style>
