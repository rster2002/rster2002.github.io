notifyOpen = false;

document.head.innerHTML += "<style id='uijs'></style>";
document.head.innerHTML += "<style id='uijs.m' media='screen and (max-device-width: 800px)'></style>"

document.getElementById("uijs").innerHTML = "@import url('https://fonts.googleapis.com/css?family=Ubuntu');.notify.material {background-color: #1F1F1F;position: fixed;width: 60vw;height: 5vh;top: 100vh;left: 20vw;color: #1F1F1F;border-top-left-radius: 5px;border-top-right-radius: 5px;animation:notifyOpen linear .15s forwards}.notify.close{animation:notifyClose linear .15s forwards}.notify.material h1 {margin-left: 5%;font-family: 'Ubuntu', sans-serif;line-height: 40%;font-size: 3vh;color: #F98009;float: left;}.notify.material button {transition: .2s all ease-in;float: right;margin-right: 5%;height: 90%;width: 8%;margin-top: 0.15%;font-size: 3vh;cursor: pointer;border: none;background-color: #1F1F1F;color: white;}.notify.material button:active {transition: .2s all ease-in;background-color: #383838;border: none;}@keyframes notifyOpen {from {top:100vh} to {top:95vh}} @keyframes notifyClose {from {top:95vh} to {top:100vh}}"
document.getElementById("uijs.m").innerHTML = ".notify.material {width: 100vw;height: 10vh;left:0vw} .notify.material button {float:right;margin-right: 1%;height: 90%;margin:0;}"

uijs = {
	notify: {
		open: function(options) {
			if (options === undefined) {
				console.error("No options object");
				return;
			}
			
			if (options.style === undefined) {
				notifyStyle = "material";
			} 
			
			switch (options.style) {
				default:
					notifyStyle = "material";
				break;
			}
			
			if (notifyOpen === true) {
				setTimeout(function(){
					document.getElementById("notify").remove();
					notifyOpen = false;
				}, 150)
			}
			
			if (options.btnAction !== undefined) {
				notifyOnBtn = options.btnAction;
			} else {
				notifyOnBtn = function(){}
			}
			
			if (options.btnClose !== undefined) {
				onBtnClose = options.btnClose;
			} else {
				onBtnClose = true;
			}
			
			if (options.autoClose !== undefined) {
				autoClose = options.autoClose;
			} else  {
				autoClose = false;
			}
			
			try {
				document.body.innerHTML += "<div class='notify " + notifyStyle + " open' id='notify'><h1>" + options.text + "</h1><button onclick='btnNotify(" + notifyOnBtn + "," + onBtnClose + ")'>" + options.btnText + "</button></div>";
				notifyOpen = true;
			}
			catch(err) {
				console.error("Something is undefined in the options: " + err);
				notifyOpen = false;
			}
			
			if (autoClose !== false) {
				setTimeout(function(){
					uijs.notify.close();
				}, autoClose);
			}
		},
		close: function() {
			document.getElementById("notify").className += " close";
			setTimeout(function(){
				document.getElementById("notify").remove();
				notifyOpen = false;
			}, 150)
		}
	},
    dialog: {
        confirm: function(options) {
            if (options.text === undefined) {
                options.text = "Confirm?";
            }
            if (options.btnConfirm === undefined) {
                options.btnConfirm = "Yes";
            }
//            if (options.)
        }
    }
}

function btnNotify(fn, close) {
	fn();
	if (close) {
		uijs.notify.close();
	}
}