<template lang="html">
    <div class="searchbar">
        <div class="icon">
            <span class="material-icons">search</span>
        </div>
        <div class="box">
            <input :placeholder="placeholder" v-model="query" />
        </div>
    </div>
</template>

<script>
export default {
    props: ["placeholder"],
    data() {
        return {
            query: ""
        }
    },
    watch: {
        query() {
            this.$emit('onchange', this.query);
        }
    }
}
</script>

<style lang="stylus" scoped>

@import "../default.stylus";

.searchbar {

    width: calc(100% - 32px);

    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);

    margin: 16px;
	margin-left: auto;
	margin-right: auto;

    height: 48px;

    background-color: #ffffff;
    border-radius: standardRadius;

    max-width: 400px;

    .icon {
        height: 48px;
        width: 48px;
        float: left;

        span {
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #000000de;
        }
    }

    .box {
        height: 48px;
        width: calc(100% - 48px);
        float: left;

        input {
            height: 100%;
            width: 100%;

            border: 0;
            outline: 0;
            padding: 0;
            margin: 0;

            font-size: 16px;
            border-radius: standardRadius;

            color: #000000de;
            font-family: defaultFont;
        }
    }
}

</style>
