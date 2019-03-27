<template lang="html">
	<div>
		<empty v-if="characters.length == 0">
			<img src="@svg/notfound.svg" />
			<p>So empty</p>
		</empty>
		<card v-for="character in characters" :key="character.name">
			<primaryTitle>
				<h1>{{ character.name }}</h1>
			</primaryTitle>
		</card>
	</div>
</template>

<script>
import { card, primaryTitle, actions, empty } from "@components";

export default {
	components: {
		card,
		primaryTitle,
		actions,
		empty
	},
	data() {
		return {
			characters: []
		}
	}
}
</script>

<style lang="stylus" scoped>
</style>
