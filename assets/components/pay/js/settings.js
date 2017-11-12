 function settingChangeName() {
	 var changeName = $("#settingChangeName").val();
	 if (changeName.length > 50) {
		 alert("This name is to long");
		 return;
	 } else {
		 dbUsers.child(uid).child("username").set(changeName);
		 alert("Name changed to " + changeName);
	 }
 }

function settingChangePaymentId() {
	var changePaymentId = $("#settingChangePaymentId").val();
	if (changePaymentId.length > 50) {
		 alert("This payment id is to long");
		 return;
	 } else {
		 try {
			 dbPaymentId.child(changePaymentId).once("value",function(e){
				 var dbContent = e.val();
				 if (dbContent === null) {
					 dbUsers.child(uid).once("value",function(e){
						 var dbContent = e.val();
						 dbUsers.child(uid).child("paymentId").set(changePaymentId);
						 dbPaymentId.child(dbContent.paymentId).remove();
						 dbPaymentId.child(changePaymentId).set(uid);
						 alert("Changed payment id to " + changePaymentId);
					 })
				 } else {
					 alert("This payment id is already in use");
					 return;
				 }
			 })
		 } catch(e) {
			 error(e);
		 }
	 }
}