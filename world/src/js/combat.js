function sprite(type, i, r) {
    if (r !== undefined) {
        var rnd = Math.floor(Math.random() * (r - 1 + 1)) + 1;
        return "./src/sprites/" + type + "/" + i + "-" + rnd + ".png";
    }
    return "./src/sprites/" + type + "/" + i + ".png";
}

function layer(x, y, layer) {
    var i = app.layers.filter(a => a.name === layer);
    console.log(i);
    return i[0].rows[y - 1].squares[x - 1];
}

var app = new Vue({
    el: "#app",
    data: {
        layers: [
            {
                index: 0,
                name: "background",
                rows: []
            },
            {
                index: 1,
                name: "objects",
                rows: []
            },
            {
                index: 2,
                name: "unit",
                rows: []
            },
            {
                index: 3,
                name: "cursor",
                rows: []
            }
        ]

    },
    methods: {
        select(square) {
            var t = layer(square.x, square.y, "objects");
            t.img = sprite("tiles", "tree", 2);
        }
    }
});

var size = 32;

// Populates the background layer
for (var i = 1; i <= size; ++i) {

    var row = {
        squares: [],
        width: 64 * size
    }

    for (var o = 1; o <= size; ++o) {
        row.squares.push({
            x: o,
            y: i,
            img: sprite("tiles", "grass-1")
        });
    }

    app.layers[0].rows.push(row);

}

// Populates the unit layer
for (var i = 1; i <= size; ++i) {

    var row = {
        squares: [],
        width: 64 * size
    }

    for (var o = 1; o <= size; ++o) {
        row.squares.push({
            x: o,
            y: i,
            img: ""
        });
    }

    app.layers[1].rows.push(row);

}

// Populates the unit layer
for (var i = 1; i <= size; ++i) {

    var row = {
        squares: [],
        width: 64 * size
    }

    for (var o = 1; o <= size; ++o) {
        row.squares.push({
            x: o,
            y: i
        });
    }

    app.layers[2].rows.push(row);

}

// Populates the cursor layer
for (var i = 1; i <= size; ++i) {

    var row = {
        squares: [],
        width: 64 * size
    }

    for (var o = 1; o <= size; ++o) {
        row.squares.push({
            x: o,
            y: i
        });
    }

    app.layers[3].rows.push(row);

}
