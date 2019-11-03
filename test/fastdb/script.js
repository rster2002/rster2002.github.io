const db = fdb({
    name: "test",
    handler: localStorage
});

db.skyWalker = {
    name: "Luke",
    surname: "Skywalker"
}

db.darthVader = {
    name: "Anakin",
    surname: "Skywalker"
}

db.getAll();

db.query("name", "1");

db.setState({
    username: "rster2002",
    nr: 1
});

(function() {

    var inner = 0;

    db.onStateUpdate(a => {
        inner += a.nr;

        console.log(inner);
    });

})();

// db.$.computed("total", )