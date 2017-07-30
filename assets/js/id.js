var urlParam = function(name, w){
	w = w || window;
	var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
	val = w.location.search.match(rx);
	return !val ? '':val[1];
}

function requireId(type) {
	urlId = urlParam("id");
	if (urlId === null || urlId === "") {
		if (localStorage.getItem("id")) {
			id = localStorage.getItem("id");
			return id;
		} else {
			if (type === "incomplete") {
				registerId = prompt("To acces this page you need to have a id registrated. Please type a id.");
				if (registerId === null || registerId === "") {
					alert("This id is not right");
					if (type === "return" || type === "incompleet") {
						return "false";
					} else {
						location.href="index.html";
					}
				} else if (registerId === false) {
					if (type === "return" || type === "incompleet") {
						return "incompleet";
					} else {
						location.href="index.html";
					}
				} else {
					if (confirm("Are you sure you want to register this id? Once you registrated a id you cant change it.") === true) {
						localStorage.setItem("id", registerId);
						return id;
					} else {
						if (type === "return" || type === "incompleet") {
							return "incompleet";
						} else {
							location.href="index.html";
						}
					}
				}
			}
		}
	} else {
		if (localStorage.getItem("id")) {
			id = localStorage.getItem("id");
			return id;
		} else {
			if (confirm("Are you sure you want to register '" + urlId + "' as your id? Once you registrated a id you cant change it.") === true) {
				localStorage.setItem("id", urlId);
				return urlId;
			} else {
				if (type === "return" || type === "incompleet") {
					return "incompleet";
				} else {
					location.href="index.html";
				}
			}
		}
	}
}
