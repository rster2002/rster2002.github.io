<template lang="html">
	<div>
		<card>
			<div v-if="!m.edit">
				<primaryTitle>
					<h1 v-if="c.name !== ''">{{ c.name }}</h1>
					<h1 v-else>Not named</h1>
					<h2 v-if="c.background !== '' || c.class !== ''">{{ c.background }} {{ c.class.toLowerCase() }}</h2>
				</primaryTitle>
			</div>
			<div v-if="m.edit">
				<textbox @change="h" :val="c.name" vname="name" label="Name"></textbox>
				<textbox @change="h" :val="c.background" vname="background" label="Background"></textbox>
				<textbox @change="h" :val="c.class" vname="class" label="Class"></textbox>
				<textbox @change="h" :val="c.level" vname="level" label="Level" type="number"></textbox>
			</div>
		</card>
		<card v-if="!m.edit">
			<primaryTitle v-if="c.settings.showTitles">
				<h1>Saving throws</h1>
			</primaryTitle>
			<div class="row">
				<div class="stat">
					<div class="mod">
						<h1>{{ savingThrow("physical") }}</h1>
					</div>
					<div class="label">
						<p>Physical</p>
					</div>
				</div>
				<div class="stat">
					<div class="mod">
						<h1>{{ savingThrow("evasion") }}</h1>
					</div>
					<div class="label">
						<p>Evasion</p>
					</div>
				</div>
				<div class="stat">
					<div class="mod">
						<h1>{{ savingThrow("mental") }}</h1>
					</div>
					<div class="label">
						<p>Mental</p>
					</div>
				</div>
			</div>
		</card>
		<card>
			<div v-if="!m.edit">
				<primaryTitle v-if="c.settings.showTitles">
					<h1>Attributes</h1>
				</primaryTitle>
				<div class="row">
					<div class="stat">
						<div class="mod">
							<h1>{{ mod(c.attributes.str) }}</h1>
						</div>
						<div class="label">
							<p>Strength</p>
						</div>
					</div>
					<div class="stat">
						<div class="mod">
							<h1>{{ mod(c.attributes.dex) }}</h1>
						</div>
						<div class="label">
							<p>Dexteriry</p>
						</div>
					</div>
					<div class="stat">
						<div class="mod">
							<h1>{{ mod(c.attributes.con) }}</h1>
						</div>
						<div class="label">
							<p>Constitution</p>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="stat">
						<div class="mod">
							<h1>{{ mod(c.attributes.int) }}</h1>
						</div>
						<div class="label">
							<p>Intelligence</p>
						</div>
					</div>
					<div class="stat">
						<div class="mod">
							<h1>{{ mod(c.attributes.wis) }}</h1>
						</div>
						<div class="label">
							<p>Wisdom</p>
						</div>
					</div>
					<div class="stat">
						<div class="mod">
							<h1>{{ mod(c.attributes.cha) }}</h1>
						</div>
						<div class="label">
							<p>Charisma</p>
						</div>
					</div>
				</div>
			</div>
			<div v-if="m.edit">
				<primaryTitle>
					<h1>Attributes</h1>
				</primaryTitle>
				<textbox @change="h" label="Strength" :val="c.attributes.str" vname="attributes.str" type="number"></textbox>
				<textbox @change="h" label="Dexteriry" :val="c.attributes.dex" vname="attributes.dex" type="number"></textbox>
				<textbox @change="h" label="Constitution" :val="c.attributes.con" vname="attributes.con" type="number"></textbox>
				<textbox @change="h" label="Intelligence" :val="c.attributes.int" vname="attributes.int" type="number"></textbox>
				<textbox @change="h" label="Wisdom" :val="c.attributes.wis" vname="attributes.wis" type="number"></textbox>
				<textbox @change="h" label="Charisma" :val="c.attributes.cha" vname="attributes.cha" type="number"></textbox>
			</div>
		</card>
		<card>
			<div v-if="!m.edit" class="colmsWrapper">
				<primaryTitle v-if="c.settings.showTitles">
					<h1>Skills</h1>
				</primaryTitle>
				<div class="col">
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("administer") }}</p>
						</div>
						<div class="txt">
							<p>Administer</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("connect") }}</p>
						</div>
						<div class="txt">
							<p>Connect</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("exert") }}</p>
						</div>
						<div class="txt">
							<p>Exert</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("fix") }}</p>
						</div>
						<div class="txt">
							<p>Fix</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("heal") }}</p>
						</div>
						<div class="txt">
							<p>Heal</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("know") }}</p>
						</div>
						<div class="txt">
							<p>Know</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("lead") }}</p>
						</div>
						<div class="txt">
							<p>Lead</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("notice") }}</p>
						</div>
						<div class="txt">
							<p>Notice</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("perform") }}</p>
						</div>
						<div class="txt">
							<p>Perform</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("pilot") }}</p>
						</div>
						<div class="txt">
							<p>Pilot</p>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("program") }}</p>
						</div>
						<div class="txt">
							<p>Program</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("punch") }}</p>
						</div>
						<div class="txt">
							<p>Punch</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("shoot") }}</p>
						</div>
						<div class="txt">
							<p>Shoot</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("sneak") }}</p>
						</div>
						<div class="txt">
							<p>Sneak</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("stab") }}</p>
						</div>
						<div class="txt">
							<p>Stab</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("survive") }}</p>
						</div>
						<div class="txt">
							<p>Survive</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("talk") }}</p>
						</div>
						<div class="txt">
							<p>Talk</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("trade") }}</p>
						</div>
						<div class="txt">
							<p>Trade</p>
						</div>
					</div>
					<div class="s">
						<div class="mod">
							<p>{{ skillMod("work") }}</p>
						</div>
						<div class="txt">
							<p>Work</p>
						</div>
					</div>
				</div>
			</div>
			<div v-if="m.edit">
				<primaryTitle>
					<h1>Skills</h1>
				</primaryTitle>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.administer.trained" vname="skills.administer.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.administer.trained">
						<div @click="sklAdd('administer')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.administer.lvl }}</h1>
						</div>
						<div @click="sklRmv('administer')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>administer</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.connect.trained" vname="skills.connect.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.connect.trained">
						<div @click="sklAdd('connect')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.connect.lvl }}</h1>
						</div>
						<div @click="sklRmv('connect')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>connect</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.exert.trained" vname="skills.exert.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.exert.trained">
						<div @click="sklAdd('exert')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.exert.lvl }}</h1>
						</div>
						<div @click="sklRmv('exert')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>exert</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.fix.trained" vname="skills.fix.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.fix.trained">
						<div @click="sklAdd('fix')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.fix.lvl }}</h1>
						</div>
						<div @click="sklRmv('fix')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>fix</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.heal.trained" vname="skills.heal.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.heal.trained">
						<div @click="sklAdd('heal')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.heal.lvl }}</h1>
						</div>
						<div @click="sklRmv('heal')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>heal</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.know.trained" vname="skills.know.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.know.trained">
						<div @click="sklAdd('know')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.know.lvl }}</h1>
						</div>
						<div @click="sklRmv('know')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>know</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.lead.trained" vname="skills.lead.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.lead.trained">
						<div @click="sklAdd('lead')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.lead.lvl }}</h1>
						</div>
						<div @click="sklRmv('lead')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>lead</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.notice.trained" vname="skills.notice.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.notice.trained">
						<div @click="sklAdd('notice')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.notice.lvl }}</h1>
						</div>
						<div @click="sklRmv('notice')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>notice</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.perform.trained" vname="skills.perform.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.perform.trained">
						<div @click="sklAdd('perform')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.perform.lvl }}</h1>
						</div>
						<div @click="sklRmv('perform')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>perform</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.pilot.trained" vname="skills.pilot.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.pilot.trained">
						<div @click="sklAdd('pilot')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.pilot.lvl }}</h1>
						</div>
						<div @click="sklRmv('pilot')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>pilot</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.program.trained" vname="skills.program.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.program.trained">
						<div @click="sklAdd('program')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.program.lvl }}</h1>
						</div>
						<div @click="sklRmv('program')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>program</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.punch.trained" vname="skills.punch.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.punch.trained">
						<div @click="sklAdd('punch')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.punch.lvl }}</h1>
						</div>
						<div @click="sklRmv('punch')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>punch</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.shoot.trained" vname="skills.shoot.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.shoot.trained">
						<div @click="sklAdd('shoot')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.shoot.lvl }}</h1>
						</div>
						<div @click="sklRmv('shoot')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>shoot</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.sneak.trained" vname="skills.sneak.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.sneak.trained">
						<div @click="sklAdd('sneak')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.sneak.lvl }}</h1>
						</div>
						<div @click="sklRmv('sneak')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>sneak</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.stab.trained" vname="skills.stab.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.stab.trained">
						<div @click="sklAdd('stab')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.stab.lvl }}</h1>
						</div>
						<div @click="sklRmv('stab')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>stab</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.survive.trained" vname="skills.survive.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.survive.trained">
						<div @click="sklAdd('survive')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.survive.lvl }}</h1>
						</div>
						<div @click="sklRmv('survive')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>survive</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.talk.trained" vname="skills.talk.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.talk.trained">
						<div @click="sklAdd('talk')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.talk.lvl }}</h1>
						</div>
						<div @click="sklRmv('talk')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>talk</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.trade.trained" vname="skills.trade.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.trade.trained">
						<div @click="sklAdd('trade')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.trade.lvl }}</h1>
						</div>
						<div @click="sklRmv('trade')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>trade</p>
					</div>
				</div>
				<div class="skill">
					<div class="checkboxWrapper">
						<checkbox :val="c.skills.work.trained" vname="skills.work.trained" @change="h"></checkbox>
					</div>
					<div class="lvl" v-if="c.skills.work.trained">
						<div @click="sklAdd('work')" class="ctrl">
							<p>
								<span class="material-icons">add</span>
							</p>
						</div>
						<div class="disp">
							<h1>{{ c.skills.work.lvl }}</h1>
						</div>
						<div @click="sklRmv('work')" class="ctrl">
							<p>
								<span class="material-icons">remove</span>
							</p>
						</div>
					</div>
					<div class="txt">
						<p>work</p>
					</div>
				</div>
			</div>
		</card>
		<card>
			<primaryTitle v-if="c.settings.showTitles">
				<h1>Controlls</h1>
			</primaryTitle>
			<div class="setting" v-if="m.allowEdit">
				<div class="checkboxWrapper">
					<checkbox :val="c.settings.usePhysics" vname="settings.usePhysics" @change="h"></checkbox>
				</div>
				<div class="txt">
					<p>Use physics</p>
				</div>
			</div>
			<div class="setting" v-if="m.allowEdit">
				<div class="checkboxWrapper">
					<checkbox :val="c.settings.showTitles" vname="settings.showTitles" @change="h"></checkbox>
				</div>
				<div class="txt">
					<p>Show titles</p>
				</div>
			</div>
			<actions>
				<button v-if="m.allowEdit" @click="toggleEdit()"><span class="material-icons">edit</span></button>
				<button v-if="!m.edit && m.allowEdit" @click="save()"><span class="material-icons">save</span></button>
				<button v-if="m.allowEdit && !m.edit" @click="del()"><span class="material-icons">delete</span></button>
				<button v-if="!m.allowEdit" @click="save()"><span class="material-icons">file_copy</span></button>
			</actions>
		</card>
		<card>
			<primaryTitle>
				<h1>{{ info.ownerUid }}</h1>
				<h2>{{ info.characterId }}</h2>
			</primaryTitle>
		</card>
	</div>
