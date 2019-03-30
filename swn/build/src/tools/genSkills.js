function g() {
	function s(a) {
		return `\t\t\t\t<div class="skill">
						<div class="checkboxWrapper">
							<checkbox :val="c.skills.${a}.trained" vname="skills.${a}.trained" @change="h"></checkbox>
						</div>
						<div class="lvl" v-if="c.skills.${a}.trained">
							<div @click="sklAdd('${a}')" class="ctrl">
								<p>
									<span class="material-icons">add</span>
								</p>
							</div>
							<div class="disp">
								<h1>{{ c.skills.${a}.lvl }}</h1>
							</div>
							<div @click="sklRmv('${a}')" class="ctrl">
								<p>
									<span class="material-icons">remove</span>
								</p>
							</div>
						</div>
						<div class="txt">
							<p>${a}</p>
						</div>
					</div>`
	}

	var skills = [
		"administer",
		"connect",
		"exert",
		"fix",
		"heal",
		"know",
		"lead",
		"notice",
		"perform",
		"pilot",
		"program",
		"punch",
		"shoot",
		"sneak",
		"stab",
		"survive",
		"talk",
		"trade",
		"work"
	]

	var r = [];
	skills.forEach(a => r.push(s(a)));

	return r.join("\n");

}
