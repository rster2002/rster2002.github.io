<template lang="html">
	<div class="btn" @click="clk()">
		<p class="material-icons">
			<slot v-if="showIcon"></slot>
			<span v-if="menu === 'true'">{{ showMenu }}</span>
		</p>
	</div>
</template>

<script>

function changeIcon(t) {
	if (t.menu !== undefined && t.menu === "true") {
		t.showIcon = false;
		if (t.$route.path === "/") {
			t.showMenu = "menu";
		} else {
			t.showMenu = "arrow_back";
		}
	} else {
		t.showIcon = true;
	}
}

export default {
	props: ["menu"],
	data() {
		return {
			showIcon: true,
			showMenu: ""
		}
	},
	watch: {
		"$route": function() {
			changeIcon(this);
		}
	},
	methods: {
		clk() {
			if (this.menu !== undefined && this.menu === "true") {
				if (this.$route.path === "/") {
					this.$emit('menu')
				} else {
					this.$emit('back')
				}
			} else {
				this.$emit('click');
			}
		}
	},
	created() {
		changeIcon(this);
	}
}
</script>

<style lang="stylus" scoped>

.btn {
	height: 64px;
	width: 64px;
	float: left;
	cursor: pointer;

	p {
		margin: 0;
		color: #ffffff;
		font-size: 24px;

		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}

</style>
