menuOpen = false;

function error(error) {
	openPopup('error');
	$("#errorHandler").text(error);
	console.error(error);
}

function alert(text) {
	openPopup('alert');
	$("#alertText").text(text);
}

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

function openPopup(id) {
	$("." + id + "-outer").fadeIn();
	$("." + id).show();
}

function closePopup(id) {
	$("." + id + "-outer").fadeOut();
	$("." + id).hide();
}

function toFixed(value, precision) {
	var precision = precision || 0,
	power = Math.pow(10, precision),
	absValue = Math.abs(Math.round(value * power)),
	result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));
	if (precision > 0) {
		var fraction = String(absValue % power),
		padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
			result += '.' + padding + fraction;
	}
	return result;
}

function logout() {
	localStorage.removeItem("firebaseui::rememberedAccounts");
	location.href="../pay.html";
}

function closeCreateTransaction() {
	$(".createTransaction-outer").fadeOut();
	$(".createTransaction").hide();
}

function toggleMenu() {
	if (menuOpen === false) {
		$(".menu-bar-background").fadeIn(200);
		$(".menu-bar").addClass("open");
		$(".menu").addClass("black");
		$(".menu").removeClass("white");
		menuOpen = true;
	} else if (menuOpen === true) {
		$(".menu-bar-background").fadeOut(200);
		$(".menu-bar").removeClass("open");
		$(".menu").addClass("white");
		$(".menu").removeClass("black");
		menuOpen = false;
	}
}

menuArray = ["dashboard","payment","history","contacts","games","settings"];

function openPage(page) {
	$(".innerPage").remove();
	$(".page").load("../assets/components/pay/pages/" + page + ".html");
	toggleMenu();
}

function getHistory(user) {
	r = undefined;
	dbUsers.child(user).once("value",function(e){
		var dbContent = e.val();
		if (dbContent.history !== undefined) {
			r = dbContent.history;
		} else {
			r = [];
		}
	});
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}