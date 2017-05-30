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
	article("Paarden korting", "assets/images/auticraft/shops.jpg", "50% 50%","auticraft/articles/event1.html", "event");
	article("Skulls a.0.8", "assets/images/auticraft/spawn.png", "30% 20%","auticraft/articles/a.0.8.html", "update");
	article("Komt dat zien", "assets/images/auticraft/meincraft.jpg", "30% 20%","auticraft/articles/default.html", "mededeling");
	article("Paarden races", "assets/images/auticraft/horse.png", "30% 5%","auticraft/articles/paarden-races.html", "wedstrijd");
	article("Skulls a.0.7 patch 3", "auticraft/js/spawn.png", "30% 20%","auticraft/articles/a.0.7.3.html", "update");
}