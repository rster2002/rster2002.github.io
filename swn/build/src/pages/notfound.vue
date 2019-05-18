<template lang="html">
	<div>
		<empty>
			<img src="@svg/404.svg" />
			<p @click="b()" id="rtrn">Get back to safety</p>
		</empty>
	</div>
</template>

<script>
import { empty } from "@components";

export default {
	components: {
		empty
	},
	methods: {
		b() {
			this.$router.push({ path: "/" });
		}
	}
}
</script>

<style lang="stylus">

#rtrn {
	text-decoration: underline;
    cursor: pointer;
}

</style>
