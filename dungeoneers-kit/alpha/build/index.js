var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,i=(t,n,s)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[n]=s,o=(e,t)=>{for(var n in t||(t={}))r.call(t,n)&&i(e,n,t[n]);if(s)for(var n of s(t))a.call(t,n)&&i(e,n,t[n]);return e},l=(e,s)=>t(e,n(s));import{S as u,i as c,s as h,t as f,c as p,a as g,b as d,d as m,e as y,f as b,g as v,h as $,j as w,k as S,l as j,n as O,w as A,m as E,D as C,B as x,Z as P,o as L,p as T,q as D,r as I,u as k,v as R,x as _,y as F,z as N,A as M,C as U,E as H,F as W,G as V,H as B,I as G,J as z,K as X,L as J,M as Y,N as q,O as K,P as Q,Q as Z,R as ee,T as te,U as ne,V as se}from"./vendor.js";let re;const ae={},ie=function(e,t){if(!t)return e();if(void 0===re){const e=document.createElement("link").relList;re=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in ae)return;ae[e]=!0;const t=e.endsWith(".css"),n=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${n}`))return;const s=document.createElement("link");return s.rel=t?"stylesheet":re,t||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),t?new Promise(((e,t)=>{s.addEventListener("load",e),s.addEventListener("error",t)})):void 0}))).then((()=>e()))};function oe(e){let t;return{c(){t=f(e[0])},l(n){t=p(n,e[0])},m(e,n){g(e,t,n)},p(e,n){1&n&&d(t,e[0])},d(e){e&&m(t)}}}function le(e){let t,n,s,r,a,i,o,l,u=e[0]&&oe(e);return{c(){t=y("main"),n=y("div"),s=y("h1"),r=f("Loading..."),a=b(),i=y("p"),o=f(e[1]),l=b(),u&&u.c(),this.h()},l(c){t=v(c,"MAIN",{class:!0});var h=$(t);n=v(h,"DIV",{class:!0});var f=$(n);s=v(f,"H1",{class:!0});var g=$(s);r=p(g,"Loading..."),g.forEach(m),a=w(f),i=v(f,"P",{});var d=$(i);o=p(d,e[1]),d.forEach(m),l=w(f),u&&u.l(f),f.forEach(m),h.forEach(m),this.h()},h(){S(s,"class","svelte-vwjg8c"),S(n,"class","svelte-vwjg8c"),S(t,"class","svelte-vwjg8c")},m(e,c){g(e,t,c),j(t,n),j(n,s),j(s,r),j(n,a),j(n,i),j(i,o),j(n,l),u&&u.m(n,null)},p(e,[t]){e[0]?u?u.p(e,t):(u=oe(e),u.c(),u.m(n,null)):u&&(u.d(1),u=null)},i:O,o:O,d(e){e&&m(t),u&&u.d()}}}function ue(e,t,n){var{additional:s=null}=t;let r=["Never split the party.","DM is God, and DM is always right, Do not argu with the DM.","Always check for traps.",'If the DM asks, "Are you sure?" DON\'T DO THE THING!',"REST. You don't know what's out there.","Never plot out loud. God is listening and taking notes.","The skeleton always animates.","If something is too good to be true, it probably is.","For the love of all that's holy, don't go in the water. Or the fog.","Write that down. You won't remember it later, but the DM will.","Tricky lock? Ask the barbarian to open it for you.","Anything is a weapon if you roll high enough.","Loot EVERYTHING.","Never draw the card.","If the item is smarter than you are, it has its own agenda.","The Dragon is never your friend.","Don't het on the boat. The DM has a hoarde of nautical beasties he's never been able to use.","PROTECT THE HEALER!","Talk to people. You never known what you don't know.","Bring enough to share.","Alarming DM Phrases: Are you sure?","Alarming DM Phrases: What's your marching order again?","Alarming DM Phrases: And then you see this iron statue.","Alarming DM Phrases: I need more six sided dice.","Go ahead and pull that lever.","Lets see if your spellbook survived that fireball..."],a=r[Math.floor(Math.random()*r.length)];return e.$$set=e=>{"additional"in e&&n(0,s=e.additional)},[s,a]}class ce extends u{constructor(e){super(),c(this,e,ue,le,h,{additional:0})}}const he={"/campaign/:campaignId":A({asyncComponent:()=>ie((()=>import("./Campaign.js")),["./build/Campaign.js","./build/Campaign.css","./build/vendor.js","./build/SpellPopup.js","./build/SpellPopup.css","./build/GenericTable.js","./build/GenericTable.css","./build/DatasetGuard.js","./build/DatasetGuard.css","./build/searchResultScores.js"]),loadingComponent:ce}),"/character/:characterId":A({asyncComponent:()=>ie((()=>import("./CharacterSheet.js")),["./build/CharacterSheet.js","./build/CharacterSheet.css","./build/vendor.js","./build/Container.js","./build/Container.css","./build/SpellPopup.js","./build/SpellPopup.css","./build/GenericTable.js","./build/GenericTable.css","./build/DatasetGuard.js","./build/DatasetGuard.css"]),loadingComponent:ce}),"/test":A({asyncComponent:()=>ie((()=>import("./Testing.js")),["./build/Testing.js","./build/Testing.css","./build/vendor.js","./build/GenericTable.js","./build/GenericTable.css"]),loadingComponent:ce}),"/":A({asyncComponent:()=>ie((()=>import("./Index2.js")),["./build/Index2.js","./build/Index2.css","./build/vendor.js","./build/Container.js","./build/Container.css","./build/SpellPopup.js","./build/SpellPopup.css","./build/GenericTable.js","./build/GenericTable.css","./build/searchResultScores.js"]),loadingComponent:ce}),"/*":A({asyncComponent:()=>ie((()=>import("./Index2.js")),["./build/Index2.js","./build/Index2.css","./build/vendor.js","./build/Container.js","./build/Container.css","./build/SpellPopup.js","./build/SpellPopup.css","./build/GenericTable.js","./build/GenericTable.css","./build/searchResultScores.js"]),loadingComponent:ce})};function fe(e,t,n){return e.split(t).join(n)}function pe(e){return null===e?e:Array.isArray(e)?function(e){let t=[];for(let n of e)t.push(pe(n));return t}(e):"object"==typeof e?function(e){let t={},n=Object.entries(e);for(let[s,r]of n)t[s]=pe(r);return t}(e):e}function ge(e,t,n=null){!function(e){let t=e;t.get=()=>{let t={};return e.subscribe((e=>{t=e}))(),t},t.refresh=()=>e.set(t.get()),t.getList=()=>Object.values(t.get()),t.set=t=>e.update((e=>t)),t.arrayPush=n=>{let s=t.get();s.push(n),e.set(s)},t.arrayRemove=n=>{let s=t.get(),r=s.indexOf(n);s.splice(r,1),e.set(s)}}(e);let s=e.get();s&&(n=s),t=`alpha-${t}`;let r=localStorage.getItem(t);return r?"object"==typeof n?e.set(JSON.parse(r)):e.set(r):e.set(n),e.delete=()=>localStorage.removeItem(t),function(e,t){e.subscribe((e=>{void 0!==e&&("object"==typeof e&&(e=JSON.stringify(e)),localStorage.setItem(t,e))}))}(e,t),e}function de(e,t){const n=E(t);return ge(n,e,t),n}function me(e,t=null){let n=E(t);return function(e,t,n=null){ge(e,t,n)}(n,e,t),n}const ye=2,be=de("datasets",[]),ve=de("currentDataset","");class $e extends Error{constructor(e,t){super(),this.status=e,this.payload=t}getStatus(){return this.status}getPayload(){return this.payload}}const we=new C("alpha-datasets");async function Se(){let e=ve.get(),t=await async function(e){return await we.datasets.where({hash:e}).first()}(e);return t&&2!==t.version&&(t=null),t}async function je(e){let t=await async function(e){let t=new x(e),n=new P(t),s=await n.getEntries();return s=s.filter((e=>!e.filename.includes("__MACOSX/"))),await Promise.all(s.map((async e=>{let t=await e.getData(new L);return new File([t],e.filename)})))}(e),n=t.find((e=>"index.json"===e.name));if(!n)throw new $e("noMapFile");let s=JSON.parse(await n.text()),r=function(e){let t;try{t=[e.adventures,e.backgrounds,e.classes,e.conditions,e.fluff,e.items.baseItems,e.items.items,e.languages.scripts,e.languages.languages,e.monsterFluff,e.monsters,e.optionalFeatures,e.races,e.spells,e.books,[e.booksIndex],["index"]]}catch(n){throw new $e("invalidMappingEntry")}if(t=t.flat(),t.some((e=>void 0===e)))throw new $e("missingMappingEntry");return t}(s).map((e=>`${e}.json`)),a=t.filter((e=>r.includes(e.name))),i=await Promise.all(a.map((e=>e.arrayBuffer()))),o=new Uint8Array(i.reduce(((e,t)=>e+t.byteLength),0)),l=0;for(let p of i)o.set(new Uint8Array(p),l),l=p.byteLength;let u=o.buffer,c=await crypto.subtle.digest("sha-256",u),h=[...new Uint8Array(c)].map((e=>e.toString(16).padStart(2,"0"))).join("");let f=be.get().find((e=>e.hash===h));if(f)throw new $e("hashAlreadyExists",f);await we.table("datasets").put({hash:h,name:s.name,version:s.version,files:Object.fromEntries(a.map((e=>[e.name,e])))}),be.update((e=>(e.push({name:s.name,version:s.version,hash:h}),1===e.length&&ve.set(h),e)))}async function Oe(e){let t=be.get(),n=t.indexOf(e);-1!==n&&t.splice(n,1),be.set(t),ve.set(""),await we.table("datasets").where({hash:e.hash}).delete()}async function Ae(e,t){await we.table("datasets").where({hash:e}).modify({name:t}),be.update((n=>(n.find((t=>t.hash===e)).name=t,n)))}var Ee,Ce;function xe(e){return l(o({UA:!1,srd:!1,hash:null,name:"Default Entry",source:null,page:0,dataType:Ee.Unknown},e),{getDescriptionParts(){return[this.getSourceString()]},getDescription(){return this.getDescriptionParts().join(" • ")},getSourceString(){return`${this.source} ${this.page}`}})}function Pe(e){return Math.floor((e-10)/2)}function Le(e){return e>=0?`+${e}`:String(e)}function Te(e){return Le(Pe(e))}function De(e){let t=e.split(""),n=t.shift();return n=n.toUpperCase(),n+t.join("")}we.version(1).stores({datasets:"hash, name, version, *files"}),(Ce=Ee||(Ee={})).Unknown="unknown",Ce.Background="background",Ce.Class="class",Ce.Item="item",Ce.Monster="monster",Ce.Race="race",Ce.Spell="spell",Ce.Adventure="adventure",Ce.Language="language";const Ie={L:"Lawful",C:"Chaotic",N:"Neutral",G:"Good",E:"Evil",U:"Unaligned",A:"Any alignment"},ke={T:"Tiny",S:"Small",M:"Medium",H:"Huge",L:"Large",G:"Gargantuan"},Re={0:10,"1/8":25,"1/4":50,"1/2":100,1:200,2:450,3:700,4:1100,5:1800,6:2300,7:2900,8:3900,9:5e3,10:5900,11:7200,12:8400,13:1e4,14:11500,15:13e3,16:15e3,17:18e3,18:2e4,19:22e3,20:25e3,21:33e3,22:41e3,23:5e4,24:62e3,30:155e3};function _e(){const e=[];for(let t of Object.values(ut))"environment"in t&&t.environment.forEach((t=>{e.includes(t)||e.push(De(t))}));return[...new Set(e)]}function Fe(e){return Re[e]}function Ne(e){return"1/8"===e?.125:"1/4"===e?.25:"1/2"===e?.5:Number(e)}function Me(e){return l(o(o({},e),xe(e)),{getDescriptionParts(){return[this.getCRStringWithoutXP(),`${this.getSizeString()} ${this.getTypeString()}`,this.getAlignmentString(),this.getSourceString()]},getModifiers(){return{str:Pe(this.str),dex:Pe(this.dex),con:Pe(this.con),int:Pe(this.int),wis:Pe(this.wis),cha:Pe(this.cha)}},getHPString(){let{hp:e}=this,{average:t,formula:n}=e;return`${t} (${n})`},getCRString(){let{cr:e}=this;return"string"==typeof e?`${e} (${Fe(e)} XP)`:"object"==typeof e?`${e.cr} (${Fe(e.cr)} XP), Lair ${e.lair} (${Fe(e.lair)} XP)`:void 0},getCRValue(){let{cr:e}=this;return"string"==typeof e?Ne(e):"object"==typeof e?(Ne(e.cr)+Ne(e.lair))/2:void 0},getCRStringWithoutXP(){let{cr:e}=this;return"string"==typeof e?`CR ${e}`:"object"==typeof e?`CR ${e.cr}, Lair CR ${e.lair}`:void 0},getACString(){let{ac:e}=this;return e.map((e=>{if("number"==typeof e)return e;if("object"==typeof e){let t="";return e.from&&(t=`${e.ac} (${e.from.join(", ")})`),e.condition&&(t=`${e.ac} ${e.condition}`),e.braces&&(t=`(${t})`),t}})).join(", ")},getXPValue(){let{cr:e}=this;return"string"==typeof e?Fe(e):"object"==typeof e?Fe(e.cr):void 0},getSpeedString(){let{speed:e}=this,t=[],n=o({walk:0,fly:0,swim:0,climb:0,burrow:0},e);const s=e=>{let s=n[e];if("object"==typeof s){let{number:n,condition:r}=s;t.push(`${e} ${n} ft. ${r}`)}else s>0&&t.push(`${e} ${s} ft.`)};return t.push(`${n.walk} ft.`),s("fly"),s("swim"),s("climb"),s("burrow"),t.join(", ")},getTypeString(){let{type:e}=this;return"object"==typeof e?void 0!==e.tags?`${e.type} (${e.tags.join(", ")})`:e.swarmSize?`swarm ${ke[e.swarmSize]} ${e.type}s`:"(unset)":e},getSizeString(){let{size:e}=this;if("string"==typeof e)return ke[e]},getAlignmentString(e=this.alignment){let t=[];if("object"==typeof e&&Array.isArray(e))for(let n of e)"string"==typeof n?t.push(Ie[n]):void 0!==n.chance&&t.push(`${this.getAlignmentString(n.alignment)} (${n.chance}%)`);return t.join(" ").toLowerCase()},getDamageResistancesString(e=this.resistance){return void 0===e?null:e.map((e=>{if("string"==typeof e)return e;if("object"==typeof e){let t=[];return e.resist&&t.push(this.getDamageResistancesString(e.resist)),e.note&&t.push(e.note),t.join(" ")}})).join(", ")},getSavesString(){return this.save?(e=this.save,Object.entries(e).map((([e,t])=>(t=t.replace("+",""),`${De(e)} {@check ${t}}`))).join(", ")):"";var e},getSkillsString(e=this.skill){return e?Object.entries(e).sort((([e,t])=>"string"==typeof t?-1:1)).map((([e,t])=>"object"==typeof t&&Array.isArray(t)?t.map((e=>"object"!=typeof e?e:void 0!==e.oneOf?`plus one of the following: ${this.getSkillsString(e.oneOf)}`:void 0)):`${e} {@check ${t}}`)).join(", "):""}})}var Ue,He,We,Ve,Be,Ge;Me.getCreaturesBySource=function(e){let t=Object.values(ut);return e?t.filter((t=>t.source===e)):t},Me.getMonsterByNameAndSource=function(e,t){let n=Me.getCreaturesBySource(t);for(let s of n){if(s.name.toLowerCase()===e.toLowerCase())return s}return null},(He=Ue||(Ue={})).Strength="str",He.Dexterity="dex",He.Constitution="con",He.Intelligence="int",He.Wisdom="wis",He.Charisma="cha",(Ve=We||(We={}))[Ve.Tiny=0]="Tiny",Ve[Ve.Small=1]="Small",Ve[Ve.Medium=2]="Medium",Ve[Ve.Huge=3]="Huge",Ve[Ve.Large=4]="Large",Ve[Ve.Gargantuan=5]="Gargantuan",(Ge=Be||(Be={})).LAWFUL_GOOD="lg",Ge.NEUTRAL_GOOD="ng",Ge.CHAOTIC_GOOD="cg",Ge.LAWFUL_NEUTRAL="ln",Ge.TRUE_NEUTRAL="n",Ge.CHAOTIC_NEUTRAL="cn",Ge.LAWFUL_EVIL="le",Ge.NEUTRAL_EVIL="ne",Ge.CHAOTIC_EVIL="ce",Ge.UNALIGNED="u",Ge.ANY="a";const ze={H:"heavy",F:"finess",L:"light",T:"throwing",LD:"loading",R:"reach",AF:"firearm",BF:"burstfire",S:"special","2H":"two-handed"},Xe={P:"piercing",S:"slashing",B:"bludgeoning"};function Je(e){let t="baseItem"===e.dataType;return t&&(e.dataType="item"),l(o(o({},e),xe(e)),{isBaseItem:t,getWeight:()=>e.weight?e.weight:0,isWeapon(){return void 0!==this.weapon&&this.weapon},isWondrous(){return"rarity"in this&&"none"!==this.rarity.toLowerCase()},getProperties(){return this.property||[]},isFiness(){return this.isWeapon()&&this.getProperties().includes("F")},getDescriptionParts(){let e=[];return this.isWeapon()&&e.push(this.getWeaponTypeString()),this.isWondrous()&&(e.push(`Wondrous item, ${this.rarity.toLowerCase()}`),this.reqAttune&&e.push("Attunement")),0===e.length&&e.push("Adventuring Gear"),e.push(this.getSourceString()),e},getAttackBonus(e=null){let t=0;if(!this.isWeapon())return t;if(null!==e&&(this.isFiness()?t+=e.stats.getHighestModifierFrom([Ue.Strength,Ue.Dexterity]):t+=e.stats.getModifiers().str),void 0!==this.bonus){let e=this.bonus;e=e.replace("+",""),t+=Number(e)}return t},getAttackBonusBreakDown(e=null){let t=[];if(null!==e)if(this.isFiness()){let n=e.stats.getHighestModifierFrom([Ue.Strength,Ue.Dexterity]);t.push(`${Ye(n)}`),t.push(`${n} Str/Dex`)}else{let n=e.stats.getModifiers().str;t.push(`${Ye(n)}`),t.push(`${n} Str`)}if(void 0!==this.bonus){let e=this.bonus;e=e.replace("+",""),e=Number(e),t.push(`${Ye(e)}`),t.push(`${e} Bonus`)}return t.shift(),t.join(" ")},getDamageExpression(){if(!this.isWeapon())return"0";let e=this.getAttackBonus(),t=Ye(e);return e=String(e),e=e.replace("-","- "),`${this.dmg1} ${t} ${e}`},getPropertiesString(){if(!this.isWeapon())return"";return this.getProperties().map((e=>"T"===e?`Throwing (range ${this.range})`:"A"===e?`Ammunition (range ${this.range})`:"V"===e?`Versatile (${this.dmg2})`:"RLD"===e?`Reload (${this.reload} shots)`:De(ze[e]))).join(", ")},getWeaponTypeString(){if(!this.isWeapon())return"";let e=[];return e.push(De(this.weaponCategory)),"M"===this.type?e.push("Melee"):e.push("Ranged"),e.push("Weapon"),e.join(" ")},getWeaponDamageType(){return this.isWeapon()?Xe[this.dmgType]:""},isContainer(){var e;return!!(null==(e=null==this?void 0:this.containerCapacity)?void 0:e.weight)}})}function Ye(e){return e>=0?"+":""}const qe={V:"Evocation",N:"Necromancy",A:"Abjuration",D:"Divination",C:"Conjuration",T:"Transmutation",E:"Enchantment",I:"Illusion"};function Ke(e){return l(o(o({},e),xe(e)),{getDescriptionParts(){let e=[];if(this.associatedClass){let t=this.getAssociatedClass();e.push(t.name)}return e.push(this.getLevelString()),e.push(this.getSchoolString()),e.push(this.getBriefSpellComponentsString()),e.push(this.getRangeString()),e.push(this.getSourceString()),e},getAssociatedClass(){return ot[this.associatedClass]},getSchoolString(){let{school:e}=this;return qe[e]},getLevelString(){let{level:e}=this;return 0===e?"Cantrip":`Level ${e}`},getSpellComponentsString(){let e=this.components,t=Object.keys(e);if(t.includes("m")){let n=t.indexOf("m"),s=e.m;t[n]="string"==typeof s?`Material (${s})`:`Material (${s.text})`}return t=t.map((e=>"s"===e?"Somatic":"v"===e?"Verbal":e)),t.join(", ")},getBriefSpellComponentsString(){return Object.keys(this.components).join(",")},getRangeString(){let{range:e}=this;if("special"===e.type)return"Special";let t=e.distance,{type:n}=t;return"touch"===n?"Touch":"feet"===n?`${t.amount} ft.`:"point"===n?this.getRangeString(t)+" (Point)":"self"===n?"Self":"unlimited"===n?"Unlimited":void 0},getCastingTimeString(){return this.time.map((e=>{let{number:t,unit:n}=e;return`${t} ${n}`})).join(", ")},getDurationString(){return this.duration.map((e=>{let{type:t}=e;if("instant"===t)return"Instantaneous";if("timed"===t){let{duration:{amount:t,type:n}}=e;return e.concentration?`Concentration, Up to ${t} ${n}`:`${t} ${n}`}return"permanent"===t&&e.ends.includes("dispel")?"Until Dispelled":void 0})).join(", ")}})}function Qe(e){return o(o({},e),xe(e))}const Ze={CP:1,SP:10,EL:50,GP:100,PP:1e3},et={str:"strength",dex:"dexterity",con:"constitution",int:"intelligence",wis:"wisdom",cha:"charisma"},tt=Object.fromEntries(Object.entries(et).map((([e,t])=>[e,De(t)]))),nt={acrobatics:{basedOn:"dex"},animalHandling:{basedOn:"wis"},arcana:{basedOn:"int"},athletics:{basedOn:"str"},deception:{basedOn:"cha"},history:{basedOn:"int"},insight:{basedOn:"wis"},intimidation:{basedOn:"cha"},investigation:{basedOn:"int"},medicine:{basedOn:"wis"},nature:{basedOn:"int"},perception:{basedOn:"wis"},performance:{basedOn:"cha"},persuasion:{basedOn:"cha"},religion:{basedOn:"int"},slightOfHand:{basedOn:"dex"},stealth:{basedOn:"dex"},survival:{basedOn:"wis"}},st={acrobatics:"Acrobatics",animalHandling:"Animal Handling",arcana:"Arcana",athletics:"Athletics",deception:"Deception",history:"History",insight:"Insight",intimidation:"Intimidation",investigation:"Investigation",medicine:"Medicine",nature:"Nature",perception:"Perception",performance:"Performance",persuasion:"Persuasion",religion:"Religion",slightOfHand:"Slight of Hand",stealth:"Stealth",survival:"Survival"};function rt(e){return l(o(o({},e),xe(e)),{getSavingThrowsString(){let e=this.saves,t=[];for(const n of e)t.push(De(et[n]));return t.join(", ")},getProficiencyString(){let e=this.proficiency;if(!e)return"None";let t=[];for(const n of e)if("string"==typeof n)t.push(n);else if("object"==typeof n){let{choose:{from:e,count:s}}=n,r=e.map((e=>De(e)));t.push(`Choose ${s} from ${r.join(", ")}`)}return De(t.join(", "))},getFirstSubclassFeatureLevel(){let e=this;for(const t of e.classFeatures)if(t.gainSubclassFeature)return t.level;return 1/0},getSubclass(e){const t=this;for(const n of t.subclasses)if(n.hash===e)return n;return null},getClassFeatures(e=null){let t=this.getSubclass(e),n=this.classFeatures.map((e=>(e.type="class",e)));return null!==t&&(n=n.concat(t.subclassFeatures.map((e=>(e.type="subclass",e))))),n=n.sort(((e,t)=>e.level-t.level)),n}})}["acrobatics","animalHandling","arcana","athletics","deception","history","insight","intimidation","investigation","medicine","nature","perception","performance","persuasion","religion","slightOfHand","stealth","survival"].map((e=>o({skill:e},nt[e]))),rt.getClass=function(e){if("object"==typeof e)return e;let t=ot[e];return void 0===t?null:t},rt.getSubclass=function(e,t){if(!e||!t)return null;let n=rt.getClass(e);if(null===n)return null;for(const s of n.subclasses)if(s.hash===t)return s;return null},rt.getRefSubclassFeature=function(e){let[t,n,s,r,a,i]=e.split("|"),o=Object.values(ot).find((e=>e.name===n));if(!o)return null;let{subclassFeatureMap:l}=o,u=l[`${r} ${t} ${i}`];return u||null},rt.getRefOptionalFeature=function(e){let[t]=e.split("|"),n=Object.values(wt).find((e=>e.name.includes(t)));return n||null};class at extends Error{constructor(e,t){super(`Error with status '${e}'`),this.status=e,this.payload=t}getStatus(){return this.status}getPayload(){return this.payload}}const it={},ot={},lt={},ut={},ct={},ht={},ft={},pt={},gt={},dt={},mt={},yt={},bt={},vt={},$t={},wt={},St={},jt={};function Ot(){return Object.fromEntries(Object.values(dt).map((e=>[e.name,e])))}let At,Et=null;function Ct(e){for(let t of Object.keys(e))delete e[t]}async function xt(e){let t=(await Se()).files[e];return t?new Response(t,{status:200}):new Response(null,{status:404})}function Pt(e){At&&At(e)}const Lt={};function Tt(e){return e=fe(e=e.toLowerCase()," ","-"),T(e)}function Dt(e){let t=function(e){let t=e.name+e.dataType;return void 0===e.name?T(JSON.stringify(e)):Tt(t)}(e),n=0;for(;void 0!==Lt[t];)n++;return t+=n,Lt[t]=!0,t}async function It(e){let t=`${e}.json`,n=await xt(t);return 404===n.status?null:await n.json()}async function kt(e,t,n,s){return function(e,t,n){e=e.map(((s,r)=>(Pt(`Mapping ${t} (${r+1}/${e.length})`),s.dataType=t,s.hash=Dt(s),void 0!==s.source&&(void 0===St[s.source]&&(St[s.source]={}),void 0!==s.page&&(void 0===St[s.source][s.page]&&(St[s.source][s.page]=[]),St[s.source][s.page].push(s))),s.source&&s.source.includes("UA")?(s.UA=!0,s.name+=" (UA)"):s.UA=!1,n(s))));let s={},r={};for(const i of e)s[i.hash]=i,void 0!==i.source&&(void 0===r[i.source]&&(r[i.source]={}),r[i.source][i.name]=i);let a=e=>{if("_copy"in e){Pt(`Copying ${e.hash}`);let{source:t,name:n}=e._copy;if(t in r&&n in r[t]){let i=a(r[t][n]);delete(e=o(o({},i),e))._copy,s[e.hash]=e}}return s[e.hash]};return Object.values(s).forEach(a),s}(function(e,t){return"*"===t?e.filter((e=>!!e)).flat(1/0):e.filter((e=>!!e)).map((e=>e[t])).flat(1/0)}(await Promise.all(s),e),t,n)}function Rt(e){return e.map((e=>It(e)))}async function _t(){return kt("monster","monster",Me,Rt(Et.monsters))}async function Ft(){return kt("spell","spell",Ke,Rt(Et.spells))}async function Nt(){return kt("optionalfeature","optionalFeature",xe,Rt(Et.optionalFeatures))}async function Mt(){return new Promise((e=>{kt("*","class",rt,Rt(Et.classes)).then((t=>{t=(t=Object.values(t)).map(((e,t)=>{let n={},s={};for(const r of e.classFeature){let e=`${r.className} ${r.name} ${r.level}`;n[e]=r}void 0===e.subclassFeature&&(e.subclassFeature=[]);for(const r of e.subclassFeature){let e=`${r.subclassShortName} ${r.name} ${r.level}`;s[e]=r}return e.class.map((t=>(t.hash=Dt(t),t.dataType="class",t.UA=t.name.includes("UA"),t.classFeatureMap=n,t.subclassFeatureMap=s,t.classFeatures=t.classFeatures.map((e=>{let t=!1;"object"==typeof e&&(t=!!e.gainSubclassFeature,e=e.classFeature);let[s,r,a,i]=e.split("|"),o=n[`${r} ${s} ${i}`];return o.UA=void 0!==o.source&&o.source.includes("UA"),o.hash=Tt(`${r} ${s} ${i}`),o.gainSubclassFeature=t,o})).filter((e=>!!e)).sort(((e,t)=>e.level-t.level)),void 0===t.subclasses&&(t.subclasses=[]),void 0===e.subclass&&(e.subclass=[]),t.subclasses=e.subclass.filter((e=>void 0===e._copy)).map((e=>void 0!==e.hash?pe(e):(e.hash=Tt(`${t.name} ${e.name} ${e.classSource}`),e.UA=void 0!==e.source&&e.source.includes("UA"),e.subclassFeatures=e.subclassFeatures.map((n=>{let[r,a,i,o,l,u]=n.split("|"),c=s[`${o} ${r} ${u}`];return c.UA=void 0!==c.source&&c.source.includes("UA"),c.hash=Tt(`${t.name} ${e.name} ${r} ${u}`),c})),e))),t=rt(t))))})).flat(1);let n=Object.fromEntries(t.map((e=>[e.hash,e])));e(n)}))}))}async function Ut(){return new Promise((e=>{Promise.all([kt("baseitem","baseItem",xe,Rt(Et.items.baseItems)),kt("item","item",xe,Rt(Et.items.items))]).then((t=>{let n={};for(let e of t){for(let t in e)e[t]=Je(e[t]);n=o(o({},n),e)}e(n)}))}))}async function Ht(){return new Promise((e=>{kt("race","race",xe,Rt(Et.races)).then((t=>{t=function(e){let t={};for(let n of e)t[n.hash]=n;return t}(t=(t=(t=Object.values(t)).map((e=>(e.subraces||(e.subraces=[]),e.subraces=e.subraces.map((t=>(void 0===t.entries&&(t.entries=[]),t.entries.map((n=>("object"==typeof n&&(n.hash=Tt(`${e.name} ${t.name} ${n.name}`)),n))),l(o(o({},{name:"Base",entries:[]}),t),{hash:Dt(t)})))),void 0===e.entries&&(e.entries=[]),e.entries.map((t=>("object"==typeof t&&(t.hash=Tt(`${e.name} ${t.name}`)),t))),e)))).map((e=>{return o(o({},t=e),xe(t));var t}))),e(t)}))}))}async function Wt(){return kt("fluff","fluff",xe,Et.fluff.map((e=>async function(e){let t=await It(e);return{fluff:o({},t)}}(e))))}async function Vt(){return kt("monsterFluff","monsterFluff",xe,Rt(Et.monsterFluff))}async function Bt(){return kt("condition","condition",xe,Rt(Et.conditions))}async function Gt(){return kt("background","background",xe,Rt(Et.backgrounds))}async function zt(){return kt("*","adventure",xe,Rt(Et.adventures))}async function Xt(){return kt("language","language",Qe,Rt(Et.languages.languages))}async function Jt(){return kt("languageScript","languageScript",xe,Rt(Et.languages.scripts))}async function Yt(){let e=(await It("books")).book.map((e=>(e.id=e.id.toLowerCase(),e))),t=(await Promise.all(e.map((async e=>{let t=await It(`book/book-${e.id}`);return e.entries=null==t?void 0:t.data,e})))).filter((e=>e.entries)).map((e=>(e.hash=e.id,e.dataType="book",e))).map((e=>xe(e)));return console.log(t),Object.fromEntries(t.map((e=>[e.id,e])))}const qt=de("spotifyUserToken",""),Kt=de("spotifyRefreshToken",""),Qt=de("spotifyLastGrant",0),Zt=E(sn()),en=()=>{Zt.set(sn())};async function tn(){return(await fetch("./config.json").then((e=>e.json()))).spotify.clientId}async function nn(){let e=new URLSearchParams(location.search),t=e.get("code");"auth"===e.get("state")&&await async function(e){let t=function(e={}){return Object.entries(e).map((([e,t])=>`${encodeURIComponent(e)}=${encodeURIComponent(t)}`)).join("&")}({client_id:await tn(),grant_type:"authorization_code",code:e,redirect_uri:location.origin,code_verifier:sessionStorage.getItem("::spotifyVerifier")}),n=await fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:t}).then((e=>e.json())),s=sessionStorage.getItem("::spotifyReturn");sessionStorage.removeItem("::spotifyReturn"),sessionStorage.removeItem("::spotifyVerifier"),qt.set(n.access_token),Kt.set(n.refresh_token),Qt.set(Date.now()),location.href=s}(t)}function sn(){return""!==qt.get()&&""!==Kt.get()}function rn(e){if(!e)return null;let t=e,n=[],s=1/0,r=-1/0,a=0,i=0;t=fe(t,",",""),t=t.replace("×","*");let o=D(/^d\d+/gm,t);for(const d of o){let e=d.match;t=t.replace(e,"1"+e)}console.log(t);let l,u,c,h=t,f=t,p=t,g=D(/\d+d\d+/gm,t);for(const d of g){let[e,o]=d.match.split("d"),l=[],u=0;for(let t=1;t<=Number(e);t++){let e=Math.floor(Math.random()*Number(o)+1);e>r&&(r=e),e<s&&(s=e),l.push({expression:`1d${o}`,count:1,type:Number(o),result:e}),u+=e,i+=e,a++}n.push({expression:d.match,count:Number(e),type:Number(o),result:u,subResults:l}),t=t.replace(d.match,String(u)),h=h.replace(d.match,`{${u}}`),p=p.replace(d.match,e),f=f.replace(d.match,String(Number(e)*Number(o)))}t=fe(t,"min",String(s)),t=fe(t,"max",String(r)),p=fe(p,"min",String(s)),p=fe(p,"max",String(r)),f=fe(f,"min",String(s)),f=fe(f,"max",String(r)),h=fe(h,"min",`{${s}}`),h=fe(h,"max",`{${r}}`);try{l=I(t),u=I(p),c=I(f)}catch{return null}return h=fe(h," ",""),h=fe(h,"+"," + "),h=fe(h,"-"," - "),h=fe(h,"/"," / "),h=fe(h,"*"," * "),h=fe(h,"^"," ^ "),{result:l,diceResults:n,diceTotal:i,min:s,max:r,average:l/a,sum:l,resultExpression:h,expression:e,minResult:u,maxResult:c}}qt.subscribe(en),Kt.subscribe(en);function an(e){let t,n,s,r,a,i,o,l,u,c,h,O,A,E,C,x,P,L,T,D,I,N,U=e[0].result+"",H=e[0].expression+"",W=e[0].resultExpression+"";return{c(){t=y("div"),n=y("div"),s=y("h4"),r=f(U),i=b(),o=y("div"),l=b(),u=y("div"),c=y("p"),h=f(H),O=b(),A=y("p"),E=f(W),C=b(),x=y("button"),P=y("span"),this.h()},l(e){t=v(e,"DIV",{class:!0});var a=$(t);n=v(a,"DIV",{class:!0});var f=$(n);s=v(f,"H4",{class:!0});var g=$(s);r=p(g,U),g.forEach(m),f.forEach(m),i=w(a),o=v(a,"DIV",{class:!0}),$(o).forEach(m),l=w(a),u=v(a,"DIV",{class:!0});var d=$(u);c=v(d,"P",{class:!0});var y=$(c);h=p(y,H),y.forEach(m),O=w(d),A=v(d,"P",{class:!0});var b=$(A);E=p(b,W),b.forEach(m),d.forEach(m),C=w(a),x=v(a,"BUTTON",{class:!0});var S=$(x);P=v(S,"SPAN",{class:!0}),$(P).forEach(m),S.forEach(m),a.forEach(m),this.h()},h(){S(s,"class",a=(e[1]&&"min")+" "+(e[2]&&"max")+" svelte-1ap9m7g"),S(n,"class","result"),S(o,"class","divider svelte-1ap9m7g"),S(c,"class","expression svelte-1ap9m7g"),S(A,"class","resultExpression svelte-1ap9m7g"),S(u,"class","expression"),S(P,"class","mdi mdi-close-circle-outline"),S(x,"class","svelte-1ap9m7g"),S(t,"class","diceResult svelte-1ap9m7g")},m(a,f){g(a,t,f),j(t,n),j(n,s),j(s,r),j(t,i),j(t,o),j(t,l),j(t,u),j(u,c),j(c,h),j(u,O),j(u,A),j(A,E),j(t,C),j(t,x),j(x,P),D=!0,I||(N=k(x,"click",e[3]),I=!0)},p(e,[t]){(!D||1&t)&&U!==(U=e[0].result+"")&&d(r,U),(!D||6&t&&a!==(a=(e[1]&&"min")+" "+(e[2]&&"max")+" svelte-1ap9m7g"))&&S(s,"class",a),(!D||1&t)&&H!==(H=e[0].expression+"")&&d(h,H),(!D||1&t)&&W!==(W=e[0].resultExpression+"")&&d(E,W)},i(e){D||(R((()=>{T&&T.end(1),L||(L=_(t,M,{x:-200,duration:250})),L.start()})),D=!0)},o(e){L&&L.invalidate(),T=F(t,M,{x:-200,duration:250}),D=!1},d(e){e&&m(t),e&&T&&T.end(),I=!1,N()}}}function on(e,t,n){let s,r;const a=N();var{result:i}=t;return e.$$set=e=>{"result"in e&&n(0,i=e.result)},e.$$.update=()=>{1&e.$$.dirty&&n(1,s=i.result===i.minResult),1&e.$$.dirty&&n(2,r=i.result===i.maxResult)},[i,s,r,function(){a("close")}]}class ln extends u{constructor(e){super(),c(this,e,on,an,h,{result:0})}}function un(e,t,n){const s=e.slice();return s[6]=t[n],s}function cn(e){let t,n,s=[],r=new Map,a=e[0];const i=e=>e[6];for(let o=0;o<a.length;o+=1){let t=un(e,a,o),n=i(t);r.set(n,s[o]=hn(n,t))}return{c(){t=y("div");for(let e=0;e<s.length;e+=1)s[e].c();this.h()},l(e){t=v(e,"DIV",{class:!0});var n=$(t);for(let t=0;t<s.length;t+=1)s[t].l(n);n.forEach(m),this.h()},h(){S(t,"class","floater svelte-14cie1s")},m(e,r){g(e,t,r);for(let n=0;n<s.length;n+=1)s[n].m(t,null);n=!0},p(e,n){3&n&&(a=e[0],U(),s=H(s,n,i,1,e,a,r,t,W,hn,null,un),V())},i(e){if(!n){for(let e=0;e<a.length;e+=1)B(s[e]);n=!0}},o(e){for(let t=0;t<s.length;t+=1)G(s[t]);n=!1},d(e){e&&m(t);for(let t=0;t<s.length;t+=1)s[t].d()}}}function hn(e,t){let n,s,r;return s=new ln({props:{result:t[6]}}),s.$on("close",(function(){return t[4](t[6])})),{key:e,first:null,c(){n=z(),J(s.$$.fragment),this.h()},l(e){n=z(),Y(s.$$.fragment,e),this.h()},h(){this.first=n},m(e,t){g(e,n,t),q(s,e,t),r=!0},p(e,n){t=e;const r={};1&n&&(r.result=t[6]),s.$set(r)},i(e){r||(B(s.$$.fragment,e),r=!0)},o(e){G(s.$$.fragment,e),r=!1},d(e){e&&m(n),K(s,e)}}}function fn(e){let t,n,s=e[0].length>0&&cn(e);return{c(){s&&s.c(),t=z()},l(e){s&&s.l(e),t=z()},m(e,r){s&&s.m(e,r),g(e,t,r),n=!0},p(e,[n]){e[0].length>0?s?(s.p(e,n),1&n&&B(s,1)):(s=cn(e),s.c(),B(s,1),s.m(t.parentNode,t)):s&&(U(),G(s,1,1,(()=>{s=null})),V())},i(e){n||(B(s),n=!0)},o(e){G(s),n=!1},d(e){s&&s.d(e),e&&m(t)}}}function pn(e,t,n){var{context:s}=t,{timeout:r=5e3}=t,a=[];function i(e){a.push(e),n(0,a),setTimeout((()=>{o(e)}),r)}function o(e){let t=a.indexOf(e);-1!==t&&(a.splice(t,1),n(0,a))}s.onRoll(i),X((()=>{s.removeListener(i)}));return e.$$set=e=>{"context"in e&&n(2,s=e.context),"timeout"in e&&n(3,r=e.timeout)},[a,o,s,r,e=>o(e)]}class gn extends u{constructor(e){super(),c(this,e,pn,fn,h,{context:2,timeout:3})}}function dn(e){let t,n;return t=new ce({props:{additional:e[1]}}),{c(){J(t.$$.fragment)},l(e){Y(t.$$.fragment,e)},m(e,s){q(t,e,s),n=!0},p(e,n){const s={};2&n&&(s.additional=e[1]),t.$set(s)},i(e){n||(B(t.$$.fragment,e),n=!0)},o(e){G(t.$$.fragment,e),n=!1},d(e){K(t,e)}}}function mn(e){let t,n,s,r;return t=new gn({props:{context:e[2]}}),s=new se({props:{routes:he}}),{c(){J(t.$$.fragment),n=b(),J(s.$$.fragment)},l(e){Y(t.$$.fragment,e),n=w(e),Y(s.$$.fragment,e)},m(e,a){q(t,e,a),g(e,n,a),q(s,e,a),r=!0},p:O,i(e){r||(B(t.$$.fragment,e),B(s.$$.fragment,e),r=!0)},o(e){G(t.$$.fragment,e),G(s.$$.fragment,e),r=!1},d(e){K(t,e),e&&m(n),K(s,e)}}}function yn(e){let t,n,s,r,a,i;const o=[mn,dn],l=[];function u(e,t){return e[0]?0:1}return s=u(e),r=l[s]=o[s](e),{c(){t=y("link"),n=b(),r.c(),a=z(),this.h()},l(e){const s=Q('[data-svelte="svelte-vtsmpy"]',document.head);t=v(s,"LINK",{rel:!0,href:!0,class:!0}),s.forEach(m),n=w(e),r.l(e),a=z(),this.h()},h(){S(t,"rel","stylesheet"),S(t,"href","//cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css"),S(t,"class","svelte-1g7074x")},m(e,r){j(document.head,t),g(e,n,r),l[s].m(e,r),g(e,a,r),i=!0},p(e,[t]){let n=s;s=u(e),s===n?l[s].p(e,t):(U(),G(l[n],1,1,(()=>{l[n]=null})),V(),r=l[s],r?r.p(e,t):(r=l[s]=o[s](e),r.c()),B(r,1),r.m(a.parentNode,a))},i(e){i||(B(r),i=!0)},o(e){G(r),i=!1},d(e){m(t),e&&m(n),l[s].d(e),e&&m(a)}}}function bn(e,t,n){let s,r;Z(e,ve,(e=>n(3,s=e))),Z(e,ne,(e=>n(4,r=e)));var a=this&&this.__awaiter||function(e,t,n,s){return new(n||(n=Promise))((function(r,a){function i(e){try{l(s.next(e))}catch(t){a(t)}}function o(e){try{l(s.throw(e))}catch(t){a(t)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,o)}l((s=s.apply(e,t||[])).next())}))},i=function(){let e=[];return{roll(t){let n=rn(t);e.forEach((e=>e(n)))},onRoll(t){e.push(t)},removeListener(t){let n=e.indexOf(t);-1!==n&&e.splice(n,1)}}}(),o=!1,l="";function u(){return a(this,void 0,void 0,(function*(){n(0,o=!1);try{yield async function(e){if(At=e,Pt("Preparing..."),!(await Se()))throw new at("noDatasetSelected");let t=await xt("index.json");Et=await t.json(),Pt("Loading..."),Ct(bt),Ct(vt);const n=async(e,t,n=!0)=>{Ct(e);let s=await t();return Object.assign(e,s),Object.assign(bt,s),n&&Object.assign(vt,s),s};return await Promise.all([n(it,Ht),n(ot,Mt),n(lt,Ut),n(ut,_t),n(ct,Ft),n(ht,Gt),n(ft,Bt),n($t,Wt,!1),n(pt,zt,!1),n(wt,Nt,!1),n(gt,Xt),n(mt,Jt,!1),n(dt,Vt,!1),n(yt,Yt,!1)]),console.log(bt),console.log("Preloaded"),!0}((e=>{n(1,l=e)})),n(0,o=!0),nn()}catch(e){console.error(e),"/settings"!==r&&ee("/settings")}finally{n(0,o=!0)}}))}return e.$$.update=()=>{8&e.$$.dirty&&u()},te("diceContext",i),[o,l,i,s]}new class extends u{constructor(e){super(),c(this,e,bn,yn,h,{})}}({target:document.body});export{ht as A,Ue as B,rt as C,Pe as D,st as E,tt as F,xe as G,Ae as H,Je as I,Oe as J,ye as K,je as L,Me as M,$e as N,Ke as S,be as a,me as b,De as c,pe as d,ve as e,rn as f,_e as g,ft as h,jt as i,Ze as j,Xe as k,lt as l,ut as m,ct as n,Ot as o,Le as p,yt as q,fe as r,vt as s,bt as t,Te as u,et as v,gt as w,nt as x,it as y,ot as z};