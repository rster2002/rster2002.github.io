(function(t){function e(e){for(var i,a,s=e[0],c=e[1],u=e[2],d=0,h=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&h.push(o[a][0]),o[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);l&&l(e);while(h.length)h.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],i=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(i=!1)}i&&(r.splice(e--,1),t=a(a.s=n[0]))}return t}var i={},o={app:0},r=[];function a(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=i,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/hue-remote/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0251":function(t,e,n){},"0453":function(t,e,n){},"09d5":function(t,e,n){},"0cac":function(t,e,n){},"1d2d":function(t,e,n){"use strict";var i=n("8853"),o=n.n(i);o.a},"1e34":function(t,e,n){},"214e":function(t,e,n){"use strict";var i=n("0cac"),o=n.n(i);o.a},2578:function(t,e,n){},"28da":function(t,e,n){},"2b13":function(t,e,n){"use strict";var i=n("4c03"),o=n.n(i);o.a},"2df1":function(t,e,n){},3150:function(t,e,n){"use strict";var i=n("28da"),o=n.n(i);o.a},"3a4b":function(t,e,n){"use strict";var i=n("fb08"),o=n.n(i);o.a},"3b4c":function(t,e,n){"use strict";var i=n("2df1"),o=n.n(i);o.a},"3d2c":function(t,e,n){"use strict";var i=n("de11"),o=n.n(i);o.a},"3fd6":function(t,e,n){"use strict";var i=n("bc79"),o=n.n(i);o.a},4034:function(t,e,n){"use strict";var i=n("afb4"),o=n.n(i);o.a},"45b6":function(t,e,n){"use strict";var i=n("b5b5"),o=n.n(i);o.a},"4c03":function(t,e,n){},"4d12":function(t,e,n){},"54f1":function(t,e,n){"use strict";var i=n("d2ef"),o=n.n(i);o.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mainContainer"},[n("router-view")],1)},r=[],a=(n("5c0b"),n("2877")),s={},c=Object(a["a"])(s,o,r,!1,null,null,null),u=c.exports,l=n("8c4f"),d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("app",[n("topBar",[n("topBarButton",{on:{click:function(e){return t.goQuiet()}}},[t._v(" power-sleep ")]),n("topBarTitle",[t._v(" hue-remote ")])],1),n("mainView",[t.bridge.connected?n("div",[n("card",[n("h1",[t._v("Quick buttons")]),n("div",{staticClass:"quietButtonsSetup"},[t._l(t.buttons,(function(e,i){return n("button",{key:e.id,on:{click:function(n){return t.editButton(i,e)}}},[n("div",{staticClass:"verticalWrapper"},[n("icon",{attrs:{icon:e.icon}}),n("p",[t._v(t._s(e.name))])],1)])})),n("button",{on:{click:function(e){return t.newButton()}}},[n("div",{staticClass:"verticalWrapper"},[n("icon",[t._v(" plus ")]),n("p",[t._v("Add new")])],1)])],2)]),n("card",[n("h1",[t._v("Debug")]),n("p",[n("b",[t._v("HUE Bridge")]),t._v(" "+t._s(t.bridge.ip))]),n("p",[n("b",[t._v("Token")]),t._v(" "+t._s(t.bridge.token))]),n("p",[n("b",[t._v("clientId")]),t._v(" "+t._s(t.bridge.clientId))])]),n("card",[n("h1",[t._v("Users")]),t._l(t.users,(function(e){return n("listItem",{key:e.id},[n("p",[t._v(t._s(e.name))]),n("button",{on:{click:function(n){return t.deleteUser(e)}}},[t._v(" delete ")])])}))],2)],1):t._e(),t.bridge.connected?t._e():n("card",[n("h1",[t._v("Debug info")]),n("p",[n("b",[t._v("HUE Bridge")]),t._v(" "+t._s(t.bridge.ip))]),t.show.awaitingBridge?n("div",[n("p",[n("b",[t._v("Awaiting bridge")])]),n("p",[t._v("Press the button on your philips hue bridge and then tap on 'connect'")]),n("button",{on:{click:function(e){return t.tokenRequest()}}},[t._v("Connect")]),""!==t.bridge.output?n("p",[n("b",[t._v("Output")]),t._v(" "+t._s(t.bridge.output))]):t._e()]):t._e()])],1),t.show.quietButtons?n("quietButtons",{on:{exit:function(e){t.show.quietButtons=!1}}}):t._e(),t.show.editButton?n("div",{staticClass:"configButton"},[n("button",{on:{click:function(e){t.show.editButton=!1}}},[t._v("back")]),n("textBox",{attrs:{label:"Button Name"},model:{value:t.editingButton.name,callback:function(e){t.$set(t.editingButton,"name",e)},expression:"editingButton.name"}}),n("textBox",{attrs:{label:"Icon"},model:{value:t.editingButton.icon,callback:function(e){t.$set(t.editingButton,"icon",e)},expression:"editingButton.icon"}}),n("actionEditor",{model:{value:t.editingButton.action,callback:function(e){t.$set(t.editingButton,"action",e)},expression:"editingButton.action"}}),n("button",{on:{click:function(e){return t.saveEdits()}}},[t._v("Save")]),n("button",{on:{click:function(e){return t.deleteButton()}}},[t._v("Delete")])],1):t._e()],1)},h=[],f=(n("a4d3"),n("4de4"),n("4160"),n("c975"),n("d81d"),n("a434"),n("0d03"),n("b0c0"),n("4fad"),n("e439"),n("dbb4"),n("b64b"),n("d3b7"),n("159b"),n("2fa7")),p=n("8ffc"),v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{attrs:{id:"mdlApp"}},[t._t("default")],2)},b=[],m=(n("7ca1"),{}),g=Object(a["a"])(m,v,b,!1,null,null,null),w=g.exports,_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"mdl topBar"},[t._t("default")],2)},y=[],x={},O=x,B=(n("3fd6"),n("3b4c"),Object(a["a"])(O,_,y,!1,null,"563e821d",null)),k=B.exports,j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{staticClass:"mdl topBarButton",on:{click:function(e){return t.handleClickEvent()}}},[n("icon",[t._t("default")],2)],1)},C=[],E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{class:t.computedClasses})},$=[],S=(n("498a"),{props:["icon"],data:function(){return{internalIcon:""}},watch:{icon:function(){void 0!==this.icon&&(this.internalIcon=this.icon)}},computed:{computedClasses:function(){return["mdl","icon","mdi","mdi-"+this.internalIcon]}},created:function(){if("default"in this.$slots){var t=this.$slots.default[0].text;this.internalIcon=t.trim()}else{if(void 0===this.icon)throw new Error("(mdl icon) There was no icon specified");this.internalIcon=this.icon}}}),P=S,D=Object(a["a"])(P,E,$,!1,null,null,null),I=D.exports,T={props:["action"],components:{icon:I},methods:{handleClickEvent:function(){this.$emit("click"),void 0!==this.action&&Object(p["a"])(this.action).set({trigger:Math.random(),origin:this})}}},N=T,A=(n("4034"),n("214e"),Object(a["a"])(N,j,C,!1,null,"fdc5a652",null)),q=A.exports,U=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mdl topBarTitle",style:{width:t.computedWidth}},[n("h1",{staticClass:"overwritableByButton"},[t._t("default")],2)])},M=[],W={data:function(){return{computedWidth:""}},watch:{$slots:function(){this.computeWidth()}},methods:{computeWidth:function(){var t=64*document.querySelectorAll(".topBar .topBarButton").length;this.computedWidth="calc(100% - ".concat(t,"px)")}},created:function(){var t=this;this.$nextTick((function(){t.computeWidth()}))}},L=W,R=(n("c93d"),Object(a["a"])(L,U,M,!1,null,"86add0b4",null)),H=R.exports,F=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"navDrawerScrim"}},[t.internalShow?n("div",{staticClass:"mdi navDrawerScrim",on:{click:function(e){return t.closeDrawer()}}},[n("transition",{attrs:{name:"navDrawerTransition",appear:""}},[t.internalShow?n("nav",{staticClass:"mdi navDrawer"},[t._t("default")],2):t._e()])],1):t._e()])},Q=[],J={props:["show","name"],data:function(){return{internalShow:!1}},watch:{show:function(){void 0!==this.show&&(this.internalShow=this.show)}},methods:{closeDrawer:function(){this.internalShow=!1}},created:function(){var t=this;void 0!==this.name&&(Object(p["a"])("toggle:"+this.name).receive((function(e){t.internalShow=!t.internalShow})),Object(p["a"])("open:"+this.name).receive((function(e){t.internalShow=!0})))}},V=J,G=(n("45b6"),Object(a["a"])(V,F,Q,!1,null,"374f73cb",null)),z=(G.exports,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mdl navDrawerUser"},[n("div",{staticClass:"mdl navDrawerUserIconRow"},[n("img",{attrs:{src:t.icon}})]),n("div",{staticClass:"mdl navDrawerUserNameRow"},[n("h1",[t._v(t._s(t.username))]),void 0!==t.secondary?n("h2",[t._v(t._s(t.secondary))]):t._e()])])}),K=[],X={props:["icon","username","secondary"]},Y=X,Z=(n("5e27"),Object(a["a"])(Y,z,K,!1,null,"5db600bd",null)),tt=(Z.exports,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{class:t.classes,on:{click:function(e){return t.navToRoute()}}},[n("div",{staticClass:"mdl navDrawerButtonIconWrapper"},[n("icon",[t._v(" "+t._s(t.icon)+" ")])],1),n("div",{staticClass:"mdl navDrawerButtonTextWrapper"},[n("p",[t._t("default")],2)])])}),et=[],nt={props:["icon","navTo"],data:function(){return{classes:["mdl","navDrawerButton"]}},components:{icon:I},watch:{$route:function(){this.$route.path===this.navTo?this.classes=["mdl","navDrawerButton","indicator"]:this.classes=["mdl","navDrawerButton"]}},methods:{navToRoute:function(){this.$emit("click"),this.$router.push(this.navTo)}}},it=nt,ot=(n("1d2d"),n("3150"),Object(a["a"])(it,tt,et,!1,null,"671c3d09",null)),rt=(ot.exports,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"divider"})}),at=[],st=(n("54f1"),{}),ct=Object(a["a"])(st,rt,at,!1,null,"accbfaee",null),ut=(ct.exports,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{staticClass:"mdl mainView"},[t._t("default")],2)}),lt=[],dt={},ht=dt,ft=(n("3a4b"),Object(a["a"])(ht,ut,lt,!1,null,null,null)),pt=ft.exports,vt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"mdl cardContainer"},[t._t("default")],2)},bt=[],mt={},gt=mt,wt=(n("599f"),n("3d2c"),Object(a["a"])(gt,vt,bt,!1,null,"8d85a78e",null)),_t=wt.exports,yt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mdl listItem"},[t._t("default")],2)},xt=[],Ot=(n("caad"),n("ac1f"),n("2532"),n("1276"),{created:function(){var t=this;this.$nextTick((function(){t.$el.children.forEach((function(t){if("BUTTON"===t.nodeName){var e=t.className.split(" ");e.includes("mdl")||e.includes("listItemButton")||(""!==t.className?t.className+=" mdl listItemButton":t.className="mdl listItemButton",t.innerHTML='<span class="mdl icon mdi mdi-'.concat(t.innerHTML.trim(),'"></span>'))}else if("P"===t.nodeName){var n=document.createElement("div");n.className="mdl textWrapper",t.parentNode.insertBefore(n,t),n.appendChild(t)}}))}))}}),Bt=Ot,kt=(n("c0fd"),n("78a8"),Object(a["a"])(Bt,yt,xt,!1,null,"11e3edc8",null)),jt=kt.exports,Ct=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"textBox",class:{err:t.v.length>t.ml}},[n("div",{staticClass:"textBoxInner",class:{f:t.focus,textarea:"textarea"===t.type,mb:""!==t.ht},on:{click:function(e){return t.f()}}},[n("p",{staticClass:"label",class:{c:t.focus}},[n("span",[t._v(t._s(t.label))])]),"textarea"!==t.t&&"select"!==t.t?n("input",{ref:"n",attrs:{type:t.t},domProps:{value:t.value},on:{focus:function(e){return t.f()},blur:function(e){return t.b()},input:function(e){return t.i()}}}):t._e(),"textarea"===t.t?n("textarea",{ref:"n",domProps:{value:t.value},on:{focus:function(e){return t.f()},blur:function(e){return t.b()},input:function(e){return t.i()}}}):t._e(),"select"===t.t?n("select",{ref:"n",domProps:{value:t.value},on:{input:function(e){return t.i()},focus:function(e){return t.f()},blur:function(e){return t.b()}}},[t._t("default")],2):t._e()]),t.ht.length>0?n("p",{staticClass:"helpertext"},[t._v(t._s(t.ht))]):t._e()])},Et=[],$t=(n("a9e3"),{props:["label","val","vname","type","maxlength","helpertext","value"],data:function(){return{v:"",n:"",focus:!1,t:"text",ht:"",ml:1e7,validateFn:function(){}}},watch:{val:function(){this.v!==this.val&&(this.v=this.val)},value:function(){this.$emit("change")},type:function(){this.t=this.type}},methods:{i:function(){this.v=this.$refs.n.value,"number"===this.type&&(this.v=Number(this.v)),this.$emit("input",this.v)},f:function(){this.focus=!0,this.$refs.n.focus()},b:function(){""===this.v&&(this.focus=!1)}},created:function(){void 0!==this.value&&(this.v=this.value,""!==this.v&&(this.focus=!0)),void 0===this.vname?this.n=this.label:this.n=this.vname,void 0!==this.type&&(this.t=this.type),void 0!==this.helpertext&&(this.ht=this.helpertext),void 0!==this.maxlength&&(this.ml=Number(this.maxlength))}}),St=$t,Pt=(n("73d0"),Object(a["a"])(St,Ct,Et,!1,null,"59b4f990",null)),Dt=Pt.exports,It=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"mdl dropDown"},[n("div",{staticClass:"mdl dropDownHead"},[n("p",{on:{click:function(e){return t.toggleOpen()}}},[n("icon",{class:{active:t.internalOpen}},[t._v(" menu-up ")]),t._v(" "+t._s(t.label)+" ")],1)]),n("transition",{attrs:{name:"dropDownContent"}},[t.internalOpen?n("div",{staticClass:"mdl dropDownContent"},[t._t("default")],2):t._e()])],1)},Tt=[],Nt={props:["value","label"],components:{icon:I},data:function(){return{internalOpen:!1}},watch:{value:function(){this.internalOpen=this.value}},methods:{toggleOpen:function(){this.internalOpen=!this.internalOpen,this.$emit("input",this.internalOpen)}},created:function(){void 0!==this.value&&(this.internalOpen=this.value)}},At=Nt,qt=(n("d9a1"),Object(a["a"])(At,It,Tt,!1,null,"49629dd2",null)),Ut=qt.exports,Mt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"quietButtons"},[t._l(t.buttons,(function(e){return n("button",{key:e.id,style:{height:t.rowPercentage()},on:{click:function(n){return t.buttonPress(e)}}},[n("div",{staticClass:"verticalWrapper"},[n("icon",[t._v(t._s(e.icon))]),n("p",[t._v(t._s(e.name))])],1)])})),n("button",{style:{height:t.rowPercentage()},attrs:{id:"quietExitButton"},on:{click:function(e){return t.exitQuietButtons()}}},[n("div",{staticClass:"verticalWrapper"},[n("icon",[t._v("fullscreen-exit")]),n("p",[t._v("Exit")])],1)])],2)},Wt=[],Lt=n("56cb");function Rt(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32;function e(t,e){for(var n="",i=0;i<e;i++){var o=Math.floor(Math.random()*t.length);n+=t[o]}return n}return e("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",t)}var Ht=Object(Lt["a"])({name:"hue-buttons",handler:localStorage}),Ft=(n("5319"),n("99af"),n("7db0"),n("b680"),n("07ac"),n("9f12")),Qt=n("53fe"),Jt=n("bb15"),Vt=function(){function t(e,n){Object(Ft["a"])(this,t),this.host=e,this.username=n,console.log(this),this.baseUrl="http://".concat(e,"/api/").concat(n)}return Object(Qt["a"])(t,[{key:"light",value:function(t){return console.log(this.host,this.username),new zt(this.host,this.username,t)}},{key:"group",value:function(t){return new Gt(this.host,this.username,t)}}]),t}(),Gt=function(){function t(e,n,i){var o=this;return Object(Ft["a"])(this,t),new Promise((function(t,r){o.host=e,o.username=n,o.baseUrl="http://".concat(e,"/api/").concat(n),fetch(o.baseUrl+"/groups").then((function(t){return t.json()})).then((function(r){r=Object.values(r);var a=r.find((function(t){return t.name===i}));void 0!==a&&(o.group=a);var s=[];o.group.lights.forEach((function(t){s.push(new zt(e,n,t))})),o.lights=s,t(o)}))}))}return Object(Qt["a"])(t,[{key:"setState",value:function(t){this.lights.forEach((function(e){e.setState(t)}))}},{key:"randomLight",value:function(){var t=Math.floor(Math.random()*this.lights.length);return this.lights[t]}}]),t}(),zt=function(){function t(e,n,i){Object(Ft["a"])(this,t),this.host=e,this.username=n,this.lightId=i,this.baseUrl="http://".concat(e,"/api/").concat(n,"/"),this.lightUrl=this.baseUrl+"lights/".concat(i,"/")}return Object(Qt["a"])(t,[{key:"setState",value:function(t){var e=this;return new Promise((function(n,i){function o(t,e,n){t=t>.04045?Math.pow((t+.055)/1.055,2.4):t/12.92,e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92,n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92;var i=.664511*t+.154324*e+.162028*n,o=.283881*t+.668433*e+.047685*n,r=88e-6*t+.07231*e+.986039*n,a=(i/(i+o+r)).toFixed(4),s=(o/(i+o+r)).toFixed(4);return isNaN(a)&&(a=0),isNaN(s)&&(s=0),[Number(a),Number(s)]}if(void 0!==t.hex){var r=Jt.hex.rgb(t.hex);delete t.hex,t.xy=o(r[0],r[1],r[2])}if(void 0!==t.rgb){r=t.rgb;delete t.rgb,t.xy=o(r[0],r[1],r[2])}void 0!==t.transition&&(t.transitiontime=t.transition/100,delete t.transition),"false"===t.on&&(t.on=!1),"true"===t.on&&(t.on=!0),console.log(t),fetch(e.lightUrl+"state",{method:"PUT",body:JSON.stringify(t)}).then((function(t){return n(t)}))}))}}]),t}(),Kt=Vt,Xt=function(t){var e=Ht.bridge.token,n=Ht.bridge.ip;n=n.replace("http://","");var i=new Kt(n,e);t.forEach((function(t){var e={};if(t.attributes.forEach((function(t){switch(t.attribute){case"powerState":e.on="on"===t.value;break;case"color":e.hex=t.value;break;case"brightness":e.bri=t.value;break;case"transition":e.transition=t.value;break}})),"light"===t.type){var n=i.light(t.hardwareId);n.setState(e)}}))},Yt=new Audio("./sound/state-change-down.wav"),Zt={components:{icon:I},data:function(){return{rowsTotal:0,buttons:[]}},methods:{rowPercentage:function(){var t=Math.ceil((this.buttons.length+1)/2);return console.log(t),100/t+"%"},exitQuietButtons:function(){Yt.play(),this.$emit("exit")},buttonPress:function(t){Xt(t.action),document.querySelector(".quietButtons").classList.add("peek"),setTimeout((function(){document.querySelector(".quietButtons").classList.remove("peek")}),2e3)}},created:function(){var t=Ht.buttons;null!==t&&(this.buttons=t)}},te=Zt,ee=(n("2b13"),Object(a["a"])(te,Mt,Wt,!1,null,"7c157f7f",null)),ne=ee.exports,ie=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"actionEditor"},[t._l(t.actions,(function(e,i){return n("div",{key:e.id,staticClass:"action"},[n("dropDown",{attrs:{label:"Action"+(i+1)}},[n("textBox",{attrs:{type:"select",label:"Type"},model:{value:e.type,callback:function(n){t.$set(e,"type",n)},expression:"action.type"}},[n("option",{attrs:{value:"light"}},[t._v("Light")]),n("option",{attrs:{value:"group"}},[t._v("Group")])]),"light"===e.type?n("textBox",{attrs:{type:"select",label:"Light"},model:{value:e.hardwareId,callback:function(n){t.$set(e,"hardwareId",n)},expression:"action.hardwareId"}},t._l(t.lights,(function(e){return n("option",{key:"l"+e.hardwareId,domProps:{value:e.hardwareId}},[t._v(t._s(e.name))])})),0):t._e(),t._l(e.attributes,(function(e){return n("div",{key:e.id,staticClass:"attibute"},[n("textBox",{staticClass:"attributeSelect",attrs:{label:"Attribute",type:"select"},model:{value:e.attribute,callback:function(n){t.$set(e,"attribute",n)},expression:"attribute.attribute"}},[n("option",{attrs:{value:"powerState"}},[t._v("Power")]),n("option",{attrs:{value:"color"}},[t._v("Color")]),n("option",{attrs:{value:"brightness"}},[t._v("Brightness")]),n("option",{attrs:{value:"transitionTime"}},[t._v("Transition")])]),"powerState"===e.attribute?n("textBox",{staticClass:"valueSelect",attrs:{label:"Power State",type:"select"},model:{value:e.value,callback:function(n){t.$set(e,"value",n)},expression:"attribute.value"}},[n("option",{attrs:{value:"on"}},[t._v("On")]),n("option",{attrs:{value:"off"}},[t._v("Off")])]):t._e(),"color"===e.attribute?n("textBox",{staticClass:"valueSelect",attrs:{label:"Color",type:"text"},model:{value:e.value,callback:function(n){t.$set(e,"value",n)},expression:"attribute.value"}}):t._e(),"brightness"===e.attribute?n("textBox",{staticClass:"valueSelect",attrs:{type:"number",label:"Brightness"},model:{value:e.value,callback:function(n){t.$set(e,"value",n)},expression:"attribute.value"}}):t._e()],1)})),n("button",{on:{click:function(n){return t.addAttribute(e)}}},[t._v("Add attribute")]),n("button",{on:{click:function(n){return t.removeAction(e)}}},[t._v("Remove action")])],2)],1)})),n("button",{staticClass:"addAction",on:{click:function(e){return t.addAction()}}},[t._v("Add action")])],2)},oe=[];function re(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function ae(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?re(n,!0).forEach((function(e){Object(f["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):re(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var se={props:["value"],components:{textBox:Dt,dropDown:Ut},data:function(){return{actions:[],lights:[]}},watch:{value:function(){this.actions=this.value},actions:function(){this.$emit("input",this.actions)}},methods:{addAction:function(){this.actions.push({id:Rt(),type:"light",hardwareId:"0",attributes:[],open:!1})},removeAction:function(t){var e=this.actions.indexOf(t);this.actions.splice(e,1)},addAttribute:function(t){t.attributes.push({attribute:"powerState",value:"on",id:Rt()})}},created:function(){this.actions=this.value.map((function(t){return ae({},t,{open:!1})})),this.lights=Ht.lights}},ce=se,ue=(n("9b30"),Object(a["a"])(ce,ie,oe,!1,null,"d90b2fb2",null)),le=ue.exports;function de(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function he(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?de(n,!0).forEach((function(e){Object(f["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):de(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var fe=new Audio("./sound/state-change-up.wav"),pe={components:{app:w,topBar:k,topBarTitle:H,topBarButton:q,mainView:pt,card:_t,quietButtons:ne,icon:I,textBox:Dt,listItem:jt,actionEditor:le},data:function(){return{show:{quietButtons:!1,awaitingBridge:!1,editButton:!1},bridge:{ip:"",endpoint:"",token:"",clientId:"",connected:!1,output:""},editingButton:{name:"",icon:"",action:[]},users:[],buttons:[]}},computed:{connected:function(){return this.bridge.connected}},watch:{connected:function(){var t=this;this.bridge.connected&&(fetch(this.bridge.endpoint+"/config").then((function(t){return t.json()})).then((function(e){var n=Object.entries(e.whitelist);t.users=n.map((function(t){return he({},t[1],{id:t[0]})})),Ht.users=t.users})),fetch(this.bridge.endpoint+"/lights").then((function(t){return t.json()})).then((function(t){var e=Object.entries(t);Ht.lights=e.map((function(t){return he({},t[1],{hardwareId:t[0]})}))})))}},methods:{goQuiet:function(){fe.play(),this.show.quietButtons=!0},newButton:function(){this.buttons.push({icon:"lightbulb",name:"New button",id:Rt(),action:[]}),Ht.buttons=Object.assign([],this.buttons)},tokenRequest:function(){var t=this,e=Rt(9);fetch(this.bridge.ip+"/api",{method:"POST",body:JSON.stringify({devicetype:"quiet-hue#"+e})}).then((function(t){return t.json()})).then((function(n){var i=n[0];console.log(i),"error"in i?t.bridge.output="Unable to authenticate, did you press the button on the HUE bridge before you tapped 'connect'?":"success"in i&&(Ht.bridge={ip:t.bridge.ip,token:i.success.username,connected:Date.now(),clientId:e},t.bridge.token=i.username,t.bridge.clientId=e,t.bridge.connected=!0,t.show.awaitingBridge=!1)}))},deleteUser:function(t){var e=this;confirm("Are you sure you want to delete this user? An application may not have access to your hue hub without having to reconnect to it.")&&fetch(this.bridge.endpoint+"/config/whitelist/"+t.id,{method:"DELETE"}).then((function(t){return t.json()})).then((function(n){var i=e.users.indexOf(t);e.users.splice(i,1)}))},editButton:function(t,e){this.show.editButton=!0,this.editingButton.name=e.name,this.editingButton.icon=e.icon,this.editingButton.action=e.action,this.editingButton.index=t},saveEdits:function(){var t=this.editingButton.index,e=this.editingButton;console.log(t,e,this.buttons[t]),this.buttons[t].name=e.name,this.buttons[t].icon=e.icon,this.buttons[t].action=e.action,Ht.buttons=this.buttons,this.show.editButton=!1},deleteButton:function(){var t=this.editingButton.index;this.buttons.splice(t,1),Ht.buttons=this.buttons,this.show.editButton=!1}},created:function(){var t=this;Object(p["a"])("quietButtons").set({rows:3}),null===Ht.bridge?fetch("https://discovery.meethue.com/").then((function(t){return t.json()})).then((function(e){e.length>0&&(t.bridge.ip="http://"+e[0].internalipaddress,t.show.awaitingBridge=!0)})):(this.bridge.connected=!0,this.bridge.ip=Ht.bridge.ip,this.bridge.token=Ht.bridge.token,this.bridge.clientId=Ht.bridge.clientId,this.bridge.endpoint=this.bridge.ip+"/api/"+this.bridge.token),null!==Ht.buttons&&(this.buttons=Ht.buttons)}},ve=pe,be=(n("b46e"),Object(a["a"])(ve,d,h,!1,null,"ace430a8",null)),me=be.exports;i["a"].use(l["a"]);var ge=[{path:"/",name:"Main",component:me}],we=new l["a"]({routes:ge}),_e=we,ye=n("9483");Object(ye["a"])("".concat("/hue-remote/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}}),i["a"].config.productionTip=!1,new i["a"]({router:_e,render:function(t){return t(u)}}).$mount("#app")},"599f":function(t,e,n){"use strict";var i=n("0453"),o=n.n(i);o.a},"5c0b":function(t,e,n){"use strict";var i=n("9c0c"),o=n.n(i);o.a},"5e27":function(t,e,n){"use strict";var i=n("e8d6"),o=n.n(i);o.a},7081:function(t,e,n){},"73d0":function(t,e,n){"use strict";var i=n("1e34"),o=n.n(i);o.a},"78a8":function(t,e,n){"use strict";var i=n("9481"),o=n.n(i);o.a},"7ca1":function(t,e,n){"use strict";var i=n("a661"),o=n.n(i);o.a},8853:function(t,e,n){},9481:function(t,e,n){},"9b30":function(t,e,n){"use strict";var i=n("4d12"),o=n.n(i);o.a},"9c0c":function(t,e,n){},a661:function(t,e,n){},afb4:function(t,e,n){},b46e:function(t,e,n){"use strict";var i=n("0251"),o=n.n(i);o.a},b5b5:function(t,e,n){},bc79:function(t,e,n){},c0fd:function(t,e,n){"use strict";var i=n("7081"),o=n.n(i);o.a},c93d:function(t,e,n){"use strict";var i=n("09d5"),o=n.n(i);o.a},d2ef:function(t,e,n){},d9a1:function(t,e,n){"use strict";var i=n("2578"),o=n.n(i);o.a},de11:function(t,e,n){},e8d6:function(t,e,n){},fb08:function(t,e,n){}});
//# sourceMappingURL=app.f36c9643.js.map