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
		border-radius: standardRadius;
		padding: 4px 8px;

		color: secondartColor;
		font-family: defaultFont;
		font-size: 18px;
		outline: 0;
		cursor: pointer;
		font-weight: 500;
		letter-spacing: 1.25px;

		&:hover {
			background-color: #e5e5e5;
		}
	}
}

</style>
