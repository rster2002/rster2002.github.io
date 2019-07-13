<template>
    <button class="btn" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>

$interactiveRadius: 5px;
$secondaryColor: #212121;

.btn {
    background-color: $secondaryColor;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    border: 0;
    border-radius: $interactiveRadius;
    padding: 0px 16px;
    height: 36px;
    color: #ffffff;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    outline: 0;
    cursor: pointer;
    font-weight: 500;
    letter-spacing: 1.25px;
    margin-left: 8px;
    text-transform: uppercase;
    position: relative;

    &.icon {
        font-size: 24px;
        background-color: transparent;
        box-shadow: 0 0 0 0 rgba(0,0,0,.2), 0 0 0 0 rgba(0,0,0,.14), 0 0 0 0 rgba(0,0,0,.12);
        color: secondaryColor;
        padding: 4px 8px;

        &:hover {
            background-color: rgba($secondaryColor, .2);
        }

        .material-icons {
            font-size: 20px;
        }
    }

    &:hover {
        background-color: rgba($secondaryColor, .8);
    }

    &:disabled {
        color: rgba(#000000, .6) !important;

        &:hover {
            background-color: transparent;
        }
    }

    &.d {
        background-color: transparent;
        box-shadow: none;
        color: $secondaryColor;

        &:hover {
            background-color: rgba($secondaryColor, .1);
        }
    }
}

</style>
