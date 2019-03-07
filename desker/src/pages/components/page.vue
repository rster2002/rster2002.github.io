<template lang="html">
	<div class="page">
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
	width: calc(100% - 64px);
	display: inline-block;

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
		padding-top: 64px;
		padding-bottom: 64px;
		overflow-y: auto;

		.wrapper {
			width: 100%;
			height: 100%;
			display: flex;

			.col {
				height: 100%;

				&1 {
					flex-basis: 50%;
				}
			}
		}

		.card {
			width: calc(95% - 16px);
			border: 1px solid #1d1d1d;
			border-radius: 4px;
			padding: 8px;
			margin-left: auto;
			margin-right: auto;
			margin-top: 8px;
			margin-bottom: 8px;
			overflow-x: hidden;
			overflow-y: auto;

			&.m2 {
				max-height: 50%;
			}

			h1 {
				margin: 0;
				padding: 0px 4px;
				font-family: 'Montserrat', sans-serif;
				color: #000000;
				width: calc(100% - 8px);

				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;

				&.big {
					font-size: 52px;
				}
			}

			p {
				margin: 4px 0px;
				padding: 0px 4px;
				width: calc(100% - 8px);
				font-family: 'Montserrat', sans-serif;
				font-size: 16px;
				color: #000000;
				white-space: normal;

				.tag {
					height: 100%;
					padding: 0px 4px;
					border-radius: 2px;
					margin-right: 8px;
					font-size: 12px;
					color: white;

					&.blue {
						background-color: #3070ff;
					}

					&.red {
						background-color: #ff3030;
					}

					&.orange {
						background-color: #cc7a00;
					}

					&.purple {
						background-color: #6b00cc;
					}

					&.pink {
						background-color: #cc0460;
					}

					&.green {
						background-color: #019226;
					}

					&.grey {
						background-color: #696969;
					}

					img {
						height: 14px;
						position: relative;
						top: 2px;
					}
				}
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

				& > img {
					height: 24px;
					border-radius: 50%;
					float: left;
					margin-left: 14px;
					position: relative;
					top: 50%;
					transform: translateY(-50%);
				}

				p {
					position: relative;
					top: 50%;
					transform: translateY(-50%);
					margin: 0;
					padding: 0px 14px;
					font-family: 'Montserrat', sans-serif;
					font-weight: 600;
					font-size: 16px;
					float: left;
					width: 80%;

					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}
}

@media screen and (max-width: 600px) {
	.page .content .wrapper .col {
		&1 {
			flex-basis: 100%;
		}
	}
}
</style>
