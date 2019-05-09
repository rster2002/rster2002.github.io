<template>
    <div class="cardGrid">
        <slot></slot>
    </div>
</template>

<style lang="stylus">

@media only screen and (min-width: 1000px) {
	.cardGrid:not(.animated) {
		width: calc(100% - 32px);
		padding: 16px;
		display: inline-grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: auto;
		grid-gap: 16px 16px;

		& > .card {
            width: 100%;
			max-width: 100000px;
			// width: auto;
			grid-column: 1 / 4;
		}
	}

    .cardGrid.animated {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;

        & > span {
            width: calc(100% - 32px);
            padding: 16px;
            display: inline-grid;
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: auto;
            grid-gap: 16px 16px;

            & > .card {
                width: 100%;
                max-width: 100000px;
                // width: auto;
                grid-column: 1 / 4;
            }
        }
    }
}

</style>
