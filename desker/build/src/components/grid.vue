<template>
    <div class="grid" :style="{ gridTemplateColumns: colms, gridTemplateRows: rows, gridGap: gap }">

    </div>
</template>

<script>
export default {
    props: ["size", "gap"],
    computed: {
        colms() {
            var colms = this.disect()[0];

            if (colms === "A") {
                return `auto`;
            } else {
                return `repeat(${Number(colms)}, 1fr)`;
            }
        },
        rows() {
            var rows = this.disect()[1];

            if (rows === "A") {
                return `auto`;
            } else {
                return `repeat(${Number(rows)}, 1fr)`;
            }
        }
    },
    methods: {
        disect() {
            var size = this.size;

            size = size.split("x");

            if (size.length === 2) {
                return size;
            } else {
                throw new Error("TypeError: There should only be one 'x' present in the 'size' property.")
            }
        }
    }
}
</script>

<style>

.grid {
    height: 100%;
    width: 100%;

    display: grid;
}

</style>