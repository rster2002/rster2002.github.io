<template lang="html">
	<transition name="navDrawerScrim">
		<div @click="closeDrawer()" class="mdi navDrawerScrim" v-if="internalShow">
			<transition name="navDrawerTransition" appear>
				<nav class="mdi navDrawer" v-if="internalShow">
					<slot></slot>
				</nav>
			</transition>
		</div>
	</transition>
</template>

<script>
import vueChannel from "vue-channel";

export default {
	props: ["show", "name"],
    data() {
        return {
            internalShow: false
        }
    },
    watch: {
        show() {
            if (this.show !== undefined) {
                this.internalShow = this.show
            }
        }
    },
    methods: {
        closeDrawer() {
            this.internalShow = false;
        }
    },
    created() {
        if (this.name !== undefined) {
            vueChannel("toggle:" + this.name)
                .receive(state => {
                    this.internalShow = !this.internalShow;
                });

            vueChannel("open:" + this.name)
                .receive(state => {
                    this.internalShow = true;
                });
        }
    }
}
</script>

<style lang="scss" scoped>

@import "./config.scss";

.navDrawerScrim {
	height: 100%;
    width: 100%;
    
	position: fixed;
	top: 0;
	left: 0;
	z-index: 16;
    
    background-color: $navDrawerScrimColor;

	.navDrawer {
		height: 100%;
		width: 80%;
        max-width: 400px;
        
        background-color: $navDrawerBackgroundColor;
        box-shadow: $navDrawerElevation;
	}
}

.navDrawerScrim-enter-active, .navDrawerScrim-leave-active, .navDrawerTransition-enter-active, .navDrawerTransition-leave-active {
	transition: $navDrawerTransition;
}

.navDrawerScrim-enter, .navDrawerScrim-leave-to {
	opacity: 0;
}

.navDrawerScrim-enter-to, .navDrawerScrim-leave {
	opacity: 1;
}

.navDrawerTransition-enter, .navDrawerTransition-leave-to {
	transform: translateX(-100%);
}

.navDrawerTransition-enter-to, .navDrawerTransition-leave {
	transform: translateX(0%);
}

</style>
