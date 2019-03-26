<template lang="html">
	<div>
		<appbar>
			<barbtn>menu</barbtn>
			<bartitle minus="1">Hello</bartitle>
		</appbar>
		<mainView>
			<router-view></router-view>
		</mainView>
	</div>
</template>

<script>
import { appbar, barbtn, bartitle, mainView } from "@components";

export default {
	components: {
		appbar,
		barbtn,
		bartitle,
		mainView
	}
}
</script>