</template>

<script>
import { card, primaryTitle, actions, textbox, checkbox } from "@components";
import { user, genId } from "@js/global.js";

import { fs } from "@js/firebase.js";
// http://localhost:8886/#/character/bbRweWpKoed3dLYecbiKuzZQ0562/character-keBs9zQrdaAXcB4qZq6a68QzFomfzONG
function updateInstance(t) {
	var params = t.$route.params;
	console.log(params);
	t.info.ownerUid = params.ownerUid;
	t.info.characterId = params.characterId;

	if (user().uid === t.info.ownerUid) {
		t.m.allowEdit = true;
	}

	function fill(a, b) {
		var entries = Object.entries(b);

		entries.forEach(ent => {
			if (typeof ent[1] === "object") {
				fill(a[ent[0]], ent[1]);
			} else {
				a[ent[0]] = ent[1];
			}
		});
	}

	fs.collection(`users/${t.info.ownerUid}/characters/${t.info.characterId}/d`).doc("data").get().then(a => {
		console.log(a);
		if (a && a.exists) {
			var d = a.data();
			console.log(d);
			fill(t.c, d);
		}
	});
}

export default {
	components: {
		card,
		primaryTitle,
		actions,
		textbox,
		checkbox
	},
	data() {
		return {
			info: {
				ownerUid: "",
				characterId: ""
			},
			m: {
				allowEdit: false,
				edit: false
			},
			c: {
				name: "",
				background: "",
				class: "",
				level: 1,
				settings: {
					usePhysics: false,
					showTitles: true
				},
				attributes: {
					str: 0,
					dex: 0,
					con: 0,
					int: 0,
					wis: 0,
					cha: 0
				},
				skills: {
					administer: { trained: false, lvl: 0 },
					connect: { trained: false, lvl: 0 },
					exert: { trained: false, lvl: 0 },
					fix: { trained: false, lvl: 0 },
					heal: { trained: false, lvl: 0 },
					know: { trained: false, lvl: 0 },
					lead: { trained: false, lvl: 0 },
					notice: { trained: false, lvl: 0 },
					perform: { trained: false, lvl: 0 },
					pilot: { trained: false, lvl: 0 },
					program: { trained: false, lvl: 0 },
					punch: { trained: false, lvl: 0 },
					shoot: { trained: false, lvl: 0 },
					sneak: { trained: false, lvl: 0 },
					stab: { trained: false, lvl: 0 },
					survive: { trained: false, lvl: 0 },
					talk: { trained: false, lvl: 0 },
					trade: { trained: false, lvl: 0 },
					work: { trained: false, lvl: 0 }
				}
			}
		}
	},
	methods: {
		save() {
			var t = this;
			if (t.m.allowEdit) {
				fs.collection(`users/${t.info.ownerUid}/characters/${t.info.characterId}/d`).doc("data").set(t.c).then(a => {
					fs.collection(`users/${t.info.ownerUid}/characters`).doc(t.info.characterId).update({
						name: t.c.name
					}).then(a => alert("Saved"));
				});
			} else {
				if (confirm("Are you sure you want to copy this character to your own account?")) {
					var id = "character-" + genId();
					fs.collection(`users/${user().uid}/characters/${id}/d`).doc("data").set(t.c).then(a => {
						fs.collection(`users/${user().uid}/characters`).doc(id).set({
							id,
							createdAt: Date.now(),
							lastModified: Date.now(),
							name: t.c.name,
							owner: user().uid
						}).then(a => {
							t.$router.push({ path: `character/${user().uid}/${id}` });
							alert("Copied")
						});
					});
				}
			}
		},
		del() {
			var t = this;
			if (confirm("Are you sure you want do delete your character?")) {
				fs.collection(`users/${t.info.ownerUid}/characters/${t.info.characterId}/d`).doc("data").delete().then(a => {
					fs.collection(`users/${t.info.ownerUid}/characters/`).doc(t.info.characterId).delete().then(a => {
						t.$router.push({ path: "/characters" });
					});
				});
			}
		},
		toggleEdit() {
			this.m.edit = !this.m.edit
		},
		h(value) {
			var refBuild = value.key.split(".");
			var f = refBuild.pop();
			var ref = this.c;

			refBuild.forEach(a => {
				ref = ref[a];
			});

			console.log(ref, value.value);

			ref[f] = value.value;
		},
		calMod(s) {
			if (s <= 3) {
				return -2;
			} else if (s >= 4 && s <= 7) {
				return -2;
			} else if (s >= 8 && s <= 13) {
				return 0;
			} else if (s >= 14 && s <= 17) {
				return 1;
			} else if (s >= 18) {
				return 1;
			}
		},
		mod(s) {
			var modifier = this.calMod(s);
			if (modifier > 0) {
				return "+" + modifier;
			} else {
				return modifier;
			}
		},
		savingThrow(a) {
			var s1, s2, u;
			if (a === "physical") {
				s1 = this.c.attributes.str;
				s2 = this.c.attributes.con;
			} else if (a === "evasion") {
				s1 = this.c.attributes.dex;
				s2 = this.c.attributes.int;
			} else if (a === "mental") {
				s1 = this.c.attributes.cha;
				s2 = this.c.attributes.wis;
			}

			if (s1 >= s2) {
				u = this.calMod(s1);
			} else {
				u = this.calMod(s2);
			}

			return 15 - (this.c.level - 1) - u;
		},
		sklAdd(s) {
			var skill = this.c.skills[s];
			if (skill.lvl < 4) {
				skill.lvl++;
			}
		},
		sklRmv(s) {
			var skill = this.c.skills[s];
			if (skill.lvl > 0) {
				skill.lvl--;
			}
		},
		skillMod(s) {
			var skill = this.c.skills[s];
			if (skill.trained) {
				return "+" + skill.lvl;
			} else {
				return "-1";
			}
		}
	},
	watch: {
		"$route": function() {
			updateInstance(this);
		}
	},
	created() {
		updateInstance(this);
	}
}
</script>

