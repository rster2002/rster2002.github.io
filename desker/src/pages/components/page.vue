<template lang="html">
	<div class="page">
		<div class="gutter"></div>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
.page {
	height: 100%;
	width: 100%;
	float: left;

	&.ex {
		width: 80%;
	}

	.gutter {
		width: 100%;
		height: 64px;
	}

	.content {
		width: 100%;
		height: calc(100% - 64px);

		.card {
			width: calc(95% - 16px);
			border: 1px solid #1d1d1d;
			border-radius: 4px;
			padding: 8px;
			margin-left: auto;
			margin-right: auto;
			margin-top: 8px;
			margin-bottom: 8px;

			h1 {
				margin: 0;
				padding: 0px 4px;
				font-family: 'Montserrat', sans-serif;
				color: #ffffff;
				width: calc(100% - 8px);

				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.listItem {
				height: 36px;
				width: calc(100% + 16px);
				position: relative;
				left: -8px;
				cursor: pointer;

				&:hover {
					background-color: #e8e8e8;
				}

				p {
					position: relative;
					top: 50%;
					transform: translateY(-50%);
					margin: 0;
					padding: 0px 8px;
					font-family: 'Montserrat', sans-serif;
					font-weight: 600;
					font-size: 16px;
				}
			}
		}
	}
}
</style>
