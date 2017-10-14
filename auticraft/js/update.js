articleNr = 0;
updatesHeight = 100;

function openArticle(number) {
	$("#article-outer-" + number).css("display","block");
}

function closeArticle(number) {
	$("#article-outer-" + number).css("display","none");
}

function article(name, img, position, content, type, postedBy) {
	if (sessionStorage.getItem("filter") === type || sessionStorage.getItem("filter") === "all") {
		articleNr += 1
		updatesHeight += 500;
		document.getElementById("updates").setAttribute("style", "height: " + updatesHeight + "px;");
		/* Create main div */
		var element = document.createElement("div");
		element.setAttribute("style", "display:block;margin-left:auto;margin-right:auto;position: relative; width: 50%;margin-top: 50px;");
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
		element.setAttribute("style", "position: relative; top: -20%;font-family: 'Noto Sans', sans-serif; color: white;")
		document.getElementById("header_" + articleNr).appendChild(element);

		/* Create image */
		var element = document.createElement("div");
		element.style.backgroundImage = "url(" + img + ");";
		element.setAttribute("id", "img_" + articleNr);
		document.getElementById("main_" + articleNr).appendChild(element);
		document.getElementById("img_" + articleNr).setAttribute("style", "background-image: url(" + img + "); background-position: " + position + "; width: 99%; height: 300px;background-size:cover;");

		/* Create button */
		var element = document.createElement("div");
		element.setAttribute("style", "display:block;margin-left:auto;margin-right:auto;background-color: rgb(0, 187, 0); border-top: 5px solid rgb(0, 220, 0); border-left: 5px solid rgb(0, 100, 0); border-bottom: 5px solid rgb(0, 130, 0); border-right: 5px solid rgb(0, 190, 0); height: 60px; width: 200px; position: relative;  top: 85%; color: white; font-size: 30px; font-family: 'Noto Sans', sans-serif; transition: 0.2s ease-in all;cursor: pointer;");
		element.setAttribute("id", "button_" + articleNr);
		element.setAttribute("onclick", "openArticle(" + articleNr + ")");
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

		/* Create type */
		var element = document.createElement("div");
		switch (type) {
			case 'event':
				element.setAttribute("style", "display:block;margin-left:auto;margin-right:auto;background-color: rgb(210, 140, 0); border-top: 5px solid rgb(230, 140, 0); border-left: 5px solid rgb(190, 140, 0); border-bottom: 5px solid rgb(200, 140, 0); border-right: 5px solid rgb(220, 140, 0); height: 40px; width: 100px; position: relative; top: -30%; color: white; font-size: 30px; font-family: 'Noto Sans', sans-serif; transition: 0.2s ease-in all;");
				break;
			case 'update':
				element.setAttribute("style", "display:block;margin-left:auto;margin-right:auto;background-color: rgb(0, 130, 0); border-top: 5px solid rgb(0, 150, 0); border-left: 5px solid rgb(0, 110, 0); border-bottom: 5px solid rgb(0, 120, 0); border-right: 5px solid rgb(0, 140, 0); height: 40px; width: 120px; position: relative; top: -30%; color: white; font-size: 30px; font-family: 'Noto Sans', sans-serif; transition: 0.2s ease-in all;");
				break;
			case 'mededeling':
				element.setAttribute("style", "display:block;margin-left:auto;margin-right:auto;background-color: rgb(80, 80, 220); border-top: 5px solid rgb(100, 100, 240); border-left: 5px solid rgb(60, 60, 200); border-bottom: 5px solid rgb(70, 70, 210); border-right: 5px solid rgb(90, 90, 230); height: 40px; width: 200px; position: relative; top: -30%; color: white; font-size: 30px; font-family: 'Noto Sans', sans-serif; transition: 0.2s ease-in all;");
				break;
			case 'wedstrijd':
				element.setAttribute("style", "display:block;margin-left:auto;margin-right:auto;background-color: rgb(170, 0, 0); border-top: 5px solid rgb(190, 0, 0); border-left: 5px solid rgb(130, 0, 0); border-bottom: 5px solid rgb(140, 0, 0); border-right: 5px solid rgb(160, 0, 0); height: 40px; width: 200px; position: relative; top: -30%; color: white; font-size: 30px; font-family: 'Noto Sans', sans-serif; transition: 0.2s ease-in all;");
				break;
			default: 
				element.setAttribute("style", "display:block;margin-left:auto;margin-right:auto;background-color: rgb(210, 210, 210); border-top: 5px solid rgb(230, 230, 230); border-left: 5px solid rgb(190, 190, 190); border-bottom: 5px solid rgb(200, 200, 200); border-right: 5px solid rgb(220, 220, 220); height: 40px; width: 100px; position: relative; top: -30%; color: black; font-size: 30px; font-family: 'Noto Sans', sans-serif; transition: 0.2s ease-in all;");
				break;
		}
		element.setAttribute("id", "type_" + articleNr);
		document.getElementById("header_" + articleNr).appendChild(element);
		var element = document.createElement("p");
		element.setAttribute("style", "position:relative;top:-80%;font-family:'Noto Sans',sans-serif;")
		var text = document.createTextNode(type);
		element.appendChild(text);
		document.getElementById("type_" + articleNr).appendChild(element);
		
		var element = document.createElement("div");
		element.setAttribute("class", "article-outer");
		element.setAttribute("id", "article-outer-" + articleNr);
		element.setAttribute("onclick", "closeArticle(" + articleNr + ")");
		document.getElementById("articles").appendChild(element);
		var element = document.createElement("div");
		element.setAttribute("class", "article-inner");
		element.setAttribute("id", "article-inner-" + articleNr);
		document.getElementById("article-outer-" + articleNr).appendChild(element);
		var element = document.createElement("h1");
		element.innerHTML = name;
		element.id = "title";
		document.getElementById("article-inner-" + articleNr).appendChild(element);
		var element = document.createElement("p");
		element.innerHTML = "Gepost door: " + postedBy;
		element.id = "postedBy";
		document.getElementById("article-inner-" + articleNr).appendChild(element);
		var element = document.createElement("p");
		element.innerHTML = content;
		document.getElementById("article-inner-" + articleNr).appendChild(element);
	}
}

function removeArticle(nr) {
	var elem = document.getElementById('main_' + nr);
	elem.parentNode.removeChild(elem);
	updatesHeight -= 500;
	document.getElementById("updates").setAttribute("style", "height: " + updatesHeight + "px;");
}

function clearArticles() {
	while (articleNr > 0) {
		var elem = document.getElementById('main_' + articleNr);
		elem.parentNode.removeChild(elem);
		updatesHeight -= 500;
		document.getElementById("updates").setAttribute("style", "height: " + updatesHeight + "px;");
		articleNr -= 1;
	}
}