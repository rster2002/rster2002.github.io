articleNr = 0;
updatesHeight = 50;
function article(name, img, page) {
	articleNr += 1
	updatesHeight += 500;
	document.getElementById("updates").setAttribute("style", "height: " + updatesHeight + "px;");
	/* Create main div */
	var element = document.createElement("div");
	element.setAttribute("style", "position: relative; width: 50%; left: 25%; margin-top: 50px;");
	element.setAttribute("id", "main_" + articleNr);
	document.getElementById("updates").appendChild(element);
	
	/* Create header */
	var element = document.createElement("div");
	element.setAttribute("id", "header_" + articleNr);
	element.setAttribute("style", "width: 99%; height: 100px; background-color: green; background-color: rgb(40, 40, 40); border-top: 5px solid rgb(55, 55, 55); border-left: 5px solid rgb(10, 10, 10); border-bottom: 5px solid rgb(20, 20, 20); border-right: 5px solid rgb(30, 30, 30); text-align: center;");
	document.getElementById("main_" + articleNr).appendChild(element);
	
	/* Create header text */
	var element = document.createElement("h1");
	var text = document.createTextNode(name);
	element.appendChild(text);
	element.setAttribute("style", "line-height: 50px; font-family: 'Noto Sans', sans-serif; color: white;")
	document.getElementById("header_" + articleNr).appendChild(element);
	
	/* Create image */
	var element = document.createElement("div");
	element.style.backgroundImage = "url(" + img + ");";
	element.setAttribute("id", "img_" + articleNr);
	document.getElementById("main_" + articleNr).appendChild(element);
	document.getElementById("img_" + articleNr).setAttribute("style", "background-image: url(" + img + "); width: 99%; height: 300px;");
	
	/* Create button */
	var element = document.createElement("div");
	element.setAttribute("style", "background-color: rgb(0, 187, 0); border-top: 5px solid rgb(0, 220, 0); border-left: 5px solid rgb(0, 100, 0); border-bottom: 5px solid rgb(0, 130, 0); border-right: 5px solid rgb(0, 190, 0); height: 60px; width: 200px; position: relative; left: 35%; top: 85%; color: white; font-size: 30px; font-family: 'Noto Sans', sans-serif; transition: 0.2s ease-in all;cursor: pointer;");
	element.setAttribute("id", "button_" + articleNr);
	element.setAttribute("onclick", "location.href='" + page + "'");
	document.getElementById("img_" + articleNr).appendChild(element);
	var element = document.createElement("a");
	
	/* Create button text */
	var text = document.createTextNode("bekijk");
	element.appendChild(text);
	element.setAttribute("style", "position: relative; top: -67%; left: 0%; text-shadow: 0 4px 0 rgba(0, 0, 0, 0.25); font-family: 'Noto Sans', sans-serif; font-size: 30px; line-height: 140px; cursor: pointer;");
	document.getElementById("button_" + articleNr).appendChild(element);
	
	/* Create style for button pressed */
	var element = document.createElement("style");
	element.innerHTML = "#button_" + articleNr + ":hover {transition: 0.2s ease-in all;transform: scale(1.2);background-color: rgb(40, 40, 40);border-top: 5px solid rgb(55, 55, 55);border-left: 5px solid rgb(10, 10, 10);border-bottom: 5px solid rgb(20, 20, 20);border-right: 5px solid rgb(30, 30, 30);}";
	document.getElementById("main_" + articleNr).appendChild(element);
}