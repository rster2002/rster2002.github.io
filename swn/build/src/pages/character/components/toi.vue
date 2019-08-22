<template>
    <span>
        <span v-if="s !== true">{{ t }}</span>
        <span v-else class="material-icons">{{ i }}</span>
    </span>
</template>

<script>
export default {
    props: ["s", "t", "i"]
}
</script>