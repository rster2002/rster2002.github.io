(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-21816a4b"],{"0e24":function(e,a,t){},1399:function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("page",{staticClass:"collection"},[t("div",{staticClass:"grid"},[t("div",{staticClass:"cardGrid",on:{scroll:e.loadMoreDynamicly}},e._l(e.loadedCards,(function(a){return t("div",{key:"mtg-"+a.id,staticClass:"mtgCard",class:{selected:a.id===e.loadedCard.id},on:{mouseover:function(t){return e.peekCardEnter(a)},mouseleave:function(a){return e.peekCardLeave()},click:function(t){return e.openCard(a)}}},[t("img",{attrs:{src:a.image_uris.normal}}),t("h2",[e._v(e._s(a.name))]),t("h3",[e._v("x"+e._s(a.MagicManager.count))])])})),0),t("div",{staticClass:"sideInfo"},[t("card",{staticClass:"generalInfo"},[t("h1",[e._v("Your collection")]),t("p",[e._v("You own a total of "+e._s(e.totalCards)+" cards")])]),e.showCard?t("card",{staticClass:"detailedInfo"},[e.showPeekCard?t("cardDetails",{attrs:{card:e.peekCard,showCollectionControlls:!0}}):e._e(),e.showPeekCard?e._e():t("cardDetails",{attrs:{card:e.loadedCard,showCollectionControlls:!0}})],1):e._e(),t("card",{staticClass:"cardList"},[t("textBox",{attrs:{label:"Search collection"},model:{value:e.query,callback:function(a){e.query=a},expression:"query"}}),e._l(e.allCards,(function(a){return t("dropDown",{key:a.id,attrs:{label:e.cardName(a)},on:{click:function(t){return e.openCardAtIndex(a)}}},[t("cardDetails",{attrs:{card:a,showCollectionControlls:!0}})],1)}))],2),t("card",{staticClass:"backup"},[t("button",{on:{click:function(a){return e.backupFirestore()}}},[e._v("Backup collection online")])])],1)]),t("snackbar",{attrs:{name:"notLoggedIn"}},[e._v(" You are not logged in ")]),t("snackbar",{attrs:{name:"backupDone"}},[e._v(" Backup was successful ")]),t("snackbar",{attrs:{name:"backupFail"}},[e._v(" Backup was unsuccessful ")])],1)},n=[],c=(t("a4d3"),t("99af"),t("4de4"),t("4160"),t("c975"),t("d81d"),t("13d5"),t("a434"),t("b0c0"),t("e439"),t("dbb4"),t("b64b"),t("159b"),t("2fa7")),o=t("284c"),s=(t("5c33"),t("e1a0")),d=t("d8ba"),i=t("0ee1"),l=t("8ffc");function u(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,r)}return t}function f(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?u(t,!0).forEach((function(a){Object(c["a"])(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(t).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}var b={components:{page:d["j"],card:d["b"],textBox:d["m"],dropDown:d["d"],cardDetails:i["a"],snackbar:d["l"]},data:function(){return{query:"",cards:[],loadedCards:[],loadedCard:{id:""},showPeekCard:!1,showCard:!1,peekCard:{},queryCards:"",exportJson:"",updateAllCards:Math.random()}},computed:{totalCards:function(){if(this.cards.length>0){var e=this.allCards.map((function(e){return e.MagicManager.count}));return e.reduce((function(e,a){return e+a}))}return 0},allCards:function(){return console.log("FIRE"),this.updateAllCards,[].concat(Object(o["a"])(this.loadedCards),Object(o["a"])(this.cards))}},methods:{cardName:function(e){return e.MagicManager.count>1?e.name+" (x".concat(e.MagicManager.count,")"):e.name},peekCardEnter:function(e){this.peekCard=Object.assign({},this.peekCard,f({},e,{trimmed:this.loadedCard.id!==e.id}))},peekCardLeave:function(){},openCard:function(e){var a=this;Object(s["d"])(e.id).then((function(e){a.loadedCard=Object.assign({},a.loadedCard,e),a.showCard=!0}))},openCardAtIndex:function(e){var a=this,t=this.cards.indexOf(e),r=this.loadedCards.indexOf(e),n=-1!==t?this.cards:this.loadedCards,c=-1!==t?t:r;console.log(t,r),console.log(n,this.loadedCards),Object(s["d"])(n[c].id).then((function(e){n[c]=Object.assign({},n[c],e),a.updateAllCards=Math.random()}))},backupFirestore:function(){Object(s["b"])().then((function(){return Object(d["k"])("snackbar:backupDone")})).catch((function(e){console.log(e),"auth/noUser"===e?Object(d["k"])("snackbar:notLoggedIn"):Object(d["k"])("snackbar:backupFail")}))},loadMoreDynamicly:function(e){var a=e.target,t=a.scrollTop,r=a.clientHeight,n=a.scrollHeight;console.log(t,r,n),t+r>=n-200&&this.loadCards()},loadCards:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:25,a=this.cards.splice(0,e);a.length>0&&(this.loadedCards=[].concat(Object(o["a"])(this.loadedCards),Object(o["a"])(a)))}},created:function(){var e=this;this.cards=Object(s["c"])(),this.loadCards(),console.log(Object(s["c"])()),Object(l["a"])("collection").receive((function(a){e.cards=Object(s["c"])()}))}},p=b,C=(t("2bf3"),t("2877")),h=Object(C["a"])(p,r,n,!1,null,"79ddfe2a",null);a["default"]=h.exports},"2bf3":function(e,a,t){"use strict";var r=t("0e24"),n=t.n(r);n.a},c975:function(e,a,t){"use strict";var r=t("23e7"),n=t("4d64").indexOf,c=t("b301"),o=[].indexOf,s=!!o&&1/[1].indexOf(1,-0)<0,d=c("indexOf");r({target:"Array",proto:!0,forced:s||d},{indexOf:function(e){return s?o.apply(this,arguments)||0:n(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-21816a4b.eb2fb61e.js.map