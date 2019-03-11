<template lang="html">
	<div>
		<div class="card">
			<div class="userTimeline">
				<div class="user">

				</div>
				<div class="timeline">
					<div class="task" style="left: 18px; width: 100px;">

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
rowsize = 24px;

.userTimeline {
	width: 100%;
	height: rowsize;

	.user {
		width: rowsize;
		height: rowsize;
		float: left;
	}

	.timeline {
		width: "calc(100% - %s)" % rowsize;
		height: 100%;
		float: left;
		background-color: #e5e5e5;

		.task {
			height: 70%;
			position: relative;
			top: 50%;
			transform: translateY(-50%);
			background-color: #000f47;
			border-radius: 100px;
		}
	}
}
</style>
