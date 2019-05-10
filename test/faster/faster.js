class FasterApp {
    constructor(options) {
        this.root = document.querySelector(options.el);

        this.root.innerHTML += `<style>
            html, body {
                width: 100%;
                height: 100%;
                padding: 0;
                margin: 0;
            }
        </style>`
        this.root.innerHTML += options.home;
    }
}

function FasterScaffold() {
    return `<div class="FasterScaffold">${options.appbar ? options.appbar : ""}</div>
    <style>
        .FasterScaffold {
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
        }
    </style>`
}

function FasterAppBar() {

}

const Faster = {
    app: FasterApp,
    scaffold: FasterScaffold
}