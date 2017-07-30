lss = false;
max = false;
if (localStorage.getItem("ch")) {
	var i = localStorage.getItem("ch");
	if (i === "") {
		ch = [];
	} else {
		ch = i.split(",");
	}
} else {
	ch = ["200","200","200","200","200"];
}

if (localStorage.getItem("botTime")) {
	botTime = Number(localStorage.getItem("botTime"));
} else {
	botTime = new Date().getTime();
	localStorage.setItem("botTime",botTime)
}

if (localStorage.getItem("minLss")) {
	minLss = localStorage.getItem("minLss");
	document.getElementById("minLss").value = minLss;
	cminLss = localStorage.getItem("cminLss");
	if (cminLss === "true") {cminLss = true} else {cminLss = false}
	if (cminLss === true) {document.getElementById("cminLss").checked = true};
}

if (localStorage.getItem("minMax")) {
	minMax = localStorage.getItem("minMax");
	document.getElementById("minMax").value = minMax;
	cminMax = localStorage.getItem("cminMax");
	if (cminMax === "true") {cminMax = true} else {cminMax = false}
	if (cminMax === true) {document.getElementById("cminMax").checked = true};
}

if (localStorage.getItem("minPro")) {
	minPro = localStorage.getItem("minPro");
	document.getElementById("minPro").value = minPro;
	cminPro = localStorage.getItem("cminPro");
	if (cminPro === "true") {cminPro = true} else {cminPro = false}
	if (cminPro === true) {document.getElementById("cminPro").checked = true};
}

if (localStorage.getItem("maxPro")) {
	maxPro = localStorage.getItem("maxPro");
	document.getElementById("maxPro").value = maxPro;
	cmaxPro = localStorage.getItem("cmaxPro");
	if (cmaxPro === "true") {cmaxPro = true} else {cmaxPro = false}
	if (cmaxPro === true) {document.getElementById("cmaxPro").checked = true};
}

if (localStorage.getItem("money")) {
	money = Number(localStorage.getItem("money"));
	document.getElementById("money").innerHTML = money;
} else {
	money = 2000;
	localStorage.setItem("money", money);
	document.getElementById("money").innerHTML = money;
}

if (localStorage.getItem("stocks")) {
	stocks = Number(localStorage.getItem("stocks"));
	document.getElementById("stocks").innerHTML = stocks;
} else {
	stocks = 5;
	localStorage.setItem("stocks", stocks);
	document.getElementById("stocks").innerHTML = stocks;
}

int = 1000;
if (localStorage.getItem("botMode") === "true") {
	int = 100;
}

window.setInterval(function(){
	if (localStorage.getItem("moneyBank")) {
		moneyCashe = localStorage.getItem("moneyBank");
	} else {
		localStorage.setItem("moneyBank", 0);
		moneyCashe = 0;
	}
	changeMoney = Number(Math.floor((Math.random() * 1000) + 100));
	what = Math.floor((Math.random() * 2) + 1);
	if (what === 1) {
		moneyCashe = Number(moneyCashe) + changeMoney;
	} else {
		moneyCashe = Number(moneyCashe) - changeMoney;
	}
	if (moneyCashe < 200) {
		moneyCashe = 200;
	}
	
	if (moneyCashe >= minLss) {
		lss = false;
	}
	
	if (cminPro === true) {
		var procent = Math.round((moneyCashe / money) * 100);
		if (procent <= minPro) {
			while (moneyCashe <= money) {
				++stocks
				money -= moneyCashe;
				localStorage.setItem("stocks", stocks);
				document.getElementById("stocks").innerHTML = stocks;
				localStorage.setItem("money", money);
				document.getElementById("money").innerHTML = money;
				ch.unshift(String(moneyCashe));
				localStorage.setItem("ch", ch);
			}
		}
	}
	 
	if (cminLss === true) {
		if (moneyCashe < minLss && lss === false) {
			Push.create("Now is your chance!", {
				body: "The price is now less than " + minLss,
				timeout: 4000,
				onClick: function () {
					window.focus();
					this.close();
				}
			});
			//alert("not");
			lss = true;
		}
	}
	localStorage.setItem("moneyBank", moneyCashe);
	document.getElementById("price").innerHTML = moneyCashe;
	
	var change = localStorage.getItem("change");
	
	if (stocks > 0) {
		if (moneyCashe < Number(ch[0])) {
			var i = Number(ch[0]) - moneyCashe;
			document.getElementById("add").innerHTML = "Current price: -" + i;
			document.getElementById("title").innerHTML = "tmg (-" + i + ")";
		} else {
			var i = moneyCashe - Number(ch[0]);
			document.getElementById("add").innerHTML = "Current price: +" + i;
			document.getElementById("title").innerHTML = "tmg (+" + i + ")";
			if (i < minMax) {
				max = false;
			}
			if (cminMax === true) {
				if (i >= minMax && max === false) {
					Push.create("Now is your chance!", {
					body: "The profit is now more than " + minMax,
					timeout: 4000,
					onClick: function () {
						window.focus();
						this.close();
					}
					});
					//alert("yes");
					max = true;
				}
			}
			if (cmaxPro === true) {
				var procent = Math.round((i / moneyCashe) * 100);
				if (procent >= maxPro) {
					while (stocks > 0) {
						--stocks;
						money += moneyCashe;
						localStorage.setItem("stocks", stocks);
						document.getElementById("stocks").innerHTML = stocks;
						localStorage.setItem("money", money);
						document.getElementById("money").innerHTML = money;
						ch.shift();
						localStorage.setItem("ch", ch);
					}
				}
			}
		}
	} else {
		document.getElementById("title").innerHTML = "The Money Game";
		document.getElementById("add").innerHTML = "Current price:";
	}
}, int);

