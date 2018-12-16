var vueInstance = new Vue({
	el: "#vueInstance",
	data: {
		query: "",
		spells: []
	},
	computed: {
		spellList: function() {
			var vm = this
			var query = vm.query.toLowerCase();
			return this.spells.filter(function (item) {
				if (item.name === undefined) {
					return false;
				} else {
					return item.name.toLowerCase().includes(query);
				}
			});
		}
	},
	methods: {
		show(spell) {
			let currentValue = this.spells[this.spells.indexOf(spell)].show;


			if (currentValue === undefined || currentValue === false) {
				this.spells[this.spells.indexOf(spell)].show = true;
			} else {
				this.spells[this.spells.indexOf(spell)].show = false;
			}
		}
	}
});

// $.getJSON("./src/json/spells.json", function(data) {
// 	var returning = [];
// 	console.log(data);
//
// 	var entries = Object.entries(data);
//
// 	entries.forEach(a => {
// 		let b = a[1];
// 		b.name = a;
//
// 		returning.push(b);
// 	});
//
//
// 	console.log(returning);
// 	vueInstance.spells = returning;
// });

var s;

$.getJSON("./src/json/spells.json", d => {
	s = d;
	let t = d.sort((a, b) => {
		if (a.lvl < b.lvl) {
			return -1;
		} else {
			if (a.name < b.name) {
				return 0;
			} else {
				return 1;
			}
		}
	});

	let r = [];

	t.forEach(a => {
		a.show = false;
		r.push(a);
	});

	console.log(t, d);

	vueInstance.spells = r;
});
