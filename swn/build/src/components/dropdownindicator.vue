<template>
    <span class="dropdownInd material-icons" :class="{ d: v }">arrow_drop_up</span>
</template>

<script>
export default {
    props: ["val"],
    data() {
        return {
            v: false
        }
    },
    watch: {
        val() {
            if (this.val === true || this.val === "true") {
                this.v = true;
            } else {
                this.v = false;
            }
        }
    },
    created() {
        if (this.val === true || this.val === "true") {
            this.v = true;
        } else {
            this.v = false;
        }
    }
}
</script>


<style lang="stylus" scoped>
.dropdownInd {
	transform: translateY(4px) rotate(0deg);
	transition: 200ms cubic-bezier(0.4, 0.0, 0.2, 1) transform;

	&.d {
		transform: translateY(4px) rotate(180deg);
	}
}

.contentDropdown-enter-active {
	transition: 200ms cubic-bezier(0.4, 0.0, 0.2, 1) all;
}

.contentDropdown-enter {
	opacity: 0;
	transform: translateY(-16px);
}

.contentDropdown-enter-to {
	opacity: 1;
	transform: translateY(0);
}
</style>