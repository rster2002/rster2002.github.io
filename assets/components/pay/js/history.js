dbUsers.child(uid).on("value",function(e){
	var dbContent = e.val();
	var historyArray = dbContent.history;
	for (var i = 0; i < historyArray.length; ++i) {
		if (historyArray[i].type === "add") {
			try {
				$(".historyList").append("<div class='historyItem'><h1 class='amount plus'>+" + historyArray[i].amount + "</h1><h1 class='from'>From " + historyArray[i].user + "</h1></div>");
			} catch(e) {
				error(e);
			}
		} else if (historyArray[i].type === "subtract") {
			try {
				$(".historyList").append("<div class='historyItem'><h1 class='amount minus'>-" + historyArray[i].amount + "</h1><h1 class='from'>To " + historyArray[i].user + "</h1></div>");
			} catch(e) {
				error(e);
			}
		} else {
			error("History item has no type");
			console.error("History item has no type")
		}
	}
});