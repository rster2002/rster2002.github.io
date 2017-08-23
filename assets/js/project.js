function openPrj(name, header) {
	sessionStorage.removeItem("prjName");
	sessionStorage.removeItem("header");
	sessionStorage.setItem("prjName",name);
	if (header === false) {
		sessionStorage.setItem("header","false");
	} else {
		sessionStorage.setItem("header",header);
	}
	location.href="dev/project.html?prj=" + name;
}

function loadPrj() {
}