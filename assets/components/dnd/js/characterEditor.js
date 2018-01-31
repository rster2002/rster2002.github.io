sUid = sessionStorage.getItem("::uid");

$(".innerPage").ready(() => {
	$(".characterContainer").load("../assets/components/dnd/pages/characterSheet.html");
});

sessionStorage.setItem("::saved","false");
console.log("hmm");
function saveCharacter() {
	try {
		s();
		console.log(characterObj);
		if (sessionStorage.getItem("::saved") !== "false") {
			dbUsers.child(sUid).child("characters").child(sessionStorage.getItem("::saved")).set(characterObj);
			alert("Saved character sheet");
		} else {
			var i = prompt("Type a name for this caracter sheet");
			if (i) {
				loader.show();
				sessionStorage.setItem("::saved",i);
				dbUsers.child(sUid).child("characters").child(i).set(characterObj);
				alert("Saved character sheet");
				loader.hide();
			}
		}
	} catch(e) {
		error(e);
	}
}

function saveAsCharacter() {
	s();
	var i = prompt("Type a name for this caracter sheet");
	if (i) {
		loader.show();
		sessionStorage.setItem("::saved",i);
		dbUsers.child(sUid).child("characters").child(i).set(characterObj);
		loader.hide();
	}
}

function loadCharacter() {
	try {
		var i = prompt("Type the name of the caracter sheet you want to load");
		if (i) {
			
			loader.show();
			
			dbUsers.child(sUid).child("characters").once("value",function(e){
				var dbContent = e.val();
				if (e.hasChild(i)) {
					var c = dbContent[i];
					console.log(c);
					l(c);
					sessionStorage.setItem("::saved",i);
					loader.hide();
				} else {
					loader.hide();
					alert("Couldn't find this character in your account");
				}
			});

			loader.hide();
		}
	} catch(e) {
		error(e);
	}
}

pages = {
	1: 106,
	2: 16,
	3: 214
}
function s() {
	characterObj = {};
	for (var page = 0; page <= 3; ++page) {
		if (page > 0) {
			for (var i = 0; i <= pages[page]; ++i) {
				if (i > 0) {
					var obj = $("#form" + i + "_" + page);
					if (obj.is("input")) {
						if (obj.is(":text")) {
							characterObj[i + "_" + page] = $(obj).val();
						}
					} else if (obj.is("textarea")) {
						characterObj[i + "_" + page] = $(obj).val();
					} else if ($("input#form" + i + "_" + page).is(":checkbox")) {
						characterObj[i + "_" + page] = $("input#form" + i + "_" + page).is(":checked");
					}
				}
			}
		}
	}
}

function l(characterObj) {
	for (var page = 0; page <= 3; ++page) {
		if (page > 0) {
			for (var i = 0; i <= pages[page]; ++i) {
				if (i > 0) {
					var obj = $("#form" + i + "_" + page);
					if (obj.is("input")) {
						if (obj.is(":text")) {
							$("input#form" + i + "_" + page).val(characterObj[i + "_" + page]);
						}
					} else if (obj.is("textarea")) {
						$("textarea#form" + i + "_" + page).val(characterObj[i + "_" + page]);
					} else if ($("input#form" + i + "_" + page).is(":checkbox")) {
						if (characterObj[i + "_" + page]) {
							$("input#form" + i + "_" + page).prop("checked",true);
							$("img#form" + i + "_" + page).attr("src","1/form/3011 0 ROn.png");
						}
					}
				}
			}
		}
	}
}
