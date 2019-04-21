<template lang="html">
	<div>
		<popup @close="popup.search = false" :show="popup.search">
			<searchbar @onchange="search" placeholder="Search in companion"></searchbar>
			<card v-if="bestResult.length === 1">
				<primaryTitle>
					<h1>{{ bestResult[0].title }}</h1>
				</primaryTitle>
				<h2 class="shortAnswer" v-if="bestResult[0].preferShort">{{ bestResult[0].short }}</h2>
				<p style="margin-top: 0;" v-else>{{ bestResult[0].long }}</p>
			</card>
			<card v-for="result in searchResults" :key="result.title">
				<primaryTitle>
					<h1>{{ result.title }}</h1>
				</primaryTitle>
				<h2 class="shortAnswer" v-if="result.preferShort">{{ result.short }}</h2>
				<p style="margin-top: 0;" v-else>{{ result.long }}</p>
			</card>
			<card v-for="result in relatedResults" :key="result.title">
				<primaryTitle>
					<h1>{{ result.title }}</h1>
				</primaryTitle>
				<p style="margin-top: 0;">{{ result.long }}</p>
			</card>
		</popup>
		<popup @close="popup.breakdown = false" :show="popup.breakdown">
			<card style="max-width: 300px;">
				<primaryTitle>
					<h1>Breakdown</h1>
					<h2>How this stat is calculated</h2>
				</primaryTitle>
				<div>
					<div class="listItem" v-for="step in m.breakdown">
						<h1>{{ toMod(step.value) }} {{ step.label }}</h1>
					</div>
				</div>
			</card>
		</popup>
		<snackbar :show="p.save">
			Character saved
		</snackbar>
		<div class="cardGrid">
			<!-- Name, class, background -->
			<card d style="grid-column: 1 / 4; grid-row: 1 / 2">
				<div v-if="!m.edit">
					<primaryTitle>
						<h1 v-if="c.name !== ''">{{ c.name }}</h1>
						<h1 v-else>Not named</h1>
						<h2 v-if="c.background !== '' || c.class !== ''">{{ c.background }} {{ c.class.toLowerCase() }}<span v-if="c.class.toLowerCase() === 'adventurer' && c.partial !== ''">, partial {{ c.partial.toLowerCase() }}</span></h2>
					</primaryTitle>
				</div>
				<div v-if="m.edit">
					<textbox @change="h" :val="c.name" vname="name" label="Name"></textbox>
					<textbox @change="h" :val="c.background" vname="background" label="Background"></textbox>
					<textbox @change="h" :val="c.class" vname="class" label="Class"></textbox>
					<textbox v-if="c.class.toLowerCase() === 'adventurer'" @change="h" :val="c.partial" vname="partial" label="Partial Class"></textbox>
					<textbox @change="h" :val="c.xp" vname="xp" label="XP" type="number"></textbox>
					<textbox @change="h" :val="c.attackBonus" vname="attackBonus" label="Attack Bonus" type="number"></textbox>
				</div>
				<div class="mobile">
					<actions>
						<button v-shortkey="['f2']" class="icon" v-if="m.allowEdit" @shortkey="toggleEdit()" @click="toggleEdit()">
							<span class="material-icons">edit</span>
							<span class="tooltip">f2</span>
						</button>
						<button v-shortkey="['ctrl', 's']" class="icon" v-if="m.allowEdit" @shortkey="save()" @click="save()">
							<span class="material-icons">save</span>
							<span class="tooltip">ctrl + s</span>
						</button>
						<button v-shortkey="['ctrl', 'h']" class="icon" v-if="!m.edit && m.allowEdit" @shortkey="toggleSearch()" @click="toggleSearch()">
							<span class="material-icons">search</span>
							<span class="tooltip">ctrl + h</span>
						</button>
						<button class="icon" v-if="m.allowEdit && !m.edit" @click="del()"><span class="material-icons">delete</span></button>
						<button class="icon" v-if="!m.allowEdit" @click="save()"><span class="material-icons">file_copy</span></button>
					</actions>
				</div>
			</card>
			<!-- General info -->
			<card d style="grid-column: 4 / 7; grid-row: 1 / 2">
				<primaryTitle v-if="c.settings.showTitles || c.settings.showSteps">
					<h1><span v-if="c.settings.showTitles">General</span> <span v-if="c.settings.showSteps && c.settings.showTitles">(</span><span v-if="c.settings.showSteps">step 16</span><span v-if="c.settings.showSteps && c.settings.showTitles">)</span></h1>
				</primaryTitle>
				<div v-if="m.edit === false || c.settings.useManual === false">
					<div class="row">
						<div class="stat" v-if="!c.settings.showBreakdown">
							<div class="mod">
								<h1>{{ ac }}</h1>
							</div>
							<div class="label">
								<p>Armor Class</p>
							</div>
						</div>
						<div class="stat" style="cursor: pointer;" v-if="c.settings.showBreakdown" @click="showBreakdown('ac')">
							<div class="mod">
								<h1 style="color: #3030ff;">{{ ac }}</h1>
							</div>
							<div class="label">
								<p style="color: #3030ff;">Armor Class</p>
							</div>
						</div>
						<div class="stat" v-if="!c.settings.showBreakdown">
							<div class="mod">
								<h1>
									<span v-if="speed >= 10">{{ speed }}</span>
									<span v-if="speed < 10" style="color: #ff3030">{{ speed }}</span>
								</h1>
							</div>
							<div class="label">
								<p>Speed</p>
							</div>
						</div>
						<div class="stat" style="cursor: pointer;" v-if="c.settings.showBreakdown" @click="showBreakdown('speed')">
							<div class="mod">
								<h1 style="color: #3030ff;">{{ speed }}</h1>
							</div>
							<div class="label">
								<p style="color: #3030ff;">Speed</p>
							</div>
						</div>
						<div class="stat">
							<div class="mod">
								<h1>{{ level }}</h1>
							</div>
							<div class="label">
								<p>Level</p>
							</div>
						</div>
					</div>
				</div>
				<div  v-if="m.edit === true && c.settings.useManual === true">
					<textbox @change="h" :val="c.manual.ac" vname="manual.ac" label="Armor Class" type="number"></textbox>
					<textbox @change="h" :val="c.manual.speed" vname="manual.speed" label="Speed" type="number"></textbox>
				</div>
			</card>
			<!-- Hit Points -->
			<card d style="grid-column: 1 / 4; grid-row: 2 / 3">
				<primaryTitle v-if="c.settings.showTitles || c.settings.showSteps">
					<h1><span v-if="c.settings.showTitles">Hit points</span> <span v-if="c.settings.showSteps && c.settings.showTitles">(</span><span v-if="c.settings.showSteps">step 11</span><span v-if="c.settings.showSteps && c.settings.showTitles">)</span></h1>
				</primaryTitle>
				<div v-if="!m.edit" class="hp">
					<div class="ctrl" @click="hpc('+')">
						<h1 class="material-icons">add</h1>
					</div>
					<div class="disp">
						<h1><span>{{ c.hp }}</span>/{{ c.hpMax }}</h1>
					</div>
					<div class="ctrl" @click="hpc('-')">
						<h1 class="material-icons">remove</h1>
					</div>
				</div>
				<div v-if="m.edit">
					<textbox @change="h" :val="c.hpMax" vname="hpMax" label="Maximum hitpoints" type="number"></textbox>
				</div>
			</card>
			<!-- Saving throws -->
			<card d style="grid-column: 4 / 7; grid-row: 2 / 3">
				<primaryTitle v-if="c.settings.showTitles || c.settings.showSteps">
					<h1><span v-if="c.settings.showTitles">Saving throws</span> <span v-if="c.settings.showSteps && c.settings.showTitles">(</span><span v-if="c.settings.showSteps">step 17</span><span v-if="c.settings.showSteps && c.settings.showTitles">)</span></h1>
				</primaryTitle>
				<div v-if="m.edit === false || c.settings.useManual === false">
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
				</div>
				<div v-if="m.edit === true && c.settings.useManual === true">
					<textbox @change="h" :val="c.manual.savingThrows.physical" vname="manual.savingThrows.physical" label="Physical" type="number"></textbox>
					<textbox @change="h" :val="c.manual.savingThrows.evasion" vname="manual.savingThrows.evasion" label="Evasion" type="number"></textbox>
					<textbox @change="h" :val="c.manual.savingThrows.mental" vname="manual.savingThrows.mental" label="Mental" type="number"></textbox>
				</div>
			</card>
			<!-- Attributes -->
			<card d style="grid-column: 7 / 13; grid-row: 1 / 2">
				<div v-if="!m.edit">
					<primaryTitle v-if="c.settings.showTitles || c.settings.showSteps">
						<h1><span v-if="c.settings.showTitles">Attributes</span> <span v-if="c.settings.showSteps && c.settings.showTitles">(</span><span v-if="c.settings.showSteps">step 1, 2</span><span v-if="c.settings.showSteps && c.settings.showTitles">)</span></h1>
					</primaryTitle>
					<div class="row d">
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
								<p>Dexterity</p>
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
					<div class="row d">
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
					<textbox @change="h" label="Dexterity" :val="c.attributes.dex" vname="attributes.dex" type="number"></textbox>
					<textbox @change="h" label="Constitution" :val="c.attributes.con" vname="attributes.con" type="number"></textbox>
					<textbox @change="h" label="Intelligence" :val="c.attributes.int" vname="attributes.int" type="number"></textbox>
					<textbox @change="h" label="Wisdom" :val="c.attributes.wis" vname="attributes.wis" type="number"></textbox>
					<textbox @change="h" label="Charisma" :val="c.attributes.cha" vname="attributes.cha" type="number"></textbox>
				</div>
			</card>
			<!-- Skills -->
			<card d style="grid-column: 7 / 13; grid-row: 2 / 5">
				<div v-if="!m.edit" class="colmsWrapper">
					<primaryTitle v-if="c.settings.showTitles || c.settings.showSteps">
						<h1><span v-if="c.settings.showTitles">Skills</span> <span v-if="c.settings.showSteps && c.settings.showTitles">(</span><span v-if="c.settings.showSteps">step 4, 5, 9</span><span v-if="c.settings.showSteps && c.settings.showTitles">)</span></h1>
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
			<!-- Focus -->
			<card d style="grid-column: 1 / 7; grid-row: 3 / 5">
				<primaryTitle v-if="c.settings.showTitles || c.settings.showSteps">
					<h1><span v-if="c.settings.showTitles">Focus</span> <span v-if="c.settings.showSteps && c.settings.showTitles">(</span><span v-if="c.settings.showSteps">step 7, 8</span><span v-if="c.settings.showSteps && c.settings.showTitles">)</span></h1>
				</primaryTitle>
				<div>
					<div class="listItem" v-for="focus in c.foci">
						<h1 @click="toggleVal(focus, 'open')" style="cursor: pointer;"><span class="dropdownInd material-icons" :class="{ d: focus.open }">arrow_drop_up</span>{{ focus.title }}</h1>
						<transition name="contentDropdown">
							<div v-if="focus.open">
								<div v-if="c.settings.showDetails || focus.internalName === 'unique_gift'" v-html="toMarkdown(focus.description)">

								</div>
								<p v-if="focus.level[1] !== ''"><b>Level-1</b> <span v-html="toMarkdown(focus.level['1'])"></span></p>
								<transition name="contentDropdown">
									<p v-if="focus.level[2] !== '' && focus.currentLvl === 2"><b>Level-2</b> <span v-html="toMarkdown(focus.level['2'])"></span></p>
								</transition>
								<actions>
									<button class="icon" v-if="focus.level[2] !== '' && m.allowEdit" @click="changeFocus(focus)"><span v-if="focus.currentLvl === 1" class="material-icons">star_border</span><span v-if="focus.currentLvl == 2" class="material-icons">star</span></button>
									<button class="icon" v-if="m.allowEdit" @click="removeFocus(focus)"><span class="material-icons">delete</span></button>
								</actions>
							</div>
						</transition>
					</div>
				</div>
				<actions>
					<button @click="popup.focus = true">
						add focus
					</button>
				</actions>
				<popup @close="popup.focus = false" :show="popup.focus">
					<div class="p" @click.self="popup.focus = false">
						<card style="position: relative;">
							<p class="x" @click="popup.focus = false"><span class="material-icons">close</span></p>
							<primaryTitle>
								<h1>Focus</h1>
								<h2>Add a focus to your list</h2>
							</primaryTitle>
							<div class="listItem" v-for="focus in fociList" :key="focus.internalName">
								<h1 @click="toggleVal(focus, 'open')" style="cursor: pointer;"><span class="dropdownInd material-icons" :class="{ d: focus.open }">arrow_drop_up</span> {{ focus.title }}</h1>
								<transition name="contentDropdown">
									<div v-if="focus.open">
										<div v-html="toMarkdown(focus.description)">

										</div>
										<p v-if="focus.level[1] !== ''"><b>Level-1</b> <span v-html="toMarkdown(focus.level['1'])"></span></p>
										<p v-if="focus.level[2] !== ''"><b>Level-2</b> <span v-html="toMarkdown(focus.level['2'])"></span></p>
										<actions>
											<button @click="addFocus(focus)">Add focus</button>
										</actions>
									</div>
								</transition>
							</div>
						</card>
					</div>
				</popup>
			</card>
			<!-- Equipment -->
			<card d style="grid-column: 1 / 7;" :class="{ e: c.settings.usePsionics, b: !c.settings.usePsionics }">
				<primaryTitle v-if="c.settings.showTitles || c.settings.showSteps">
					<h1><span v-if="c.settings.showTitles">Equipment</span> <span v-if="c.settings.showSteps && c.settings.showTitles">(</span><span v-if="c.settings.showSteps">step 1, 2</span><span v-if="c.settings.showSteps && c.settings.showTitles">)</span></h1>
					<h2>Ready: {{ totalReadiedItems }}/{{ readyEnc }}</h2>
				</primaryTitle>
				<div>
					<div class="listItem" v-for="item in readiedItems">
						<h1 @click="toggleVal(item, 'open')" style="cursor: pointer;"><span class="dropdownInd material-icons" :class="{ d: item.open }">arrow_drop_up</span> {{ item.name }} <span v-if="item.equipmentType === 'rangedWeapon'">({{ attackBonus(item) }})</span></h1>
						<transition name="contentDropdown">
							<div v-if="item.open">
								<div class="row">
									<div class="stat">
										<div class="mod">
											<h1>{{ item.cost }}c</h1>
										</div>
										<div class="label">
											<p>Cost</p>
										</div>
									</div>
									<div class="stat">
										<div class="mod">
											<h1>{{ item.enc }}</h1>
										</div>
										<div class="label">
											<p>Encumbrance</p>
										</div>
									</div>
									<div class="stat">
										<div class="mod">
											<h1>{{ item.tl }}</h1>
										</div>
										<div class="label">
											<p>Tech level</p>
										</div>
									</div>
								</div>
								<div class="row" v-if="item.equipmentType == 'armor'">
									<div class="stat">
										<div class="mod">
											<h1>{{ item.ac }}<span v-if="item.bonus !== 0">/+{{ item.bonus }}</span></h1>
										</div>
										<div class="label">
											<p>Armor class</p>
										</div>
									</div>
									<div class="stat">
										<div class="mod">
											<h1>{{ item.type }}</h1>
										</div>
										<div class="label">
											<p>Type</p>
										</div>
									</div>
									<div class="stat">
										<div class="mod">
											<h1>{{ item.tl }}</h1>
										</div>
										<div class="label">
											<p>Tech level</p>
										</div>
									</div>
								</div>
								<div class="row" v-if="item.equipmentType == 'rangedWeapon'">
									<div class="stat">
										<div class="mod">
											<h1>{{ item.dmg }}</h1>
										</div>
										<div class="label">
											<p>Damage</p>
										</div>
									</div>
									<div class="stat">
										<div class="mod">
											<h1>{{ item.range.normal }}/{{ item.range.max }}</h1>
										</div>
										<div class="label">
											<p>Range</p>
										</div>
									</div>
									<div class="stat">
										<div class="mod">
											<h1 v-if="item.magazine !== -1">{{ item.magazine }}</h1>
											<h1 v-if="item.magazine === -1">N/A</h1>
										</div>
										<div class="label">
											<p>Magazine</p>
										</div>
									</div>
								</div>
								<div class="row" v-if="item.equipmentType == 'rangedWeapon'">
									<div class="stat">
										<div class="mod">
											<h1 v-if="item.burstFire">Yes</h1>
											<h1 v-else>No</h1>
										</div>
										<div class="label">
											<p>Burst Fire</p>
										</div>
									</div>
									<div class="stat">
										<div class="mod">
											<h1>{{ item.reloadTime }} main action<span v-if="item.reloadTime > 1">s</span></h1>
										</div>
										<div class="label">
											<p>Reload time</p>
										</div>
									</div>
									<div class="stat" v-if="!c.settings.showBreakdown">
										<div class="mod">
											<h1>{{ attackBonus(item) }}</h1>
										</div>
										<div class="label">
											<p>Attack Bonus</p>
										</div>
									</div>
									<div class="stat" v-if="c.settings.showBreakdown" style="cursor: pointer;" @click="showBreakdown(item)">
										<div class="mod">
											<h1 style="color: #3030ff;">{{ attackBonus(item) }}</h1>
										</div>
										<div class="label">
											<p style="color: #3030ff;">Attack Bonus</p>
										</div>
									</div>
								</div>
								<actions>
									<button @click="stowItem(item)">Stow item</button>
									<button @click="deleteItem(item)">Delete item</button>
								</actions>
							</div>
						</transition>
					</div>
				</div>
				<primaryTitle>
					<h2>Stowed: {{ totalStowedItems }}/{{ c.attributes.str }}</h2>
				</primaryTitle>
				<div>
					<div class="listItem" v-for="item in stowedItems">
						<h1 @click="toggleVal(item, 'open')" style="cursor: pointer;"><span class="dropdownInd material-icons" :class="{ d: item.open }">arrow_drop_up</span> {{ item.name }} <span v-if="item.equipmentType === 'rangedWeapon'">({{ attackBonus(item) }})</span></h1>
						<transition name="contentDropdown">
							<div v-if="item.open">
								<div class="row">
									<div class="stat">
										<div class="mod">
											<h1>{{ item.cost }}c</h1>
										</div>
										<div class="label">
											<p>Cost</p>
										</div>
									</div>
									<div class="stat">
										<div class="mod">
											<h1>{{ item.enc }}</h1>
										</div>
										<div class="label">
											<p>Encumbrance</p>
										</div>
									</div>
									<div class="stat">
										<div class="mod">
											<h1>{{ item.tl }}</h1>
										</div>
										<div class="label">
											<p>Tech level</p>
										</div>
									</div>
								</div>
								<div class="row" v-if="item.equipmentType == 'armor'">
									<div class="stat">
										<div class="mod">
											<h1>{{ item.ac }}<span v-if="item.bonus !== 0">/+{{ item.bonus }}</span></h1>
										</div>
										<div class="label">
											<p>Armor class</p>
										</div>
									</div>
									<div class="stat">
										<div class="mod">
											<h1>{{ item.type }}</h1>
										</div>
										<div class="label">
											<p>Type</p>
										</div>
									</div>
									<div class="stat">
										<div class="mod">
											<h1>{{ item.tl }}</h1>
										</div>
										<div class="label">
											<p>Tech level</p>
										</div>
									</div>
								</div>
								<div class="row" v-if="item.equipmentType == 'rangedWeapon'">
									<div class="stat">
										<div class="mod">
											<h1>{{ item.dmg }}</h1>
										</div>
										<div class="label">
											<p>Damage</p>
										</div>
									</div>
									<div class="stat">
										<div class="mod">
											<h1>{{ item.range.normal }}/{{ item.range.max }}</h1>
										</div>
										<div class="label">
											<p>Range</p>
										</div>
									</div>
									<div class="stat">
										<div class="mod">
											<h1 v-if="item.magazine !== -1">{{ item.magazine }}</h1>
											<h1 v-if="item.magazine === -1">N/A</h1>
										</div>
										<div class="label">
											<p>Magazine</p>
										</div>
									</div>
								</div>
								<div class="row" v-if="item.equipmentType == 'rangedWeapon'">
									<div class="stat">
										<div class="mod">
											<h1 v-if="item.burstFire">Yes</h1>
											<h1 v-else>No</h1>
										</div>
										<div class="label">
											<p>Burst Fire</p>
										</div>
									</div>
									<div class="stat">
										<div class="mod">
											<h1>{{ item.reloadTime }} main action<span v-if="item.reloadTime > 1">s</span></h1>
										</div>
										<div class="label">
											<p>Reload time</p>
										</div>
									</div>
									<div class="stat" v-if="!c.settings.showBreakdown">
										<div class="mod">
											<h1>{{ attackBonus(item) }}</h1>
										</div>
										<div class="label">
											<p>Attack Bonus</p>
										</div>
									</div>
									<div class="stat" v-if="c.settings.showBreakdown" style="cursor: pointer;" @click="showBreakdown(item)">
										<div class="mod">
											<h1 style="color: #3030ff;">{{ attackBonus(item) }}</h1>
										</div>
										<div class="label">
											<p style="color: #3030ff;">Attack Bonus</p>
										</div>
									</div>
								</div>
								<actions>
									<button @click="readyItem(item)">Ready item</button>
									<button @click="deleteItem(item)">Delete item</button>
								</actions>
							</div>
						</transition>
					</div>
				</div>
				<actions>
					<button @click="popup.equipment = true">Add equipment</button>
				</actions>
				<popup @close="popup.equipment = false" :show="popup.equipment">
					<div class="p" @click.self="popup.equipment = false">
						<card style="position: relative;">
							<p class="x" @click="popup.equipment = false"><span class="material-icons">close</span></p>
							<primaryTitle>
								<h1 @click="toggleVal(popup, 'armor')" style="cursor: pointer;"><span class="dropdownInd material-icons" :class="{ d: popup.armor }">arrow_drop_up</span> Armor</h1>
								<h2>To protect you</h2>
							</primaryTitle>
							<transition name="contentDropdown">
								<div v-if="popup.armor">
									<div class="listItem" v-for="item in content.equipment" :key="item.internalName">
										<h1 @click="toggleVal(item, 'open')" style="cursor: pointer;"><span class="dropdownInd material-icons" :class="{ d: item.open }">arrow_drop_up</span> {{ item.name }}</h1>
										<transition name="contentDropdown">
											<div v-if="item.open">
												<div class="row">
													<div class="stat">
														<div class="mod">
															<h1>{{ item.cost }}c</h1>
														</div>
														<div class="label">
															<p>Cost</p>
														</div>
													</div>
													<div class="stat">
														<div class="mod">
															<h1>{{ item.enc }}</h1>
														</div>
														<div class="label">
															<p>Encumbrance</p>
														</div>
													</div>
													<div class="stat">
														<div class="mod">
															<h1>{{ item.tl }}</h1>
														</div>
														<div class="label">
															<p>Tech level</p>
														</div>
													</div>
												</div>
												<div class="row" v-if="item.equipmentType == 'armor'">
													<div class="stat">
														<div class="mod">
															<h1>{{ item.ac }}<span v-if="item.bonus !== 0">/+{{ item.bonus }}</span></h1>
														</div>
														<div class="label">
															<p>Armor class</p>
														</div>
													</div>
													<div class="stat">
														<div class="mod">
															<h1>{{ item.type }}</h1>
														</div>
														<div class="label">
															<p>Type</p>
														</div>
													</div>
													<div class="stat">
														<div class="mod">
															<h1>{{ item.tl }}</h1>
														</div>
														<div class="label">
															<p>Tech level</p>
														</div>
													</div>
												</div>
												<actions>
													<button @click="addItem(item, 'stowed')">Add stowed</button>
												</actions>
											</div>
										</transition>
									</div>
								</div>
							</transition>
						</card>
						<card style="position: relative;">
							<primaryTitle>
								<h1 @click="toggleVal(popup, 'rangedWeapons')" style="cursor: pointer;"><span class="dropdownInd material-icons" :class="{ d: popup.rangedWeapons }">arrow_drop_up</span> Ranged weapons</h1>
								<h2>Used to put holes in things</h2>
							</primaryTitle>
							<transition name="contentDropdown">
								<div v-if="popup.rangedWeapons">
									<div class="listItem" v-for="item in content.weapons.ranged" :key="item.internalName">
										<h1 @click="toggleVal(item, 'open')" style="cursor: pointer;"><span class="dropdownInd material-icons" :class="{ d: item.open }">arrow_drop_up</span> {{ item.name }}</h1>
										<transition name="contentDropdown">
											<div v-if="item.open">
												<div class="row">
													<div class="stat">
														<div class="mod">
															<h1>{{ item.cost }}c</h1>
														</div>
														<div class="label">
															<p>Cost</p>
														</div>
													</div>
													<div class="stat">
														<div class="mod">
															<h1>{{ item.enc }}</h1>
														</div>
														<div class="label">
															<p>Encumbrance</p>
														</div>
													</div>
													<div class="stat">
														<div class="mod">
															<h1>{{ item.tl }}</h1>
														</div>
														<div class="label">
															<p>Tech level</p>
														</div>
													</div>
												</div>
												<div class="row" v-if="item.equipmentType == 'rangedWeapon'">
													<div class="stat">
														<div class="mod">
															<h1>{{ item.dmg }}</h1>
														</div>
														<div class="label">
															<p>Damage</p>
														</div>
													</div>
													<div class="stat">
														<div class="mod">
															<h1>{{ item.range.normal }}/{{ item.range.max }}</h1>
														</div>
														<div class="label">
															<p>Range</p>
														</div>
													</div>
													<div class="stat">
														<div class="mod">
															<h1 v-if="item.magazine !== -1">{{ item.magazine }}</h1>
															<h1 v-if="item.magazine === -1">N/A</h1>
														</div>
														<div class="label">
															<p>Magazine</p>
														</div>
													</div>
												</div>
												<div class="row" v-if="item.equipmentType == 'rangedWeapon'">
													<div class="stat">
														<div class="mod">
															<h1 v-if="item.burstFire">Yes</h1>
															<h1 v-else>No</h1>
														</div>
														<div class="label">
															<p>Burst Fire</p>
														</div>
													</div>
													<div class="stat">
														<div class="mod">
															<h1>{{ item.reloadTime }} main action<span v-if="item.reloadTime > 1">s</span></h1>
														</div>
														<div class="label">
															<p>Reload time</p>
														</div>
													</div>
													<div class="stat" v-if="!c.settings.showBreakdown">
														<div class="mod">
															<h1>{{ attackBonus(item) }}</h1>
														</div>
														<div class="label">
															<p>Attack Bonus</p>
														</div>
													</div>
													<div class="stat" v-if="c.settings.showBreakdown" style="cursor: pointer;" @click="showBreakdown(item)">
														<div class="mod">
															<h1 style="color: #3030ff;">{{ attackBonus(item) }}</h1>
														</div>
														<div class="label">
															<p style="color: #3030ff;">Attack Bonus</p>
														</div>
													</div>
												</div>
												<actions>
													<button @click="addItem(item, 'stowed')">Add stowed</button>
												</actions>
											</div>
										</transition>
									</div>
								</div>
							</transition>
						</card>
						<!-- <card>
							<primaryTitle>
								<h1>Custom equipment</h1>
								<h2>Add your own content</h2>
							</primaryTitle>
							<textbox @change="h" :val="c.customEquipment.name" vname="customEquipment.name" label="Item Name"></textbox>
							<textbox @change="h" type="textarea" :val="c.customEquipment.description" vname="customEquipment.description" label="Description"></textbox>
						</card> -->
					</div>
				</popup>
			</card>
			<!-- Effort -->
			<card d v-if="c.settings.usePsionics" style="grid-column: 1 / 4; grid-row: 5 / 6;">
				<primaryTitle v-if="c.settings.showTitles || c.settings.showSteps">
					<h1><span v-if="c.settings.showTitles">Effort</span> <span v-if="c.settings.showSteps && c.settings.showTitles">(</span><span v-if="c.settings.showSteps">step 1, 2</span><span v-if="c.settings.showSteps && c.settings.showTitles">)</span></h1>
				</primaryTitle>
				<div v-if="!m.edit" class="hp">
					<div class="ctrl" @click="efc('+')">
						<h1 class="material-icons">add</h1>
					</div>
					<div class="disp">
						<h1>{{ c.effort.current }}/{{ c.effort.max }}</h1>
					</div>
					<div class="ctrl" @click="efc('-')">
						<h1 class="material-icons">remove</h1>
					</div>
				</div>
				<div v-if="m.edit">
					<textbox @change="h" :val="c.effort.max" vname="effort.max" label="Max effort" type="number"></textbox>
				</div>
			</card>
			<!-- Psionics -->
			<card d v-if="c.settings.usePsionics" style="grid-column: 4 / 13; grid-row: 5 / 6;">
				<primaryTitle v-if="c.settings.showTitles || c.settings.showSteps">
					<h1><span v-if="c.settings.showTitles">Psionics</span> <span v-if="c.settings.showSteps && c.settings.showTitles">(</span><span v-if="c.settings.showSteps">step 1, 2</span><span v-if="c.settings.showSteps && c.settings.showTitles">)</span></h1>
				</primaryTitle>
				<div class="psionics">
					<div class="listItem" v-for="psionic in c.psionics">
						<h1 @click="toggleVal(psionic, 'open')" style="cursor: pointer;"><span class="dropdownInd material-icons" :class="{ d: psionic.open }">arrow_drop_up</span> {{ psionic.title }}</h1>
						<transition name="contentDropdown">
							<div v-if="psionic.open">
								<div class="halfed a">
									<p v-if="c.settings.showDetails">{{ psionic.description }}</p>
									<div>
										<transition name="contentDropdown"><p v-if="psionic.level >= 0"><b>Level-0</b> {{ psionic.core.level.l0 }}</p></transition>
										<transition name="contentDropdown"><p v-if="psionic.level >= 1"><b>Level-1</b> {{ psionic.core.level.l1 }}</p></transition>
										<transition name="contentDropdown"><p v-if="psionic.level >= 2"><b>Level-2</b> {{ psionic.core.level.l2 }}</p></transition>
										<transition name="contentDropdown"><p v-if="psionic.level >= 3"><b>Level-3</b> {{ psionic.core.level.l3 }}</p></transition>
										<transition name="contentDropdown"><p v-if="psionic.level >= 4"><b>Level-4</b> {{ psionic.core.level.l4 }}</p></transition>
									</div>
									<div class="skill">
										<div class="lvl">
											<div class="ctrl" @click="psionicUp(psionic)">
												<p>
													<span class="material-icons">add</span>
												</p>
											</div>
											<div class="disp">
												<h1>{{ psionic.level }}</h1>
											</div>
											<div class="ctrl" @click="psionicDown(psionic)">
												<p>
													<span class="material-icons">remove</span>
												</p>
											</div>
										</div>
										<div class="txt">
											<p>level</p>
										</div>
									</div>
								</div>
								<div class="halfed">
									<div>
										<div style="display: block;" class="listItem" v-for="technique in psionic.selectedTechniques">
											<h1 @click="toggleVal(technique, 'open')" style="cursor: pointer;"><span class="dropdownInd material-icons" :class="{ d: technique.open }">arrow_drop_up</span>{{ technique.title }}</h1>
											<transition name="contentDropdown">
												<div v-if="technique.open">
													<p>{{ technique.description }}</p>
													<actions>
														<button @click="removeTechnique(psionic, technique)" class="icon">
															<span class="material-icons">delete</span>
														</button>
													</actions>
												</div>
											</transition>
										</div>
									</div>
									<actions>
										<button @click="psionic.showPopup = true">Add technique</button>
										<button @click="removePsionic(psionic)">Remove skill</button>
									</actions>
									<popup @close="psionic.showPopup = false" :show="psionic.showPopup">
										<card>
											<p style="right: 16px;" class="x" @click="psionic.showPopup = false"><span class="material-icons">close</span></p>
											<primaryTitle>
												<h1>Techniques</h1>
												<h2>Specialize</h2>
											</primaryTitle>
											<div>
												<div style="display: block;" class="listItem" v-for="technique in psionic.techniques" v-if="technique.choicen === false">
													<h1 @click="toggleVal(technique, 'open')" style="cursor: pointer;"><span class="dropdownInd material-icons" :class="{ d: technique.open }">arrow_drop_up</span> {{ technique.title }}</h1>
													<transition name="contentDropdown">
														<div v-if="technique.open">
															<p>
																<span v-if="psionic.level >= technique.minLevel" style="color: #000000;"><b>Minimum level:</b> {{ technique.minLevel }}</span>
																<span v-else style="color: #ff3030;"><b style="color: #ff3030;">Minimum level:</b> {{ technique.minLevel }}</span>
															</p>
															<p>{{ technique.description }}</p>
															<actions v-if="psionic.level >= technique.minLevel">
																<button @click="chooseTechnique(psionic, technique)">Add technique</button>
															</actions>
														</div>
													</transition>
												</div>
											</div>
										</card>
									</popup>
								</div>
							</div>
						</transition>
					</div>
				</div>
				<actions>
					<button @click="popup.psionics = true">Add skill</button>
				</actions>
				<popup @close="popup.psionics = false" :show="popup.psionics">
					<card>
						<primaryTitle>
							<h1>Psionics</h1>
							<h2>Mysterious...</h2>
						</primaryTitle>
					</card>
					<card v-for="psionic in content.psionics" :key="psionic.internalTitle">
						<primaryTitle @click="toggleVal(psionic, 'open')">
							<h1 style="cursor: pointer;"><span class="dropdownInd material-icons" :class="{ d: psionic.open }">arrow_drop_up</span> {{ psionic.title }}</h1>
						</primaryTitle>
						<transition name="contentDropdown">
							<div v-if="psionic.open">
								<p>{{ psionic.description }}</p>
								<div v-for="additional in psionic.additional">
									<h3>{{ additional.title }}</h3>
									<p>{{ additional.description }}</p>
								</div>
								<div>
									<h3>{{ psionic.core.title }}</h3>
									<p>{{ psionic.core.description }}</p>
								</div>
								<div>
									<p><b>Level-0</b> {{ psionic.core.level.l0 }}</p>
									<p><b>Level-1</b> {{ psionic.core.level.l1 }}</p>
									<p><b>Level-2</b> {{ psionic.core.level.l2 }}</p>
									<p><b>Level-3</b> {{ psionic.core.level.l3 }}</p>
									<p><b>Level-4</b> {{ psionic.core.level.l4 }}</p>
								</div>
								<actions>
									<button @click="addPsionic(psionic)">Add skill</button>
								</actions>
							</div>
						</transition>
					</card>
				</popup>
			</card>
			<!-- Controls -->
			<card d style="grid-column: 7 / 13;" :class="{ e: c.settings.usePsionics, b: !c.settings.usePsionics }">
				<primaryTitle v-if="c.settings.showTitles">
					<h1>Controls</h1>
				</primaryTitle>
				<div class="setting" v-if="m.allowEdit">
					<div class="checkboxWrapper">
						<checkbox :val="c.settings.usePsionics" vname="settings.usePsionics" @change="h"></checkbox>
					</div>
					<div class="txt">
						<p>Use psionics</p>
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
				<div class="setting" v-if="m.allowEdit">
					<div class="checkboxWrapper">
						<checkbox :val="c.settings.showSteps" vname="settings.showSteps" @change="h"></checkbox>
					</div>
					<div class="txt">
						<p>Show character creation steps</p>
					</div>
				</div>
				<div class="setting" v-if="m.allowEdit">
					<div class="checkboxWrapper">
						<checkbox :val="c.settings.showDetails" vname="settings.showDetails" @change="h"></checkbox>
					</div>
					<div class="txt">
						<p>Show details</p>
					</div>
				</div>
				<div class="setting" v-if="m.allowEdit">
					<div class="checkboxWrapper">
						<checkbox :val="c.settings.useManual" vname="settings.useManual" @change="h"></checkbox>
					</div>
					<div class="txt">
						<p>Use manual mode</p>
					</div>
				</div>
				<div class="setting" v-if="m.allowEdit">
					<div class="checkboxWrapper">
						<checkbox :val="c.settings.showBreakdown" vname="settings.showBreakdown" @change="h"></checkbox>
					</div>
					<div class="txt">
						<p>Show calculation breakdown</p>
					</div>
				</div>
				<actions>
					<div class="desktop">
						<button v-shortkey="['f2']" class="icon" v-if="m.allowEdit" @shortkey="toggleEdit()" @click="toggleEdit()">
							<span class="material-icons">edit</span>
							<span class="tooltip">f2</span>
						</button>
						<button v-shortkey="['ctrl', 's']" class="icon" v-if="m.allowEdit" @shortkey="save()" @click="save()">
							<span class="material-icons">save</span>
							<span class="tooltip">ctrl + s</span>
						</button>
						<button v-shortkey="['ctrl', 'h']" class="icon" v-if="!m.edit && m.allowEdit" @shortkey="toggleSearch()" @click="toggleSearch()">
							<span class="material-icons">search</span>
							<span class="tooltip">ctrl + h</span>
						</button>
						<button class="icon" v-if="m.allowEdit && !m.edit" @click="del()"><span class="material-icons">delete</span></button>
						<button class="icon" v-if="!m.allowEdit" @click="save()"><span class="material-icons">file_copy</span></button>
					</div>
				</actions>
			</card>
			<!-- <card d style="grid-column: 7 / 13; grid-row: 5 / 6">
				<primaryTitle>
					<h1>{{ info.ownerUid }}</h1>
					<h2>{{ info.characterId }}</h2>
				</primaryTitle>
			</card> -->
		</div>
	</div>
