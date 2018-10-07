var crToXp = {
	"0": 10,
	"1/8": 25,
	"1/4": 50,
	"1/2": 100,
	"1": 200,
	"2": 450,
	"3": 700,
	"4": 1100,
	"5": 1800,
	"6": 2300,
	"7": 2900,
	"8": 3900,
	"9": 5000,
	"10": 5900,
	"11": 7200,
	"12": 8400,
	"13": 10000,
	"14": 11500,
	"15": 13000,
	"16": 15000,
	"17": 18000,
	"18": 20000,
	"19": 22000,
	"20": 25000,
	"21": 33000,
	"22": 41000,
	"23": 50000,
	"24": 62000,
	"25": 75000,
	"26": 90000,
	"27": 105000,
	"28": 120000,
	"29": 135000,
	"30": 155000
}

var playerXpThreshhold = [
	{e: 25, m: 50, h: 75, d: 100},
	{e: 50, m: 100, h: 150, d: 200},
	{e: 75, m: 150, h: 225, d: 400},
	{e: 125, m: 250, h: 375, d: 500},
	{e: 250, m: 500, h: 750, d: 1100},
	{e: 300, m: 600, h: 900, d: 1400},
	{e: 350, m: 750, h: 1100, d: 1700},
	{e: 450, m: 900, h: 1400, d: 2100},
	{e: 550, m: 1100, h: 1600, d: 2400},
	{e: 600, m: 1200, h: 1900, d: 2800},
	{e: 800, m: 1600, h: 2400, d: 3600},
	{e: 1000, m: 2000, h: 3000, d: 4500},
	{e: 1100, m: 2200, h: 3400, d: 5100},
	{e: 1250, m: 2500, h: 3800, d: 5700},
	{e: 1400, m: 2800, h: 4300, d: 6400},
	{e: 1600, m: 3200, h: 4800, d: 7200},
	{e: 2000, m: 3900, h: 5900, d: 8800},
	{e: 2100, m: 4200, h: 6300, d: 9500},
	{e: 2400, m: 4900, h: 7300, d: 10900},
	{e: 2800, m: 5700, h: 8500, d: 12700}
]

var vueInstance = new Vue({
	el: "#vueMonsters",
	data: {
		query: "",
		monsters: [],
		players: [],
		selectedMonsters: [],
		calculator: {
			output: "Nothing calculated",
			easy: 0,
			medium: 0,
			hard: 0,
			deadly: 0,
			calculated: false
		}
	},
	computed: {
		monstersList: function() {
			var vm = this
			var query = vm.query.toLowerCase();
			return this.monsters.filter(function (item) {
				if (item.name === undefined) {
					return false;
				} else {
					if (query.includes("cr:")) {
						var value = query.replace("cr:", "");
						return item.challenge_rating.toLowerCase() == value;
					} else {
						return item.name.toLowerCase().includes(query);
					}
				}
			});
		}
	},
	methods: {
		show(monster) {
			let currentValue = this.monstersList[this.monstersList.indexOf(monster)].show;
			console.log(currentValue);
			console.log(this.monstersList[this.monstersList.indexOf(monster)]);
			if (currentValue === undefined || currentValue === false) {
				this.monstersList[this.monstersList.indexOf(monster)].show = true;
			} else {
				this.monstersList[this.monstersList.indexOf(monster)].show = false;
			}
		},
		addPlayer() {
			this.players.push({
				level: 1,
				count: 1
			});
		},
		addMonster(monster) {
			this.selectedMonsters.push({
				name: monster.name,
				count: 1,
				cr: monster.challenge_rating
			});
		},
		removeMonster(monster) {
			this.selectedMonsters.splice(this.selectedMonsters.indexOf(monster), 1);
		},
		removePlayer(player) {
			this.players.splice(this.players.indexOf(player), 1);
		},
		calculate() {
			let easy = 0;
			let medium = 0;
			let hard = 0;
			let deadly = 0;
			let totalPlayers = 0;
			for (var i = 0; i < this.players.length; ++i) {
				let playerLevel = this.players[i].level;
				let count = this.players[i].count;
				let row = playerXpThreshhold[playerLevel - 1];
				totalPlayers += count;
				easy += count * row.e;
				medium += count * row.m;
				hard += count * row.h;
				deadly += count * row.d;
			}

			console.log({
				easy: easy,
				medium: medium,
				hard: hard,
				deadly: deadly
			});

			if (this.selectedMonsters.length > 0) {
				let totalXp = 0;
				let length = this.selectedMonsters.length;
				for (var i = 0; i < length; ++i) {
					let monster = this.selectedMonsters[i];
					totalXp += monster.count * crToXp[monster.cr];
				}
				let multipliers = [
					[1.5, 1, 0.5], // 1
					[2, 1.5, 1], // 2
					[2.5, 2, 1.5], // 3-6
					[3, 2.5, 2], // 7-10
					[4, 3, 2.5], // 11-14
					[5, 4, 3] // 15->
				] // 1-2 3-5 6->

				let row;
				if (length === 1) {
					row = multipliers[0];
				} else if (length === 2) {
					row = multipliers[1];
				} else if (length >= 3 && length <= 6) {
					row = multipliers[2];
				} else if (length >= 7 && length <= 10) {
					row = multipliers[3];
				} else if (length >= 11 && length <= 14) {
					row = multipliers[4];
				} else if (length >= 15) {
					row = multipliers[5];
				}

				let multiplier;
				if (totalPlayers <= 2) {
					multiplier = row[0];
				} else if (totalPlayers >= 3 && totalPlayers <= 5) {
					multiplier = row[1];
				} else if (totalPlayers > 6) {
					multiplier = row[2];
				}

				let xpCost = totalXp * multiplier;

				if (xpCost <= easy - 1) {
					this.calculator.output = "Very easy";
				} else if (xpCost >= easy && xpCost <= medium - 1) {
					this.calculator.output = "Easy";
				} else if (xpCost >= medium && xpCost <= hard - 1) {
					this.calculator.output = "Medium";
				} else if (xpCost >= hard && xpCost <= deadly - 1) {
					this.calculator.output = "Hard";
				} else if (xpCost >= deadly) {
					this.calculator.output = "Deadly";
				}
			}

			this.calculator.easy = easy;
			this.calculator.medium = medium;
			this.calculator.hard = hard;
			this.calculator.deadly = deadly;
			this.calculator.calculated = true;
		}
	}
});

