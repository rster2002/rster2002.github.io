<template lang="html">
	<div>
		<empty v-if="ships.length == 0">
			<img src="@svg/empty.svg" />
			<p>So empty</p>
		</empty>
		<card v-for="ship in ships" :key="ship.name">
			<primaryTitle>
				<h1>{{ ship.name }}</h1>
			</primaryTitle>
		</card>
		<fab>add</fab>
	</div>
</template>

<script>
import { card, primaryTitle, actions, empty, fab } from "@components";

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
			ships: []
		}
	}
}
</script>

<style lang="stylus" scoped>
</style>
