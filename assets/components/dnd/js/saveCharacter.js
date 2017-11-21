sessionStorage.setItem("::saved","false");
console.log("hmm");
function saveCharacter() {
	s();
	console.log(characterObj);
	if (sessionStorage.getItem("::saved") !== "false") {
		dbUsers.child(uid).child("characters").child(sessionStorage.getItem("::saved")).set(characterObj);
	} else {
		var i = prompt("Type a name for this character sheet");
		if (i) {
			sessionStorage.setItem("::saved",i);
			dbUsers.child(uid).child("characters").child(i).set(characterObj);
			alert("Saved character sheet");
		}
	}
}

function saveAsCharacter() {
	s();
	var i = prompt("Type a name for this caracter sheet");
	if (i) {
		sessionStorage.setItem("::saved",i);
		dbUsers.child(uid).child("characters").child(i).set(characterObj);
	}
}

function loadCharacter() {
	var i = prompt("Type the name of the caracter sheet you want to load");
	if (i) {
		dbUsers.child(uid).child("characters").once("value",function(e){
			var dbContent = e.val();
			if (e.hasChild(i)) {
				var c = dbContent[i];
				l(c);
				sessionStorage.setItem("::saved",i);
			} else {
				alert("Couldn't find this character in your account");
			}
		});
	}
}

var page1 = 106;
var page2 = 16;
var page3 = 214;
function s() {
	characterObj = {};
	for (var i = 0; i <= page1; ++i) {
		if (i > 0) {
			var obj = $("#form" + i + "_1");
			if (obj.is("input")) {
				if (obj.is(":text")) {
					characterObj[i + "_1"] = $(obj).val();
				}
			} else if (obj.is("textarea")) {
				characterObj[i + "_1"] = $(obj).val();
			} else if ($("input#form" + i + "_1").is(":checkbox")) {
				characterObj[i + "_1"] = $("input#form" + i + "_1").is(":checked");
			}
		}
	}
	for (var i = 0; i <= page2; ++i) {
		if (i > 0) {
			var obj = $("#form" + i + "_2");
			if (obj.is("input")) {
				if (obj.is(":text")) {
					characterObj[i + "_2"] = $(obj).val();
				}
			} else if (obj.is("textarea")) {
				characterObj[i + "_2"] = $(obj).val();
			} else if ($("input#form" + i + "_2").is(":checkbox")) {
				characterObj[i + "_2"] = $("input#form" + i + "_2").is(":checked");
			}
		}
	}
	for (var i = 0; i <= page3; ++i) {
		if (i > 0) {
			var obj = $("#form" + i + "_3");
			if (obj.is("input")) {
				if (obj.is(":text")) {
					characterObj[i + "_3"] = $(obj).val();
				}
			} else if (obj.is("textarea")) {
				characterObj[i + "_3"] = $(obj).val();
			} else if ($("input#form" + i + "_3").is(":checkbox")) {
				characterObj[i + "_3"] = $("input#form" + i + "_3").is(":checked");
			}
		}
	}
}

function l(characterObj) {
	for (var i = 0; i <= page1; ++i) {
		if (i > 0) {
			var obj = $("#form" + i + "_1");
			if (obj.is("input")) {
				if (obj.is(":text")) {
					$("input#form" + i + "_1").val(characterObj[i + "_1"]);
				}
			} else if (obj.is("textarea")) {
				$("textarea#form" + i + "_1").val(characterObj[i + "_1"]);
			} else if ($("input#form" + i + "_1").is(":checkbox")) {
				if (characterObj[i + "_1"]) {
					$("input#form" + i + "_1").prop("checked",true);
					$("img#form" + i + "_1").attr("src","1/form/3011 0 ROn.png");
				}
			}
		}
	}
	for (var i = 0; i <= page2; ++i) {
		if (i > 0) {
			var obj = $("#form" + i + "_2");
			if (obj.is("input")) {
				if (obj.is(":text")) {
					$("input#form" + i + "_2").val(characterObj[i + "_2"]);
				}
			} else if (obj.is("textarea")) {
				$("textarea#form" + i + "_2").val(characterObj[i + "_2"]);
			} else if ($("input#form" + i + "_2").is(":checkbox")) {
				if (characterObj[i + "_2"]) {
					$("input#form" + i + "_2").prop("checked",true);
					$("img#form" + i + "_2").attr("src","1/form/3011 0 ROn.png");
				}
			}
		}
	}
	for (var i = 0; i <= page3; ++i) {
		if (i > 0) {
			var obj = $("#form" + i + "_3");
			if (obj.is("input")) {
				if (obj.is(":text")) {
					$("input#form" + i + "_3").val(characterObj[i + "_3"]);
				}
			} else if (obj.is("textarea")) {
				$("textarea#form" + i + "_3").val(characterObj[i + "_3"]);
			} else if ($("input#form" + i + "_3").is(":checkbox")) {
				if (characterObj[i + "_3"]) {
					$("input#form" + i + "_3").prop("checked",true);
					$("img#form" + i + "_3").attr("src","1/form/3011 0 ROn.png");
				}
			}
		}
	}
}
