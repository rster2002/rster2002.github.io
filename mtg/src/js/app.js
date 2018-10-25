Vue.component("counter", {
	template: `
		<div class="counter" v-bind:style="{transform: rotationStyle}">
			<div class="background" v-bind:style="{background: color}">
			</div>
			<div class="forground">
				<div class="left side" @click="dec()">
					<i class="material-icons">remove</i>
				</div>
				<div class="middle" @click="rotate()">
					<h1>{{ health }}</h1>
				</div>
				<div class="right side" @click="inc()">
					<i class="material-icons">add</i>
				</div>
			</div>
		</div>
	`,
	props: ["player", "color"],
	data: function() {
		return {
			health: 20,
			rotation: 0,
			rotationStyle: "rotate(0deg)"
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
		}
	}
});

var vueApp = new Vue({
	el: "#app"
})
