dmOptions = [
	"Items",
	"Lore",
	"Locations",
	"Events"
]

function openOption(option) {
	$("#optionGrid").load("../assets/components/dndb/pages/dm/" + option + ".html");
}

function loadOptions() {
	$(".option").remove();
	for (var i = 0; i < dmOptions.length; ++i) {
		var p = dmOptions[i];
		$("#optionGrid").append("<div class='wave card d3 t6 m12 option' option='" + p + "'><div class='title'><h1>" + p + "</h1></div><div class='actions'><button>Open</button></div></div>")
	}

	$(".option").on("click", function() {
		var option = $(this).attr("option");
		$(".option").remove();
		openOption(option);
	});
}

loadOptions();
