<template>
    <div class="card" @click="$emit('click')">
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.card {

    background-color: #fff;
    -webkit-box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);
    -moz-box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);
    box-shadow: 0px 5px 10px 0px rgba(224,224,224,1);

    border-radius: 5px;
    padding: 24px 16px;

    display: inline-block;

}

</style>
