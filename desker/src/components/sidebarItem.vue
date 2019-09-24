<template lang="html">
    <div class="item i" @click="$emit('click')">
        <icon :icon="icon"></icon>
        <div class="text">
            <p><slot></slot></p>
        </div>
    </div>
</template>

<script>
import icon from "./icon.vue";

export default {
    components: {
        icon
    },
    props: ["icon"]
};
</script>
