<template lang="html">
	<div class="header">
		<div class="wrapper">
			<div class="innerWrapper">
				<h2>Project</h2>
				<h1 :style="{background: 'linear-gradient(315deg, ' + color1 + ' 0%, ' + color2 + ' 74%)', webkitBackgroundClip: t}">{{ name }}</h1>
			</div>
		</div>
	</div>
</template>

<script>
import projects from "@projects";

function update(t) {
	t.t = "";
	console.log(t, projects);
	if (projects[t.$route.params.project] !== undefined) {
		var prj = projects[t.$route.params.project];
		console.log(t, prj);
		t.name = prj.name;
		t.color1 = prj.color[0];
		t.color2 = prj.color[1];

		t.t = "text";
	}
}

export default {
	data() {
		return {
			name: "",
			color1: "",
			color2: "",
			t: ""
		}
	},
	watch: {
		"$route": function() {
			update(this);
		}
	},
	created() {
		update(this);
	}
}
</script>

<style lang="stylus" scoped>
.header {
	width: 100%;
	height: 100%;
	background-color: #ffffff;

	.wrapper {

		position: relative;
		top: 50%;
		transform: translateY(-0%);


		opacity: 1;
		display: block;

		.innerWrapper {
			position: relative;
			display: inline-block;
			left: 128px;

			h2 {
				text-align: left;
				font-size: 46px;
				margin: 0;
				font-family: 'Montserrat', sans-serif;
				font-weight: 600;
				color: #9c9c9c;
				padding: 0px 8px;
			}

			h1 {
				display: inline-block;
				text-align: center;
				font-size: 142px;
				margin: 0;
				font-family: 'Montserrat', sans-serif;
				font-weight: 800;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				line-height: 132px;
			}
		}

		animation: fadein cubic-bezier(0.4, 0.0, 0.2, 1) 1000ms forwards;

		@keyframes fadein {
			0% {
				opacity: 0;
				transform: translateY(-0%);
			}

			100% {
				opacity: 1;
				transform: translateY(-50%);
			}
		}
	}
}
</style>
