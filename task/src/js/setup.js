global = {
	version: "va0.1"
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
	$("#pageTitle").text("DEV");
	$("#vueLib").append("<script src='https://cdn.jsdelivr.net/npm/vue/dist/vue.js'></script>");
} else {
	db = "";
	dbNew = "production";
	DEV = false;
	$("#vueLib").append("<script src='https://cdn.jsdelivr.net/npm/vue'></script>");
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

console.log(`%c D&D Tools %c Version ${global.version} %c`, "background:#35495e; padding: 1px; border-radius: 3px 0 0 3px; color: white", "background:#ff3030; padding: 1px; border-radius: 0 3px 3px 0; color: white;", "background: transparent;")

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

a = {
	ev() {

	},
	ex() {
		
	}
}

function openPage(page, h = true) {

	if (h) {
		global.pageHistory.push({
			page: global.currentPage,
			global: Object.assign({}, global)
		});
	}

	let u;

	console.log(window.url, global.pageHistory);

	global.currentPage = page;

	window.history.pushState(null, null, u);

	characterSheetLoaded = false;
	a.ex(false);
	$(".page .innerPage").remove();
	$(".page .innerTemp").remove();
	$(".page .innerResources").remove();
	$(".page").load("./src/pages/" + page + "/page.html");
	sessionStorage.setItem("::openPage", page);
	if ($(".sidebar .menubutton.page-" + page).length > 0) {
		$(".sidebar .menubutton").removeClass("selected");
		$(".sidebar .menubutton.page-" + page).addClass("selected");
	}
	$("#menuOption").html("");

	if (pageTitles[page] !== undefined) {
		$("#pageName").text(pageTitles[page])
	}

	a.ev("open page", "user interaction", page);

	sidebar.close();
	if (onExit !== null) {
		onExit();
		onExit = null;
	}
}

function tempImport(arr) {
	$(".page").prepend("<div class='innerTemp'></div>");
	var opened = sessionStorage.getItem("::openPage");
	for (var i = 0; i < arr.length; ++i) {
		var imp = arr[i];
		if (imp.includes(".js")) {
			$(".innerTemp").append("<script src='./src/js/" + imp + "'></script>");
		} else if (imp.includes(".css")) {
			$(".innerTemp").append("<script src='./src/css/" + imp + "'></script>");
		} else if (imp.includes("--default")) {
			if (!imp.includes("-js")) {
				$(".innerTemp").append("<script src='./src/pages/" + opened + "/script.js'></script>");
			}
			if (!imp.includes("-css")) {
				$(".innerTemp").append("<link rel='stylesheet' href='./src/pages/" + opened + "/style.css'></script>");
			}
		} else if (imp === "--mobile") {
			$(".innerTemp").append("<link rel='stylesheet' media='screen and (max-device-width: 800px)' href='./src/pages/" + opened + "/mobile.css'></script>");
		}
	}
}

function vuePut(a, b) {
	let entries = Object.entries(b);
	entries.forEach(c => {
		a[c[0]] = c[1];
	});
}

function logout() {
	firebase.auth().signOut().then(function() {
		localStorage.removeItem("firebaseui::rememberedAccounts");
		location.href="./index.html";
	}, function(error) {
		error(error);
	});
}

onExit = null;
loaded = null;


global.pageHistory = [];
global.currentPage = "--end";

global.back = function() {

	function x() {
		let list = global.pageHistory;
		let last = list.pop();

		console.log(last);

		if (last === undefined) {
			history.back();
		}

		if (last.page !== "--end") {
			Object.assign(global, last.global);

			openPage(last.page, false);
		} else {
			history.back();
		}
	}

	global.x = x;

	if (a.exen === true) {
		global.alert({
			text: "Are you sure you want to go back?",
			btn1: "back",
			btn2: "cancel",
			btn1fn: function() {
				global.x();
			}
		});
	} else {
		x();
	}
}

window.addEventListener("popstate", function(e) {
	global.back();
});
