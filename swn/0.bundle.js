(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{363:function(n,t,a){"use strict";a(387);var e=a(120),i=Object(e.a)({},function(){var n=this.$createElement;return(this._self._c||n)("div",{staticClass:"divider"})},[],!1,null,"598fa12e",null).exports,o={props:["show"],data:function(){return{internalShow:!1}},watch:{show:function(){this.internalShow=!0===this.show||"true"===this.show}},methods:{close:function(){this.$emit("close")}},created:function(){this.internalShow=!0===this.show||"true"===this.show}},r=(a(389),Object(e.a)(o,function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("transition",{attrs:{name:"scim"}},[t.internalShow?a("div",{staticClass:"popup"},[a("transition",{attrs:{name:"content",appear:""}},[a("div",{staticClass:"popupContent",on:{click:function(n){return n.target!==n.currentTarget?null:t.close()}}},[t._t("default")],2)])],1):t._e()])},[],!1,null,"b6a2a930",null).exports),s={},c=(a(391),Object(e.a)(s,function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"empty"},[t("div",{staticClass:"wrapper"},[this._t("default")],2)])},[],!1,null,null,null).exports),l=(a(393),Object(e.a)({},function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"fab",on:{click:function(n){return t.$emit("click")}}},[a("p",{staticClass:"material-icons"},[t._t("default")],2)])},[],!1,null,"1dc4b179",null).exports),u={props:["label","val","vname","type"],data:function(){return{v:"",n:"",focus:!1,t:"text"}},watch:{val:function(){this.v!==this.val&&(this.v=this.val)},v:function(){var n=this.v;"number"===this.type&&(n=Number(n)),this.$emit("change",{label:this.label,key:this.n,value:n})}},methods:{f:function(){this.focus=!0,this.$refs.n.focus()},b:function(){""===this.v&&(this.focus=!1)}},created:function(){void 0!==this.val&&(this.v=this.val,""!==this.v&&(this.focus=!0)),void 0===this.vname?this.n=this.label:this.n=this.vname,void 0!==this.type&&(this.t=this.type)}},d=(a(395),Object(e.a)(u,function(){var o=this,n=o.$createElement,t=o._self._c||n;return t("div",{staticClass:"textbox",class:{f:o.focus},on:{click:function(n){return o.f()}}},[t("p",{class:{c:o.focus}},[o._v(o._s(o.label))]),o._v(" "),"checkbox"===o.t?t("input",{directives:[{name:"model",rawName:"v-model",value:o.v,expression:"v"}],ref:"n",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(o.v)?-1<o._i(o.v,null):o.v},on:{focus:function(n){return o.f()},blur:function(n){return o.b()},change:function(n){var t=o.v,a=n.target,e=!!a.checked;if(Array.isArray(t)){var i=o._i(t,null);a.checked?i<0&&(o.v=t.concat([null])):-1<i&&(o.v=t.slice(0,i).concat(t.slice(i+1)))}else o.v=e}}}):"radio"===o.t?t("input",{directives:[{name:"model",rawName:"v-model",value:o.v,expression:"v"}],ref:"n",attrs:{type:"radio"},domProps:{checked:o._q(o.v,null)},on:{focus:function(n){return o.f()},blur:function(n){return o.b()},change:function(n){o.v=null}}}):t("input",{directives:[{name:"model",rawName:"v-model",value:o.v,expression:"v"}],ref:"n",attrs:{type:o.t},domProps:{value:o.v},on:{focus:function(n){return o.f()},blur:function(n){return o.b()},input:function(n){n.target.composing||(o.v=n.target.value)}}})])},[],!1,null,"c9d56018",null).exports),f={props:["vname","val"],data:function(){return{checked:!1,checked2:!1,c:!1}},watch:{c:function(){var t=this;this.c?(this.checked=!0,setTimeout(function(n){t.checked2=!0},100)):(this.checked2=!1,setTimeout(function(n){t.checked=!1},100)),this.$emit("change",{key:this.vname,value:this.c})},val:function(){void 0!==this.val&&(console.log(this.val,this.c),!0===this.val||"true"===this.val?this.c=!0:this.c=!1)}},methods:{toggleChecked:function(){this.c=!this.c}},created:function(){void 0!==this.val&&("true"===this.val||!0===this.val?this.c=!0:this.c=!1)}},p=(a(397),Object(e.a)(f,function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"checkbox",class:{c:t.checked,d:t.checked2},on:{click:function(n){return t.toggleChecked()}}},[a("span",{staticClass:"material-icons"},[t._v("done")])])},[],!1,null,"3b8453fc",null).exports),h=(a(399),Object(e.a)({},function(){var n=this.$createElement;return(this._self._c||n)("div",{staticClass:"bar"},[this._t("default")],2)},[],!1,null,"94a0cf64",null).exports);function v(n){void 0!==n.menu&&"true"===n.menu?(n.showIcon=!1,"/"===n.$route.path?n.showMenu="menu":n.showMenu="arrow_back"):n.showIcon=!0}var x={props:["menu"],data:function(){return{showIcon:!0,showMenu:""}},watch:{$route:function(){v(this)}},methods:{clk:function(){void 0!==this.menu&&"true"===this.menu?"/"===this.$route.path?this.$emit("menu"):this.$emit("back"):this.$emit("click")}},created:function(){v(this)}},b=(a(401),Object(e.a)(x,function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"btn",on:{click:function(n){return t.clk()}}},[a("p",{staticClass:"material-icons"},[t.showIcon?t._t("default"):t._e(),t._v(" "),"true"===t.menu?a("span",[t._v(t._s(t.showMenu))]):t._e()],2)])},[],!1,null,"0db24f7a",null).exports),m={props:["minus"],computed:{c:function(){return console.log(Number(this.minus)),"calc(100% - ".concat(64*Number(this.minus),"px)")}}},g=(a(403),Object(e.a)(m,function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"title",style:{width:this.c}},[t("h1",[this._t("default")],2)])},[],!1,null,"42cdc9c5",null).exports),w={props:["show"]},_=(a(405),Object(e.a)(w,function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("transition",{attrs:{name:"scim"}},[t.show?a("div",{staticClass:"drawerScim",on:{click:function(n){return t.$emit("closedrawer")}}},[a("transition",{attrs:{name:"drawer",appear:""}},[t.show?a("div",{staticClass:"drawer"},[t._t("default")],2):t._e()])],1):t._e()])},[],!1,null,"007d6fb5",null).exports),y={props:["icon","username","secondary"]},k=(a(407),Object(e.a)(y,function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("div",{staticClass:"user"},[a("div",{staticClass:"iconRow"},[a("img",{attrs:{src:n.icon}})]),n._v(" "),a("div",{staticClass:"nameRow"},[a("h1",[n._v(n._s(n.username))]),n._v(" "),void 0!==n.secondary?a("h2",[n._v(n._s(n.secondary))]):n._e()])])},[],!1,null,"224cfd6c",null).exports),C={props:["icon"]},$=(a(409),Object(e.a)(C,function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"btn",on:{click:function(n){return t.$emit("click")}}},[a("div",{staticClass:"icon"},[a("span",{staticClass:"material-icons"},[t._v("\n\t\t\t"+t._s(t.icon)+"\n\t\t")])]),t._v(" "),a("div",{staticClass:"text"},[a("p",[t._t("default")],2)])])},[],!1,null,"7f79dc36",null).exports),z={},R=(a(411),Object(e.a)(z,function(){var n=this.$createElement;return(this._self._c||n)("div",{staticClass:"view"},[this._t("default")],2)},[],!1,null,"23e4b494",null).exports),j={props:["d"],computed:{a:function(){return""===this.d}}},E=(a(413),Object(e.a)(j,function(){var n=this.$createElement;return(this._self._c||n)("div",{staticClass:"card",class:{d:this.a}},[this._t("default")],2)},[],!1,null,null,null).exports),O={},S=(a(415),Object(e.a)(O,function(){var n=this.$createElement;return(this._self._c||n)("div",{staticClass:"actions"},[this._t("default")],2)},[],!1,null,null,null).exports),N={props:["cursor"]},Y=(a(417),Object(e.a)(N,function(){var t=this,n=t.$createElement;return(t._self._c||n)("div",{staticClass:"header",style:{cursor:t.cursor},on:{click:function(n){return t.$emit("click")}}},[t._t("default")],2)},[],!1,null,null,null).exports);a.d(t,"f",function(){return E}),a.d(t,"o",function(){return Y}),a.d(t,"a",function(){return S}),a.d(t,"b",function(){return h}),a.d(t,"d",function(){return b}),a.d(t,"e",function(){return g}),a.d(t,"m",function(){return R}),a.d(t,"c",function(){return _}),a.d(t,"j",function(){return k}),a.d(t,"k",function(){return c}),a.d(t,"l",function(){return l}),a.d(t,"h",function(){return i}),a.d(t,"i",function(){return $}),a.d(t,"p",function(){return d}),a.d(t,"g",function(){return p}),a.d(t,"n",function(){return r})},365:function(n,t,a){var e=a(388);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,a(362).default)("60cc0904",e,!0,{})},366:function(n,t,a){var e=a(390);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,a(362).default)("697f197a",e,!0,{})},367:function(n,t,a){var e=a(392);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,a(362).default)("89ecb650",e,!0,{})},368:function(n,t,a){var e=a(394);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,a(362).default)("47ad1bfe",e,!0,{})},369:function(n,t,a){var e=a(396);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,a(362).default)("f47fa0de",e,!0,{})},370:function(n,t,a){var e=a(398);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,a(362).default)("a8315226",e,!0,{})},371:function(n,t,a){var e=a(400);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,a(362).default)("679c00b4",e,!0,{})},372:function(n,t,a){var e=a(402);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,a(362).default)("39d01dc9",e,!0,{})},373:function(n,t,a){var e=a(404);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,a(362).default)("89ef22a0",e,!0,{})},374:function(n,t,a){var e=a(406);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,a(362).default)("e4a0dd8e",e,!0,{})},375:function(n,t,a){var e=a(408);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,a(362).default)("148070ab",e,!0,{})},376:function(n,t,a){var e=a(410);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,a(362).default)("56073960",e,!0,{})},377:function(n,t,a){var e=a(412);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,a(362).default)("2de64bda",e,!0,{})},378:function(n,t,a){var e=a(414);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,a(362).default)("7f5c3bbe",e,!0,{})},379:function(n,t,a){var e=a(416);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,a(362).default)("01fcb558",e,!0,{})},380:function(n,t,a){var e=a(418);"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,a(362).default)("015aea0a",e,!0,{})},387:function(n,t,a){"use strict";var e=a(365);a.n(e).a},388:function(n,t,a){(n.exports=a(361)(!1)).push([n.i,".divider[data-v-598fa12e] {\n  width: 100%;\n  height: 1px;\n  background-color: #ececec;\n}\n",""])},389:function(n,t,a){"use strict";var e=a(366);a.n(e).a},390:function(n,t,a){(n.exports=a(361)(!1)).push([n.i,".popup[data-v-b6a2a930] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 20;\n  background-color: rgba(0,0,0,0.5);\n  height: 100%;\n  width: 100%;\n}\n.popup .popupContent[data-v-b6a2a930] {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  overflow-y: auto;\n}\n.scim-enter-active[data-v-b6a2a930],\n.scim-leave-active[data-v-b6a2a930],\n.content-enter-active[data-v-b6a2a930],\n.content-leave-active[data-v-b6a2a930] {\n  transition: 200ms cubic-bezier(0.4, 0, 0.2, 1) all;\n}\n.scim-enter[data-v-b6a2a930],\n.scim-leave-to[data-v-b6a2a930] {\n  opacity: 0;\n}\n.scim-enter-to. .scim-leave[data-v-b6a2a930] {\n  opacity: 1;\n}\n.content-enter[data-v-b6a2a930],\n.content-leave-to[data-v-b6a2a930] {\n  opacity: 0;\n  transform: translateY(32px);\n}\n.content-enter-to[data-v-b6a2a930],\n.content-leave[data-v-b6a2a930] {\n  opacity: 1;\n  transform: translateY(0px);\n}\n",""])},391:function(n,t,a){"use strict";var e=a(367);a.n(e).a},392:function(n,t,a){(n.exports=a(361)(!1)).push([n.i,".empty {\n  width: 100%;\n  height: 100%;\n}\n.empty .wrapper {\n  display: inline-block;\n  position: relative;\n  top: 45%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.empty .wrapper > p {\n  margin: 4px 0px;\n  font-family: 'Roboto', sans-serif;\n  font-size: 16px;\n  color: #252525;\n  text-align: center;\n}\n.empty .wrapper > img {\n  width: 280.25px;\n  height: 194.5px;\n}\n",""])},393:function(n,t,a){"use strict";var e=a(368);a.n(e).a},394:function(n,t,a){(n.exports=a(361)(!1)).push([n.i,".fab[data-v-1dc4b179] {\n  position: fixed;\n  z-index: 6;\n  right: 32px;\n  bottom: 32px;\n  width: 54px;\n  height: 54px;\n  border-radius: 50%;\n  background-color: #197bb3;\n  cursor: pointer;\n  box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12);\n}\n.fab p[data-v-1dc4b179] {\n  margin: 0;\n  font-size: 24px;\n  font-weight: 400;\n  position: relative;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  color: #fff;\n}\n",""])},395:function(n,t,a){"use strict";var e=a(369);a.n(e).a},396:function(n,t,a){(n.exports=a(361)(!1)).push([n.i,".textbox[data-v-c9d56018] {\n  position: relative;\n  height: 32px;\n  width: 90%;\n  border-bottom: 2px solid #afafaf;\n  margin: 32px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.textbox.f[data-v-c9d56018] {\n  border-bottom: 2px solid #197bb3;\n}\n.textbox p[data-v-c9d56018] {\n  margin: 0;\n  padding: 0px 0px;\n  display: inline-block;\n  position: absolute;\n  z-index: 1;\n  top: 50%;\n  transform: translateY(-50%);\n  font-family: 'Roboto', sans-serif;\n  font-size: 20px;\n  transition: 100ms cubic-bezier(0.4, 0, 0.2, 1) all;\n  cursor: text;\n}\n.textbox p.c[data-v-c9d56018] {\n  top: -17%;\n  font-size: 12px;\n  color: #197bb3;\n  cursor: default;\n}\n.textbox input[data-v-c9d56018] {\n  position: absolute;\n  border: 0;\n  outline: 0;\n  padding: 6px 0px;\n  width: calc(99%);\n  padding: 0px 0px;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-size: 20px;\n  font-family: 'Roboto', sans-serif;\n}\n",""])},397:function(n,t,a){"use strict";var e=a(370);a.n(e).a},398:function(n,t,a){(n.exports=a(361)(!1)).push([n.i,".checkbox[data-v-3b8453fc] {\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n  border-radius: 6px;\n  border: 2px solid #197bb3;\n  transition: 100ms cubic-bezier(0.4, 0, 0.2, 1) all;\n}\n.checkbox span[data-v-3b8453fc] {\n  font-size: 18px;\n  color: #fff;\n  font-weight: 500;\n  transition: 100ms cubic-bezier(0.4, 0, 0.2, 1) all;\n  position: relative;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) scale(0);\n}\n.checkbox.c[data-v-3b8453fc] {\n  background-color: #197bb3;\n}\n.checkbox.d span[data-v-3b8453fc] {\n  transform: translate(-50%, -50%) scale(1);\n}\n",""])},399:function(n,t,a){"use strict";var e=a(371);a.n(e).a},400:function(n,t,a){(n.exports=a(361)(!1)).push([n.i,".bar[data-v-94a0cf64] {\n  width: 100%;\n  height: 64px;\n  background-color: #3a3133;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 12;\n  box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12);\n}\n",""])},401:function(n,t,a){"use strict";var e=a(372);a.n(e).a},402:function(n,t,a){(n.exports=a(361)(!1)).push([n.i,".btn[data-v-0db24f7a] {\n  height: 64px;\n  width: 64px;\n  float: left;\n  cursor: pointer;\n}\n.btn p[data-v-0db24f7a] {\n  margin: 0;\n  color: #fff;\n  font-size: 24px;\n  position: relative;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n",""])},403:function(n,t,a){"use strict";var e=a(373);a.n(e).a},404:function(n,t,a){(n.exports=a(361)(!1)).push([n.i,".title[data-v-42cdc9c5] {\n  height: 64px;\n  float: left;\n}\n.title h1[data-v-42cdc9c5] {\n  margin: 0;\n  position: relative;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 18px;\n  font-family: 'Roboto', sans-serif;\n  font-weight: 500;\n  color: #fff;\n  padding: 0px 4px;\n  text-transform: capitalize;\n}\n",""])},405:function(n,t,a){"use strict";var e=a(374);a.n(e).a},406:function(n,t,a){(n.exports=a(361)(!1)).push([n.i,".drawerScim[data-v-007d6fb5] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 16;\n  background-color: rgba(0,0,0,0.5);\n}\n.drawerScim .drawer[data-v-007d6fb5] {\n  height: 100%;\n  width: 80%;\n  max-width: 400px;\n  background-color: #fff;\n}\n.scim-enter-active[data-v-007d6fb5],\n.scim-leave-active[data-v-007d6fb5],\n.drawer-enter-active[data-v-007d6fb5],\n.drawer-leave-active[data-v-007d6fb5] {\n  transition: 200ms cubic-bezier(0.4, 0, 0.2, 1) all;\n}\n.scim-enter[data-v-007d6fb5],\n.scim-leave-to[data-v-007d6fb5] {\n  opacity: 0;\n}\n.scim-enter-to[data-v-007d6fb5],\n.scim-leave[data-v-007d6fb5] {\n  opacity: 1;\n}\n.drawer-enter[data-v-007d6fb5],\n.drawer-leave-to[data-v-007d6fb5] {\n  transform: translateX(-100%);\n}\n.drawer-enter-to[data-v-007d6fb5],\n.drawer-leave[data-v-007d6fb5] {\n  transform: translateX(0%);\n}\n",""])},407:function(n,t,a){"use strict";var e=a(375);a.n(e).a},408:function(n,t,a){(n.exports=a(361)(!1)).push([n.i,".user[data-v-224cfd6c] {\n  width: 100%;\n  background-color: #fff;\n  display: inline-block;\n}\n.user .iconRow[data-v-224cfd6c] {\n  width: calc(100% - 32px);\n  padding: 16px;\n}\n.user .iconRow img[data-v-224cfd6c] {\n  height: 52px;\n  width: 52px;\n  border-radius: 50%;\n}\n.user .nameRow[data-v-224cfd6c] {\n  width: calc(100% - 32px);\n  padding: 16px;\n  padding-top: 0;\n}\n.user .nameRow h1[data-v-224cfd6c] {\n  margin: 0;\n  font-size: 22px;\n  font-family: 'Roboto', sans-serif;\n  font-weight: 400;\n  color: #000;\n}\n.user .nameRow h2[data-v-224cfd6c] {\n  margin: 2px 0px;\n  font-size: 16px;\n  font-family: 'Roboto', sans-serif;\n  font-weight: 400;\n  color: #676767;\n}\n",""])},409:function(n,t,a){"use strict";var e=a(376);a.n(e).a},410:function(n,t,a){(n.exports=a(361)(!1)).push([n.i,".btn[data-v-7f79dc36] {\n  width: calc(100% - 16px);\n  margin: 8px 8px;\n  height: 40px;\n  border-radius: 2px;\n  cursor: pointer;\n  color: #505050;\n}\n.btn .icon[data-v-7f79dc36] {\n  height: 40px;\n  width: 40px;\n  float: left;\n}\n.btn .icon span[data-v-7f79dc36] {\n  position: relative;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.btn .text[data-v-7f79dc36] {\n  width: calc(100% - 40px);\n  height: 40px;\n  float: left;\n}\n.btn .text p[data-v-7f79dc36] {\n  width: calc(100% - 32px);\n  margin: 0;\n  padding: 0px 16px;\n  position: relative;\n  top: 50%;\n  transform: translateY(-50%);\n  font-family: 'Roboto', sans-serif;\n}\n.btn.s[data-v-7f79dc36] {\n  background-color: rgba(25,123,179,0.1);\n}\n",""])},411:function(n,t,a){"use strict";var e=a(377);a.n(e).a},412:function(n,t,a){(n.exports=a(361)(!1)).push([n.i,".view[data-v-23e4b494] {\n  padding-top: 64px;\n  height: calc(100% - 64px);\n  width: 100%;\n}\n",""])},413:function(n,t,a){"use strict";var e=a(378);a.n(e).a},414:function(n,t,a){(n.exports=a(361)(!1)).push([n.i,".card {\n  width: calc(100% - 32px);\n  margin: 16px;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 1px 0px;\n  max-width: 400px;\n  border-radius: 2px;\n  background-color: #fff;\n  box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12);\n}\n.card p {\n  padding: 0px 16px;\n  width: calc(100% - 32px);\n  overflow: hidden;\n  white-space: normal;\n  font-family: 'Roboto', sans-serif;\n  color: #505050;\n}\n.card .img {\n  border-radius: 2px 2px 0 0;\n  width: 100%;\n  height: 250px;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center;\n  margin-top: -1px;\n}\n@media only screen and (min-width: 1000px) {\n.card.d {\n    margin: 0;\n}\n}\n",""])},415:function(n,t,a){"use strict";var e=a(379);a.n(e).a},416:function(n,t,a){(n.exports=a(361)(!1)).push([n.i,".actions {\n  width: 100%;\n  padding: 8px;\n}\n.actions button {\n  background-color: transparent;\n  border: 0;\n  border-radius: 2px;\n  padding: 6px 8px;\n  color: #197bb3;\n  font-family: 'Roboto', sans-serif;\n  font-size: 16px;\n  outline: 0;\n  cursor: pointer;\n  font-weight: 500;\n  letter-spacing: 1.25px;\n  margin-left: 8px;\n}\n.actions button .material-icons {\n  font-size: 24px;\n}\n.actions button:hover {\n  background-color: #e5e5e5;\n}\n",""])},417:function(n,t,a){"use strict";var e=a(380);a.n(e).a},418:function(n,t,a){(n.exports=a(361)(!1)).push([n.i,".header {\n  width: calc(100% - 16px);\n  padding: 16px;\n}\n.header h1 {\n  margin: 0;\n  padding: 0;\n  font-family: 'Roboto', sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n}\n.header h2 {\n  margin: 0;\n  margin-top: 4px;\n  padding: 0;\n  font-size: 16px;\n  font-family: 'Roboto', sans-serif;\n  font-weight: 400;\n  color: #505050;\n}\n",""])}}]);