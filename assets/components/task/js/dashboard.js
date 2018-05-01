sUid = sessionStorage.getItem("::uid");

async function getProjects() {
	$(".loaderList").addClass("active");
	var prjArray = await createQuery(userRef.collection("projects").orderBy("name", "asc"));
	for (var i = 0; i < prjArray.length; ++i) {
		var prj = prjArray[i];
		$(".list").append("<div class='project' prjId=" + prj.id + "><div class='color' style='background-color: " + prj.color + "'></div><div class='info'><h1 class='center'>" + prj.name + "</h1></div></div>")
	}
	$(".loaderList").removeClass("active");
	
	$(".project").on("click", function() {
		var id = $(this).attr("prjid");
		openPrj(id);
	});
}

function openPrj(id) {
	console.log(id);
	sessionStorage.setItem("::project", id);
	openPage("project");
}

function create() {
	var prjName = $("#name").val();
	var color = $(".color.selected").css("background-color");
	var prjId = randomString(idCharacters, 20);
	projects.doc(prjId).set({
		name: prjName,
		color: color,
		created: Date.now(),
		createdBy: sUid,
		admin: sUid
	}).then(function() {
		console.log("Written");
	}).catch(function(error) {
		console.log(error);
	});
	
	userRef.collection("projects").add({
		name: prjName,
		color: color,
		createdBy: "self",
		id: prjId
	}).then(function() {
		openPrj(prjId);
	});
}

getProjects();