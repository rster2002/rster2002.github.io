$(document).ready(() => {
	wave.config({
		path: "../assets/js/library/material-wave/"
	}).import([
		"shadow",
		"buttons",
		"select",
		"dialog",
		"menu",
		"bar",
		"card",
		"grid",
		"elevation",
		"form"
	]).color({
		action: "rgb(0,128,255)"
	});
});


vueGlobal = new Vue({
	el: "#globalVue",
	data: {
		text: "",
		btn1: "",
		btn2: "",
		type: ""
	},
	methods: {
		clkbtn1fn() {
			this.type = "";
			this.btn1fn();
		},
		clkbtn2fn() {
			this.type = "";
			this.btn2fn();
		},
		cls() {
			this.type = "";
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
	var entries = Object.entries(rtrn);
	for (var i = 0; i < entries.length; ++i) {
		vueGlobal[entries[i][0]] = entries[i][1];
	}
}
