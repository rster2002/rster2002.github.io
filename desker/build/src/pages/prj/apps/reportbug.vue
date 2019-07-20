<template>
    <div class="p">
        <p class="poweredBy">Powered by <b>Desker</b></p>
        <div class="pageBackground" v-for="(page) in pageFiltered" :key="page.id">
            <div class="page">
                <div class="formElement" v-for="element in page.elements" :key="element.id">
                    <!-- Header -->
                    <div v-if="element.type === 'header'">
                        <h1 class="header">{{ element.content.header }}</h1>
                    </div>
                    <!-- Paragraph -->
                    <div v-if="element.type === 'paragraph'">
                        <p class="paragraph">{{ element.content.paragraph }}</p>
                    </div>
                    <!-- Short question -->
                    <div v-if="element.type === 'short question'">
                        <p class="question">{{ element.content.shortQuestion }}</p>
                        <textbox label="Answer" v-model="element.content.value"></textbox>
                    </div>
                    <!-- Long question -->
                    <div v-if="element.type === 'long question'">
                        <p class="question">{{ element.content.longQuestion }}</p>
                        <textbox label="Answer" v-model="element.content.value" type="textarea"></textbox>
                    </div>
                </div>
                <div class="footer">
                    <btn v-if="currentPage + 1 === pages.length" @click="submitForm()">Submit</btn>
                    <btn v-else @click="currentPage++">Next</btn>
                    <btn v-if="pages.length > 1 && currentPage + 1 > 1" class="d" @click="currentPage--">previous</btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import textbox from "@component/textbox.vue";
import btn from "@component/btn.vue";

import { fs } from "@js/firebase.js";
import { genId } from "@js/global.js";

export default {
    components: {
        textbox,
        btn
    },
    data() {
        return {
            pages:  [],
            currentPage: 0,
            formVersion: ""
        }
    },
    computed: {
        pageFiltered() {
            console.log(this.pages.filter((a, i) => i === this.currentPage))
            return this.pages.filter((a, i) => i === this.currentPage);
        }
    },
    methods: {
        submitForm() {
            var values = {};

            this.pages.forEach(page => {
                page.elements.forEach(element => {
                    if (element.type === "short question" || element.type === "long question") {
                        values[element.id] = element.content.value;
                    }
                });
            });

            var id = genId();

            fs.collection("projects")
                .doc(this.$route.params.prjid)
                .collection("apps")
                .doc("bugreporting")
                .collection("responces")
                .doc(id)
                .set({
                    id,
                    respondedAt: Date.now(),
                    formVersion: this.formVersion,
                    responceContent: values
                });
        }
    },
    created() {
        fs.collection("projects")
            .doc(this.$route.params.prjid)
            .collection("apps")
            .doc("bugreporting")
            .collection("public")
            .doc("form")
            .get()
            .then(doc => {
                if (doc && doc.exists) {
                    this.pages = doc.data().pages;
                    this.formVersion = doc.data().version;
                }
            });
    }
}

</script>

<style lang="scss">

p.poweredBy {
    text-align: center;
    font-family: $default-font;
    color: rgba(#000, 0.2);
    margin-bottom: 0;
}

.p {
    overflow: hidden;
    width: 100%;
    height: 100%;
}

.pageBackground {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.page {
    margin: 32px 0px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding: 16px 0px;
    background-color: #fff;

    width: 95%;
    max-width: 935px;
    border-radius: 5px;

    background-color: #fff;
    -webkit-box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);
    -moz-box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);
    box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);

    .formElement {
        padding: 8px 0px;

        h1.header {
            padding: 0px 32px;
            font-family: $default-font;
            margin: 8px 0px;
        }

        p.paragraph {
            padding: 0px 32px;
            font-family: $default-font;
            margin: 8px 0px;
            width: calc(100% - 64px);
            white-space: pre-line;
        }

        .textbox {
            margin: 16px 0px;
            margin-left: 32px;
            width: calc(90% + 24px);
        }

        p.question {
            padding: 0px 32px;
            font-family: $default-font;
            font-size: 24px;
            margin-top: 0px;
        }
    }

    .footer {
        margin-left: 32px;
        display: inline-block;
        width: calc(100% - 64px);

        .btn {
            float: right;
        }
    }
}

</style>
