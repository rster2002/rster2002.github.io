function toFixed(value, precision) {
    var precision = precision || 0,
        power = Math.pow(10, precision),
        absValue = Math.abs(Math.round(value * power)),
        result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

    if (precision > 0) {
        var fraction = String(absValue % power),
            padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
        result += '.' + padding + fraction;
    }
    return result;
}

if (localStorage.getItem("payMoney")) {
	payMoney = toFixed(localStorage.getItem("payMoney"), 4);
	document.getElementById("pixels").innerHTML = payMoney + "P";
} else {
	payMoney = 1000;
	localStorage.setItem("payMoney", payMoney);
	document.getElementById("pixels").innerHTML = payMoney + "P";
}

function transaction() {
	much = Number(prompt("How much do you want to make a transaction code of?"));
	code = Number(prompt("Type a code the reciever needs to recieve the transaction"));
	if (much <= payMoney) {
		muchCode = bigInt(much).multiply(code);
		confirmCode = bigInt(12351).multiply(code);
		code = String(muchCode + "-" + confirmCode);
		payMoney = Number(payMoney);
		payMoney -= much;
		localStorage.setItem("payMoney", payMoney);
		document.getElementById("pixels").innerHTML = payMoney + "P";
		alert("You code is: " + code);
	} else {
		alert("Not enough pixels");
	}
}

function completeTransaction() {
	var muchCode = prompt("Type the transaction code");
	var confirmCode = prompt("Type the configm code");
	var muchCode = muchCode.split("-");
	var code = muchCode[1];
	var checkCode = Number(code) / Number(confirmCode);
	if (checkCode === 12351) {
		var addMoney = Number(muchCode[0]) / Number(confirmCode);
		payMoney = Number(payMoney);
		payMoney += Number(addMoney);
		localStorage.setItem("payMoney", payMoney);
		document.getElementById("pixels").innerHTML = payMoney + "P";
		alert("Transaction succesfull!");
	} else {
		alert("Something went wrong");
	}
}