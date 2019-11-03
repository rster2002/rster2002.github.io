<template>
    <span :class="computedClasses"></span>
</template>

<script>
export default {
    props: ["icon"],
    data() {
        return {
            internalIcon: ""
        }
    },
    watch: {
        icon() {
            if (this.icon !== undefined) {
                this.internalIcon = this.icon;
            }
        }
    },
    computed: {
        computedClasses() {
            return ["mdl", "icon", "mdi", "mdi-" + this.internalIcon]
        }
    },
    created() {
        if ("default" in this.$slots) {
            var icon = this.$slots.default[0].text;
            this.internalIcon = icon.trim();
        } else if (this.icon !== undefined) {
            this.internalIcon = this.icon;
        } else {
            throw new Error("(mdl icon) There was no icon specified");
        }
    }
}
</script>