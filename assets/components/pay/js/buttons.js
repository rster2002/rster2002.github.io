$(document).ready(function(){
	$("#btnCreateTransaction").on("click",function(){
		$(".createTransaction-outer").fadeIn();
		$(".createTransaction").show();
	});
	
	$("#btnCloseCreateTransaction").on("click",function(){
		closeCreateTransaction();
	});
	
	$("#btnUsingQrCode").on("click",function(){
		closeCreateTransaction();
		qrCodeShow();
	});
	
	$("#btnReceiveQrCode").on("click",function(){
		closeCreateTransaction();
		qrCam();
	});
	
	$("#settings").on("click",function(){
		openPopup("settings");			  
	});
	
	$("#paymentCancel").on("click",function(){
		closePopup("payment");
	});
	
	$("#paymentConfirm").on("click",function(){
		confirmPayment();
	});
	
	$(".menu").on("click",function(){
		toggleMenu();
	});
});