$.getJSON("./src/json/monsters.json", function(data) {
	var returning = [];
	for (var i = 0; i < data.length; ++i) {
		function modifier(score) {
			let mods = ["-5", "-4", "-4", "-3", "-3", "-2", "-2", "-1", "-1", "+0", "+0", "+1", "+1", "+2", "+2", "+3", "+3", "+4", "+4", "+5", "+5", "+6", "+6", "+7", "+7", "+8", "+8", "+9", "+9", "+10", "+10", "+11", "+11", "+12", "+12", "+13", "+13", "+14", "+14", "+15", "+15"];
			return mods[score - 1];
		}
		function tt(score) {
			if (score < 0) {
				return "-" + String(score);
			} else {
				return "+" + String(score);
			}
		}
		let d = data[i];
		d["show"] = false;

		// abilty modifiers
		d["strength_modifier"] = modifier(d.strength);
		d["dexterity_modifier"] = modifier(d.dexterity);
		d["constitution_modifier"] = modifier(d.constitution);
		d["intelligence_modifier"] = modifier(d.intelligence);
		d["wisdom_modifier"] = modifier(d.wisdom);
		d["charisma_modifier"] = modifier(d.charisma);
		d["xp"] = crToXp[d["challenge_rating"]];

		// saving throws
		d["savingthrows"] = "";
		d["savingthrows"] += d["strength_save"] !== undefined ? "Str " + tt(d["strength_save"]) + " " : "";
		d["savingthrows"] += d["dexterity_save"] !== undefined ? "Dex " + tt(d["dexterity_save"]) + " " : "";
		d["savingthrows"] += d["constitution_save"] !== undefined ? "Con " + tt(d["constitution_save"]) + " " : "";
		d["savingthrows"] += d["intelligence_save"] !== undefined ? "Int " + tt(d["intelligence_save"]) + " " : "";
		d["savingthrows"] += d["wisdom_save"] !== undefined ? "Wis " + tt(d["wisdom_save"]) + " " : "";
		d["savingthrows"] += d["charisma_save"] !== undefined ? "Cha " + tt(d["charisma_save"]) + " " : "";

		d["skills"] = "";
		d["skills"] += d["acrobatics"] !== undefined ? "Acrobatics " + tt(d["acrobatics"]) + " " : "";
		d["skills"] += d["animal_handeling"] !== undefined ? "Animal handeling " + tt(d["animal_handeling"]) + " " : "";
		d["skills"] += d["arcana"] !== undefined ? "Arcana " + tt(d["arcana"]) + " " : "";
		d["skills"] += d["deception"] !== undefined ? "Deception " + tt(d["deception"]) + " " : "";
		d["skills"] += d["history"] !== undefined ? "History " + tt(d["history"]) + " " : "";
		d["skills"] += d["insight"] !== undefined ? "Insight " + tt(d["insight"]) + " " : "";
		d["skills"] += d["intimidation"] !== undefined ? "Intimidation " + tt(d["intimidation"]) + " " : "";
		d["skills"] += d["medicine"] !== undefined ? "Medicine " + tt(d["medicine"]) + " " : "";
		d["skills"] += d["nature"] !== undefined ? "Nature " + tt(d["nature"]) + " " : "";
		d["skills"] += d["perception"] !== undefined ? "Perception " + tt(d["perception"]) + " " : "";
		d["skills"] += d["performance"] !== undefined ? "Performance " + tt(d["performance"]) + " " : "";
		d["skills"] += d["persuasion"] !== undefined ? "Persuasion " + tt(d["persuasion"]) + " " : "";
		d["skills"] += d["religion"] !== undefined ? "Str " + tt(d["religion"]) + " " : "";
		d["skills"] += d["sleight_of_hand"] !== undefined ? "Sleight of hand " + tt(d["sleight_of_hand"]) + " " : "";
		d["skills"] += d["stealth"] !== undefined ? "Stealth " + tt(d["stealth"]) + " " : "";
		d["skills"] += d["survival"] !== undefined ? "Survival " + tt(d["survival"]) + " " : "";

		d["special_abilities"] = d["special_abilities"] !== undefined ? d["special_abilities"] : [];
		d["actions"] = d["actions"] !== undefined ? d["actions"] : [];
		d["legendary_actions"] = d["legendary_actions"] !== undefined ? d["legendary_actions"] : [];

		returning.push(d);
	}
	console.log(returning);
	vueInstance.monsters = returning;
});
