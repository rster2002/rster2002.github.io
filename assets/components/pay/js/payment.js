dbUsers.child(uid).on("value",function(e) {
	var dbContent = e.val();
	$("#balance").text(dbContent.value + "C");
	$("#paymentId").text(dbContent.paymentId);
});