<style lang="stylus" scoped>
@import "../default.stylus";

.row {
	width: 100%;
	height: 78px;

	.stat {
		width: 33.3333333333%;
		height: 100%;

		float: left;

		.mod {
			width: 100%;
			height: 70%;

			h1 {
				margin: 0;
				font-family: defaultFont;
				padding: 0;
				text-align: center;

				position: relative;
				top: 50%;
				transform: translateY(-50%);
			}
		}

		.label {
			width: 100%;
			height: 30%;

			p {
				width: 100%;
				margin: 0;
				font-family: defaultFont;
				padding: 0;
				text-align: center;
				font-size: 12px;

				position: relative;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
}

skillsize = 48px;

.skill {
	width: 100%;
	height: skillsize;

	p {
		margin: 0;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		padding: 1px;
		width: 100%;
		text-align: center;

		span {
			padding: 0;
		}
	}

	h1 {
		margin: 0;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		font-family: defaultFont;
		text-align: center;
		color: #000000;
		font-size: 28px;
	}

	.checkboxWrapper {
		height: skillsize;
		width: skillsize;

		float: left;

		& > .checkbox {
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.lvl, .txt {
		height: 100%;
		float: left;
	}

	.lvl {
		width: "calc(40% - %s / 2)" % skillsize;
		.ctrl {
			height: 100%;
			width: 33.3333333333%;
			float: left;
			cursor: pointer;

			&:hover {
				background-color: rgba(#e5e5e5, .5);
			}
		}

		.disp {
			height: 100%;
			width: 33.3333333333%;
			float: left;
		}
	}

	.txt {
		width: "calc(60% - %s / 2)" % skillsize;

		p {
			text-align: left;
			width: calc(100% - 16px);
			padding: 0px 8px;
		}
	}
}

.colmsWrapper {
	display: inline-block;
	width: 100%;

	.col {
		width: 50%;
		float: left;

		ssize = 32px;

		.s {
			width: 100%;
			height: ssize;

			p {
				margin: 0;
				position: relative;
				top: 50%;
				transform: translateY(-50%);
				padding: 1px;
				width: calc(100% - 16px);
				text-align: left;
				padding: 0px 8px;
			}

			.mod {
				width: 30%;
				height: 100%;
				float: left;

				p {
					text-align: center;
					color: #000000;
					font-weight: 600;
				}
			}

			.txt {
				width: 70%;
				height: 100%;
				float: left;
			}
		}
	}
}

settingsize = 48px;
settingheight = 32px;

.setting {
	width: 100%;
	height: settingheight;

	p {
		margin: 0;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		padding: 1px;
		width: 100%;
		text-align: center;

		span {
			padding: 0;
		}
	}

	.checkboxWrapper {
		height: settingheight;
		width: settingsize;
		float: left;

		& > .checkbox {
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.txt {
		height: settingheight;
		width: "calc(100% - %s)" % settingsize;
		float: left;

		p {
			text-align: left;
			width: calc(100% - 16px);
			padding: 0px 8px;
		}
	}
}

</style>
