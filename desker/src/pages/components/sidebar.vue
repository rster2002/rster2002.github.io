<template lang="html">
	<div class="sidebar">
		<div class="item">
			<div class="icon">
				<img :src="user.icon" />
			</div>
			<div class="text">
				<p>{{ user.name }}</p>
			</div>
		</div>
		<slot></slot>
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: {
				icon: "",
				name: ""
			}
		}
	},
	created() {
		var user = JSON.parse(sessionStorage.getItem("user"));
		this.user.icon = user.photoURL;
		this.user.name = user.displayName;
	}
}
</script>

<style lang="stylus">

.sidebar {
	width: 64px;
	height: 100%;
	background-color: #131313;
	transition: width cubic-bezier(0.4, 0.0, 0.2, 1) 200ms;
	float: left;

	p {
		z-index: -1;
		opacity: 0;
		transition: all cubic-bezier(0.4, 0.0, 0.2, 1) 200ms;
	}

	&:hover {
		width: 20%;

		p {
			z-index: 1;
			opacity: 1;
		}
	}

	&.ex {
		width: 20%;

		p {
			z-index: 1;
			opacity: 1;
		}
	}

	itemsize = 64px;

	.item {
		width: 100%;
		height: itemsize;

		&.i {
			cursor: pointer;

			&:hover {
				background-color: #232323;
			}
		}

		.icon {
			width: itemsize;
			height: itemsize;
			float: left;

			img {
				height: 65%;
				width: 65%;
				position: relative;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);

				border-radius: 50%;

				&.i {
					width: 40%;
					height: 40%;
					border-radius: 0px;
				}
			}
		}

		.text {
			width: "calc(100% - %s)" % itemsize;
			height: itemsize;
			float: left;

			p {
				width: 100%;
				padding: 0px 8px;
				position: relative;
				top: 50%;
				transform: translateY(-50%);
				margin: 0;
				font-family: 'Montserrat', sans-serif;
				color: white;
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

		p {
			margin: 4px 0px;
			padding: 0px 4px;
			width: calc(100% - 8px);
			font-family: 'Montserrat', sans-serif;
			font-size: 16px;
			color: #ffffff;
		}

		button {
			margin: 4px 0px;
			width: 100%;
			padding: 6px;
			background-color: #252525;
			border: 0;

			font-family: 'Montserrat', sans-serif;
			font-weight: 500;
			color: white;

			cursor: pointer;
			border-radius: 4px;

			outline: 0;

			&:hover {
				background-color: #292929;
			}
		}

		.listItem {
			width: calc(100% + 16px);
			height: 36px;
			position: relative;
			left: -8px;
			cursor: pointer;

			&:hover {
				background-color: #252525;
			}

			p {
				position: relative;
				top: 50%;
				transform: translateY(-50%);
				font-family: 'Montserrat', sans-serif;
				font-size: 16px;
				padding: 0px 8px;

				width: 100%;

				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;

				.tag {
					height: 100%;
					padding: 0px 4px;
					border-radius: 2px;
					margin-right: 8px;

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

					img {
						height: 16px;
					    transform: translateY(2px);
					}
				}
			}
		}
	}
}

</style>
