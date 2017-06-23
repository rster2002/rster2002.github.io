height = 300;
versionNr = 0;
projectName = sessionStorage.getItem("pro_name");

function version(name, type, changes) {
	versionNr += 1;
	if(versionNr === 1) {
		localStorage.setItem("latest",name);
		var myStringArray = changes;
		var arrayLength = myStringArray.length;
		for (var i = 0; i < arrayLength; i++) {
			var element = document.createElement("li");
			element.innerHTML = myStringArray[i];
			document.getElementById("changes").appendChild(element);
		}
	}
	
	var arrayLength = changes.length;
	changesList = "";
	for (var i = 0; i < arrayLength - 1; i++) {
		changesList += "'" + changes[i] + "',";
	}
	changesList += "'" + changes[arrayLength - 1] + "'";
	
	if (type === "snapshot") {
		color = "-webkit-linear-gradient(92deg,rgb(0,240,240),rgb(0,80,80));-webkit-background-clip: text;-webkit-text-fill-color: transparent;-webkit-font-smoothing: antialiased;"
		var element = document.createElement("div");
		element.setAttribute("id", versionNr);
		element.setAttribute("style", "width:60%;height:100px;display:block;margin-left:auto;margin-right:auto;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);border-radius:3px;")
		element.setAttribute("onclick","openPage('" + name + "',[" + changesList + "])");
		document.getElementById("versions").appendChild(element);
		
		var element = document.createElement("h1");
		element.innerHTML = name;
		element.setAttribute("style","line-height:100px;font-size:50px;background-image: " + color);
		document.getElementById(versionNr).appendChild(element);
	}
	
	if (type === "pre") {
		color = "-webkit-linear-gradient(92deg,rgb(240,100,0),rgb(0,80,80));-webkit-background-clip: text;-webkit-text-fill-color: transparent;-webkit-font-smoothing: antialiased;"
		var element = document.createElement("div");
		element.setAttribute("id", versionNr);
		element.setAttribute("style", "width:60%;height:150px;display:block;margin-left:auto;margin-right:auto;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);border-radius:3px;")
		element.setAttribute("onclick","openPage('" + name + "',[" + changesList + "])");
		document.getElementById("versions").appendChild(element);
		
		var element = document.createElement("h1");
		element.innerHTML = name;
		element.setAttribute("style","line-height:150px;font-size:100px;background-image: " + color);
		document.getElementById(versionNr).appendChild(element);
	}
}

function openPage(name, changes) {
	var arrayLength = changes.length;
	changesList = "";
	for (var i = 0; i < arrayLength; i++) {
		changesList += "<li>" + changes[i] + "<li>";
	}
	var fileName = "'versions/" + projectName + "%20" + name + ".zip'";
	var opened = window.open('');
	opened.document.write("<html><head><title>" + name + "</title><link rel='icon' href='https://rster2002.github.io/assets/logo_black.png'><style>html {width: 100vw;overflow-x: hidden;}@font-face {font-family: Roboto-Thin;src: url(../../../assets/css/fonts/roboto/Roboto-Thin.ttf);}.header {width: 110%;height: 500px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);margin-left: -10px;margin-top: -100px;text-align: left;}.header h1 {line-height: 500px;font-size: 150px;font-family: 'Roboto-Thin';padding-left: 60px;background-image: " + color + "}.changes {margin-left: -10px;font-size: 30px;font-family: 'Roboto-Thin';text-align: center;align-items: center;}ul {list-style-type: none;}button {display: block;margin-left: auto;margin-right: auto;padding: 5px 10px;transition: 0.1s ease-in all;font-size: 30px;font-family: 'Roboto-Thin';background-color: rgb(255, 255, 255);border: 0px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);border-radius: 3px;cursor: pointer;}button:hover {transition: 0.1s ease-in all;font-size: 30px;font-family: 'Roboto-Thin';background-color: rgb(255, 255, 255);border: 0px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);border-radius: 3px;cursor: pointer;transform: scale(1.2);}button:active {transition: 0.1s ease-in all;font-size: 30px;font-family: 'Roboto-Thin';background-color: rgb(255, 255, 255);border: 0px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);border-radius: 3px;cursor: pointer;transform: scale(1.3);}</style></head><body><div class='header'><h1>" + name + "</h1></div><div class='changes'><h1>changes</h1><ul id='changes'>" + changesList + "</ul><button onclick=location.href=" + fileName + ">download</button></div></body></html>");
}
/*
localStorage.setItem('changes',"a.1");
changes = ["text","text2"];
localStorage.setItem("a.1",JSON.stringify(changes));
var name = "a.1";
var opened = window.open('');opened.document.write("<html><head><title>" + name + "</title><style>html {width: 100vw;overflow-x: hidden;}@font-face {font-family: Roboto-Thin;src: url(http://rster2002.github.io/assets/css/fonts/roboto/Roboto-Thin.ttf);}.header {width: 110%;height: 500px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);margin-left: -10px;margin-top: -100px;text-align: left;}.header h1 {line-height: 500px;font-size: 150px;font-family: 'Roboto-Thin';padding-left: 60px;background-image: -webkit-linear-gradient(92deg,rgb(0,240,240),rgb(0,80,80));-webkit-background-clip: text;-webkit-text-fill-color: transparent;-webkit-font-smoothing: antialiased;}.changes {font-size: 30px;font-family: 'Roboto-Thin';text-align: center;}</style></head><body><div class='header'><h1>" + name + "</h1></div><div class='changes'><h1>changes</h1><ul id='changes'></ul></div><script>name = localStorage.getItem('changes');changes = localStorage.getItem(name);var myStringArray = changes;var arrayLength = myStringArray.length;for (var i = 0; i < arrayLength; i++) {var element = document.createElement('li');element.innerHTML = myStringArray[i];document.getElementById('changes').appendChild(element);}</script></body></html>");
*/