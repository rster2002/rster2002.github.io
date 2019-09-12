<template lang="html">
	<div class="user">
		<div class="iconRow">
			<img :src="icon" />
		</div>
		<div class="nameRow">
			<h1>{{ username }}</h1>
			<h2 v-if="secondary !== undefined">{{ secondary }}</h2>
		</div>
	</div>
</template>

<script>
export default {
	props: ["icon", "username", "secondary"]
}
</script>

<style lang="stylus" scoped>
@import "../default.stylus";

.user {
	width: 100%;
	background-color: drawerUserBackgroundColor;
	display: inline-block;

	.iconRow {
		width: calc(100% - 32px);

		padding: 16px;

		img {
			height: 52px;
			width: 52px;
			border-radius: 50%;
		}
	}

	.nameRow {
		width: calc(100% - 32px);

		padding: 16px;
		padding-top: 0;

		h1 {
			margin: 0;
			font-size: 22px;
			font-family: defaultFont;
			font-weight: 400;
			color: drawerUserMainTextColor;
		}

		h2 {
			margin: 2px 0px;
			font-size: 16px;
			font-family: defaultFont;
			font-weight: 400;
			color: drawerUserSecondaryTextColor;
		}
	}
}
</style>
