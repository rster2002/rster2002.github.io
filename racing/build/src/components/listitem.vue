<template>
    <div class="listItem">
        <slot></slot>
    </div>
</template>

<style lang="stylus">

@import "../default.stylus";

.listItem {
	padding: 8px 16px;
	width: calc(100% - 32px);
	border-bottom: 1px solid dividerColor;
	// display: inline-block;

	&:first-child {
		border-top: 1px solid dividerColor;
	}

	h1 {
		color: black;
		font-family: defaultFont;
		font-size: 16px;
		font-weight: 900;
		margin: 6px 0px;
	}

    .checkboxWrapper {
        width: 48px;
        height: 100%;

        float: left;

        & > .radio {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .textWrapper {
        height: 100%;
        width: calc(100% - 48px);

        float: left;

        & > h1 {
            position: relative;
            top: 50%;
            left: 0;
            transform: translateY(-50%);

            margin-left: 0;
            padding-left: 0;
            margin: 0;
        }
    }
}

</style>
