const fs = require("fs");
const path = require("path");
const glob = require("glob");

var globalStyling, defaultIndexTemplate, globalOverviewTemplate;

let categories = require("./categories.json");
categories = categories.categories;

function readFileAsync(filePath) {
    return new Promise((res, rej) => {
        fs.readFile(path.resolve(__dirname, filePath), "utf8", (err, data) => {
            res(data);
        });
    });
}

function processCategory(category) {
    return new Promise(async (res, rej) => {
        var categoryTemplate = await readFileAsync(`./${category}/index_template.html`);
        var indexArray = [];
        
        glob(`./${category}/*.html`, (err, files) => { 
            var ignoreCount = 0;
            var ulHTMLContent = "";

            // console.log(files);
            
            files = files.filter(file => !file.includes("index.html") && !file.includes("index_template.html") && !file.includes("overview.html"));
            
            // console.log(files);

            function checkForExport(file) {
                async function resolveExport() {
                    // console.log(indexArray);
                    
                    indexArray = indexArray.sort();

                    // console.log("indexArray: " + category);
                    // console.log(indexArray);

                    indexArray = indexArray.sort();
                    
                    indexArray.forEach(item => {
                        ulHTMLContent += `<li><a href='./${item}.html'><span>${item}</span></a></li>`
                    });
                    
                    // console.log(categoryTemplate);
                    
                    var categoryExport = categoryTemplate;

                    if (categoryTemplate === undefined) {
                        categoryTemplate = defaultIndexTemplate;
                    }

                    categoryExport = categoryExport.replace("{{ STYLING }}", globalStyling);
                    categoryExport = categoryExport.replace("{{ INDEXED }}", ulHTMLContent);
                    
                    fs.writeFile(path.resolve(__dirname, `./${category}/index.html`), categoryExport, (err) => console.log(err));

                    var ulContent = "";
                    // console.log(indexArray);

                    function finalizeExport(item) {
                        return new Promise((res, rej) => {
                            // setTimeout(() => {
                            //     res();
                            // }, 1000)

                            fs.readFile(path.resolve(__dirname, `${category}/${item}.html`), "utf8", (err, data) => {
                                data = data.split(`<p class="md-toc-content">`);

                                // console.log(item);
                                // console.log(data.length);

                                if (data.length > 1) {
                                    var indexEntries = [];

                                    data = data[1];
                                    data = data.split("</p>");
                                    data = data[0];

                                    data = data.split("</a></span>");
                                    data.pop();

                                    data.forEach(link => {
                                        link = link.split("md-toc-item md-toc-h");

                                        var linkLevel = Number(link[1][0]);

                                        link = link.join("md-toc-item md-toc-h");
                                        link = link.split("href=\"");

                                        link = link[1];
                                        link = link.split("\">");
                                        // console.log(link);
                                        // console.log(linkLevel);

                                        indexEntries.push({
                                            level: linkLevel,
                                            href: link[0],
                                            title: link[1]
                                        });
                                    });

                                    var overviewExport = globalOverviewTemplate;

                                    var lastLevel = 0;
                                    indexEntries.forEach(entry => {

                                        if (entry.level > lastLevel) {
                                            ulContent += "<ul>";
                                        } else if (entry.level < lastLevel) {
                                            ulContent += "</ul>";
                                        }

                                        lastLevel = entry.level;

                                        ulContent += `<li><p><a href="./${item}.html${entry.href}"><span>${entry.title}</span></a></p></li>`;
                                    });

                                    var lastEntry = indexEntries[indexEntries.length - 1];
                                    for (var i = 1; i <= lastEntry.level; i++) {
                                        ulContent += "</ul>";
                                    }

                                    ulContent += "</ul>";

                                    // console.log(ulContent);
                                    // console.log(indexEntries.length);
                                    // console.log(lastEntry);

                                    overviewExport = overviewExport.replace("{{ STYLING }}", globalStyling);
                                    overviewExport = overviewExport.replace("{{ CATEGORY }}", category);
                                    overviewExport = overviewExport.replace("{{ INDEXED }}", ulContent);

                                    fs.writeFile(path.resolve(__dirname, `./${category}/overview.html`), overviewExport, err => {console.log(err); res()});
                                } else {
                                    res();
                                }
                            });
                        });
                    }

                    for (var i = 0; i < indexArray.length; i++) {
                        let item = indexArray[i];

                        console.log("Start: " + item);
                        await finalizeExport(item);
                        console.log("Done: " + item);
                    }
                }

                if (indexArray.length === files.length - ignoreCount) {
                    resolveExport();
                }
            }
            
            files.forEach(async file => {
                var data = await readFileAsync(file);

                // console.log(file);

                file = file.replace(".html", "");
                file = file.replace(`./${category}/`, "");

                // console.log(file);
                indexArray.push(file);
                // console.log("L", indexArray.length);

                checkForExport(file);
            }); 
        });
    });
}

// <li><a href='./Chapter 1.html'><span>Chapter 1</span></a></li>

async function getDefaults() {
    globalStyling = await readFileAsync("./globalStyling.css");
    globalOverviewTemplate = await readFileAsync("./template_overview.html");
    defaultIndexTemplate = await readFileAsync("./base_template_index.html");
}

getDefaults();

categories.forEach(async category => {
    await processCategory(category);
});