</template>

<script>
import marked from "marked";

import { card, primaryTitle, actions, textbox, checkbox, popup, snackbar, searchbar } from "@components";
import { user, genId } from "@js/global.js";

import foci from "@json/foci.json";

import equipment from "@json/equipment.js";
import rangedWeapons from "@json/weapons/ranged.json";
import companion from "@json/companion.json";

import psionics from "@json/psionics.js";

import { fs } from "@js/firebase.js";
// http://localhost:8886/#/character/bbRweWpKoed3dLYecbiKuzZQ0562/character-keBs9zQrdaAXcB4qZq6a68QzFomfzONG
function updateInstance(t) {
	var params = t.$route.params;
	t.info.ownerUid = params.ownerUid;
	t.info.characterId = params.characterId;

	if (user().uid === t.info.ownerUid) {
		t.m.allowEdit = true;
	} else {
		t.m.allowEdit = false;
	}

	function fill(a, b) {
		if (Array.isArray(b)) {
			b.forEach(c => a.push(c));
		} else {
			var entries = Object.entries(b);

			entries.forEach(ent => {
				if (typeof ent[1] === "object") {
					fill(a[ent[0]], ent[1]);
				} else {
					if (a !== undefined) {
						a[ent[0]] = ent[1];
					}
				}
			});
		}
	}

	fs.collection(`users/${t.info.ownerUid}/characters/${t.info.characterId}/d`).doc("data").get().then(a => {
		if (a && a.exists) {
			var d = a.data();
			console.log(d);
			fill(t.c, d);
		}
	});
}

