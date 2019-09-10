<template lang="html">
	<div>
		<empty v-if="noContent">
			<img src="@svg/notfound.svg" />
			<p>No one here</p>
		</empty>
		<cardgrid class="animated">
            <transition-group name="itemAnimation">
                <card v-for="(character, index) in characters" :key="character.id" :style="{ gridRow: row(index), gridColumn: column(index) }">
                    <primaryTitle>
                        <h1 v-if="character.name !== ''">{{ character.name }}</h1>
                        <h1 v-else>Not named</h1>
                    </primaryTitle>
                    <actions>
                        <button @click="openCharacter(character.id)">
                            view
                        </button>
                    </actions>
                </card>
            </transition-group>
        </cardgrid>
		<fab @click="createCharacter()">add</fab>
	</div>
</template>

<script>
import { card, primaryTitle, actions, empty, fab, cardgrid } from "@components";
import { genId, user } from "@js/global.js";

import { fs, qu } from "@js/firebase.js";

export default {
	components: {
		card,
		primaryTitle,
		actions,
		empty,
        fab,
        cardgrid
	},
	data() {
		return {
			characters: [],
			noContent: false
		}
	},
	methods: {
		createCharacter() {
			var t = this;
			var id = "c" + genId(9);
			var doc = {
				id,
				createdAt: Date.now(),
				lastModified: Date.now(),
				name: "",
				owner: user().uid
			}

			fs.collection(`users/${user().uid}/characters`).doc(id).set(doc).then(a => {
				t.$router.push({ path: `/character/${user().uid}/${id}`});
			});
		},
		openCharacter(id) {
			this.$router.push({path: `/character/${user().uid}/${id}`});
        },
        row(i) {
            var r = Math.floor(i / 4) + 1;
            return `${r} / ${r + 1}`;
        },
        column(i) {
            var r = (i % 4) * 3 + 1;
            return `${r} / ${r + 3}`;
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
					setTimeout(a => {
						t.characters.push(entry);
					}, 50 * i)
				});
			}
		})
	}
}
</script>

<style lang="stylus">

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
