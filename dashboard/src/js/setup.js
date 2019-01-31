global = {
    version: "a0.1"
}


cons = false;

var url = document.URL;
if (url.includes("pro")) {
	DEV = false;
} else if (url.includes(":8887")) {
	DEV = true;
	cons = true;
} else {
	DEV = false;
}

if (DEV) {
	db = "dev";
	dbNew = "dev";
	document.getElementById("title").innerHTML += "- dev";
	document.getElementById("vueLib").innerHTML += "<script src='https://cdn.jsdelivr.net/npm/vue/dist/vue.js'></script>";
} else {
	db = "";
	dbNew = "production";
	DEV = false;
	document.getElementById("vueLib").innerHTML += "<script src='https://cdn.jsdelivr.net/npm/vue'></script>";
}

if (url.includes("?test")) {
	db = "test";
	dbNew = "test";
	$("#pageTitle").text("DEV");
	$("#vueLib").append("<script src='https://cdn.jsdelivr.net/npm/vue'></script>");
}

if (url.includes("?log") || url.includes("&log")) {
	cons = true;
}

console.log(`%c Dashboard %c Version ${global.version} %c`, "background:#35495e; padding: 1px; border-radius: 3px 0 0 3px; color: white", "background:#3c4146; padding: 1px; border-radius: 0 3px 3px 0; color: white;", "background: transparent;")

if (!DEV) {
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', 'UA-102147810-1', {
		'page_title' : 'D&D Web app'
	});
}

if (!cons) {
	console.log = function() {}
	console.warn = function() {}
}
