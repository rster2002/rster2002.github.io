(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5e5a3b62"],{"0d03":function(t,e,r){var n=r("6eeb"),a=Date.prototype,o="Invalid Date",i="toString",c=a[i],s=a.getTime;new Date(NaN)+""!=o&&n(a,i,(function(){var t=s.call(this);return t===t?c.call(this):o}))},"1dde":function(t,e,r){var n=r("d039"),a=r("b622"),o=r("60ae"),i=a("species");t.exports=function(t){return o>=51||!n((function(){var e=[],r=e.constructor={};return r[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"25f0":function(t,e,r){"use strict";var n=r("6eeb"),a=r("825a"),o=r("d039"),i=r("ad6d"),c="toString",s=RegExp.prototype,u=s[c],l=o((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),f=u.name!=c;(l||f)&&n(RegExp.prototype,c,(function(){var t=a(this),e=String(t.source),r=t.flags,n=String(void 0===r&&t instanceof RegExp&&!("flags"in s)?i.call(t):r);return"/"+e+"/"+n}),{unsafe:!0})},"31a4":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("page",{staticClass:"cardSearch"},[r("card",[r("h1",[t._v("Seach cards")]),r("textBox",{attrs:{label:"Search"},model:{value:t.query,callback:function(e){t.query=e},expression:"query"}}),r("button",{on:{click:function(e){return t.performSearch()}}},[t._v("Search")]),r("div",t._l(t.results,(function(t){return r("listItem",{key:t.id},[r("dropDown",{attrs:{label:t.name}},[r("cardDetails",{attrs:{card:t}})],1)],1)})),1)],1)],1)},a=[],o=(r("d3b7"),r("96cf"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"cardDetails"},[r("img",{attrs:{src:t.card.image_uris.png,alt:""}}),r("h2",[t._v(t._s(t.card.name))]),r("p",[r("b",[t._v("Text")]),t._v(" "),r("span",{domProps:{innerHTML:t._s(t.text)}})]),r("p",[r("b",[t._v("Price")]),t._v(" € "+t._s(t.card.prices.eur))]),r("p",[r("b",[t._v("Legal in")]),t._v(" "+t._s(t.legalList(t.card)))])])}),i=[];r("4160"),r("a15b"),r("4fad"),r("159b"),r("99af"),r("0d03"),r("25f0"),r("ac1f"),r("1276");function c(t){var e={name:"fdb",handler:sessionStorage,usePromises:!1,dbRefId:o(),events:{create:{}}};"string"===typeof t&&(e.name=t),"object"===typeof t&&Object.assign(e,t),"_fdb"in window===!1&&(window["_fdb"]={$setState(t){this.state=t,this.$broadcastState("set")},$updateState(t){this.state=Object.assign(this.state,t),this.$broadcastState("update")},$broadcastState(t){function e(t){var e=Object.values(window["_fdb"].listeners[t]);e.forEach(t=>t(window["_fdb"].state))}e("all"),e(t)},state:{},listeners:{all:{},set:{},update:{}}});var r={},n={_:e,query(t,e){var r=this.getAll([]);return"function"===typeof t?r.filter(t):"string"===typeof t?r.filter(r=>{return r[t]==e}):"object"===typeof t?r.filter(e=>{let r=!0,n=Object.entries(t);return n.forEach(t=>{r&&(r=e[t[0]]==t[1])}),r}):void 0},getAll(t={}){var e=s(),r=Object.keys(e);if(Array.isArray(t)){var a=[];return r.forEach(t=>{let e=n._.handler.getItem(n._.name+"_"+t);null!==e&&a.push(JSON.parse(e))}),[...t,...a]}if("object"===typeof t){var o={};return r.forEach(t=>{let e=n._.handler.getItem(n._.name+"_"+t);null!==e&&(o[t]=JSON.parse(e))}),{...t,...o}}throw new Error("Type: expected an array or object, but was "+typeof t)},on(t,e){t in r===!1&&(r[t]={});let n=o();return r[t][n]=e,function(){delete r[t][n]}},removeEvent(t,e){delete r[t][e]},events(){return r},setState(t){window._fdb.$setState(t)},updateState(t){window._fdb.$updateState(t)},onState(){1===arguments.length?this.$addStateHandler("all",arguments[0]):this.$addStateHandler(arguments[0],arguments[1])},onStateUpdate(t){this.$addStateHandler("update",t)},onStateSet(t){this.$addStateHandler("set",t)},$addStateHandler(t,r){return window._fdb.listeners[t][e.dbRefId]=r,r(window._fdb.state)}},a=n;function o(t=9){for(var e="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",r="",n=0;n<t;n++){var a=Math.floor(Math.random()*e.length);r+=e[a]}return r}function i(t,e){var r=n._.handler.getItem(t._.name+"__index");if(null===r){let r={};r[e]=!0,n._.handler.setItem(t._.name+"__index",JSON.stringify(r))}else{let r=JSON.parse(n._.handler.getItem(t._.name+"__index"));r[e]=!0,n._.handler.setItem(t._.name+"__index",JSON.stringify(r))}}function c(t){n._.handler.setItem(n._.name+"__index",JSON.stringify(t))}function s(){var t=n._.handler.getItem(n._.name+"__index");return null===t?{}:JSON.parse(t)}function u(t){var e=s();delete e[t],c(e)}return e.usePromises?new Proxy(n,{set:(t,e,r)=>{return null===r||void 0===r?(u(e),n._.handler.removeItem(n._.name+"_"+e)):(i(t,e),n._.handler.setItem(n._.name+"_"+e,JSON.stringify(r))),!0},get:async(t,e)=>{return e in a?t[e]:await JSON.parse(n._.handler.getItem(n._.name+"_"+e))}}):new Proxy(n,{set:(t,e,r)=>{return null===r||void 0===r?(u(e),n._.handler.removeItem(n._.name+"_"+e)):(i(t,e),n._.handler.setItem(n._.name+"_"+e,JSON.stringify(r))),!0},get:(t,e)=>{return e in a?t[e]:JSON.parse(n._.handler.getItem(n._.name+"_"+e))}})}var s=c;s({name:"magicmanager",handler:localStorage});function u(t,e,r){return t.split(e).join(r)}for(var l=[],f=0;f<=20;f++)l.push(f.toString());var h=[].concat(l,["r","g","b","w","u",["t","tap"]]),d=function(t){return h.forEach((function(e){t=Array.isArray(e)?u(t,"{".concat(e[0].toUpperCase(),"}"),'<span class="ms ms-'.concat(e[1],'"></span>')):u(t,"{".concat(e.toUpperCase(),"}"),'<span class="ms ms-'.concat(e,'"></span>'))})),t},p={props:["card"],computed:{text:function(){return d(this.card.oracle_text)}},methods:{legalList:function(t){var e=Object.entries(t.legalities),r=[];return e.forEach((function(t){"legal"===t[1]&&r.push(t[0])})),r.join(", ")}}},v=p,y=(r("594b"),r("2877")),g=Object(y["a"])(v,o,i,!1,null,"98855038",null),m=g.exports,_=r("d8ba"),w={components:{page:_["j"],card:_["b"],textBox:_["k"],listItem:_["e"],dropDown:_["d"],cardDetails:m},data:function(){return{query:"",results:[]}},methods:{performSearch:function(){var t;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(fetch("https://api.scryfall.com/cards/search?q="+this.query).then((function(t){return t.json()})));case 2:t=e.sent,this.results=t.data;case 4:case"end":return e.stop()}}),null,this)}}},b=w,x=(r("39c3"),Object(y["a"])(b,n,a,!1,null,"0557a354",null));e["default"]=x.exports},"39c3":function(t,e,r){"use strict";var n=r("7772"),a=r.n(n);a.a},"4fad":function(t,e,r){var n=r("23e7"),a=r("6f53").entries;n({target:"Object",stat:!0},{entries:function(t){return a(t)}})},"594b":function(t,e,r){"use strict";var n=r("f5f7"),a=r.n(n);a.a},"6f53":function(t,e,r){var n=r("83ab"),a=r("df75"),o=r("fc6a"),i=r("d1e7").f,c=function(t){return function(e){var r,c=o(e),s=a(c),u=s.length,l=0,f=[];while(u>l)r=s[l++],n&&!i.call(c,r)||f.push(t?[r,c[r]]:c[r]);return f}};t.exports={entries:c(!0),values:c(!1)}},7772:function(t,e,r){},8418:function(t,e,r){"use strict";var n=r("c04e"),a=r("9bf2"),o=r("5c6c");t.exports=function(t,e,r){var i=n(e);i in t?a.f(t,i,o(0,r)):t[i]=r}},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function s(t,e,r,n){var a=e&&e.prototype instanceof v?e:v,o=Object.create(a.prototype),i=new I(n||[]);return o._invoke=E(t,r,i),o}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}t.wrap=s;var l="suspendedStart",f="suspendedYield",h="executing",d="completed",p={};function v(){}function y(){}function g(){}var m={};m[o]=function(){return this};var _=Object.getPrototypeOf,w=_&&_(_(N([])));w&&w!==r&&n.call(w,o)&&(m=w);var b=g.prototype=v.prototype=Object.create(m);function x(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function S(t){function e(r,a,o,i){var c=u(t[r],t,a);if("throw"!==c.type){var s=c.arg,l=s.value;return l&&"object"===typeof l&&n.call(l,"__await")?Promise.resolve(l.__await).then((function(t){e("next",t,o,i)}),(function(t){e("throw",t,o,i)})):Promise.resolve(l).then((function(t){s.value=t,o(s)}),(function(t){return e("throw",t,o,i)}))}i(c.arg)}var r;function a(t,n){function a(){return new Promise((function(r,a){e(t,n,r,a)}))}return r=r?r.then(a,a):a()}this._invoke=a}function E(t,e,r){var n=l;return function(a,o){if(n===h)throw new Error("Generator is already running");if(n===d){if("throw"===a)throw o;return k()}r.method=a,r.arg=o;while(1){var i=r.delegate;if(i){var c=L(i,r);if(c){if(c===p)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===l)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var s=u(t,e,r);if("normal"===s.type){if(n=r.done?d:f,s.arg===p)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=d,r.method="throw",r.arg=s.arg)}}}function L(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,L(t,r),"throw"===r.method))return p;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var a=u(n,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,p;var o=a.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,p):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,p)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function N(t){if(t){var r=t[o];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var a=-1,i=function r(){while(++a<t.length)if(n.call(t,a))return r.value=t[a],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:k}}function k(){return{value:e,done:!0}}return y.prototype=b.constructor=g,g.constructor=y,g[c]=y.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(b),t},t.awrap=function(t){return{__await:t}},x(S.prototype),S.prototype[i]=function(){return this},t.AsyncIterator=S,t.async=function(e,r,n,a){var o=new S(s(e,r,n,a));return t.isGeneratorFunction(r)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},x(b),b[c]="Generator",b[o]=function(){return this},b.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=N,I.prototype={constructor:I,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function a(n,a){return c.type="throw",c.arg=t,r.next=n,a&&(r.method="next",r.arg=e),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var s=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(s&&u){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,p):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),j(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;j(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:N(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),p}},t}(t.exports);try{regeneratorRuntime=n}catch(a){Function("r","regeneratorRuntime = r")(n)}},"99af":function(t,e,r){"use strict";var n=r("23e7"),a=r("d039"),o=r("e8b5"),i=r("861d"),c=r("7b0b"),s=r("50c4"),u=r("8418"),l=r("65f0"),f=r("1dde"),h=r("b622"),d=r("60ae"),p=h("isConcatSpreadable"),v=9007199254740991,y="Maximum allowed index exceeded",g=d>=51||!a((function(){var t=[];return t[p]=!1,t.concat()[0]!==t})),m=f("concat"),_=function(t){if(!i(t))return!1;var e=t[p];return void 0!==e?!!e:o(t)},w=!g||!m;n({target:"Array",proto:!0,forced:w},{concat:function(t){var e,r,n,a,o,i=c(this),f=l(i,0),h=0;for(e=-1,n=arguments.length;e<n;e++)if(o=-1===e?i:arguments[e],_(o)){if(a=s(o.length),h+a>v)throw TypeError(y);for(r=0;r<a;r++,h++)r in o&&u(f,h,o[r])}else{if(h>=v)throw TypeError(y);u(f,h++,o)}return f.length=h,f}})},a15b:function(t,e,r){"use strict";var n=r("23e7"),a=r("44ad"),o=r("fc6a"),i=r("b301"),c=[].join,s=a!=Object,u=i("join",",");n({target:"Array",proto:!0,forced:s||u},{join:function(t){return c.call(o(this),void 0===t?",":t)}})},f5f7:function(t,e,r){}}]);
//# sourceMappingURL=chunk-5e5a3b62.4e3bc6dc.js.map