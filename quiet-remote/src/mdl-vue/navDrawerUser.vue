<template lang="html">
	<div class="mdl navDrawerUser">
		<div class="mdl navDrawerUserIconRow">
			<img :src="icon" />
		</div>
		<div class="mdl navDrawerUserNameRow">
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

<style lang="scss" scoped>

@import "./config.scss";

.navDrawerUser {
	width: 100%;
	background-color: $navDrawerUserBackgroundColor;
	display: inline-block;

	.navDrawerUserIconRow {
		width: calc(100% - 32px);

		padding: 16px;

		img {
			height: 52px;
			width: 52px;
			border-radius: $navDrawerUserImgBorderRadius;
		}
	}

	.navDrawerUserNameRow {
		width: calc(100% - 32px);

		padding: 16px;
		padding-top: 0;

		h1 {
			margin: 0;
            
            color: $navDrawerPrimaryTextColor;
            font-family: $navDrawerPrimaryTextFontFamily;
            font-weight: $navDrawerPrimaryTextFontWeight;
            font-size: $navDrawerPrimaryTextFontSize;
            text-transform: $navDrawerPrimaryTextFontTransform;
            letter-spacing: $navDrawerPrimaryTextLetterSpacing;
		}

		h2 {
			margin: 2px 0px;
            
            color: $navDrawerSecondaryTextColor;
            font-family: $navDrawerSecondaryTextFontFamily;
            font-weight: $navDrawerSecondaryTextFontWeight;
            font-size: $navDrawerSecondaryTextFontSize;
            text-transform: $navDrawerSecondaryTextFontTransform;
            letter-spacing: $navDrawerSecondaryTextLetterSpacing;
		}
	}
}
</style>
