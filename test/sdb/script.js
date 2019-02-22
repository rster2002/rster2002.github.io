var db = new sdb("test");
var vc = 0;

db.addProcessor("visitorCount", a => {
    vc++;
    return {
        ...a,
        visitorCount: vc
    }
});

db.computed("totalVisitors", a => {
    console.log(a);
    return a.length;
});

db.onSnapshot(a => {console.log(a)});

db.put({
    name: "John",
    surname: "Jackson",
    age: 50,
    visitorCount: 0
});

db.put({
    name: "Sara",
    surname: "Lumber",
    age: 23,
    visitorCount: 0
});

db.computed("visitornames", a => {
    return a.map(b => b.name);
});

db.computed("get", a => {});
