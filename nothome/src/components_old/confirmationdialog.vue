<template>
    <div class="confirmationDialog" @click.self="cancel()" v-if="intShow">
        <div class="dialog">
            <primaryTitle>
                <h1>{{ intTitle }}</h1>
            </primaryTitle>
            <div>
                <div class="dialogListItem" v-for="entry in intList" :key="entry.$selectedId" @click="select(entry)">
                    <div class="radioWrapper">
                        <radiobox :value="isChecked(entry)" :alive="false"></radiobox>
                    </div>
                    <div class="textWrapper">
                        <p>{{ entry.name }}</p>
                    </div>
                </div>
            </div>
            <actions>
                <button>Choose</button>
                <button @click="cancel()">Cancel</button>
            </actions>
        </div>
    </div>
</template>

<script>

function genId() {
    function randomString(characters, l) {
        var retn = "";
        for (var i = 0; i < l; i++) {
            var r = Math.floor(Math.random() * characters.length);
            retn += characters[r];
        }
        return retn;
    }
    return randomString(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        32
    );
}

import primaryTitle from "./primaryTitle.vue";
import actions from "./actions.vue";
import radiobox from "./radiobox.vue";

export default {
    components: {
        primaryTitle,
        actions,
        radiobox
    },
    props: ["title", "list", "show"],
    data() {
        return {
            intTitle: "Dialog",
            intShow: false,
            selectedId: "",
            checked: false,
            selectedObj: {}
        }
    },
    watch: {
        show() {
            if (this.show !== undefined) {
                this.intShow = this.show;
            }
        }
    },
    computed: {
        intList() {
            return this.list.map(entry => {
                return {...entry, $selectionId: genId()}
            });
        }
    },
    methods: {
        select(entry) {
            this.selectedId = entry.$selectionId;

            let tempSelectedObj = Object.assign({}, entry);
            delete entry.$selectedId;

            this.selectedObj = Object.assign({}, this.selectedObj, tempSelectedObj);
        },
        isChecked(entry) {
            return this.selectedId === entry.$selectionId;
        },
        cancel() {
            this.$emit("cancel");
            this.intShow = false;
        },
        chooce() {
            this.$emit("cancel");
            this.$emit("chooce", this.selectedObj);
            this.intShow = false;
        }
    },
    created() {
        if (this.title !== undefined) {
            this.intTitle = this.title;
        }

        if (this.show !== undefined) {
            this.intShow = this.show;
        }
    }
}
</script>

<style lang="stylus" scoped>

@import "../default.stylus";

.confirmationDialog {
    width: 100%;
    height: 100%;

    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 24;

    background-color: rgba(#000000, .32);

    .dialog {
        max-height: 70%;
        width: 280px;

        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        background-color: #ffffff;
        box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);
        border-radius: 4px;

        .header {
            border-bottom: 1px #cecece solid;
        }

        .dialogListItem {

            listItemHeight = 42px;

            height: listItemHeight;
            width: 100%;

            cursor: pointer;

            .radioWrapper {
                height: listItemHeight;
                width: listItemHeight;
                
                float: left;
                
                .radio {
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            .textWrapper {
                height: listItemHeight;
                width: "calc(100% - %s)" % listItemHeight;

                float: left;

                p {
                    position: relative;
                    top: 50%;
                    transform: translateY(-50%);
                    margin: 0;
                    padding: 0px 8px;

                    font-family: defaultFont;
                    font-size: 16px;
                    color: defaultFontColor;
                }
            }
        }

        .actions {
            height: 42px;
            padding: 0;

            border-top: 1px #cecece solid;

            button {
                margin-top: 6px;
                margin-left: 0;
                margin-right: 8px;
                float: right;
            }
        }
    }
}

</style>