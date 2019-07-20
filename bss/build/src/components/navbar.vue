<template>
    <div class="navbar">
        <div class="titleContainer" @click="navTo('/')">
            <div class="iconContainer">
                <img src="../img/logo.png" />
            </div>
            <div class="textContainer">
                <h1>Bluestone Script</h1>
            </div>
        </div>
        <div class="controllsContainer">
            <div class="buttonContainer">
                <button @click="navTo('/docs')">docs</button>
                <!-- <button>showcase</button> -->
                <button class="primary" @click="navTo('./docs/getting-started')">get started</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        navTo(path) {
            this.$router.push({ path: path });
        }
    }
}
</script>


<style lang="scss" scoped>

.navbar {
    width: 100%;
    height: 62px;
    background-color: #ffffff;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;

    border-bottom: 2px solid #e5e5e5;

    .titleContainer {
        height: 100%;
        width: 30%;
        float: left;
        cursor: pointer;

        .iconContainer {
            height: 62px;
            width: 62px;
            float: left;

            img {
                height: 95%;
                width: 95%;

                position: relative;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .textContainer {
            padding: 0px 16px;
            height: 100%;

            h1 {
                margin: 0;
                font-family: $default-font;
                font-weight: 400;
                color: rgba(#000000, 0.7);

                position: relative;
                top: 50%;
                transform: translateY(-50%);
                font-size: 24px;
            }
        }
    }

    .controllsContainer {
        height: 100%;
        width: 70%;
        float: left;

        .buttonContainer {
            height: 100%;
            float: right;

            padding: 12px 16px;

            button {
                height: calc(100% - 24px);
                padding: 0px 20px;
                background-color: transparent;
                border: 0;
                color: rgba(#000000, 0.7);
                text-transform: uppercase;

                font-family: $default-font;
                font-size: 16px;

                cursor: pointer;

                &.primary {
                    background-color: $primary-color;
                    color: #ffffff;
                }

                &.selected {
                    border-bottom: 2px solid $primary-color;
                    height: calc(100% - 26px);
                }
            }
        }
    }
}

@media screen and (max-width: 800px) {
    .navbar {
        .titleContainer {
            .textContainer {
                h1 {
                    display: none;
                }
            }
        }

        .controllsContainer {
            .buttonContainer {
                button.primary {
                    display: none;
                }
            }
        }
    }
}

</style>