function toMod(a) {
	if (a >= 0) {
		return "+" + a;
	} else {
		return a;
	}
}

export default {
	components: {
		card,
		primaryTitle,
		actions,
		textbox,
		checkbox,
		popup,
		snackbar,
		searchbar
	},
	data() {
		return {
			content: {
				foci: [],
				equipment: [],
				psionics: [],
				weapons: {
					ranged: []
				}
			},
			companion: [],
			query: "",
			p: {
				save: false
			},
			popup: {
				focus: false,
				equipment: false,
				armor: false,
				rangedWeapons: false,
				search: false,
				psionics: false,
				breakdown: false
			},
			info: {
				ownerUid: "",
				characterId: ""
			},
			m: {
				allowEdit: false,
				edit: false,
				breakdown: []
			},
			c: {
				name: "",
				background: "",
				class: "",
				partial: "",
				xp: 0,
				hp: 0,
				hpMax: 0,
				attackBonus: 0,
				customEquipment: {
					name: "",
					description: ""
				},
				effort: {
					current: 0,
					max: 0
				},
				settings: {
					usePsionics: false,
					showTitles: true,
					showSteps: false,
					showDetails: false,
					useManual: false,
					showBreakdown: false
				},
				manual: {
					ac: 10,
					speed: 10,
					savingThrows: {
						physical: 15,
						evasion: 15,
						mental: 15
					}
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
				},
				foci: [],
				equipment: [],
				psionics: []
			}
		}
	},
	computed: {
		level() {
			var xp = this.c.xp;
			if (xp < 3) {
				return 1;
			} else if (xp >= 3 && xp < 6) {
				return 2;
			} else if (xp >= 6 && xp < 12) {
				return 3;
			} else if (xp >= 12 && xp < 18) {
				return 4;
			} else if (xp >= 18 && xp < 27) {
				return 5;
			} else if (xp >= 27 && xp < 39) {
				return 6;
			} else if (xp >= 39 && xp < 54) {
				return 7;
			} else if (xp >= 54 && xp < 72) {
				return 8;
			} else if (xp >= 72 && xp < 93) {
				return 9;
			} else if (xp >= 93 && xp < 117) {
				return 10;
			} else if (xp >= 117) {
				return 10 + Math.floor(((xp - 93) / 24));
			}
		},
		speed() {
			if (!this.c.settings.useManual) {
				if (this.totalStowedItems > this.c.attributes.str || this.totalReadiedItems > Math.floor(this.c.attributes.str / 2)) {
					return 7;
				} else {
					return 10;
				}
			} else {
				return this.c.manual.speed;
			}
		},
		fociList() {
			return this.content.foci.filter(a => !a.selected);
		},
		ac() {
			if (!this.c.settings.useManual) {
				let i = 10 + this.calMod(this.c.attributes.dex);
				if (this.equipedArmor) {
					var a = this.equipedArmor;
					if (Array.isArray(a)) {
						let c = 0;

						a.forEach(armor => {
							if (armor.bonus === 0) {
								c += armor.ac;
							} else {
								c += armor.bonus;
							}
						});

						return c + this.calMod(this.c.attributes.dex);
					} else {
						if (i >= a.ac) {
							return i + a.bonus;
						} else {
							return a.ac + this.calMod(this.c.attributes.dex);
						}
					}
				} else {
					return i;
				}
			} else {
				return this.c.manual.ac;
			}
		},
		readyEnc() {
			return Math.floor(this.c.attributes.str / 2);
		},
		readiedItems() {
			return this.c.equipment.filter(a => a.$caried === "ready");
		},
		stowedItems() {
			return this.c.equipment.filter(a => a.$caried === "stowed");
		},
		totalStowedItems() {
			var s = 0;
			this.stowedItems.forEach(a => s += a.enc);
			return s;
		},
		totalReadiedItems() {
			var s = 0;
			this.readiedItems.forEach(a => s += a.enc);
			return s;
		},
		equipedArmor() {
			var i = this.readiedItems.filter(a => a.equipmentType === "armor");
			if (i.length > 0) {
				if (i.length === 2) {
					return i;
				} else {
					return i[0];
				}
			} else {
				return false;
			}
		},
		bestResult() {
			var query = this.query;

			if (query === "") {
				return []
			}

			return this.companion.filter(a => {
				return a.title.toLowerCase() === query;
			});
		},
		searchResults() {
			var query = this.query;
			if (query === "") {
				return []
			}

			return this.companion.filter(a => {
				return a.title.toLowerCase() !== query && a.title.toLowerCase().includes(query);
			});
		},
		relatedResults() {
			var query = this.query;
			if (query === "") {
				return []
			}

			return this.companion.filter(a => {
				let r = false;

				if (a.title.toLowerCase() !== query && a.title.toLowerCase().includes(query) === false) {
					a.related.forEach(b => {
						if (b.toLowerCase().includes(query)) {
							r = true;
						}
					});
				}

				return r;
			});
		}
	},
	methods: {
		toMarkdown(a) {
			return marked(a, { sanitize: true });
		},
		toggleVal(a, b) {
			a[b] = !a[b];
		},
		save() {
			var t = this;
			if (t.m.allowEdit) {
				fs.collection(`users/${t.info.ownerUid}/characters/${t.info.characterId}/d`).doc("data").set(t.c).then(a => {
					fs.collection(`users/${t.info.ownerUid}/characters`).doc(t.info.characterId).update({
						name: t.c.name
					}).then(a => {
						console.log(t.p.save);
						t.p.save = true;
						setTimeout(() => {
							t.p.save = false;
						}, 3000)
					});
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
							t.$router.push({ path: `/character/${user().uid}/${id}` });
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
			this.m.edit = !this.m.edit;
		},
		toggleSearch() {
			this.popup.search = !this.popup.search;
		},
		h(value) {
			var refBuild = value.key.split(".");
			var f = refBuild.pop();
			var ref = this.c;

			refBuild.forEach(a => {
				ref = ref[a];
			});

			ref[f] = value.value;
		},
		calMod(s) {
			if (s <= 3) {
				return -2;
			} else if (s >= 4 && s <= 7) {
				return -1;
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
			if (!this.c.settings.useManual) {
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

				return 15 - (this.level - 1) - u;
			} else {
				var s = this.c.manual.savingThrows[a];
				return s;
			}
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
		},
		addFocus(f) {
			this.c.foci.push(Object.assign(f, {
				open: false,
				currentLvl: 1
			}));
			console.log();
		},
		removeFocus(f) {
			var index = this.c.foci.indexOf(f);
			this.c.foci.splice(index, 1);
		},
		changeFocus(f) {
			console.log(f);
			if (f.currentLvl === 1) {
				f.currentLvl = 2;
			} else {
				f.currentLvl = 1;
			}
		},
		hpc(a) {
			if (a === "+") {
				if (this.c.hp < this.c.hpMax) {
					this.c.hp++;
				}
			} else if (a === "-") {
				if (this.c.hp > 0) {
					this.c.hp--;
				}
			}
		},
		efc(a) {
			if (a === "+") {
				if (this.c.effort.current < this.c.effort.max) {
					this.c.effort.current++;
				}
			} else if (a === "-") {
				if (this.c.effort.current > 0) {
					this.c.effort.current--;
				}
			}
		},
		addItem(a, b) {
			let allow = false;
			if (b === "stowed") {
				if (this.totalStowedItems + a.enc <= this.c.attributes.str + 4) {
					allow = true;
				}
			} else if (b === "ready") {
				if (this.totalStowedItems + a.enc <= this.readyEnc + 2) {
					allow = true;
				}
			}

			if (allow) {
				this.c.equipment.push({...a, $caried: b, open: false});
			}
		},
		deleteItem(a) {
			if (confirm("Are you sure you want to delete this item from your inventory?")) {
				var index = this.c.equipment.indexOf(a);
				this.c.equipment.splice(index, 1);
			}
		},
		readyItem(a) {
			if (this.totalReadiedItems + a.enc <= this.readyEnc) {
				if (a.equipmentType === "armor" && this.equipedArmor) {
					if (Array.isArray(this.equipedArmor) === false) {
						if (a.bonus > 0 || this.equipedArmor.bonus > 0) {
							a.open = false;
							a.$caried = "ready";
						} else {
							alert("You can only equip one set of armor");
						}
					} else {
						alert("You can only equip one set of armor");
					}
				} else {
					a.open = false;
					a.$caried = "ready";
				}
			}
		},
		stowItem(a) {
			if (this.totalStowedItems + a.enc <= this.c.attributes.str) {
				a.open = false;
				a.$caried = "stowed";
			}
		},
		attackBonus(item) {
			var skill, skillBonus, attr;
			if (item.equipmentType === "rangedWeapon") {
				skill = this.c.skills.shoot;
				attr = this.c.attributes.dex;
			}

			if (skill.trained === false) {
				skillBonus = -2;
			} else {
				skillBonus = skill.lvl;
			}

			console.log(Math.floor(this.level / 2), skillBonus, this.calMod(attr));

			return toMod(Math.floor(this.level / 2) + skillBonus + this.calMod(attr) + Number(this.c.attackBonus));
		},
		search(a) {
			var query = a.toLowerCase();
			this.query = query;
		},
		toMod(a) {
			return toMod(a);
		},
		addPsionic(p) {
			var obj = {...p, open: false, level: 0, selectedTechniques: [], showPopup: false};
			var techniques = obj.techniques;

			obj.techniques = [];

			techniques.forEach(a => {
				obj.techniques.push({...a, open: false, choicen: false});
			});

			this.c.psionics.push(obj);
		},
		psionicUp(p) {
			if (p.level < 4) {
				p.level++;
			}
		},
		psionicDown(p) {
			if (p.level > 0) {
				p.level--;
			}
		},
		chooseTechnique(p, t) {
			var index = p.techniques.indexOf(t);
			p.selectedTechniques.push({...t, open: false, index});

			t.choicen = true;
		},
		removeTechnique(p, t) {
			p.techniques[t.index].choicen = false;
			p.techniques[t.index].open = false;

			var index = p.selectedTechniques.indexOf(p);
			p.selectedTechniques.splice(index, 1);
		},
		removePsionic(p) {
			if (confirm("Are you sure you want to delete this skill?")) {
				var index = this.c.psionics.indexOf(p);
				this.c.psionics.splice(index, 1);
			}
		},
		showBreakdown(a) {
			if (a === "ac") {
				if (this.equipedArmor) {
					var a = this.equipedArmor;

					var r = [];

					if (Array.isArray(a)) {
						a.forEach(armor => {
							if (armor.bonus === 0) {
								r.push({
									value: armor.ac,
									label: "Base armor (" + armor.name + ")"
								});
							} else {
								r.push({
									value: armor.bonus,
									label: "Bonus (" + armor.name + ")"
								});
							}
						});
					} else {
						let i = 10 + this.calMod(this.c.attributes.dex);
						if (i >= a.ac) {
							r.push({
								value: 10,
								label: "Base"
							});

							r.push({
								value: a.bonus,
								label: "Bonus (" + a.name + ")"
							});
						} else {
							r.push({
								value: a.ac,
								label: "Base armor (" + a.name + ")"
							});
						}
					}

					r.push({
						value: this.calMod(this.c.attributes.dex),
						label: "Dex modifier"
					});

					this.m.breakdown = r;
				} else {
					this.m.breakdown = [
						{
							value: 10,
							label: "Base"
						},
						{
							value: this.calMod(this.c.attributes.dex),
							label: "Dex modifier"
						}
					]
				}
			} else if (a === "speed") {
				// speed() {
				// 	if (!this.c.settings.useManual) {
				// 	} else {
				// 		return this.c.manual.speed;
				// 	}
				// },

				var r = [
					{
						value: 10,
						label: "Base"
					}
				]

				if (this.totalStowedItems > this.c.attributes.str || this.totalReadiedItems > Math.floor(this.c.attributes.str / 2)) {
					r.push({
						value: -3,
						label: "Heavily packed"
					});
				}

				this.m.breakdown = r;
			} else if (a.equipmentType === "rangedWeapon") {
				let skillBonus;

				let skill = this.c.skills.shoot;

				if (skill.trained === false) {
					skillBonus = -2;
				} else {
					skillBonus = skill.lvl;
				}

				this.m.breakdown = [
					{
						value: Math.floor(this.level / 2),
						label: "Level / 2 rounded down"
					},
					{
						value: skillBonus,
						label: "Skill (shoot)"
					},
					{
						value: this.calMod(this.c.attributes.dex),
						label: "Dex modifier"
					},
					{
						value: this.c.attackBonus,
						label: "Extra attack bonus"
					}
				]
			}

			this.popup.breakdown = true;
		}
	},
	watch: {
		"$route": function() {
			updateInstance(this);
		}
	},
	created() {

		var entries = Object.entries(foci);

		var f = entries.map(a => {return {...a[1], internalName: a[0], open: false}});
		this.content.foci = f;

		// var t = this;

		equipment.armor.then(a => {
			entries = Object.entries(a);
			var f = entries.map(b => {return {...b[1], open: false}});
			f.forEach(b => this.content.equipment.push(b));
		});

		var e = Object.entries(rangedWeapons);
		e.forEach(a => {
			this.content.weapons.ranged.push({...a[1], open: false});
		});

		var e = Object.entries(companion);
		e.forEach(a => {
			this.companion.push(a[1]);
		});

		var e = Object.entries(psionics);
		e.forEach(a => {
			a[1].then(b => {
				this.content.psionics.push({...b, open: false});
			});
		});

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

.hp {
	width: 100%;
	height: 78px;

	.ctrl, .disp {
		height: 100%;
		float: left;
	}

	.disp {
		width: 60%;

		h1 {
			margin: 0;
			font-size: 32px;
			text-align: center;
			font-family: defaultFont;
			position: relative;
			top: 50%;
			transform: translateY(-50%);
		}
	}

	.ctrl {
		width: 20%;

		&:hover {
			cursor: pointer;
			background-color: rgba(#e5e5e5, .5);
		}

		h1 {
			margin: 0;
			font-size: 32px;
			text-align: center;
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
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

.listItem {
	padding: 8px 16px;
	width: calc(100% - 32px);
	border-bottom: 1px solid dividerColor;
	// display: inline-block;

	&:first-child {
		border-top: 1px solid dividerColor;
	}

	h1 {
		color: black;
		font-family: defaultFont;
		font-size: 16px;
		font-weight: 900;
		margin: 6px 0px;
	}
}

.p {
	width: 100%;
	height: 100%;

	.card {
		margin: 16px;
		margin-left: auto;
		margin-right: auto;

		max-width: 400px;
	}
}

.x {
	display: inline-block;
	width: 24px;
	position: absolute;
	right: 0px;
	cursor: pointer;
	z-index: 21;
}

.dropdownInd {
	transform: translateY(4px) rotate(0deg);
	transition: 200ms cubic-bezier(0.4, 0.0, 0.2, 1) transform;

	&.d {
		transform: translateY(4px) rotate(180deg);
	}
}

.contentDropdown-enter-active {
	transition: 200ms cubic-bezier(0.4, 0.0, 0.2, 1) all;
}

.contentDropdown-enter {
	opacity: 0;
	transform: translateY(-16px);
}

.contentDropdown-enter-to {
	opacity: 1;
	transform: translateY(0);
}

.tooltip {
	visibility: hidden;
    background-color: #6d6d6d;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 120%;
    left: 50%;
    /* margin-left: -60px; */
    font-size: 12px;
    transform: translateX(-50%) scale(0);
    padding: 0px 8px;
    height: 24px;
    line-height: 24px;
	opacity: 0;
	transition: 100ms cubic-bezier(0.0, 0.0, 0.2, 1) all;
}

button:hover .tooltip {
	visibility: visible;
	opacity: 1;
	transform: translateX(-50%) scale(1);
}

.shortAnswer {
	font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size: 30px;
    margin: 8px 0px;
	margin-top: 0;
    color: #505050;
    padding: 0px 16px;
}

.card {
	.b {
		grid-row: 5 / 6;
	}
	.e {
		grid-row: 6 / 7;
	}
}

.halfed {
	width: 50%;
	float: left;

	&.a {
		width: calc(50% - 1px);
		border-right: 1px solid transparent;
	}
}

h3 {
	padding: 0px 16px;
	font-family: defaultFont;
	font-size: 36px;
	color: #000000de;
	font-size: 20px;
}

b {
	color: #000000de;
}

.psionics {
	.listItem {
		// padding-top: 0;
		// padding-bottom: 0;
		display: inline-block;
	}

	.skill {
		.disp {
			h1 {
				margin: 0;
				font-size: 20px;
			}
		}
	}
}

.popup .card {
	max-width: 700px;
}

.mobile {
	display: none;
}

.desktop {
	display: none;
}

@media only screen and (max-width: 600px) {
	.tooltip {
		display: none;
	}

	.mobile {
		display: block;
	}
}

@media only screen and (min-width: 600px) {
	.desktop {
		display: block;
	}
}

@media only screen and (min-width: 1000px) {
	.cardGrid {
		width: calc(100% - 32px);
		padding: 16px;
		display: inline-grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: auto;
		grid-gap: 16px 16px;

		& > .card {
			max-width: 100000px;
			width: auto;
			grid-column: 1 / 4;
		}
	}

	.row.d {
		width: 50%;
		float: left;
	}
}

@media only screen and (max-width: 1000px) {
	.halfed {
		width: 100%;
		float: none;

		&.a {
			width: 100%;
			border-right: 0px;
			border-bottom: 1px solid dividerColor;
		}
	}
}

</style>
