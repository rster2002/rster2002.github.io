<template>
    <div class="mdl listItem">
        <slot></slot>
    </div>
</template>

<script>
export default {
    created() {
        this.$nextTick(() => {
            this.$el.children.forEach(el => {
                if (el.nodeName === "BUTTON") {
                    var classes = el.className.split(" ");

                    if (!classes.includes("mdl") && !classes.includes("listItemButton")) {
                        if (el.className !== "") {
                            el.className += " mdl listItemButton";
                        } else {
                            el.className = "mdl listItemButton";
                        }

                        el.innerHTML = `<span class="mdl icon mdi mdi-${el.innerHTML.trim()}"></span>`;
                    }
                } else if (el.nodeName === "P") {
                    var wrapper = document.createElement("div");
                    wrapper.className = "mdl textWrapper";

                    el.parentNode.insertBefore(wrapper, el);

                    wrapper.appendChild(el);
                }
            });
        });
    }
}
</script>

<style lang="scss" scoped>

.listItem {
    height: 48px;

    padding: 0;

    border-top: 1px solid #cecece;
    border-bottom: 1px solid #cecece;

    & + .listItem {
        border-top: none;
    }
}

</style>

<style lang="scss">

.listItem {
    width: 100%;

    .textWrapper {
        height: 48px;
        width: 50%;

        p {
            margin: 0;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            padding: 0px 16px;

            font-size: 16px;
            color: #000000de;
        }
    }

    & > button {
        height: 48px;
        width: 48px;

        outline: 0;
        border: 0;
        position: relative;
        // top: -40%;
        float: right;
        background-color: transparent;
        font-size: 20px;
        font-weight: 500;
        cursor: pointer;
        margin-top: -48px;
    }
}

</style>