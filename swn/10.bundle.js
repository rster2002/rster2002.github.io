(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{362:function(t,e,n){"use strict";t.exports=function(n){var o=[];return o.toString=function(){return this.map(function(t){var e=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var i=function(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}(r),a=r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"});return[n].concat(a).concat([i]).join("\n")}return[n].join("\n")}(t,n);return t[2]?"@media "+t[2]+"{"+e+"}":e}).join("")},o.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},r=0;r<this.length;r++){var i=this[r][0];null!=i&&(n[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];null!=a[0]&&n[a[0]]||(e&&!a[2]?a[2]=e:e&&(a[2]="("+a[2]+") and ("+e+")"),o.push(a))}},o}},363:function(t,e,n){"use strict";function c(t,e){for(var n=[],r={},i=0;i<e.length;i++){var a=e[i],o=a[0],s={id:t+":"+i,css:a[1],media:a[2],sourceMap:a[3]};r[o]?r[o].parts.push(s):n.push(r[o]={id:o,parts:[s]})}return n}n.r(e),n.d(e,"default",function(){return h});var r="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!r)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var u={},i=r&&(document.head||document.getElementsByTagName("head")[0]),a=null,o=0,d=!1,s=function(){},p=null,l="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(o,t,e,n){d=e,p=n||{};var s=c(o,t);return v(s),function(t){for(var e=[],n=0;n<s.length;n++){var r=s[n];(i=u[r.id]).refs--,e.push(i)}t?v(s=c(o,t)):s=[];for(n=0;n<e.length;n++){var i;if(0===(i=e[n]).refs){for(var a=0;a<i.parts.length;a++)i.parts[a]();delete u[i.id]}}}}function v(t){for(var e=0;e<t.length;e++){var n=t[e],r=u[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(m(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var a=[];for(i=0;i<n.parts.length;i++)a.push(m(n.parts[i]));u[n.id]={id:n.id,refs:1,parts:a}}}}function g(){var t=document.createElement("style");return t.type="text/css",i.appendChild(t),t}function m(e){var n,r,t=document.querySelector("style["+l+'~="'+e.id+'"]');if(t){if(d)return s;t.parentNode.removeChild(t)}if(f){var i=o++;t=a||(a=g()),n=_.bind(null,t,i,!1),r=_.bind(null,t,i,!0)}else t=g(),n=function(t,e){var n=e.css,r=e.media,i=e.sourceMap;r&&t.setAttribute("media",r);p.ssrId&&t.setAttribute(l,e.id);i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,t),r=function(){t.parentNode.removeChild(t)};return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else r()}}var b,y=(b=[],function(t,e){return b[t]=e,b.filter(Boolean).join("\n")});function _(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=y(e,i);else{var a=document.createTextNode(i),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(a,o[e]):t.appendChild(a)}}},453:function(t,e,n){"use strict";n.r(e);var r=n(364),i={components:{card:r.f,primaryTitle:r.o,actions:r.a},methods:{changeTo:function(t){this.$router.push({path:"/".concat(t)})}}},a=n(120),o=Object(a.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("card",[n("div",{staticClass:"img",staticStyle:{"background-image":"url(https://i.pinimg.com/564x/34/72/78/347278cc7ed550049e3e118c824891b2.jpg)","background-position":"0% 1%"}}),e._v(" "),n("primaryTitle",[n("h1",[e._v("Under construction")])]),e._v(" "),n("p",[e._v("Please keep in mind that this website is work in progress and things are subject to change. You may lose your character or any other information.")]),e._v(" "),n("actions",[n("button",{on:{click:function(t){return e.changeTo("versions")}}},[e._v("\n\t\t\t\tView progress\n\t\t\t")])])],1),e._v(" "),n("card",[n("div",{staticClass:"img",staticStyle:{"background-image":"url(https://i.pinimg.com/564x/79/0c/e5/790ce538b5f94b73a53d43226ddb6b23.jpg)","background-position":"0% 83%"}}),e._v(" "),n("primaryTitle",[n("h1",[e._v("Characters")])]),e._v(" "),n("p",[e._v("Keep track of your characters using this digital character sheet.")]),e._v(" "),n("actions",[n("button",{on:{click:function(t){return e.changeTo("characters")}}},[e._v("\n\t\t\t\tview\n\t\t\t")])])],1),e._v(" "),n("card",[n("div",{staticClass:"img",staticStyle:{"background-image":"url(https://i.pinimg.com/564x/ae/20/d1/ae20d1d22f87012689b1b58813dae2df.jpg)","background-position":"0% 57%"}}),e._v(" "),n("primaryTitle",[n("h1",[e._v("Ships")])]),e._v(" "),n("p",[e._v("Your gateway to the universe. Keep track of them here.")]),e._v(" "),n("actions",[n("button",{on:{click:function(t){return e.changeTo("ships")}}},[e._v("\n\t\t\t\tview\n\t\t\t")])])],1)],1)},[],!1,null,"e355ae46",null);e.default=o.exports}}]);