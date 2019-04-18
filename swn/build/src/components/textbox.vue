<template lang="html">
	<div class="textbox" :class="{ f: focus }" @click="f()">
		<p :class="{ c: focus }"><span>{{ label }}</span></p>
		<input :type="t" @focus="f()" @blur="b()" v-model="v" ref="n" />
	</div>
</template>

<script>
export default {
	props: ["label", "val", "vname", "type"],
	data() {
		return {
			v: "",
			n: "",
			focus: false,
			t: "text"
		}
	},
	watch: {
		val() {
			if (this.v !== this.val) {
				this.v = this.val;
			}
		},
		v() {
			var v = this.v;

			if (this.type === "number") {
				v = Number(v);
			}

			this.$emit("change", {
				label: this.label,
				key: this.n,
				value: v
			});
		}
	},
	methods: {
		f() {
			this.focus = true;
			this.$refs.n.focus();
		},
		b() {
			if (this.v === "") {
				this.focus = false;
			}
		}
	},
	created() {
		if (this.val !== undefined) {
			this.v = this.val;
			if (this.v !== "") {
				this.focus = true;
			}
		}

		if (this.vname === undefined) {
			this.n = this.label
		} else {
			this.n = this.vname;
		}

		if (this.type !== undefined) {
			this.t = this.type;
		}
	}
}
</script>

<style lang="stylus" scoped>
@import "../default.stylus";

size = 20px;

.textbox {
	position: relative;
	height: size + 12px;
	width: 90%;
	border: 2px solid textboxBorder;
	border-radius: interactiveRadius;

	margin: 32px;
	margin-left: auto;
	margin-right: auto;

	padding: 2px 0px;

	&.f {
		border: 2px solid secondaryColor;
	}

	p {
		margin: 0;
		padding: 0px 0px;
		display: inline-block;

		position: absolute;
		z-index: 1;
		top: 50%;
		left: 8px;
		transform: translateY(-50%);

		font-family: defaultFont;
		font-size: size;

		transition: 100ms cubic-bezier(0.4, 0.0, 0.2, 1) all;
		cursor: text;

		&.c {
			top: -4%;
			font-size: 12px;
			color: secondaryColor;
			cursor: default;
		}

		span {
			display: inline-block;
			background-color: white;
			padding: 0px 4px;
		}
	}

	input {
		position: absolute;
		border: 0;
		outline: 0;
		padding: 0px 8px;
		width: calc(99% - 16px);

		padding: 0px 0px;

		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		font-size: size;

		font-family: defaultFont;
	}
}

</style>
