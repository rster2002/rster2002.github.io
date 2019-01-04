var vueGlobal = new Vue({
	el: "#app",
	data: {
		idk: [
			{
				hey: "hi"
			}
		]
	}
});

var collide = new Collide("#app");

collide.use([
	"top-bar"
]);