function buy() {
	var price = localStorage.getItem("moneyBank");
	if (money < price) {
		alert("You dont have enough money!");
	} else {
		money = Number(money) - price;
		stocks += 1;
		localStorage.setItem("stocks", stocks);
		document.getElementById("stocks").innerHTML = stocks;
		localStorage.setItem("money", money);
		document.getElementById("money").innerHTML = money;
		ch.unshift(String(price));
		localStorage.setItem("ch", ch);
	}
}

function sell() {
	if (stocks > 0) {
		var price = localStorage.getItem("moneyBank");
		money = Number(money) + Number(price);
		stocks -= 1;
		localStorage.setItem("stocks", stocks);
		document.getElementById("stocks").innerHTML = stocks;
		localStorage.setItem("money", money);
		document.getElementById("money").innerHTML = money;
		ch.shift();
		localStorage.setItem("ch", ch);
		if (stocks > 0) {
			if (moneyCashe < Number(ch[0])) {
				var i = Number(ch[0]) - moneyCashe;
				document.getElementById("add").innerHTML = "Current price: -" + i;
				document.getElementById("title").innerHTML = "tmg (-" + i + ")";
			} else {
				var i = moneyCashe - Number(ch[0]);
				document.getElementById("add").innerHTML = "Current price: +" + i;
				document.getElementById("title").innerHTML = "tmg (+" + i + ")";
				if (i < minMax) {
					max = false;
				}
				if (minMax !== false) {
					if (i >= minMax && max === false) {
						Push.create("Now is your chance!", {
						body: "The profit is now more than " + minMax,
						timeout: 4000,
						onClick: function () {
							window.focus();
							this.close();
						}
						});
						//alert("yes");
						max = true;
					}
				}
			}
		} else {
			document.getElementById("title").innerHTML = "The Money Game";
			document.getElementById("add").innerHTML = "Current price:";
		}
	} else {
		alert("You dont have any stocks");
	}
}

function reset() {
	document.getElementById("price").innerHTML = "resetting...";
	localStorage.removeItem("moneyBank");
	localStorage.removeItem("money");
	localStorage.removeItem("stocks");
	localStorage.removeItem("change");
	localStorage.removeItem("ch");
	money = 2000;
	localStorage.setItem("money", money);
	document.getElementById("money").innerHTML = money;
	stocks = 5;
	localStorage.setItem("stocks", stocks);
	document.getElementById("stocks").innerHTML = stocks;
	ch = ["200","200","200","200","200"];
}

function transver() {
	payMoney = Number(localStorage.getItem("payMoney"));
	money = Number(localStorage.getItem("money"))
	much = Number(prompt("How much do you want to transver?"));
	if (much === null || much === "") {
		return;
	}
	if (much < 1) {
		alert("This is not right")
		return;
	}
	if (much <= money) {
		var transverAmmount = much / 10000;
		if (confirm("Are you sure you want to transver to pay? You'll get " + transverAmmount + "Pixels") === true) {
			payMoney += Number(transverAmmount);
			localStorage.setItem("payMoney", payMoney);
			money -= much;
			localStorage.setItem("money", money);
			document.getElementById("money").innerHTML = money;
			alert("transver succesfull");
		} else {
			return;
		}
		
	} else {
		alert("You dont have enough money");
	}
}

function settings() {
	if (document.getElementById("cminLss").checked) {
		cminLss = true;
		minLss = document.getElementById("minLss").value;
		localStorage.setItem("minLss", minLss);
		localStorage.setItem("cminLss", cminLss);
	} else {
		cminLss = false;
		localStorage.setItem("cminLss", cminLss);
	}
	if (document.getElementById("cminMax").checked) {
		cminMax = true;
		minMax = document.getElementById("minMax").value;
		localStorage.setItem("minMax", minMax);
		localStorage.setItem("cminMax", cminMax);
	} else {
		cminMax = false;
		localStorage.setItem("cminMax", cminMax);
	}
	if (document.getElementById("cminPro").checked) {
		cminPro = true;
		minPro = document.getElementById("minPro").value;
		localStorage.setItem("minPro", minPro);
		localStorage.setItem("cminPro", cminPro);
	} else {
		cminPro = false;
		localStorage.setItem("cminPro", cminPro);
	}
	if (document.getElementById("cmaxPro").checked) {
		cmaxPro = true;
		maxPro = document.getElementById("maxPro").value;
		localStorage.setItem("maxPro", maxPro);
		localStorage.setItem("cmaxPro", cmaxPro);
	} else {
		cmaxPro = false;
		localStorage.setItem("cmaxPro", cmaxPro);
	}
}

function botMode() {
	var date = new Date();
	botTimeUse = [date.getHours, date.getDay];
}

window.setInterval(function(){
},1000)