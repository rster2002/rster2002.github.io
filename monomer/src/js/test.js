var app = new Monomer({
	element: "#app",
	slots: ["slot-header", "slot-body"]
});

app.slots["slot-header"].html = `<div class="topbar"><h1>[[ title ]]</h1></div>`;
