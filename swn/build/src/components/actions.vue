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
		background-color: transparent;
		border: 0;
		border-radius: 2px;
		padding: 6px 8px;
		color: #197bb3;
		font-family: 'Roboto', sans-serif;
		font-size: 16px;
		outline: 0;
		cursor: pointer;
		font-weight: 500;
		letter-spacing: 1.25px;
		margin-left: 8px;

		.material-icons {
			font-size: 24px;
		}

		&:hover {
			background-color: #e5e5e5;
		}
	}
}

</style>
