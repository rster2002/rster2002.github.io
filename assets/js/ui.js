notifyOpen = false;

//document.head.innerHTML += "<style id='uijs'></style>";
//document.getElementById("uijs").innerHTML = "@import url('https://fonts.googleapis.com/css?family=Ubuntu');.notify.material {background-color: #1F1F1F;position: fixed;width: 60vw;height: 5vh;top: 95vh;left: 20vw;color: #1F1F1F;border-top-left-radius: 5px;border-top-right-radius: 5px;}.notify.material h1 {margin-left: 5%;font-family: 'Ubuntu', sans-serif;line-height: 40%;font-size: 3vh;color: #F98009;float: left;}.notify.material button {transition: .2s all ease-in;float: right;margin-right: 5%;height: 90%;width: 8%;margin-top: 0.15%;font-size: 3vh;cursor: pointer;border: none;background-color: #1F1F1F;color: white;}.notify.material button:active {transition: .2s all ease-in;background-color: #383838;border: none;}"

uijs = {
	notify: {
		open: function(options) {
			if (options.style === undefined) {
				notifyStyle = "material";
			} 
			switch (options.style) {
				default:
					notifyStyle = "material";
				break;
			}
			if (notifyOpen === true) {
				document.getElementById("notify").remove();
				notifyOpen = false;
			}
			if (options.onBtn !== undefined) {
				notifyOnBtn = options.onBtn;
			} else {
				notifyOnBtn = function(){}
			}
			try {
				document.body.innerHTML += "<div class='notify " + notifyStyle + " open' id='notify'><h1>" + options.text + "</h1><button onclick='btnNotify()'>" + options.btnText + "</button></div>";
				notifyOpen = true;
			}
			catch(err) {
				console.error("Something is undefined in the options: " + err);
				notifyOpen = false;
			}
		},
		close: function() {
			document.getElementById("notify").remove();
			notifyOpen = false;
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
            if (options.)
        }
    }
}

function btnNotify() {
	notifyOnBtn();
}