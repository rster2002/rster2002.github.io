var db = new sdb("test").useMessager(localStorage);
var vc = 0;

db.put({
	__id: "test",
	a: "hey"
});

db.put({
	__id: "test",
	a: "hey"
});
