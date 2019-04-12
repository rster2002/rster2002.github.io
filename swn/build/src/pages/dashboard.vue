<template lang="html">
	<div>
		<card>
			<div class="img" style="
				background-image: url(https://i.pinimg.com/564x/34/72/78/347278cc7ed550049e3e118c824891b2.jpg);
				background-position: 0% 1%"></div>
			<primaryTitle>
				<h1>Under construction</h1>
			</primaryTitle>
			<p>Please keep in mind that this website is work in progress and things are subject to change. You may lose your character or any other information.</p>
		</card>
		<card>
			<div class="img" style="
				background-image: url(https://i.pinimg.com/564x/79/0c/e5/790ce538b5f94b73a53d43226ddb6b23.jpg);
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
		<card>
			<div class="img" style="
				background-image: url(https://i.pinimg.com/564x/ae/20/d1/ae20d1d22f87012689b1b58813dae2df.jpg);
				background-position: 0% 57%"></div>
			<primaryTitle>
				<h1>Ships</h1>
			</primaryTitle>
			<p>Your gateway to the universe. Keep track of them here.</p>
			<actions>
				<button @click="changeTo('ships')">
					view
				</button>
			</actions>
		</card>
	</div>
</template>

<script>
import { card, primaryTitle, actions } from "@components";

export default {
	components: {
		card,
		primaryTitle,
		actions
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
