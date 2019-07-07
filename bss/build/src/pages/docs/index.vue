<template>
    <div class="content">
        <div class="card">
                <h1>Documentation</h1>
                <div class="grid">
                    <div class="item" style="grid-row: 1 / 2; grid-column: 1 / 2" @click="navTo('./docs/getting-started')">
                        <h1>Getting started</h1>
                        <p>Get BSS up and running and create your first datapack with it.</p>
                    </div>
                    <div class="item" style="grid-row: 1 / 2; grid-column: 2 / 3" @click="navTo('./docs/commands')">
                        <h1>Commands</h1>
                        <p>A list of commands that gets added with BSS.</p>
                    </div>
                    <!-- <div class="item" style="grid-row: 1 / 2; grid-column: 3 / 4" onclick="location.href = './guides.html'">
                        <h1>Guides</h1>
                        <p>This will teach you how to use the commands.</p>
                    </div> -->
                    <div class="item" style="grid-row: 1 / 2; grid-column: 3 / 4" onclick="location.href = 'https://github.com/rster2002/bss'">
                        <h1>Download</h1>
                        <p>Download BSS to your computer so you can begin using it.</p>
                    </div>
                </div>
                <h1>Feedback</h1>
                <div class="grid">
                    <div class="item" style="grid-row: 1 / 2; grid-column: 1 / 2" onclick="location.href = 'https://github.com/rster2002/bss/issues'">
                        <h1>Report a bug</h1>
                        <p>Create an issue on github so I can fix it as fast as possible.</p>
                    </div>
                    <div class="item" style="grid-row: 1 / 2; grid-column: 2 / 3"
                        onclick="location.href = 'https://github.com/rster2002/bss/issues'">
                        <h1>Request a feature</h1>
                        <p>Create an issue with the 'feature' tag and I'll try my best to add it.</p>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    methods: {
        navTo(path) {
            this.$router.push({ path: path });
        }
    }
}
</script>
