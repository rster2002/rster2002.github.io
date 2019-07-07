<template>
    <div class="contentWrapper">
        <div class="header">
            <h1>Create datapacks <span>faster</span></h1>
        </div>
        <div class="infoCard" style="padding-top: 32px; padding-bottom: 32px">
            <h1>BSS makes it easier than ever to create quality datapacks with less code</h1>
            <div class="buttonContainer">
                <button class="primary" onclick="location.href = './docs/getting-started.html'">
                    get started
                </button>
                <button onclick="location.href = './docs/index.html'">
                    view docs
                </button>
            </div>
        </div>
        <div class="infoCard">
            <div class="col">
                <div class="imgWrapper">
                    <img src="@svg/undraw_speed_test_wxl0.svg" />
                </div>
                <h1>Faster development</h1>
                <p>Using BSS allows you to get the same functionality that you already have, but with less code.</p>
            </div>
            <div class="col">
                <div class="imgWrapper">
                    <img src="@svg/undraw_To_the_stars_qhyy.svg" />
                </div>
                <h1>High performance</h1>
                <p>BSS was made with performance in mind. So every line you write will be optimized to only execute when needed.</p>
            </div>
            <div class="col">
                <div class="imgWrapper">
                    <img src="@svg/undraw_knowledge_g5gf.svg" />
                </div>
                <h1>Easy to addapt</h1>
                <p>Addapting BSS into your existing datapack is really easy. Because BSS is a superset of the default minecraft language, everything you already wrote will work with BSS.</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.contentWrapper {
    margin-top: 64px;
    overflow-y: auto;
    height: calc(100% - 64px);
    width: 100%;
    background-color: rgba(#e5e5e5, 0.2);

    .header {
        width: 100%;
        height: 100%;

        h1 {
            font-family: $default-font;
            font-size: 90px;
            font-weight: 700;

            margin: 0;
            padding: 0;

            position: relative;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;

            span {
                color: $primary-color;
            }
        }
    }

    .infoCard {
        width: 95%;
        max-width: 1000px;
        border: 2px solid #e5e5e5;
        border-radius: 4px;
        margin: 16px 0px;
        padding: 16px;
        background-color: #ffffff;
        display: inline-block;

        position: relative;
        left: 50%;
        transform: translateX(-50%);

        h1 {
            width: 70%;
            min-width: 400px;

            margin: 0px auto;
            text-align: center;

            font-family: $default-font;
            color: rgba(#000000, 0.8);
            font-weight: 400;
        }

        .buttonContainer {

            margin-top: 32px;

            position: relative;
            left: 50%;
            transform: translateX(-50%);
            height: 62px;

            display: inline-block;

            button {
                height: calc(100% - 24px);
                padding: 0px 20px;
                background-color: transparent;
                border: 0;
                color: $primary-color;
                text-transform: uppercase;

                font-family: $default-font;
                font-size: 16px;

                cursor: pointer;

                &.primary {
                    background-color: $primary-color;
                    color: #ffffff;
                }
            }
        }

        .col {
            width: 33.33333333333333%;
            float: left;

            .imgWrapper {
                width: 100%;
                height: 270px;

                img {
                    width: 250px;
                    height: auto;
                    margin: 16px 0px;
                    position: relative;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }

            h1 {
                min-width: 0;
                width: 100%;
                font-size: 28px;
            }

            p {
                font-size: 20px;
                font-family: $default-font;
                font-weight: 400;

                color: rgba(#000000, 0.8);
                padding: 0px 16px;
            }
        }
    }
}

@media screen and (max-width: 800px) {
    .contentWrapper {
        .header {
            height: 50%;

            h1 {
                font-size: 48px;
                width: 70%;
                text-align: left;
                padding: 16px;
            }
        }

        .infoCard {
            max-width: 100000%;
            width: 80%;

            h1 {
                min-width: 0;
                font-size: 26px;
                width: 90%;
            }

            .col {
                float: none;
                width: 100%;
            }
        }
    }
}

</style>

