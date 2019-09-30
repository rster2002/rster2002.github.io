<template>
    <page>
        <header>
            <h1>AUT-NS</h1>
        </header>
        <main v-if="apiKeySet">
            <input v-model="trainNumber" type="text" placeholder="Train NR" />
            <button @click="makeSearch()">Search</button>
            <section v-if="resultsAvailable" class="searchResults">
                <section class="trainSections">
                    <img v-for="trainPart in searchResult.materieeldelen" :key="trainPart.materieelnummer" :src="trainPart.afbeelding" alt="Train image" class="fullTrainImage">
                </section>
                <section>
                    <div class="railSignWrapper">
                        <div class="railStopAtSign">
                            <p>{{ searchResult.lengte }}</p>
                        </div>
                    </div>
                </section>
            </section>
        </main>
        <main v-else>
            <input v-model="apiKey" type="text" placeholder="Train NR" />
            <button @click="setApiKey()">Set</button>
        </main>
    </page>
</template>

<script>
import vueChannel from "vue-channel";

import page from "../components/page.vue";

import nsCall from "../js/nsCall.js";

window.nsCall = nsCall;

export default {
    components: {
        page
    },
    data() {
        return {
            trainNumber: "",
            apiKey: "",
            apiKeySet: false,
            resultsAvailable: false,
            searchResult: {}
        }
    },
    methods: {
        makeSearch() {
            nsCall("/virtualTrain/" + this.trainNumber).then(responce => {
                console.log(responce);
                this.searchResult = Object.assign({}, this.searchResult, responce);
                this.resultsAvailable = true;
            }).catch(err => this.resultsAvailable = false);
        },
        setApiKey() {
            localStorage.setItem("apiKey", this.apiKey);
            this.apiKeySet = true;
        }
    },
    created() {
        var apiKey = localStorage.getItem("apiKey");

        if (apiKey) {
            vueChannel("apiKey")
                .set({
                    apiKey
                });

            this.apiKeySet = true;
            this.apiKey = apiKey;
        }
    }
}
</script>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
@import url('https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap');

.inner > header {
    width: 100%;
    height: 64px;

    background-color: #5e35b1;

    h1 {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        margin: 0;
        padding: 0px 16px;

        font-size: 24px;
        color: #fff;
        font-family: "Montserrat", sans-serif;
    }
}

main {
    input {
        width: 90%;

        display: block;
        margin: 8px auto;
        padding: 8px;

        font-size: 18px;
        outline: 0;
        border-radius: 5px;
        border: 2px solid #2196f3;
    }

    button {
        width: calc(90% + 20px);

        display: block;
        margin: 8px auto;
        padding: 8px;

        font-size: 18px;
        outline: 0;
        border-radius: 5px;
        border: 2px solid #2196f3;
        background-color: #2196f3;
        cursor: pointer;
    }

    section.searchResults {
        section {

            $signResultsHeight: 64px;

            height: $signResultsHeight;

            border-top: 1px solid #d3d3d3;
            border-bottom: 1px solid #d3d3d3;

            &.trainSections {
                height: unset;

                display: inline-block;
                padding: 8px 0px;
            }

            .fullTrainImage {
                width: 95%;

                display: block;
                margin: auto;
            }

            .railSignWrapper {
                height: $signResultsHeight;
                width: $signResultsHeight;

                float: left;

                .railStopAtSign {
                    height: 50%;
                    width: 50%;

                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(45deg);

                    background-color: #2222ff;
                    border: 2px solid rgb(221, 221, 221);
                    border-radius: 5px;

                    p {
                        position: relative;
                        top: 50%;
                        margin: 0;
                        transform: translateY(-50%) rotate(-45deg);

                        text-align: center;
                        color: #ffffff;
                        font-size: 24px;
                        font-family: "Source Code Pro", monospace;
                    }
                }
            }
        }
    }
}

</style>