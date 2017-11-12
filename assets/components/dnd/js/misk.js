function logout() {
	localStorage.removeItem("firebaseui::rememberedAccounts");
	location.href="../dnd.html";
}

function openPage(page) {
	$(".innerPage").remove();
	$(".page").load("../assets/components/dnd/pages/" + page + ".html");
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