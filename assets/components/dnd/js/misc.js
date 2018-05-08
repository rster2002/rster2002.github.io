var url = document.URL;
if (url.includes("pro")) {
	db = "";
	dbNew = "production";
	DEV = false;
} else if (url.includes(":8887")) {
	db = "dev";
	dbNew = "dev";
	DEV = true;
	$("#pageTitle").text("DEV");
} else {
	db = "";
	dbNew = "production";
	DEV = false;
}

if (!DEV) {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-102147810-1', 'auto');
	ga('send', 'pageview');
}

const idCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

//// register service worker
//if ('serviceWorker' in navigator) {
//	navigator.serviceWorker
//		.register('../assets/components/dnd/js/pwa/sw.js')
//		.then(function() { console.log('Service Worker Registered'); });
//}

async function createQuery(query) {
	const snapshot = await query.get();
	return snapshot.docs.map(doc => ({__id: doc.id, ...doc.data()})); 
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

note = {
	open: function(text, delay) {
		$("#noteContent").text(text);
		$(".note").addClass("open");
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
		location.href="../dnd.html";
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

function openPage(page) {
	loader.show();
	$(".page.innerPage").remove();
	$(".page").load("../assets/components/dnd/pages/" + page + ".html");
	sessionStorage.setItem("::openPage", page);
	sidebar.close();
}

function openOverlay(page) {
    loader.show();
    $(".overlay .content .innerPage").remove();
    
    if (page.includes("http")) {
        $(".overlay .content").load(page);
    } else {
        $(".overlay .content").load("../assets/components/dnd/pages/" + page + ".html");
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
        $(".overlay .content").load("../assets/components/dnd/pages/" + page + ".html");
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
	
	var randomMessage = randomFromArray([
		"Don't steal books",
		"You've upset the gods of D&D! Now you got punished",
		"Maybe this is a mimic, in that case: ignore this message",
		"Maybe a fireball would solve this error...",
		"A mind flayer has taken over this website!",
		"Don't trust portals!"
	])
	
	$("#error-message").text("An error has occurred (" + randomMessage + ")")
	$("#error").text(error);
	
	console.error(error);
	$(".error-background").fadeIn();
	$(".background").fadeIn();
	
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