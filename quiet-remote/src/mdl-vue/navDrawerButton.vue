<template lang="html">
	<button :class="classes" @click="navToRoute()">
		<div class="mdl navDrawerButtonIconWrapper">
			<icon>
                {{ icon }}
            </icon>
		</div>
		<div class="mdl navDrawerButtonTextWrapper">
			<p><slot></slot></p>
		</div>
	</button>
</template>

<script>
import vueChannel from "vue-channel";
import icon from "./icon.vue";

export default {
    props: ["icon", "navTo"],
    data() {
        return {
            classes: ["mdl", "navDrawerButton"]
        }
    },
    components: {
        icon
    },
    watch: {
        $route() {
            if (this.$route.path === this.navTo) {
                this.classes = ["mdl", "navDrawerButton", "indicator"];
            } else {
                this.classes = ["mdl", "navDrawerButton"];
            }
        }
    },
    methods: {
        navToRoute() {
            this.$emit("click");

            this.$router.push(this.navTo);
        }
    }
}
</script>

<style lang="scss" scoped>

@import "./config.scss";

.navDrawerButton {
	height: $navDrawerButtonHeight;
	width: calc(100% - 16px);

	margin: 8px 8px;

    border: 0;
    outline: 0;
    border-radius: $navDrawerButtonBorderRadius;
    color: $navDrawerButtonFontColor;
    background-color: transparent;
	cursor: pointer;

	.navDrawerButtonIconWrapper {
		height: $navDrawerButtonHeight;
		width: $navDrawerButtonHeight;

        float: left;
	}

	.navDrawerButtonTextWrapper {
		width: calc(100% - #{$navDrawerButtonHeight});
		height: $navDrawerButtonHeight;

        float: left;
        
		p {
			width: calc(100% - 32px);

			position: relative;
			top: 50%;
			transform: translateY(-50%);
			margin: 0;
			padding: 0px 16px;

            font-family: $navDrawerButtonFontFamily;
            font-size: $navDrawerButtonFontSize;
            text-align: left;
		}
	}

	&.indicator {
		background-color: rgba($navDrawerButtonIndicatorColor, .1);
        color: $navDrawerButtonIndicatorColor;
	}
}

</style>

<style lang="scss">

@import "./config.scss";

.navDrawerButton .icon {
    display: block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    text-align: center;
    font-size: $navDrawerButtonIconSize;
}

</style>
