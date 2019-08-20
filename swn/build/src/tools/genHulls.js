const text = `Strike Fighter 200k 5 5 8 1/1 16 5 2 1 Fighter
Shuttle 200k 3 0 15 1/10 11 3 5 1 Fighter
Free Merchant 500k 3 2 20 1/6 14 10 15 2 Frigate
Patrol Boat 2.5m 4 5 25 5/20 14 15 10 4 Frigate
Corvette 4m 2 10 40 10/40 13 15 15 6 Frigate
Heavy Frigate 7m 1 10 50 30/120 15 25 20 8 Frigate
Bulk Freighter 5m 0 0 40 10/40 11 15 25 2 Cruiser
Fleet Cruiser 10m 1 15 60 50/200 14 50 30 10 Cruiser
Battleship 50m 0 20 100 200/1,000 16 75 50 15 Capital
Carrier 60m 0 10 75 300/1,500 14 50 100 4 Capital
Small Station 5m N/A 5 120 20/200 11 50 40 10 Cruiser
Large Station 40m N/A 20 120 100/1000 17 125 75 30 Capital`

var lines = text.split("\n");
var ships = [];

lines.forEach(ship => {

    var shipObj = {};

    ship = ship.split(" ");

    shipObj.class = ship.pop();
    shipObj.hardpoints = Number(ship.pop());
    shipObj.mass = Number(ship.pop());
    shipObj.power = Number(ship.pop());
    shipObj.ac = Number(ship.pop());

    let crew = ship.pop();
    crew = crew.split("/");

    shipObj.crew = {
        min: crew[0],
        max: crew[1]
    }

    shipObj.hp = Number(ship.pop());
    shipObj.armor = Number(ship.pop());
    console.log(ship);
    shipObj.speed = Number(ship.pop());


    let cost = ship.pop();

    shipObj.costText = cost;

    if (cost.includes("k")) {
        cost = cost.replace("k", "");
        cost = Number(cost * 1000);
    } else if (cost.includes("m")) {
        cost = cost.replace("m", "");
        cost = Number(cost * 1000000);
    }

    shipObj.cost = cost;

    shipObj.name = ship.join(" ");

    ships.push(shipObj);

});

const fs = require("fs");
const path = require("path");

fs.writeFile(path.resolve(process.cwd(), "./export.json"), JSON.stringify({ ships }), err => console.log(err));