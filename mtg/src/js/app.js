Vue.component("counter", {
	template: `
		<div class="counter" v-bind:style="{transform: rotationStyle}">
			<div class="background" v-bind:style="{background: backgroundStyle}">
			</div>
			<div class="forground">
				<div class="left side" @click="dec()">
					<i class="material-icons">remove</i>
				</div>
				<div class="middle" @click="settings()">
					<h1>{{ health }}</h1>
				</div>
				<div class="right side" @click="inc()">
					<i class="material-icons">add</i>
				</div>
			</div>
			<div class="settings forground" v-if="settingsShow">
				<div class="bar">
					<div class="button" @click="settings()">
						<i class="material-icons">close</i>
					</div>
				</div>
				<input placeholder="Name player" v-model="playerName" />
				<input placeholder="Background color" v-model="background" />
				<button @click="rotate()">Rotate</button>
				<button @click="savePlayer()">Save player</button>
				<button @click="loadPlayer()">Load player</button>
			</div>
		</div>
	`,
	props: ["player", "background"],
	data: function() {
		return {
			health: 20,
			rotation: 0,
			rotationStyle: "rotate(0deg)",
			settingsShow: false,
			playerName: ""
		}
	},
	methods: {
		inc() {
			this.health += 1;
			$(".counter." + this.player + " .middle h1").addClass("animateInc");
			let t = this;
			setTimeout(function() {
				console.log("het")
				$(".counter." + t.player + " .middle h1").removeClass("animateInc");
			}, 300);
		},
		dec() {
			this.health -= 1;
			$(".counter." + this.player + " .middle h1").addClass("animateDec");
			let t = this;
			setTimeout(function() {
				$(".counter." + t.player + " .middle h1").removeClass("animateDec");
			}, 300);
		},
		rotate() {
			this.rotation += 180;
			console.log(this.rotation);
			this.rotationStyle = `rotate(${this.rotation}deg)`;
		},
		settings() {
			this.settingsShow = !this.settingsShow;
		},
		savePlayer() {
			let player = this.playerName;
			let t = this;

			function save() {
				let save = {
					background: t.background,
					playerName: t.playerName
				}
				localStorage.setItem(player, JSON.stringify(save));
			}

			if (localStorage.getItem(player) !== undefined) {
				if (confirm("You are about to overwrite a profile. Are you sure?")) {
					save();
				}
			} else {
				save();
			}
		},
		loadPlayer() {
			if (localStorage.getItem(this.playerName) !== undefined) {
				let save = JSON.parse(localStorage.getItem(this.playerName));
				this.background = save.background;
			}
		}
	},
	computed: {
		backgroundStyle() {
			if (this.background.includes("http://") || this.background.includes("https://")) {
				return `url(${this.background}) no-repeat center`;
			} else {
				return this.background;
			}
		}
	}
});

var vueApp = new Vue({
	el: "#app"
});
