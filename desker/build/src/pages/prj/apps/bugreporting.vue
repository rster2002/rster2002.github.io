<template>
    <div class="view bugreporting">
        <div class="left">
            <div v-if="edit === false">
                <!-- Overview -->
                <h1 class="title">Bug reporting</h1>
                <div class="btns">
                    <btn @click="edit = true">Edit</btn>
                    <btn class="d" @click="openUrl()">get url</btn>
                </div>
            </div>
            <div v-else>
                <!-- Settings -->
                <h1 class="title">Editing</h1>
                <div class="btns">
                    <btn @click="saveForm()">Save</btn>
                    <btn class="d" @click="edit = false">Discard</btn>
                </div>
            </div>
        </div>
        <div class="right">
            <div v-if="edit === false">
                <!-- Responces -->
            </div>
            <div class="formEditor" v-else>
                <!-- Form Editor -->
                <div class="lane">
                    <draggable v-model="form.pages" group="pages">
                        <div class="formPage" v-for="(page, index) in form.pages" :key="page.id">
                            <p class="formPageHeader">Page {{ index + 1 }}</p>
                            <draggable v-model="page.elements" group="elements">
                                <div class="formElement" v-for="element in page.elements" :key="element.id">
                                    <textbox class="elementSelect" v-model="element.type" type="select" label="Type">
                                        <option>header</option>
                                        <option>paragraph</option>
                                        <option>short question</option>
                                        <option>long question</option>
                                    </textbox>
                                    <textbox v-model="element.content.header" v-if="element.type === 'header'" label="Text"></textbox>
                                    <div v-if="element.type === 'paragraph'">
                                        <textbox label="Text" v-model="element.content.paragraph" type="textarea"></textbox>
                                    </div>
                                    <textbox v-model="element.content.shortQuestion" v-if="element.type === 'short question'" label="Question"></textbox>
                                    <textbox v-model="element.content.longQuestion" v-if="element.type === 'long question'" label="Question"></textbox>
                                    <div style="width: 100%;">
                                        <btn @click="removeElement(page, element)" class="d">remove element</btn>
                                    </div>
                                </div>
                            </draggable>
                            <div style="width: 100%;">
                                <btn @click="addElement(page)" class="d">add element</btn>
                                <btn @click="removePage(page)" class="d">remove page</btn>
                            </div>
                        </div>
                        <div class="formPage add" @click="addPage()">
                            <h1 class="material-icons">add</h1>
                        </div>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import btn from "@component/btn.vue";
import textbox from "@component/textbox.vue";
import draggable from "vuedraggable";

import { genId } from "@js/global.js";
import { fs } from "@js/firebase.js";

export default {
    components: {
        btn,
        draggable,
        textbox
    },
    data() {
        return {
            edit: false,
            form: {
                pages: [
                    
                ]
            }
        }
    },
    methods: {
        addElement(page) {
            page.elements.push({
                id: genId(),
                type: "header",
                content: {
                    header: "",
                    paragraph: "",
                    shortQuestion: "",
                    longQuestion: "",
                    value: ""
                }
            });
        },
        addPage() {
            this.form.pages.push({
                id: genId(),
                elements: []
            });
        },
        saveForm() {
            fs.collection("projects")
                .doc(this.$route.params.prjid)
                .collection("apps")
                .doc("bugreporting")
                .collection("public")
                .doc("form")
                .set({
                    ...this.form,
                    lastModified: Date.now(),
                    version: genId()
                }).then(() => {
                    this.edit = false;
                });
        },
        removePage(page) {
            this.form.pages.splice(this.form.pages.indexOf(page), 1);
        },
        removeElement(page, element) {
            page.elements.splice(page.elements.indexOf(element), 1);
        },
        openUrl() {
            this.$router.push(`/p/r/${this.$route.params.prjid}`);
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
                    this.form.pages = doc.data().pages;
                }
            });
    }
}
</script>

<style lang="scss">

.view h1.title {
    margin: 50px 0px;
    padding: 0px 64px;
    font-family: $default-font;
    font-size: 40px;
}

.view.bugreporting {

    height: calc(100% + 50px);;

    .left {
        height: 100%;
        width: 30%;
        float: left;

        background-color: #fff;
    }

    .right {
        height: 100%;
        width: 70%;
        float: left;
    }

    .btns {
        margin-left: 56px;
    }

}

.formEditor {
    height: calc(100% - 50px);
    width: 100%;
    padding-top: 50px;

    overflow-y: auto;

    .lane {
        display: inline-block;
        width: 70%;

        position: relative;
        left: 50%;
        transform: translateX(-50%);

        .formPage {
            background-color: #fff;
            padding: 16px;
            border-radius: 5px;

            margin: 16px 0px;

            background-color: #fff;
            -webkit-box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);
            -moz-box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);
            box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);

            .formPageHeader {
                font-family: $default-font;
                margin-top: 0;
                color: rgba(#000, 0.3);
            }

            &.add {
                $clr: rgba(#000000, 0.3);

                -webkit-box-shadow: none;
                -moz-box-shadow: none;
                box-shadow: none;

                border: 2px solid $clr;

                cursor: pointer;

                background-color: transparent;

                h1 {
                    color: $clr;
                    text-align: center;
                    width: 100%;
                    margin: 0;

                    font-size: 48px;
                }
            }

            .formElement {
                width: calc(100% - 32px);
                padding: 16px;
                border-radius: 5px;
                margin: 8px 0px;
                // border: 2px solid #212121;
                background-color: #fff;
                -webkit-box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);
                -moz-box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);
                box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);

                .textbox {
                    width: calc(100% - 24px);
                    margin: 16px 0px;
                    margin-left: 8px;
                }

                .textboxWrapper.elementSelect .textbox {
                    margin: 0px;
                    margin-left: 8px;
                }
            }
        }
    }
}

</style>
