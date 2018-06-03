$(document).ready(() => {
    wave.config({
        path: "../../../assets/js/library/material-wave/"
    }).import([
        "document",
        "buttons",
        "input",
        "checkbox"
    ]).color({
        base: "#FF8800",
        action: "rgb(0,128,255)"
    });
})
