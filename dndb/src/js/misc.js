global = {}

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

if (!DEV) {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-102147810-1', 'auto');
	ga('send', 'pageview');
}

log = console.log;
console.log = function(t) {
	if (DEV) {
		log(t)
	}
}

const idCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const pageTitles = {
	characterList: "Character List",
	characterEditor: "Character Editor",
	campaign: "Campaign",
	campaignMenu: "Campaign's",
	dm: "Dungeon Master Tools",
	profile: "Profile",
	dashboard: "Dashboard"
}

$(document).ready(function() {
	vueTerminal = new Vue({
		el: "#vueTerminal",
		data: {
			user: {
				uid: ''
			}
		}
	})
})


function alert(text) {
	wave.dialog.alert(text);
}

function onLoaded() {
	loader.hide();
}

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

note = {
	open: function(icon, text, delay) {
		$("#noteContent").text(text);
		$(".note").addClass("open");
		$(".icon .i").html(icon);
		note.autoClose(delay);
	},
	close: function() {
		$(".note").removeClass("open");
	},
	autoClose: function(delay) {
		setTimeout(function(){
			note.close();
		},delay)
	}
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

function logout() {
	firebase.auth().signOut().then(function() {
		localStorage.removeItem("firebaseui::rememberedAccounts");
		location.href="./index.html";
	}, function(error) {
		error(error);
	});
}

loader = {
	show: function() {
		$(".loader-background").show();
		$(".loader").show();
	},
	hide: function() {
		$(".loader-background").hide();
		$(".loader").hide();
	}
}

progress = {
	show: function() {
		$(".progressBar").addClass("active");
	},
	hide: function() {
		$(".progressBar").removeClass("active");
	}
}

onExit = null;
loaded = null;

function openPage(page) {
	loader.show();
	$(".page .innerPage").remove();
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

	sidebar.close();
	if (onExit !== null) {
		onExit();
		onExit = null;
	}
}

function openHomebrewary(url) {
	loader.show();
	$(".page.innerPage").remove();
	$(".page").append("<div class='innerPage'><iframe src='" + url + "'></iframe></div>");
	sidebar.close();
}

function onLoaded() {
	loader.hide();
	if (loaded !== null) {
		loaded();
		loaded = null;
	}
}

function openOverlay(page) {
    loader.show();
    $(".overlay .content .innerPage").remove();

    if (page.includes("http")) {
        $(".overlay .content").load(page);
    } else {
        $(".overlay .content").load("./src/pages/" + page + ".html");
    }

    $(".background").show();
    $(".overlay").show();
    loader.hide();
}

function openOverlay(page) {
    loader.show();
    $(".overlay .content .innerPage").remove();

    if (page.includes("http")) {
        $(".overlay .content").load(page);
    } else {
        $(".overlay .content").load("./src/pages/" + page + ".html");
    }

    $(".background").show();
    $(".overlay").show();
    loader.hide();
}

function closeOverlay() {
    $(".background").hide();
    $(".overlay").hide();
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

function error(error) {
	loader.hide();
	progress.hide();

	$("#errorText").text(error);

	console.error(error);
	$(".error").show();

	if (!DEV) {
		ga('send', 'event', "dnd-error", error);
	}
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


function show() {
	loader.show();
	progress.show();
}

function hide() {
	loader.hide();
	progress.hide();
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

inputCard = {
	content: {
		toggle: function() {
			$(".inputCard").toggleClass("open");
		},
		open: function() {
			$(".inputCard").addClass("open");
		},
		close: function() {
			$(".inputCard").remoceClass("open");
		}
	},
	peek: {
		toggle: function() {
			$(".inputCard").toggleClass("peek");
		},
		open: function() {
			$(".inputCard").addClass("peek");
		},
		close: function() {
			$(".inputCard").removeClass("peek");
		}
	},
	slideUp: function(text) {
		$(".newTitle").text(text);
		$(".sliding").addClass("up");
		setTimeout(function() {
			$(".currentTitle").text(text);
			$(".sliding").removeClass("up");
		}, 201);
	},
	slideDown: function(text) {
		$(".newTitle").text(text);
		$(".sliding").addClass("down");
		setTimeout(function() {
			$(".currentTitle").text(text);
			$(".sliding").removeClass("down");
		}, 201);
	},
	close: function() {
		$(".inputCard").removeClass("peek");
		$(".inputCard").removeClass("open");
	},
	loadContent: function(html, direction, extraClass) {
		if (extraClass === undefined) {
			extraClass = "";
		}
		if (direction === "Up" || direction === "Down") {
			var content = $(".inputCard .content");
			content.addClass("fadeOut" + direction);
			if (direction === "Down") {
				$(".inputCard .contentWrapper").append("<div class='newContent enter" + direction + "'>" + html + "</div>");
			} else {
				$(".inputCard .contentWrapper").prepend("<div class='newContent enter" + direction + "'>" + html + "</div>");
			}
			$(".inputCard .newContent").addClass("fadeIn" + direction);
			setTimeout(function() {
				$(".inputCard .content").remove();
				$(".inputCard .newContent").addClass("content");
				$(".inputCard .newContent").addClass("open");
				$(".inputCard .newContent").addClass(extraClass);
				$(".inputCard .newContent").removeClass("newContent");
			}, 100);
		}
	}
}

function showSnackbar(text) {
	$(".snackbar p").text(text);
	$(".snackbar").addClass("open");
	setTimeout(() => {
		$(".snackbar").removeClass("open");
	}, 1500);
}

// used for importing scripts and styling
function tempImport(arr) {
	$(".page").prepend("<div class='innerResources'></div>");
	var opened = sessionStorage.getItem("::openPage");
	for (var i = 0; i < arr.length; ++i) {
		var imp = arr[i];
		if (imp.includes(".js")) {
			$(".innerResources").append("<script src='./src/js/" + imp + "'></script>");
		} else if (imp.includes(".css")) {
			$(".innerResources").append("<script src='./src/css/" + imp + "'></script>");
		} else if (imp.includes("--default")) {
			if (!imp.includes("-js")) {
				$(".innerResources").append("<script src='./src/pages/" + opened + "/script.js'></script>");
			}
			if (!imp.includes("-css")) {
				$(".innerResources").append("<link rel='stylesheet' href='./src/pages/" + opened + "/style.css'></script>");
			}
		} else if (imp === "--mobile") {
			$(".innerResources").append("<link rel='stylesheet' media='screen and (max-device-width: 800px)' href='./src/pages/" + opened + "/mobile.css'></script>");
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

global["viewCharacter"] = function(userId, characterId) {
	global["viewCharacterInfo"] = {
		userId: userId,
		characterId: characterId,
		returnPage: sessionStorage.getItem("::openPage")
	}

	openPage("characterViewer");
}
