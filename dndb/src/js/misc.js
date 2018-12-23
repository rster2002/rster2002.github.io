global = {
	version: "vB1.29"
}

var url = document.URL;
if (url.includes("pro")) {
	DEV = false;
} else if (url.includes(":8887")) {
	DEV = true;
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

console.log(`%c D&D Tools %c Version ${global.version} %c`, "background:#35495e; padding: 1px; border-radius: 3px 0 0 3px; color: white", "background:#ff3030; padding: 1px; border-radius: 0 3px 3px 0; color: white;", "background: transparent;")

if (!DEV) {
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', 'UA-102147810-1', {
		'page_title' : 'D&D Web app'
	});

	console.log = function() {}
	console.warn = function() {}
}

String.prototype.replaceAll = function(a, b) {
	let i = this.split(a);
	i = i.join(b);

	return i;
}

Array.prototype.last = function() {
	return this[this.length - 1];
}

function roll(expression) {
	var rtrn = expression;
	var broken = expression.split("d");
	var list = [];
	var min = Infinity;
	var max = -Infinity;
	var diceTotal = 0;

	for (var i = 0; i < broken.length; ++i) {
		if (broken[i + 1] !== undefined) {
			var count = broken[i];
			count = count.split(" ");
			count = Number(count[count.length - 1]);

			var type = broken[i + 1];
			type = type.split(" ");
			type = Number(type[0]);

			if (type !== NaN && count !== NaN) {

				let output = 0;

				for (var r = 0; r < count; ++r) {
					let roll =  Math.floor((Math.random() * type) + 1);
					output += roll;

					if (roll < min) {
						min = roll;
					}

					if (roll > max) {
						max = roll;
					}

					list.push({
						dice: "1d" + type,
						count: 1,
						type: type,
						result: roll
					});
				}

				rtrn = rtrn.replace(count + "d" + type, output);
				diceTotal = output;

			}

		}
	}

	rtrn = rtrn.replaceAll("min", min);
	rtrn = rtrn.replaceAll("max", max);

	let total = math.eval(rtrn);

	return {
		total: total,
		list: list,
		expression: expression,
		roll: {
			average: total / list.length,
			sum: total,
			max: max,
			min: min,
			diceTotal: diceTotal
		}
	};
}

const idCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const pageTitles = {
	characterList: "Character List",
	characterEditor: "Character Editor",
	campaign: "Campaign",
	campaignMenu: "Campaigns",
	content: "Content",
	profile: "Profile",
	dashboard: "Dashboard",
	system: "System page",
	campaignCompanion: "Campaign companion",
	dmDashboard: "DM Dashboard",
	monsters: "Monsters",
	spells: "Spells",
	dmStory: "Story"
}

$(document).ready(function() {
	vueTerminal = new Vue({
		el: "#vueTerminal",
		data: {
			display: {
				uid: ''
			}
		}
	})
});

async function createQuery(query) {
	var snapshot = await query.get();
	return snapshot.docs.map(doc => (Object.assign({__id: doc.id}, doc.data())));
}

function randomString(characters, l) {
	var retn = "";
	for (var i = 0; i < l; i++) {
		var r = Math.floor(Math.random() * characters.length);
		retn += characters[r];
	}
	return retn;
}

function randomFromArray(array) {
	var index = Math.floor(Math.random() * array.length);
	return array[index];
}

function genId() {
	return randomString(idCharacters, 25);
}

function shortId() {
	return randomString(idCharacters, 4);
}

$(document).keydown(function(event) {
	// If Control or Command key is pressed and the S key is pressed
	// run save function. 83 is the key code for S.
	if((event.ctrlKey || event.metaKey) && event.which == 83) {
		event.preventDefault();
		console.log("ctrl+s")
		ctrlS();
		return false;
	}
});

$(document).keydown(function(event) {
	if((event.ctrlKey || event.metaKey) && event.which == 73) {
		event.preventDefault();
		$("#vueTerminal").toggleClass("open");
		return false;
	}
});

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

window.addEventListener("popstate", function(e) {
	global.back();
});

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

function openHomebrewary(url) {

	$(".page.innerPage").remove();
	$(".page").append("<div class='innerPage'><iframe src='" + url + "'></iframe></div>");
	sidebar.close();
}

function onLoaded() {
	if (loaded !== null) {
		loaded();
		loaded = null;
	}
}

function cal(number) {
	var i = roundDown(number);
	var r = i;
	return r;
}

function roundDown(number) {
	var i = String(number);
	var r = i.split(".");
	return Number(r[0]);
}

function getSelected(selector) {
	var e = document.getElementById("selector");
	return e.options[e.selectedIndex].text;
}

a = {
	ev(category, action, label, value) {
		if (!DEV) {
			gtag('event', action, {
				'event_category': category,
				'event_label': label,
				'value': value
			});
		}
	}
}

function error(error) {
	$("#errorText").text(error);

	console.error(error);
	$(".error").show();

	a.ev("error", "error", error);
}

function thr(e) {
	error(e);
}

function closeError() {
	$(".error-background").fadeOut();
	$(".background").fadeOut();
}

// sorting
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function dynamicSortMultiple() {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

function showSnackbar(text) {
	$(".snackbar p").text(text);
	$(".snackbar").addClass("open");
	setTimeout(() => {
		$(".snackbar").removeClass("open");
	}, 1500);
}

function skb(text) {
	showSnackbar(text);
}

// used for importing scripts and styling
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

function idType(id) {
	if (id.includes("dnd-")) {
		return "userId";
	} else {
		return "uid"
	}
}

function isUid(id) {
	return id.includes("dnd-") === false ? true : false;
}

function getUidFromId(id, f) {
	firestore.collection("userId").doc(id).get().then(doc => {
		if (doc && doc.exists) {
			f(doc.data().uid);
		} else {
			error("Could not find this user id");
		}
	}).catch(err => {
		error(err);
	})
}

function getProfile(id, f) {
	console.log(id)
	if (isUid(id)) {
		firestore.collection("users").doc(id).get().then(doc => {
			if (doc && doc.exists) {
				console.log(doc.data())
				f(doc.data());
			} else {
				error("Could not get user data");
			}
		}).catch(err => {
			error(err);
		})
	}
}

function getCharacter(id, characterId, f) {
	if (isUid(id)) {
		firestore.collection("users").doc(id).collection("characters").doc(characterId).collection("data").doc("characterObj").get().then(doc => {
			if (doc && doc.exists) {
				f(doc.data());
			} else {
				error("Could not get character Object");
			}
		}).catch(err => {
			error(err);
		})
	}
}

function vuePut(a, b) {
	let entries = Object.entries(b);
	entries.forEach(c => {
		a[c[0]] = c[1];
	});
}

global["viewCharacter"] = function(userId, characterId) {
	global["viewCharacterInfo"] = {
		userId: userId,
		characterId: characterId,
		returnPage: sessionStorage.getItem("::openPage")
	}

	a.ev("View character", "user action", `userId: ${userId}, characterId: ${characterId}, returnPage: ${sessionStorage.getItem("::openPage")}`)

	openPage("characterViewer");
}

global["pickuser"] = function(array, callback) {

}

global["openCharacter"] = function(options) {
	global.openedCharacter = options;
	global.lastOpenedPage = sessionStorage.getItem("::openPage");
	openPage("characterEditor");
}
