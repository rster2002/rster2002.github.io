(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{362:function(n,t,e){"use strict";n.exports=function(e){var a=[];return a.toString=function(){return this.map(function(n){var t=function(n,t){var e=n[1]||"",r=n[3];if(!r)return e;if(t&&"function"==typeof btoa){var o=function(n){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */"}(r),i=r.sources.map(function(n){return"/*# sourceURL="+r.sourceRoot+n+" */"});return[e].concat(i).concat([o]).join("\n")}return[e].join("\n")}(n,e);return n[2]?"@media "+n[2]+"{"+t+"}":t}).join("")},a.i=function(n,t){"string"==typeof n&&(n=[[null,n,""]]);for(var e={},r=0;r<this.length;r++){var o=this[r][0];null!=o&&(e[o]=!0)}for(r=0;r<n.length;r++){var i=n[r];null!=i[0]&&e[i[0]]||(t&&!i[2]?i[2]=t:t&&(i[2]="("+i[2]+") and ("+t+")"),a.push(i))}},a}},363:function(n,t,e){"use strict";function u(n,t){for(var e=[],r={},o=0;o<t.length;o++){var i=t[o],a=i[0],s={id:n+":"+o,css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):e.push(r[a]={id:a,parts:[s]})}return e}e.r(t),e.d(t,"default",function(){return h});var r="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!r)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c={},o=r&&(document.head||document.getElementsByTagName("head")[0]),i=null,a=0,d=!1,s=function(){},l=null,f="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(a,n,t,e){d=t,l=e||{};var s=u(a,n);return v(s),function(n){for(var t=[],e=0;e<s.length;e++){var r=s[e];(o=c[r.id]).refs--,t.push(o)}n?v(s=u(a,n)):s=[];for(e=0;e<t.length;e++){var o;if(0===(o=t[e]).refs){for(var i=0;i<o.parts.length;i++)o.parts[i]();delete c[o.id]}}}}function v(n){for(var t=0;t<n.length;t++){var e=n[t],r=c[e.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](e.parts[o]);for(;o<e.parts.length;o++)r.parts.push(m(e.parts[o]));r.parts.length>e.parts.length&&(r.parts.length=e.parts.length)}else{var i=[];for(o=0;o<e.parts.length;o++)i.push(m(e.parts[o]));c[e.id]={id:e.id,refs:1,parts:i}}}}function g(){var n=document.createElement("style");return n.type="text/css",o.appendChild(n),n}function m(t){var e,r,n=document.querySelector("style["+f+'~="'+t.id+'"]');if(n){if(d)return s;n.parentNode.removeChild(n)}if(p){var o=a++;n=i||(i=g()),e=y.bind(null,n,o,!1),r=y.bind(null,n,o,!0)}else n=g(),e=function(n,t){var e=t.css,r=t.media,o=t.sourceMap;r&&n.setAttribute("media",r);l.ssrId&&n.setAttribute(f,t.id);o&&(e+="\n/*# sourceURL="+o.sources[0]+" */",e+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}.bind(null,n),r=function(){n.parentNode.removeChild(n)};return e(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;e(t=n)}else r()}}var b,x=(b=[],function(n,t){return b[n]=t,b.filter(Boolean).join("\n")});function y(n,t,e,r){var o=e?"":r.css;if(n.styleSheet)n.styleSheet.cssText=x(t,o);else{var i=document.createTextNode(o),a=n.childNodes;a[t]&&n.removeChild(a[t]),a.length?n.insertBefore(i,a[t]):n.appendChild(i)}}},367:function(n,t,e){var r=e(405);"string"==typeof r&&(r=[[n.i,r,""]]),r.locals&&(n.exports=r.locals);(0,e(363).default)("2ccfa870",r,!0,{})},404:function(n,t,e){"use strict";var r=e(367);e.n(r).a},405:function(n,t,e){(n.exports=e(362)(!1)).push([n.i,"h1.title[data-v-0a984180] {\n  margin: 0;\n  padding: 32px;\n  font-family: 'Montserrat', sans-serif;\n  font-weight: 700;\n}\n.box[data-v-0a984180] {\n  padding: 16px;\n  width: 70%;\n  max-width: 300px;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  border-radius: 2px;\n  background-color: #131313;\n  color: #fff;\n}\n.box h1[data-v-0a984180] {\n  font-family: 'Montserrat', sans-serif;\n  font-weight: 400;\n  margin: 0;\n  margin-bottom: 16px;\n}\n.box .btn[data-v-0a984180] {\n  width: 100%;\n  height: 36px;\n  background-color: #252525;\n  border-radius: 2px;\n  cursor: pointer;\n}\n.box .btn .icon[data-v-0a984180] {\n  width: 36px;\n  height: 36px;\n  float: left;\n}\n.box .btn .icon img[data-v-0a984180] {\n  width: 70%;\n  height: 70%;\n  position: relative;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.box .btn .text[data-v-0a984180] {\n  width: calc(100% - 36px);\n  height: 36px;\n  float: left;\n}\n.box .btn .text p[data-v-0a984180] {\n  width: 100%;\n  margin: 0;\n  font-family: 'Montserrat', sans-serif;\n  padding: 0px 8px;\n  position: relative;\n  top: 50%;\n  transform: translateY(-50%);\n}\n",""])},506:function(n,t,e){"use strict";e.r(t);var o=e(89);function r(e,n){console.log(n);var r=n.user;o.c.collection("users").doc(r.uid).get().then(function(n){function t(){o.c.collection("users").doc(r.uid).update({lastLogin:Date.now()}),e.$router.push({path:"/"})}n&&n.exists?t():o.c.collection("users").doc(r.uid).set({username:r.displayName,uid:r.uid,joined:Date.now()}).then(function(n){o.c.collection("users/".concat(r.uid,"/private")).doc("type").set({type:"default"}).then(function(n){t()})})})}var i={methods:{login:function(){var t=this,n=new o.a.auth.GoogleAuthProvider;o.b.auth().signInWithPopup(n).then(function(n){r(t,n)})},an:function(){var t=this;o.b.auth().signInAnonymously().then(function(n){r(t,n)})}}},a=(e(404),e(120)),s=Object(a.a)(i,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("h1",{staticClass:"title"},[t._v("SWN Tools")]),t._v(" "),e("div",{staticClass:"box dp1"},[e("h1",[t._v("Login")]),t._v(" "),e("div",{staticClass:"btn",on:{click:function(n){return t.login()}}},[t._m(0)])])])},[function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"text"},[t("p",[this._v("Login with google")])])}],!1,null,"0a984180",null);t.default=s.exports}}]);