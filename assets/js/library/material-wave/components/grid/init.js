async function loadCellStyles(url, media) {
	var head  = document.getElementsByTagName('head')[0];
	var link  = document.createElement('link');
	link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.href = url;
	link.media = media;
	// if (url.includes("mobile")) {
	// 	link.media = "screen and (max-device-width: 800px)";
	// } else {
	// 	link.media = 'all';
	// }
	head.appendChild(link);

	sessionStorage.setItem("wave--css", cssId);
}

loadCellStyles(waveFrom + "components/grid/cells/desktop.css", "all");
loadCellStyles(waveFrom + "components/grid/cells/tablet.css", "screen and (max-device-width: 800px)");
loadCellStyles(waveFrom + "components/grid/cells/mobile.css", "screen and (max-device-width: 599px)");
