<template>
    <div class="view">
        <h1>Overview</h1>
        <grid type="implicit" size="12xA" gap="16px">
            <card col="1">

            </card>
        </grid>
    </div>
</template>

<script>

import grid from "@component/grid.vue";
import card from "@component/card.vue"

export default {
    components: {
        grid,
        card
    }
}
</script>

<style lang="scss">

.grid.implicit {
    width: calc(100% - 128px);
    
    padding: 0px 64px;
}

</style>