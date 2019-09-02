<template lang="html">
	<div>
		<cardgrid>
            <card style="grid-column: 3 / 8; grid-row: 1 / 2;">
                <div class="img" style="
                    background-image: url(https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80);
                    background-position: 0% 0%"></div>
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
                    background-image: url(https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80);
                    background-position: 0% 37%"></div>
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
            <card style="grid-column: 6 / 11; grid-row: 2 / 3;">
                <div class="img" style="
                    background-image: url(https://images.unsplash.com/photo-1547234935-80c7145ec969?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80);
                    background-position: 0% 67%"></div>
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
            <card style="grid-column: 3 / 6; grid-row: 2 / 3;">
                <div class="img" style="
                    background-image: url(https://images.unsplash.com/photo-1537420327992-d6e192287183?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80);
                    background-position: center"></div>
                <primaryTitle>
                    <h1>Homebrew</h1>
                </primaryTitle>
                <p>Find homebrew equipment and stories</p>
                <actions>
                    <button @click="changeTo('groups')" disabled>
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
