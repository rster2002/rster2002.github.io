function qrCamStop() {
	$('#reader').html5_qrcode_stop();
	$('#reader').remove();
	$('.qrScanner-outer').append("<div id='reader' style='width:100%;height:100%;'></div>");
	readerOn = false;
	$(".qrCam-outer").fadeOut();
	$(".qrCam").hide;
}

function qrCodeShow() {
	var amount = prompt("How much do you want to receive?");
	if (amount === '') {
		amount = "false";
	}
	new QRCode(document.getElementById("qrcode"), uid + "/" + amount);
	$(".qrCode-outer").fadeIn();
	$(".qrCode").show();
}

function qrCodeHide() {
	$(".qrCode-outer").fadeOut();
	$(".qrCode").hide;
	$("#qrcode").remove();
	$(".qrCode").append("<div id='qrcode'></div>");
}

function qrCam() {
	$(".qrCam-outer").fadeIn();
	$(".qrCam").show();
	$('#reader').html5_qrcode(
	function(data) {
		var qrCode = data.split("/");
		toId = qrCode[0];
		amount = Number(qrCode[1]);
		if (amount === "false") {
			var prompt = prompt(prompt("How much do you want to pay?"));
			if (prompt === false) {
				return;
			} else {
				amount = Number(prompt);
			}
		}
		qrCamStop();
		payment(toId,amount);
	},
	function(error){
		console.log(error);
	}, 
	function(videoError){
		//the video stream could be opened
	});
}