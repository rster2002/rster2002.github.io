<template lang="html">
 	<div class="app">
		<v-header></v-header>
		<div class="page">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import vHeader from "./components/header.vue";

export default {
	components: {
		"v-header": vHeader
	}
}
</script>

<style lang="stylus">

@import "./global.stylus";

.app {
	width: 100%;
	height: 100%;

	& > .page {
		margin-top: 64px;
		width: 100%;
		height: calc(100% - 64px);
		background-color: #e5e5e5;
		position: fixed;

		& > div {
			width: 95%;
			max-width: 935px;
			padding: 32px 0px;
			position: relative;
			margin-left: auto;
			margin-right: auto;

			& > div {
				width: calc(100% - 16px);
				padding: 16px;
				box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
				// border: 2px solid #7d7d7d;
				border-radius: 10px;
				background-color: #ffffff;

				p {
					font-family: font;
					font-weight: 600;
					margin: 0;
				}
			}
		}
	}
}

@media screen and (max-width: 600px) {
	.app > .page {
		height: calc(100% - 54px);
		margin-top: 54px;
	}
}

</style>
