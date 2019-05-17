<template lang="html">
	<div>
		<cardgrid>
            <card style="grid-column: 3 / 8; grid-row: 1 / 2;">
                <div class="img" style="
                    background-image: url(./build/src/images/construction.jpg);
                    background-position: 0% 1%"></div>
                <primaryTitle>
                    <h1>Under construction</h1>
                </primaryTitle>
                <p>Please keep in mind that this website is work in progress and things are subject to change. You may lose your character or any other information.</p>
                <actions>
                    <button @click="changeTo('versions')">
                        View progress
                    </button>
                </actions>
            </card>
            <card style="grid-column: 8 / 11; grid-row: 1 / 2;">
                <div class="img" style="
                    background-image: url(./build/src/images/characters.jpg);
                    background-position: 0% 83%"></div>
                <primaryTitle>
                    <h1>Characters</h1>
                </primaryTitle>
                <p>Keep track of your characters using this digital character sheet.</p>
                <actions>
                    <button @click="changeTo('characters')">
                        view
                    </button>
                </actions>
            </card>
            <card style="grid-column: 3 / 8; grid-row: 2 / 3;">
                <div class="img" style="
                    background-image: url(./build/src/images/groups.jpg);
                    background-position: 0% 57%"></div>
                <primaryTitle>
                    <h1>Groups</h1>
                </primaryTitle>
                <p>Team up with others and explore the universe</p>
                <actions>
                    <button @click="changeTo('groups')">
                        work in progress
                    </button>
                </actions>
            </card>
        </cardgrid>
	</div>
</template>

<script>
import { card, primaryTitle, actions, cardgrid } from "@components";

export default {
	components: {
		card,
		primaryTitle,
        actions,
        cardgrid
	},
	methods: {
		changeTo(p) {
			this.$router.push({path: `/${p}`});
		}
	}
}
</script>

<style lang="stylus" scoped>
</style>
