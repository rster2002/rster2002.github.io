<template lang="html">
	<div class="actions">
		<slot></slot>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
@import "../default.stylus";

.actions {
	width: 100%;
	padding: 8px;

	button {
		background-color: secondaryColor;
		box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
		border: 0;
		border-radius: interactiveRadius;
		padding: 6px 8px;
		color: #ffffff;
		font-family: 'Roboto', sans-serif;
		font-size: 12px;
		outline: 0;
		cursor: pointer;
		font-weight: 500;
		letter-spacing: 1.25px;
		margin-left: 8px;
		text-transform: uppercase;
		position: relative;

		.d {
			background-color: transparent;
			box-shadow: 0;
		}

		&.icon {
			font-size: 24px;
			background-color: transparent;
			box-shadow: 0 0 0 0 rgba(0,0,0,.2), 0 0 0 0 rgba(0,0,0,.14), 0 0 0 0 rgba(0,0,0,.12);
			color: secondaryColor;
			padding: 4px 8px;

			&:hover {
				background-color: rgba(secondaryColor, .2);
			}

			.material-icons {
				font-size: 20px;
			}
		}

		&:hover {
			background-color: rgba(secondaryColor, .8);
		}
	}
}

</style>
