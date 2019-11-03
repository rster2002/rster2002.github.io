<template>
    <section class="mdl dropDown">
        <div class="mdl dropDownHead">
            <p>
                <icon>
                    menu-up
                </icon>
            </p>
        </div>
    </section>
</template>

<script>
import icon from "./icon.vue";

export default {
    props: ["value"],
    components: {
        icon
    },
    data() {
        return {
            internalOpen: false
        }
    },
    watch: {
        value() {
            this.internalOpen = this.value;
        }
    },
    created() {
        if (this.value !== undefined) {
            this.internalOpen = this.value;
        }
    }
}
</script>

<style lang="scss" scoped>

@import "./config.scss";

.dropDown {
    width: 100%;
}

</style>