(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{339:function(t,e,n){"use strict";t.exports=function(n){var s=[];return s.toString=function(){return this.map(function(t){var e=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var a=function(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}(r),i=r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"});return[n].concat(i).concat([a]).join("\n")}return[n].join("\n")}(t,n);return t[2]?"@media "+t[2]+"{"+e+"}":e}).join("")},s.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},r=0;r<this.length;r++){var a=this[r][0];null!=a&&(n[a]=!0)}for(r=0;r<t.length;r++){var i=t[r];null!=i[0]&&n[i[0]]||(e&&!i[2]?i[2]=e:e&&(i[2]="("+i[2]+") and ("+e+")"),s.push(i))}},s}},340:function(t,e,n){"use strict";function c(t,e){for(var n=[],r={},a=0;a<e.length;a++){var i=e[a],s=i[0],o={id:t+":"+a,css:i[1],media:i[2],sourceMap:i[3]};r[s]?r[s].parts.push(o):n.push(r[s]={id:s,parts:[o]})}return n}n.r(e),n.d(e,"default",function(){return v});var r="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!r)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var u={},a=r&&(document.head||document.getElementsByTagName("head")[0]),i=null,s=0,p=!1,o=function(){},d=null,l="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function v(s,t,e,n){p=e,d=n||{};var o=c(s,t);return h(o),function(t){for(var e=[],n=0;n<o.length;n++){var r=o[n];(a=u[r.id]).refs--,e.push(a)}t?h(o=c(s,t)):o=[];for(n=0;n<e.length;n++){var a;if(0===(a=e[n]).refs){for(var i=0;i<a.parts.length;i++)a.parts[i]();delete u[a.id]}}}}function h(t){for(var e=0;e<t.length;e++){var n=t[e],r=u[n.id];if(r){r.refs++;for(var a=0;a<r.parts.length;a++)r.parts[a](n.parts[a]);for(;a<n.parts.length;a++)r.parts.push(m(n.parts[a]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var i=[];for(a=0;a<n.parts.length;a++)i.push(m(n.parts[a]));u[n.id]={id:n.id,refs:1,parts:i}}}}function g(){var t=document.createElement("style");return t.type="text/css",a.appendChild(t),t}function m(e){var n,r,t=document.querySelector("style["+l+'~="'+e.id+'"]');if(t){if(p)return o;t.parentNode.removeChild(t)}if(f){var a=s++;t=i=i||g(),n=w.bind(null,t,a,!1),r=w.bind(null,t,a,!0)}else t=g(),n=function(t,e){var n=e.css,r=e.media,a=e.sourceMap;r&&t.setAttribute("media",r);d.ssrId&&t.setAttribute(l,e.id);a&&(n+="\n/*# sourceURL="+a.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */");if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,t),r=function(){t.parentNode.removeChild(t)};return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else r()}}var x,b=(x=[],function(t,e){return x[t]=e,x.filter(Boolean).join("\n")});function w(t,e,n,r){var a=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=b(e,a);else{var i=document.createTextNode(a),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(i,s[e]):t.appendChild(i)}}},343:function(t,e,n){var r=n(357);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);(0,n(340).default)("39e577b2",r,!0,{})},356:function(t,e,n){"use strict";var r=n(343);n.n(r).a},357:function(t,e,n){(t.exports=n(339)(!1)).push([t.i,".card[data-v-84d60fc6]{background-color:#fff;-webkit-box-shadow:0px 5px 10px 0px #e0e0e0;-moz-box-shadow:0px 5px 10px 0px #e0e0e0;box-shadow:0px 5px 10px 0px #e0e0e0;border-radius:5px;padding:24px 16px;display:inline-block}\n",""])},358:function(t,e,n){"use strict";var r={},a=(n(356),n(95)),i=Object(a.a)(r,function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"card",on:{click:function(t){return e.$emit("click")}}},[e._t("default")],2)},[],!1,null,"84d60fc6",null);e.a=i.exports},419:function(t,e,n){var r=n(536);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);(0,n(340).default)("2b946dcf",r,!0,{})},535:function(t,e,n){"use strict";var r=n(419);n.n(r).a},536:function(t,e,n){(t.exports=n(339)(!1)).push([t.i,'.view.settings .grid[data-v-af7147d4]{padding:0px 48px;width:calc(100% - 94px)}.view.settings .card[data-v-af7147d4]{float:left;width:calc(25% - 65px);margin:16px;cursor:pointer}.view.settings .settingWrapper[data-v-af7147d4]{height:64px;width:64px;margin-left:auto;margin-right:auto}.view.settings .settingWrapper p[data-v-af7147d4]{margin:0}.view.settings .settingWrapper p.material-icons[data-v-af7147d4]{position:relative;left:50%;transform:translateX(-50%);font-size:48px}.view.settings .settingWrapper p[data-v-af7147d4]:not(.material-icons){font-family:"Roboto",sans-serif}\n',""])},542:function(t,e,n){"use strict";n.r(e);var r={components:{card:n(358).a}},a=(n(535),n(95)),i=Object(a.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"view settings"},[n("h1",[t._v("Settings")]),t._v(" "),n("div",{staticClass:"grid"},[n("card",[n("div",{staticClass:"settingWrapper"},[n("p",{staticClass:"material-icons"},[t._v("group")]),t._v(" "),n("p",[t._v("Members")])])])],1)])},[],!1,null,"af7147d4",null);e.default=i.exports}}]);