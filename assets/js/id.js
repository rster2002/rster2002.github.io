var urlParam = function(name, w){
	w = w || window;
	var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
	val = w.location.search.match(rx);
	return !val ? '':val[1];
}

function requireId(type) {
	urlId = urlParam("id");
	if (localStorage.getItem("id")) {
		return localStorage.getItem("id");
	} else {
		if (urlId === null || urlId === '') {
			alert("The id is empty");
			location.href="index.html";
		} else {
			if (confirm("Do you want to register this id? You can't change it later!") === true) {
				localStorage.setItem("id",urlId);
			} else {
				location.href="index.html";
			}
		}
	}
}