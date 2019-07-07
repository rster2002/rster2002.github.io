<template>
    <router-view></router-view>
</template>

<script>

</script>

<style lang="scss">

.content {
    margin-top: 64px;
    height: calc(100% - 64px);
    width: 100%;
    background-color: rgba(#e5e5e5, 0.2);

    overflow-y: auto;

    .card {
        width: 95%;
        max-width: 1000px;
        border: 2px solid #e5e5e5;
        border-radius: 4px;
        margin: 16px 0px;
        padding: 16px 24px;
        background-color: #ffffff;
        display: inline-block;

        position: relative;
        left: 50%;
        transform: translateX(-50%);

        .grid {
            width: 100%;
            padding: 16px 0px;

            display: grid;
            grid-template-columns: repeat(auto-fit, 33.333333333333333333333%);
            grid-template-rows: auto;
            grid-gap: 16px;

            .item {
                width: 100%;
                padding: 0xp 16px;
                border: 2px solid #e5e5e5;
                border-radius: 4px;
                cursor: pointer;

                h1 {
                    font-size: 26px;
                    margin: 8px 16px;
                }

                p {
                    margin: 8px 16px;
                }

                &:hover {
                    background-color: rgba($primary-color, 0.15);
                }
            }
        }

        h1 {
            font-size: 46px;
            font-weight: 400;
            font-family: $default-font;
            color: $default-font-color;
            margin: 16px 0px;
        }

        h2 {
            @extend h1;
            font-size: 28px;
        }

        p {
            font-size: 16px;
            font-weight: 400;
            font-family: $default-font;
            color: $default-font-color;
            margin: 4px 0px;
            line-height: 20px;
            letter-spacing: 0.5px;

            span {
                background-color: rgba(#e5e5e5, 0.5);
                padding: 0px 2px;
                border-radius: 2px;
            }
        }

        ol, ul {
            font-size: 16px;
            font-weight: 400;
            font-family: $default-font;
            color: $default-font-color;
            margin: 16px 0px;

            span {
                background-color: rgba(#e5e5e5, 0.5);
                padding: 2px 4px;
                border-radius: 4px;
            }
        }

        .code {
            width: 100%;
            background-color: rgba(#e5e5e5, 0.3);
            padding: 4px 0px;
            border-radius: 4px;

            span {
                background-color: transparent;
            }
        }
    }
}

</style>

