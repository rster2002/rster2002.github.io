var waveSelectedMenuParent;
var colorFunction = function(color) {
	$("div.wave.menu a").css("color", color.action);
}

waveColor.unshift(colorFunction);

(function( $ ){
	$.fn.openMenu = function(hookElement) {
		waveSelectedMenuParent = this;
		waveCalculatePosition(this, hookElement);
		$(hookElement).addClass("open");
		return this;
	};
})( jQuery );

$(document).on("scroll", () => {
	$("div.wave.menu.open").each(function() {
		waveCalculatePosition(waveSelectedMenuParent, this);
	});
});

$(document).mouseup(function(e) {
    var selector = $("div.wave.menu.open");
    if (!selector.is(e.target) && selector.has(e.target).length === 0) {
		waveCloseMenu();
    }
});

function waveCloseMenu() {
	var selector = $("div.wave.menu.open");
	selector.removeClass("open");
	selector.hide();
}

function waveCalculatePosition(here, hook) {
	var width, widthMenu, distanceWidth, left, top;
	if ($(hook).hasClass("alignRight")) {
		width = waveRemovePx($(here).css("width"));
		widthMenu = waveRemovePx($(hook).css("width"));
		distanceWidth = widthMenu - width;
		left = $(here).offset().left - $(window).scrollLeft() - distanceWidth;
		top = $(here).offset().top - $(window).scrollTop();
	} else {
		left = $(here).offset().left - $(window).scrollLeft();
		top = $(here).offset().top - $(window).scrollTop();
		width = $(here).css("width");
	}
	$(hook).css("display", "inline-block");
	$(hook).css("left", left);
	$(hook).css("top", top);
	$(hook).css("min-width", width);
}

elementLoaded("div.wave.menu", function() {
	$("div.wave.menu").each(function() {
		$(this).children("a").on("click", function() {
			waveCloseMenu();
		});
	});
})
