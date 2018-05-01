idCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

loader = {
	show: function() {
		$(".loader.main").addClass("active");
	},
	hide: function() {
		$(".loader.main").removeClass("active");
	}
}

function openPage(page) {
	loader.show();
	sessionStorage.setItem("::openPage", page);
	$(".innerPage").remove();
	$(".page").load("../assets/components/task/pages/" + page + ".html");
}

function loadContent(content) {
	loader.show();
	sessionStorage.setItem("::content", content);
	$(".innerContent").remove();
	$(".content").load("../assets/components/task/pages/" + sessionStorage.getItem("::openPage") + "/" + content + ".html");
}

function randomString(characters, l) {
	var retn = "";
	for (var i = 0; i < l; i++) {
		var r = Math.floor(Math.random() * characters.length);
		retn += characters[r];
	}
	return retn;
}

async function createQuery(query) {
	const snapshot = await query.get();
	return snapshot.docs.map(doc => ({__id: doc.id, ...doc.data()})); 
}