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
	article("Skulls a.0.13", "assets/images/auticraft/reset.png", "30% 45%","auticraft/articles/a.0.13.html", "update");
	article("Skulls resetten", "assets/images/auticraft/reset.png", "30% 45%","auticraft/articles/skulls%20reset.html", "mededeling");
	article("Skulls a.0.12", "assets/images/auticraft/spawn.png", "30% 20%","auticraft/articles/a.0.12.html", "update");
	article("Skulls a.0.11", "assets/images/auticraft/spawn.png", "30% 20%","auticraft/articles/a.0.11.html", "update");
	article("Skulls a.0.10", "assets/images/auticraft/spawn.png", "30% 20%","auticraft/articles/a.0.10.html", "update");
	article("Skulls a.0.9", "assets/images/auticraft/spawn.png", "30% 20%","auticraft/articles/a.0.9.html", "update");
	article("Paarden korting", "assets/images/auticraft/shops.jpg", "50% 50%","auticraft/articles/event1.html", "event");
	article("Skulls a.0.8", "assets/images/auticraft/spawn.png", "30% 20%","auticraft/articles/a.0.8.html", "update");
	article("Komt dat zien", "assets/images/auticraft/meincraft.jpg", "30% 20%","auticraft/articles/default.html", "mededeling");
	article("Paarden races", "assets/images/auticraft/horse.png", "30% 5%","auticraft/articles/paarden-races.html", "wedstrijd");
	article("Skulls a.0.7 patch 3", "auticraft/js/spawn.png", "30% 20%","auticraft/articles/a.0.7.3.html", "update");
}