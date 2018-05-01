var id = sessionStorage.getItem("::project");
var ref = firestore.collection("projects").doc(id);

ref.get().then(function(doc) {
	if (doc && doc.exists) {
		var prj = doc.data();
		$(".head").css("background-color", prj.color);
		$(".title").text(prj.name);
	}
})