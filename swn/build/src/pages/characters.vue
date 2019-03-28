<template lang="html">
	<div>
		<empty v-if="noContent">
			<img src="@svg/notfound.svg" />
			<p>No one here</p>
		</empty>
		<card v-for="character in characters" :key="character.id">
			<primaryTitle>
				<h1 v-if="character.name !== ''">{{ character.name }}</h1>
				<h1 v-else>Not named</h1>
			</primaryTitle>
		</card>
		<fab @click="createCharacter()">add</fab>
	</div>
</template>

<script>
import { card, primaryTitle, actions, empty, fab } from "@components";
import { genId, user } from "@js/global.js";

import { fs, qu } from "@js/firebase.js";

export default {
	components: {
		card,
		primaryTitle,
		actions,
		empty,
		fab
	},
	data() {
		return {
			characters: [],
			noContent: false
		}
	},
	methods: {
		createCharacter() {
			var id = "character-" + genId();
			var doc = {
				id,
				createdAt: Date.now(),
				lastModified: Date.now(),
				name: "",
				owner: user().uid
			}

			fs.collection(`users/${user().uid}/characters`).doc(id).set(doc).then(a => console.log("Success"));
		}
	},
	created() {
		var t = this;
		qu(fs.collection(`users/${user().uid}/characters`).orderBy("lastModified", "desc").limit(10)).then(a => {
			if (a.length === 0) {
				t.noContent = true;
			} else {
				t.noContent = false;
				a.forEach((entry, i) => {
					t.characters.push(entry);
				});
			}
		})
	}
}
</script>

<style lang="stylus" scoped>
</style>
