/* 
	copyright rster2002
	You may make personal changes to this code, exept this comment.


	put under here a unique extensionId, preferably your extensions name.
	If used on a site page, use extensionId of the extension that you want
	to listen to.
*/

extensionId = "tec_local_account.extension"

/* 
	Define a id to listen to and a codeId to define the code to run
	Add the code in the 'f' function with the case '<your codeId>'
*/

/* to add code, add a case with your code id */

function func(codeId) {
	switch (codeId) {
		case 'compleetSetup':
			compleetSetup();
			break;
		default:
			console.log("error: No codeId defined");
			break;
	}
}

/* dont change the code under here unless you know what you are doing */

function listen(id, codeId) {
	document.addEventListener('DOMContentLoaded', function() {
		var link = document.getElementById(id);
		link.addEventListener('click', function() {
			func(codeId);
		});
	});
}

/* add listeners under here */

listen("compleetSetup", "compleetSetup")

/* end of listeners */

/* Dont change code under here unless you know what you are doing */

function sendData(dataId, data) {
	sessionStorage.setItem(extensionId + "_" + dataId, data);
}

function reciveData(dataId) {
	return sessionStorage.getItem(extensionId + "_" + dataId);
}

function storeData(saveName, data) {
	localStorage[saveName] = data;
}

function loadData(saveName) {
	return localStorage[saveName];
}