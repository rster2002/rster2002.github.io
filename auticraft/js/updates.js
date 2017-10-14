var config = {
    apiKey: "AIzaSyDCgnh6ezKcNkcpAUtGXuiN77jxlDbLPck",
    authDomain: "dewebsite-bae27.firebaseapp.com",
    databaseURL: "https://dewebsite-bae27.firebaseio.com",
    projectId: "dewebsite-bae27",
    storageBucket: "dewebsite-bae27.appspot.com",
    messagingSenderId: "437303961105"
};
firebase.initializeApp(config);

var dbRef = firebase.database().ref("auticraft");

function articles(type) {
	sessionStorage.setItem("filter", "all");
	console.log("filtered " + type);
	switch (type) {
		case 'update':
			clearArticles();
			sessionStorage.setItem("filter", "update");
			break;
		case 'mededeling':		
			clearArticles();
			sessionStorage.setItem("filter", "mededeling");
			break;
		case 'wedstrijd':		
			clearArticles();
			sessionStorage.setItem("filter", "wedstrijd");
			break;
		case 'event':		
			clearArticles();
			sessionStorage.setItem("filter", "event");
			break;
		default:
			clearArticles();
			sessionStorage.setItem("filter", "all");
			break;
	}
	/* articles */
	dbRef.child("articles").once("value",function(e){
		var dbContent = e.val();
		for (var i = 0; i < dbContent.length; i++) {
			article(dbContent[i].title, dbContent[i].img, dbContent[i].offset, dbContent[i].content, dbContent[i].type, dbContent[i].postedBy);
		}
	})
//	article("website updates", "https://community-content-assets.minecraft.net/upload/styles/small/s3fs/abc84939cb66bbc5113d1b339da4ce5e-aubbeta_bit1.jpg", "0% 0%", "<p><h1>Hello World</h1><p>How are you</p></p>", "update");
}