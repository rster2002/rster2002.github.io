loader = {
	show: function() {
		$(".loader").addClass("active");
	},
	hide: function() {
		$(".loader").removeClass("active");
	}
}

function openPage(page) {
	loader.show();
	$(".innerPage").remove();
	$(".page").load("../assets/components/task/pages/" + page + ".html");
}