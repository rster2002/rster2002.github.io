const fs = require("fs");
const path = require("path");
const glob = require("glob");

const categories = {};
var globalStyling, defaultIndexTemplate, globalOverviewTemplate;

function readFileAsync(filePath) {
    return new Promise((res, rej) => {
        fs.readFile(path.resolve(__dirname, filePath), "utf8", (err, data) => {
            res(data);
        });
    });
}

function capitalize(word) {
    var letters = word.split("");
    var fistLetter = letters.shift();
    fistLetter = fistLetter.toUpperCase();
    letters.unshift(fistLetter);

    return letters.join("");
}

function replaceAll(word, a, b) {
    return word.split(a).join(b);
}

glob("./*/**/*.html", async (err, files) => {
    globalStyling = await readFileAsync("./globalStyling.css");
    defaultIndexTemplate = await readFileAsync("./default_index.html");
    globalOverviewTemplate = await readFileAsync("./global_index.html");

    files.forEach(file => {
        file = file.replace("./", "");
        file = file.split("/");

        var category = file[0];
        file = file[1];

        if (categories[category] === undefined) {
            categories[category] = [];
        }

        categories[category].push(file);
    });

    var entries = Object.entries(categories);

    entries.forEach(entry => {
        var category = entry[0];
        var files = entry[1];

        var categoryIndex = defaultIndexTemplate;
        categoryIndex = categoryIndex.replace("{{ STYLE }}", globalStyling);
        categoryIndex = categoryIndex.replace("{{ CATEGORY_LOWERCASE }}", replaceAll(category.toLowerCase(), " ", "-"));
        categoryIndex = categoryIndex.replace("{{ CATEGORY_CAPITALIZE }}", capitalize(category));

        files = files.filter(file => file !== "index.html" && file !== "overview.html" && file !== "index_template.html" && file !== "overview.html");

        var listings = files.map(file => `<li><a href="./${file}"><span>${file.replace(".html", "")}</span></a></li>`);

        categoryIndex = categoryIndex.replace("{{ LISTING }}", listings.join("\n"));

        fs.writeFile(path.resolve(__dirname, `./${category}/index.html`), categoryIndex, err => console.log);
    });

    var globalCategoriesHTML = [];

    entries.forEach(entry => {
        var category = entry[0];
        var files = entry[1];

        var categoryList = files.map(file => `<li><a href="./${category}/${file}"><span>${file.replace(".html", "")}</span></a></li>`)

        globalCategoriesHTML.push(`<li>
            <p><a href='./${category}/index.html'><span>${capitalize(category)}</span></a><span> (</span><a
                    href='./${category}/overview.html'><span>Overview</span></a><span>)</span></p>
            <ul>
                ${categoryList.join("\n")}
            </ul>
        </li>`);
    });

    globalOverviewTemplate = globalOverviewTemplate.replace("{{ STYLE }}", globalStyling);
    globalOverviewTemplate = globalOverviewTemplate.replace("{{ LISTING }}", globalCategoriesHTML.join("\n"));

    fs.writeFile(path.resolve(__dirname, `./index.html`), globalOverviewTemplate, err => console.log);

    console.log(categories);
});