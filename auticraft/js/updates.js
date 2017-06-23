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
	article("skulls project", "assets/images/auticraft/reset.png", "30% 45%", "auticraft/articles/project.html", "mededeling");
	article("Skulls resetten", "assets/images/auticraft/reset.png", "30% 45%","auticraft/articles/skulls%20reset.html", "mededeling");
	article("Paarden korting", "assets/images/auticraft/shops.jpg", "50% 50%","auticraft/articles/event1.html", "event");
	article("Komt dat zien", "assets/images/auticraft/meincraft.jpg", "30% 20%","auticraft/articles/default.html", "mededeling");
	article("Paarden races", "assets/images/auticraft/horse.png", "30% 5%","auticraft/articles/paarden-races.html", "wedstrijd");
}