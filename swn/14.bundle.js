(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{362:function(e,t,r){"use strict";e.exports=function(r){var a=[];return a.toString=function(){return this.map(function(e){var t=function(e,t){var r=e[1]||"",n=e[3];if(!n)return r;if(t&&"function"==typeof btoa){var i=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(n),o=n.sources.map(function(e){return"/*# sourceURL="+n.sourceRoot+e+" */"});return[r].concat(o).concat([i]).join("\n")}return[r].join("\n")}(e,r);return e[2]?"@media "+e[2]+"{"+t+"}":t}).join("")},a.i=function(e,t){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},n=0;n<this.length;n++){var i=this[n][0];null!=i&&(r[i]=!0)}for(n=0;n<e.length;n++){var o=e[n];null!=o[0]&&r[o[0]]||(t&&!o[2]?o[2]=t:t&&(o[2]="("+o[2]+") and ("+t+")"),a.push(o))}},a}},363:function(e,t,r){"use strict";function c(e,t){for(var r=[],n={},i=0;i<t.length;i++){var o=t[i],a=o[0],s={id:e+":"+i,css:o[1],media:o[2],sourceMap:o[3]};n[a]?n[a].parts.push(s):r.push(n[a]={id:a,parts:[s]})}return r}r.r(t),r.d(t,"default",function(){return g});var n="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!n)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var u={},i=n&&(document.head||document.getElementsByTagName("head")[0]),o=null,a=0,d=!1,s=function(){},l=null,p="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function g(a,e,t,r){d=t,l=r||{};var s=c(a,e);return h(s),function(e){for(var t=[],r=0;r<s.length;r++){var n=s[r];(i=u[n.id]).refs--,t.push(i)}e?h(s=c(a,e)):s=[];for(r=0;r<t.length;r++){var i;if(0===(i=t[r]).refs){for(var o=0;o<i.parts.length;o++)i.parts[o]();delete u[i.id]}}}}function h(e){for(var t=0;t<e.length;t++){var r=e[t],n=u[r.id];if(n){n.refs++;for(var i=0;i<n.parts.length;i++)n.parts[i](r.parts[i]);for(;i<r.parts.length;i++)n.parts.push(m(r.parts[i]));n.parts.length>r.parts.length&&(n.parts.length=r.parts.length)}else{var o=[];for(i=0;i<r.parts.length;i++)o.push(m(r.parts[i]));u[r.id]={id:r.id,refs:1,parts:o}}}}function v(){var e=document.createElement("style");return e.type="text/css",i.appendChild(e),e}function m(t){var r,n,e=document.querySelector("style["+p+'~="'+t.id+'"]');if(e){if(d)return s;e.parentNode.removeChild(e)}if(f){var i=a++;e=o||(o=v()),r=_.bind(null,e,i,!1),n=_.bind(null,e,i,!0)}else e=v(),r=function(e,t){var r=t.css,n=t.media,i=t.sourceMap;n&&e.setAttribute("media",n);l.ssrId&&e.setAttribute(p,t.id);i&&(r+="\n/*# sourceURL="+i.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");if(e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}.bind(null,e),n=function(){e.parentNode.removeChild(e)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else n()}}var b,y=(b=[],function(e,t){return b[e]=t,b.filter(Boolean).join("\n")});function _(e,t,r,n){var i=r?"":n.css;if(e.styleSheet)e.styleSheet.cssText=y(t,i);else{var o=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}},499:function(e,t,r){"use strict";r.r(t);var n=r(364),i={components:{card:n.f,primaryTitle:n.t,actions:n.a,cardgrid:n.g},methods:{changeTo:function(e){this.$router.push({path:"/".concat(e)})}}},o=r(120),a=Object(o.a)(i,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("cardgrid",[r("card",{staticStyle:{"grid-column":"3 / 8","grid-row":"1 / 2"}},[r("div",{staticClass:"img",staticStyle:{"background-image":"url(./build/src/images/construction.jpg)","background-position":"0% 1%"}}),t._v(" "),r("primaryTitle",[r("h1",[t._v("Under construction")])]),t._v(" "),r("p",[t._v("Please keep in mind that this website is work in progress and things are subject to change. You may lose your character or any other information.")]),t._v(" "),r("actions",[r("button",{on:{click:function(e){return t.changeTo("versions")}}},[t._v("\n                        View progress\n                    ")])])],1),t._v(" "),r("card",{staticStyle:{"grid-column":"8 / 11","grid-row":"1 / 2"}},[r("div",{staticClass:"img",staticStyle:{"background-image":"url(./build/src/images/characters.jpg)","background-position":"0% 83%"}}),t._v(" "),r("primaryTitle",[r("h1",[t._v("Characters")])]),t._v(" "),r("p",[t._v("Keep track of your characters using this digital character sheet.")]),t._v(" "),r("actions",[r("button",{on:{click:function(e){return t.changeTo("characters")}}},[t._v("\n                        view\n                    ")])])],1),t._v(" "),r("card",{staticStyle:{"grid-column":"6 / 11","grid-row":"2 / 3"}},[r("div",{staticClass:"img",staticStyle:{"background-image":"url(./build/src/images/groups.jpg)","background-position":"0% 57%"}}),t._v(" "),r("primaryTitle",[r("h1",[t._v("Groups")])]),t._v(" "),r("p",[t._v("Team up with others and explore the universe")]),t._v(" "),r("actions",[r("button",{attrs:{disabled:""},on:{click:function(e){return t.changeTo("groups")}}},[t._v("\n                        work in progress\n                    ")])])],1),t._v(" "),r("card",{staticStyle:{"grid-column":"3 / 6","grid-row":"2 / 3"}},[r("div",{staticClass:"img",staticStyle:{"background-image":"url(https://i.pinimg.com/564x/dd/d7/a6/ddd7a625ceb31b0462486d59fb861bd5.jpg)","background-position":"0% 58%"}}),t._v(" "),r("primaryTitle",[r("h1",[t._v("Homebrew")])]),t._v(" "),r("p",[t._v("Find homebrew equipment and stories")]),t._v(" "),r("actions",[r("button",{attrs:{disabled:""},on:{click:function(e){return t.changeTo("groups")}}},[t._v("\n                        work in progress\n                    ")])])],1)],1)],1)},[],!1,null,"92c60b5e",null);t.default=a.exports}}]);