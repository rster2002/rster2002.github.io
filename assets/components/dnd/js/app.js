console.log("app.js");

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register("./sw.js").then(() => {
		console.log("serviceWorker registered");
	}).catch((e) => {
		console.error(e);
	});
}
