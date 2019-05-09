<template lang="html">
	<div>
		<empty v-if="groups.length == 0">
			<img src="@svg/empty.svg" />
			<p>So empty</p>
		</empty>
		<card v-for="group in groups" :key="group.id">
			<primaryTitle>
				<h1>{{ group.name }}</h1>
			</primaryTitle>
            <div>
                <p v-if="group.description !== ''">{{ group.description }}</p>
            </div>
            <actions>
                <button>open</button>
            </actions>
		</card>
		<fab @click="popup.create = true">add</fab>
        <popup @close="popup.create = false" :show="popup.create">
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
import { card, primaryTitle, actions, empty, fab, popup, textbox, snackbar } from "@components";
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
        snackbar
	},
	data() {
		return {
            groups: [],
            popup: {
                create: false
            },
            snackbar: {
                complete: false
            },
            newGroup: {
                name: "",
                description: ""
            }
		}
    },
    methods: {
        processChange(a) {
            this.newGroup[a.key] = a.value;
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

                    // Creates the document for the user

                    console.log(fsc);
                    var batch = fsc.batch();
                    batch.set(fs.collection(`users/${user().uid}/groups`).doc(id), obj);
                    batch.set(fs.collection(`groups/${id}/users`).doc(user().uid), {
                        user: user(),
                        character: null,
                        joined: Date.now()
                    });
                    batch.commit().then(() => {
                        this.groups.push(obj);
                        this.snackbar.complete = true;
                        setTimeout(() => {
                            this.snackbar.complete = false;
                        }, 4000);
                    }); 
                });
            } else {
                alert("This group should have a (awesome) name.");
            }
        }
    },
    async created() {
        var query = await qu(fs.collection(`users/${user().uid}/groups`).orderBy("lastOpened", "desc"));

        this.groups = query;
    }
}
</script>

<style lang="stylus" scoped>
</style>
