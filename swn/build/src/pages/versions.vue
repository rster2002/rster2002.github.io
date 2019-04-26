<template lang="html">
    <div>
        <card v-for="version in versions" :key="version.version">
            <primaryTitle style="padding-bottom: 0;">
                <h1>{{ version.version }}</h1>
            </primaryTitle>
            <p v-html="version.changes.join('<br/>')"></p>
            <!-- <p v-for="change in version.changes">
                {{ change }}
            </p> -->
        </card>
    </div>
</template>

<script>

import { card, primaryTitle } from "@components";

export default {
    components: {
        card,
        primaryTitle
    },
    data() {
        return {
            versions: []
        }
    },
    created() {
        var t = this;
        fetch("https://api.github.com/repos/rster2002/rster2002.github.io/commits")
            .then(r => r.json())
            .then(json => {
                json.forEach(a => {
                    var lines = a.commit.message.split("\n");
                    if (lines[0].includes("SWN Tools v") && lines[0].includes(" build")) {
                        var version = lines[0];
                        version = version.replace("SWN Tools ", "");
                        version = version.replace(" build", "");

                        lines.shift();
                        var changes = lines;

                        var obj = {
                            version,
                            changes
                        };

                        t.versions.push(obj);
                    }
                });
            });
    }
}
</script>

<style lang="css" scoped>
</style>
