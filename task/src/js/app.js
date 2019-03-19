vueGlobal = new Vue({
	el: "#globalVue",
	data: {
		text: "",
		btn1: "",
		btn2: "",
		type: "",
		users: [],
		pickedUsers: []
	},
	methods: {
		clkbtn1fn() {
			let t = this.type;
			this.type = "";
			if (t === "userList") {
				let r = [];
				for (var i = 0; i < this.pickedUsers.length; ++i) {
					r.push(Object.assign({}, this.pickedUsers[i]));
				}
				this.btn1fn(Object.assign([], r));

				this.pickedUsers = [];
				this.users = [];
			} else {
				this.btn1fn();
			}
		},
		clkbtn2fn() {
			let t = this.type;
			this.type = "";
			if (t === "userList") {
				let r = [];
				for (var i = 0; i < this.pickedUsers.length; ++i) {
					r.push(Object.assign({}, this.pickedUsers[i]));
				}
				this.btn2fn(Object.assign([], r));

				this.pickedUsers = [];
				this.users = [];
			} else {
				this.btn2fn();
			}
		},
		cls() {
			this.type = "";
		},
		pickUser(user) {
			user.picked = !user.picked;
			var index = this.pickedUsers.indexOf(user);
			console.log(index);
			if (index === -1) {
				this.pickedUsers.push(user);
			} else {
				this.pickedUsers.splice(index, 1);
			}
		}
	}
});

global.alert = function(obj) {
	var template = {
		text: "No text defined",
		btn1: "ok",
		btn2: "",
		type: "simple",
		btn1fn: function() {},
		btn2fn: function() {}
	}

	global.btn1fn = obj.btn1fn;

	var rtrn = Object.assign(template, obj);

	console.log(rtrn);
	if (rtrn.type === "userList") {
		let r = rtrn;
		let users = rtrn.users;
		r.users = [];
		for (var i = 0; i < users.length; ++i) {
			let u = users[i];
			console.log(u);
			u.picked = false;
			console.log(u);
			r.users.push(u);
		}

		rtrn = r;
	}

	var entries = Object.entries(rtrn);
	for (var i = 0; i < entries.length; ++i) {
		vueGlobal[entries[i][0]] = entries[i][1];
	}

}

alert = function(text) {
	global.alert({
		text: text,
		btn1: "ok"
	});
}

sidebar = {
	open: function() {
		$(".sidebar").addClass("open");
		$(".sidebarBackground").addClass("open");
	},
	close: function() {
		$(".sidebar").removeClass("open");
		$(".sidebarBackground").removeClass("open");
	},
	toggle: function() {
		if ($(".sidebar").hasClass("open")) {
			sidebar.close();
		} else {
			sidebar.open();
		}
	}
}