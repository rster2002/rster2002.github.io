$("body").append("<div class='wave--dialogBackground' onclick='wave.dialog.close();'></div>");
$("body").append("<div class='wave--dialog'><div class='wave--head'><h1 class='wave--title'>Title</h1></div><div class='wave--content'><p>HelloWorld</p></div><div class='wave--actions'><button>Cancel</button><button>Accept</button></div></div>")

wave["dialog"] = {
	open: function(title, text, actions) {
		waveDialogFunctions = {};
		$(".wave--dialog .wave--head h1").text(title);
		$(".wave--dialog .wave--content p").text(text);
		$(".wave--dialog .wave--actions button").remove();
		$(".wave--dialogBackground").show();
		$(".wave--dialogBackground").addClass("open");
		$(".wave--dialog").show();
		for (var i = 0; i < actions.length; i++) {
			var action = actions[i];
			$(".wave--dialog .wave--actions").append("<button onclick='wave.dialog.runFunction(" + i + ")'>" + action.text + "</button>");
			waveDialogFunctions[i] = action.function;
		}
	},
	close: function() {
		$(".wave--dialogBackground").removeClass("open");
		$(".wave--dialog").hide();
		setTimeout(() => {
			$(".wave--dialogBackground").hide();
		}, 200)
	},
	confirm: function(text, fn) {
		wave.dialog.open("Confirm", text, [
			{
				"text": "Accept",
				"function": fn
			},
			{
				"text": "Cancel",
				"function": function() {
					wave.dialog.close();
				}
			}
		]);
	},
	alert: function(text) {
		wave.dialog.open("Alert", text, [
			{
				"text": "Close",
				"function": function() {
					wave.dialog.close();
				}
			}
		])
	},
	runFunction: function(index) {
		var fn = waveDialogFunctions[index];
		fn();
	}
}

waveGlobalSettings.push({
	"corners": function(a) {
		if (a.shape === "rounded") {
			$(".wave--dialogBackground .wave--dialog").css("border-radius", a.size);
		}
	}
})
