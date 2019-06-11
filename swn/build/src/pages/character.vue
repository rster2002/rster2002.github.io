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
                    <textbox v-model="c.name" label="Name"></textbox>
					<textbox v-model="c.background" label="Background"></textbox>
					<textbox v-model="c.class" label="Class"></textbox>
					<textbox v-if="c.class.toLowerCase() === 'adventurer'" v-model="c.partial" label="Partial Class"></textbox>
					<textbox v-model="c.xp" label="XP" type="number"></textbox>
					<textbox v-model="c.attackBonus" label="Attack Bonus" type="number"></textbox>
				</div>
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
					<!-- <button class="icon" @click="test()"><span class="material-icons">info</span></button> -->
				</actions>
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
					<textbox v-model="c.manual.ac" label="Armor Class" type="number"></textbox>
					<textbox v-model="c.manual.speed" label="Speed" type="number"></textbox>
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
					<textbox v-model="c.hpMax" label="Maximum hitpoints" type="number"></textbox>
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
					<textbox v-model="c.manual.savingThrows.physical" label="Physical" type="number"></textbox>
					<textbox v-model="c.manual.savingThrows.evasion" label="Evasion" type="number"></textbox>
					<textbox v-model="c.manual.savingThrows.mental" label="Mental" type="number"></textbox>
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
					<textbox label="Strength" v-model="c.attributes.str" type="number"></textbox>
					<textbox label="Dexterity" v-model="c.attributes.dex" type="number"></textbox>
					<textbox label="Constitution" v-model="c.attributes.con" type="number"></textbox>
					<textbox label="Intelligence" v-model="c.attributes.int" type="number"></textbox>
					<textbox label="Wisdom" v-model="c.attributes.wis" type="number"></textbox>
					<textbox label="Charisma" v-model="c.attributes.cha" type="number"></textbox>
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
							<checkbox v-model="c.skills.administer.trained"></checkbox>
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
							<checkbox v-model="c.skills.connect.trained"></checkbox>
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
							<checkbox v-model="c.skills.exert.trained"></checkbox>
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
							<checkbox v-model="c.skills.fix.trained"></checkbox>
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
							<checkbox v-model="c.skills.heal.trained"></checkbox>
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
							<checkbox v-model="c.skills.know.trained"></checkbox>
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
							<checkbox v-model="c.skills.lead.trained"></checkbox>
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
							<checkbox v-model="c.skills.notice.trained"></checkbox>
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
							<checkbox v-model="c.skills.perform.trained"></checkbox>
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
							<checkbox v-model="c.skills.pilot.trained"></checkbox>
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
							<checkbox v-model="c.skills.program.trained"></checkbox>
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
							<checkbox v-model="c.skills.punch.trained"></checkbox>
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
							<checkbox v-model="c.skills.shoot.trained"></checkbox>
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
							<checkbox v-model="c.skills.sneak.trained"></checkbox>
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
							<checkbox v-model="c.skills.stab.trained"></checkbox>
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
							<checkbox v-model="c.skills.survive.trained"></checkbox>
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
							<checkbox v-model="c.skills.talk.trained"></checkbox>
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
							<checkbox v-model="c.skills.trade.trained"></checkbox>
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
							<checkbox v-model="c.skills.work.trained"></checkbox>
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
											<button class="primary" @click="addFocus(focus)">Add focus</button>
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
                    <!-- Readied items -->
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
											<h1 v-if="item.magazine !== -1">{{ item.magazinesLeft}}/{{ item.magazine }}</h1>
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
                                    <button v-if="item.equipmentType === 'rangedWeapon' && item.magazinesLeft === 0" class="primary" @click="reloadWeapon(item)">reload weapon</button>
                                    <button v-if="item.equipmentType === 'rangedWeapon' && item.magazinesLeft > 0" class="primary" @click="useRangedWeapon(item)">Use weapon</button>
                                    <button v-if="item.equipmentType === 'rangedWeapon'" @click="stowItem(item)">Stow item</button>
									<button v-if="item.equipmentType !== 'rangedWeapon'" class="primary" @click="stowItem(item)">Stow item</button>
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
                    <!-- Stowed items -->
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
											<h1 v-if="item.magazine !== -1">{{ item.magazinesLeft }}/{{ item.magazine }}</h1>
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
									<button class="primary" @click="readyItem(item)">Ready item</button>
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
													<button class="primary" @click="addItem(item, 'stowed')">Add stowed</button>
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
													<button class="primary" @click="addItem(item, 'stowed')">Add stowed</button>
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
							<textbox class="lessMargin" @change="h" type="select" v-model="c.customEquipment.type" vname="customEquipment.type" label="Equipment Type">
								<option selected	>Armor</option>
								<option>Ranged Weapon</option>
								<option>Custom</option>
							</textbox>
							<textbox class="lessMargin" v-model="c.customEquipment.name" vname="customEquipment.name" label="Item Name"></textbox>
							<textbox class="lessMargin" @change="h" type="textarea" v-model="c.customEquipment.description" vname="customEquipment.description" label="Description"></textbox>
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
					<textbox v-model="c.effort.max" label="Max effort" type="number"></textbox>
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
							<div v-if="psionic.open" style="display: inline-block;">
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
																<button class="primary" @click="chooseTechnique(psionic, technique)">Add technique</button>
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
						<p style="right: 16px;" class="x" @click="popup.psionics = false"><span class="material-icons">close</span></p>
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
									<button class="primary" @click="addPsionic(psionic)">Add skill</button>
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
						<checkbox v-model="c.settings.usePsionics"></checkbox>
					</div>
					<div class="txt">
						<p>Use psionics</p>
					</div>
				</div>
				<div class="setting" v-if="m.allowEdit">
					<div class="checkboxWrapper">
						<checkbox v-model="c.settings.showTitles"></checkbox>
					</div>
					<div class="txt">
						<p>Show titles</p>
					</div>
				</div>
				<div class="setting" v-if="m.allowEdit">
					<div class="checkboxWrapper">
						<checkbox v-model="c.settings.showSteps"></checkbox>
					</div>
					<div class="txt">
						<p>Show character creation steps</p>
					</div>
				</div>
				<div class="setting" v-if="m.allowEdit">
					<div class="checkboxWrapper">
						<checkbox v-model="c.settings.showDetails"></checkbox>
					</div>
					<div class="txt">
						<p>Show details</p>
					</div>
				</div>
				<div class="setting" v-if="m.allowEdit">
					<div class="checkboxWrapper">
						<checkbox v-model="c.settings.useManual"></checkbox>
					</div>
					<div class="txt">
						<p>Use manual mode</p>
					</div>
				</div>
				<div class="setting" v-if="m.allowEdit">
					<div class="checkboxWrapper">
						<checkbox v-model="c.settings.showBreakdown"></checkbox>
					</div>
					<div class="txt">
						<p>Show calculation breakdown</p>
					</div>
				</div>
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

<script src="./character/script.js"></script>
<style src="./character/styling.stylus" lang="stylus" scoped></style>
