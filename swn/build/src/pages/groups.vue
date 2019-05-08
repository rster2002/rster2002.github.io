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
		</card>
		<fab @click="popup.create = true">add</fab>
        <popup @close="popup.create = false" :show="popup.create">
            <card>
                <primaryTitle>
                    <h1>New group</h1>
                    <h2>Let the adventure begin!</h2>
                </primaryTitle>
                <div>
                    <textbox @change="processChange" vname="name" label="Name"></textbox>
                    <textbox @change="processChange" vname="description" label="Description" type="textarea"></textbox>
                </div>
                <actions>
                    <button class="primary">Create</button>
                </actions>
            </card>
        </popup>
	</div>
</template>

<script>
import { card, primaryTitle, actions, empty, fab, popup, textbox } from "@components";

export default {
	components: {
		card,
		primaryTitle,
		actions,
		empty,
        fab,
        popup,
        textbox
	},
	data() {
		return {
            groups: [],
            popup: {
                create: false
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
        }
    }
}
</script>

<style lang="stylus" scoped>
</style>
