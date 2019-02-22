<template lang="html">
	<div>
		<h1>Your stats</h1>
		<!-- <h2>Subtitle</h2> -->
		<div class="itemsWrapper">
			<v-colm color="#000042">
				<h1>Stocks</h1>
				<p>+8.2%</p>
			</v-colm>
			<v-colm color="#af0120">
				<h1>Profit</h1>
				<p>2.3 M</p>
			</v-colm>
			<v-colm color="#69006b">
				<h1>Expences</h1>
				<p>8.4 K</p>
			</v-colm>
			<v-colm color="#9458a2">
				<h1>Dead</h1>
				<p>76.0</p>
			</v-colm>
		</div>
	</div>
</template>

<script>
import vColm from "../components/vColm.vue";

export default {
	components: {
		"v-colm": vColm
	}
}
</script>

<style lang="css" scoped>
</style>
