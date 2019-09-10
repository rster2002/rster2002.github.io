<template>
    <span v-if="c.settings.showSteps || c.settings.showTitles">
        <span v-if="c.settings.showSteps && c.settings.showTitles">(</span><span v-if="c.settings.showSteps"><slot></slot></span><span v-if="c.settings.showSteps && c.settings.showTitles">)</span>
    </span>
</template>

<script>
export default {
    props: ["c"]
}
</script>

<style>

</style>