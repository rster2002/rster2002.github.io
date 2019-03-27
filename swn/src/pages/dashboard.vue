<template lang="html">
	<div>
		<card>
			<div class="img" style="
				background-image: url(https://66.media.tumblr.com/6b762c2e987d5449bdda7346c6fa00db/tumblr_ntpgvmbiXO1qmr4eao1_500.jpg);
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
				background-image: url(https://i.pinimg.com/564x/8a/be/cf/8abecfb90c5ff4edeb69f29e89ec7d8f.jpg);
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
