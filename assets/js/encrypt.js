function encrypt(input) {
	if (input === null) {
		alert("Je moet iets invullen");
		location.href="index.html";
	}
	var rawstr1 = '';
	for (var char of input) {
		rawstr1 += char.charCodeAt();
	}
	var rawstr2 = '';
	for (var char of rawstr1) {
		rawstr2 += char.charCodeAt();
	}
	var rawstr3 = '';
	for (var char of rawstr2) {
		rawstr3 += char.charCodeAt();
	}
	var rawstr4 = '';
	for (var char of rawstr3) {
		rawstr4 += char.charCodeAt();
	}
	return rawstr4;
}