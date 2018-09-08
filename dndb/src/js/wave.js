sessionStorage.setItem("wave--css", 0);
sessionStorage.setItem("wave--init", 0);

dev(false);

function dev(d) {
	if (d === true) {
		console.warn("[wave] dev mode");
		from = "./";
	} else {
		from = "https://cdn.rawgit.com/rster2002/wave-ui/master/";
	}
}

function loadCss(url) {
	var cssId = Number(sessionStorage.getItem("wave--css")) + 1;
	var head  = document.getElementsByTagName('head')[0];
	var link  = document.createElement('link');
	link.id   = cssId;
	link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.href = url;
	if (url.includes("mobile")) {
		link.media = "screen and (max-device-width: 800px)";
	} else {
		link.media = 'all';
	}
	head.appendChild(link);
	
	sessionStorage.setItem("wave--css", cssId);
}

function loadInit(url) {
	var initId = Number(sessionStorage.getItem("wave--init")) + 1;
	var head  = document.getElementsByTagName('head')[0];
	var link  = document.createElement('script');
	link.id   = initId;
	link.src = url;

	head.appendChild(link);
	
	sessionStorage.setItem("wave--init", initId);
}

$(document).ready(function() {
	
	var reqwavered = [
		"https://fonts.googleapis.com/css?family=Roboto",
		"https://fonts.googleapis.com/icon?family=Material+Icons"
	];
	
	for (var c = 0; c < reqwavered.length; ++c) {
		var f = reqwavered[c];
		loadCss(f);
	}
	

	$("body").append("<div class='wave--background'></div>");
	waveBoxOpen = false;

	wave = {
		import: function(component, d, init) {
			if (from !== "./") {
				dev(d);
			}
			
			loadCss(from + "components/default/styles/default.css");
			loadCss(from + "components/default/styles/mobile.css");
			
			if (component.constructor === Array) {
				for (var c = 0; c < component.length; ++c) {
					var comp = component[c];
					if (comp) {
						try {
							loadCss(from + "components/" + comp + "/styles/default.css");
							loadCss(from + "components/" + comp + "/styles/mobile.css");

							if (init !== false) {
								loadInit(from + "components/" + comp + "/init.js");
							}
						} catch(e) {
							console.error("[wave] Failed to load " + comp);
						}
					}
				}
				
				setTimeout(function () {
					try {
						waveImported();
					} catch (e) {
						
					}
				}, 200);
				
			} else {
				if (component) {
					loadCss(from + "components/" + component + "/styles/default.css");
					loadCss(from + "components/" + component + "/styles/mobile.css");
				}

				if (init !== false) {
					loadInit("./components/" + component + "/init.js");
				}
			}
			
		},
		init: function (component) {
			if (component.constructor === Array) {
				for (var c = 0; c < component.length; ++c) {
					var comp = component[c];
					if (comp) {
						loadInit(from + "components/" + comp + "/init.js");
					}
				}
			} else {
				if (component) {
					loadInit("./components/" + component + "/init.js");
				}
			}
		},
		background: {
			show: function() {
				s = ".wave--background";
				$(s).addClass("show");
			},
			hide: function() {
				s = ".wave--background";
				$(s).removeClass("show");
			}
		},
		box: {
			open: function(options) {
				if (options) {

				if (waveBoxOpen) {
					$("body").remove(".wave--box");
				}

				wave.background.show();

				$("body").append("<div class='wave--box'><div class='wave--box-top'><h1 class='wave--box-top-text'>Title</h1></div><div class='wave--box-content'><h1 class='wave--box-content-text'>Content</h1></div><div class='wave--box-buttons'><div class='wave--box-button wave--box-false'><h1 class='wave--box-false-text'>False</h1></div><div class='wave--box-button wave--box-true'><h1 class='wave--box-true-text'>True</h1></div></div></div>");

				if (options.title) {
					$(".wave--box-top-text").text(options.title);
				} else {
					$(".wave--box-top-text").text("Title");
				}

				if (options.content) {
					$(".wave--box-content-text").text(options.content);
				} else {
					$(".wave--box-content-text").text("Content");
				}

				if (options.btnFalse) {
					$(".wave--box-false-text").text(options.btnFalse);
				} else {
					$(".wave--box-false-text").text("False");
				}

				if (options.btnTrue) {
					$(".wave--box-true-text").text(options.btnTrue);
				} else {
					$(".wave--box-true-text").text("True");
				}

				if (options.onFalse) {
					$(".wave--box-false").on("click", options.onFalse);
				} else {
					$(".wave--box-false").on("click", function(){wave.box.close()});
				}

				if (options.onTrue) {
					$(".wave--box-true").on("click", options.onTrue);
				} else {
					$(".wave--box-true").on("click", function(){wave.box.close()});
				}

				if (options.buttonsClose === true || !options.buttonsClose) {
					$(".wave--box-true").on("click", function(){wave.box.close()});
					$(".wave--box-false").on("click", function(){wave.box.close()});
				}
			}

			$(".wave--box").addClass("open");

			waveBoxOpen = true;
			},
			close: function() {
				if (waveBoxOpen) {
					$(".wave--box").removeClass("open");
					setTimeout(function(){$(".wave--box").remove();},200);
					wave.background.hide();
					waveBoxOpen = true;
				}
			}
		}
	}
	
	waveOnload(wave);
});

$(document).ready(function(){
	$.fn.toggleColor = function(options) {
		this.toggleClass("on");
		if (this.hasClass("on")) {
			this.css("color", options.on);
		} else {
			this.css("color", options.off);
		}
	};
});

$(document).ready(function(){
	$("button.wave").addClass("wave--button");
	$("input.wave").addClass("wave--input");
	$("div.wave.buttongroup").addClass("wave--button-group");
	$("div.wave.button.group").addClass("wave--button-group");
	$("div.wave.btngroup").addClass("wave--button-group");
	$("div.wave.btn.group").addClass("wave--button-group");
});