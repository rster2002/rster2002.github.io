timeLeft = Math.floor((Math.random() * 6) + 1) * 1000;
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
	
	if (moneyCashe >= 1000) {
		lss = false;
	}
	
	if (moneyCashe < 1000 && lss === false) {
		Push.create("Now is your chance!", {
			body: "The price is now less than 1000",
			timeout: 4000,
			onClick: function () {
				window.focus();
				this.close();
			}
		});
		//alert("not");
		lss = true;
	}
	localStorage.setItem("moneyBank", moneyCashe);
	document.getElementById("price").innerHTML = moneyCashe;
	
	var change = localStorage.getItem("change");
	
	if (stocks > 0) {
		if (moneyCashe < change) {
			var i = change - moneyCashe;
			document.getElementById("add").innerHTML = "Current price: -" + i;
			document.getElementById("title").innerHTML = "tmg (-" + i + ")";
		} else {
			var i = moneyCashe - change;
			document.getElementById("add").innerHTML = "Current price: +" + i;
			document.getElementById("title").innerHTML = "tmg (+" + i + ")";
		}
	} else {
		document.getElementById("title").innerHTML = "The Money Game";
		document.getElementById("add").innerHTML = "Current price:";
	}
	
	timeLeft = Math.floor((Math.random() * 6) + 1) * 1000;
}, timeLeft);

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
		localStorage.setItem("change", price);
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
	money = 2000;
	localStorage.setItem("money", money);
	document.getElementById("money").innerHTML = money;
	stocks = 5;
	localStorage.setItem("stocks", stocks);
	document.getElementById("stocks").innerHTML = stocks;
}

function transver() {
	payMoney = Number(localStorage.getItem("payMoney"));
	money = Number(localStorage.getItem("money"))
	much = Number(prompt("How much do you want to transver?"));
	if (much === null || much === "") {
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