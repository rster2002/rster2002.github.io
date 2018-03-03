$(document).ready(function() {
	var style = "";
	// font
	style += "@import url('https://fonts.googleapis.com/css?family=Roboto');"
	// global background
	style += ".ui--background{display:none;transition:50ms all ease-in;z-index:99;position:fixed;width:100vw;height:100vh;background-color:rgba(0,0,0,0)}.ui--background.show{display:block;transition:50ms all ease-in;background-color:rgba(0,0,0,.5)}";
	// box
	style += ".ui--box.open{transition:200ms all ease-in;position:fixed;z-index:100;font-family:'Roboto',sans-serif;width:40%;height:40%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)}.ui--box{background-color:white;transition:200ms all ease-in;position:fixed;z-index:100;font-family:'Roboto',sans-serif;width:40%;height:40%;position:absolute;top:100%;left:50%;transform:translate(-50%,0%);box-shadow:0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)}.ui--box-top{width:100%;height:20%;border-bottom:1px #ebebeb solid}.ui--box-top .ui--box-top-text{margin:0;width:90%;position:relative;top:50%;left:2%;transform:translate(0%,-50%);text-align:left;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ui--box-content{height:60%;width:100%}.ui--box-content .ui--box-content-text{height:90%;width:98%;margin:0;position:relative;top:5%;left:2%;text-align:left;display:block;overflow:hidden;overflow-y:auto;text-overflow:ellipsis}.ui--box-buttons{height:20%;width:100%}.ui--box-buttons .ui--box-button{width:50%;height:100%;float:left;cursor:pointer}.ui--box-buttons .ui--box-button h1{margin:0;width:90%;position:relative;top:50%;left:2%;transform:translate(0%,-50%);text-align:left;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}.ui--box-buttons .ui--box-true{transition:100ms all ease-in;background-color:white}.ui--box-buttons .ui--box-true:hover{transition:100ms all ease-in;background-color:#4c90ff}.ui--box-buttons .ui--box-false{transition:150ms all ease-in;background-color:white}.ui--box-buttons .ui--box-false:hover{transition:150ms all ease-in;background-color:rgb(235,235,235)}";


	$("head").append("<style>" + style + "</style>");


	$("body").append("<div class='ui--background'></div>")
	uiBoxOpen = false;

	uijs = {
		background: {
			show: function() {
				s = ".ui--background";
				$(s).addClass("show");
			},
			hide: function() {
				s = ".ui--background";
				$(s).removeClass("show");
			}
		},
		box: {
			open: function(options) {
				if (options) {

				if (uiBoxOpen) {
					$("body").remove(".ui--box");
				}

				uijs.background.show();

				$("body").append("<div class='ui--box'><div class='ui--box-top'><h1 class='ui--box-top-text'>Title</h1></div><div class='ui--box-content'><h1 class='ui--box-content-text'>Content</h1></div><div class='ui--box-buttons'><div class='ui--box-button ui--box-false'><h1 class='ui--box-false-text'>False</h1></div><div class='ui--box-button ui--box-true'><h1 class='ui--box-true-text'>True</h1></div></div></div>");

				if (options.title) {
					$(".ui--box-top-text").text(options.title);
				} else {
					$(".ui--box-top-text").text("Title");
				}

				if (options.content) {
					$(".ui--box-content-text").text(options.content);
				} else {
					$(".ui--box-content-text").text("Content");
				}

				if (options.btnFalse) {
					$(".ui--box-false-text").text(options.btnFalse);
				} else {
					$(".ui--box-false-text").text("False");
				}

				if (options.btnTrue) {
					$(".ui--box-true-text").text(options.btnTrue);
				} else {
					$(".ui--box-true-text").text("True");
				}

				if (options.onFalse) {
					$(".ui--box-false").on("click", options.onFalse);
				} else {
					$(".ui--box-false").on("click", function(){uijs.box.close()});
				}

				if (options.onTrue) {
					$(".ui--box-true").on("click", options.onTrue);
				} else {
					$(".ui--box-true").on("click", function(){uijs.box.close()});
				}

				if (options.buttonsClose === true || !options.buttonsClose) {
					$(".ui--box-true").on("click", function(){uijs.box.close()});
					$(".ui--box-false").on("click", function(){uijs.box.close()});
				}
			}

			$(".ui--box").addClass("open");

			uiBoxOpen = true;
			},
			close: function() {
				if (uiBoxOpen) {
					$(".ui--box").removeClass("open");
					setTimeout(function(){$(".ui--box").remove();},200);
					uijs.background.hide();
					uiBoxOpen = true;
				}
			}
		}
	}
});