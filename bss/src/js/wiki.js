function highlight(text) {

	var words = text.split(" ");
	var rtrn = [];
	var first = false;

	words.forEach(a => {

		if (a === "{{") {
			rtrn.push(`<span class="bssexpression">{{`);
		} else if (a === "}}") {
			rtrn.push(`}}</span>`);
		} else if (!isNaN(a)) {
			rtrn.push(`<span class="number">${a}</span>`)
		} else if (a === "=" || a === "+" || a === "-" || a === "*" || a === "/" || a === "+=" || a === "-=" || a === "*=" || a === "/=" || a === "%=" || a === "%" || a === "=>") {
			rtrn.push(`<span class="handeler">${a}</span>`);
		} else {
			if (!first) {
				rtrn.push(`<span class="bsscommand">${a}</span>`);
				first = true;
			} else {
				rtrn.push(`<span class="">${a}</span>`);
			}
		}

	});

	return rtrn.join(" ") + "<br/>";

}

var wiki = new Vue({
	el: "#app",
	data: {
		title: "Wiki",
		currentPage: "index",
		h: "600px"
	},
	methods: {
		openPage(page, title) {

			document.getElementById("app").scrollTop = 0; 

			if (page !== "index") {
				this.currentPage = page;
				this.title = title ? title : page;
				this.h = "300px";
			} else {
				this.currentPage = "index";
				this.title = "Wiki";
				this.h = "600px";
				page = "home";
			}

			var xhr= new XMLHttpRequest();
			xhr.open('GET', "./page/" + page + ".html", true);
			xhr.onreadystatechange= function() {
				if (this.readyState!==4) return;
				if (this.status!==200) return; // or whatever error handling you want
				document.getElementById("content").innerHTML= this.responseText;
			};
			xhr.send();

		}
	}
});

wiki.openPage("index");
