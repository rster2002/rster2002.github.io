<template lang="html">
	<div class="checkbox" :class="{ c: checked, d: checked2 }" @click="toggleChecked()">
		<span class="material-icons">done</span>
	</div>
</template>

<script>
export default {
	props: ["vname", "val"],
	data() {
		return {
			checked: false,
			checked2: false,
			c: false
		}
	},
	watch: {
		c() {
			if (!this.c) {
				this.checked2 = false;
				setTimeout(a => {
					this.checked = false;
				}, 100);
			} else {
				this.checked = true;
				setTimeout(a => {
					this.checked2 = true;
				}, 100);
			}

			this.$emit("change", {
				key: this.vname,
				value: this.c
			});
		},
		val() {
			if (this.val !== undefined) {
				console.log(this.val, this.c);
				if (this.val === true || this.val === "true") {
					this.c = true;
				} else {
					this.c = false;
				}
			}
		}
	},
	methods: {
		toggleChecked() {
			this.c = !this.c;
		}
	},
	created() {
		if (this.val !== undefined) {
			if (this.val === "true" || this.val === true) {
				this.c = true;
			} else {
				this.c = false;
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import "../default.stylus";

size = 20px;

.checkbox {
	width: size - 2px;
	height: size - 2px;

	cursor: pointer;

	border-radius: standardRadius + 4px;
	border: 2px solid secondaryColor;

	transition: 100ms cubic-bezier(0.4, 0.0, 0.2, 1) all;

	span {
		font-size: size - 2px;
		color: #ffffff;
		font-weight: 500;

		transition: 100ms cubic-bezier(0.4, 0.0, 0.2, 1) all;

		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0);
	}

	&.c {
		background-color: secondaryColor;
	}

	&.d {
		span {
			transform: translate(-50%, -50%) scale(1);
		}
	}
}

</style>
