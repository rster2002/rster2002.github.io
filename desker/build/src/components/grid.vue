<template>
    <div class="grid" :class="[type]" :style="{ gridTemplateColumns: colms, gridTemplateRows: rows, gridGap: gap }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ["type", "size", "gap"],
    computed: {
        colms() {
            if (this.type === "implicit") {
                var colms = this.disect()[0];

                if (colms === "A") {
                    return `auto`;
                } else {
                    return `repeat(${Number(colms)}, 1fr)`;
                }
            } else {
                return 0;
            }
        },
        rows() {
            if (this.type === "implicit") {
                var rows = this.disect()[1];
    
                if (rows === "A") {
                    return `auto`;
                } else {
                    return `repeat(${Number(rows)}, 1fr)`;
                }
            } else {
                return 0;
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

<style lang="scss">

.grid.implicit {
    height: 100%;
    width: 100%;

    display: grid;
}

.grid.list {
    height: 100%;
    width: 100%;

    display: block;

    .card {
        width: 25%;
    }
}

</style>