(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{362:function(e,t,n){"use strict";e.exports=function(n){var s=[];return s.toString=function(){return this.map(function(e){var t=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(r),i=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(i).concat([o]).join("\n")}return[n].join("\n")}(e,n);return e[2]?"@media "+e[2]+"{"+t+"}":t}).join("")},s.i=function(e,t){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},r=0;r<this.length;r++){var o=this[r][0];null!=o&&(n[o]=!0)}for(r=0;r<e.length;r++){var i=e[r];null!=i[0]&&n[i[0]]||(t&&!i[2]?i[2]=t:t&&(i[2]="("+i[2]+") and ("+t+")"),s.push(i))}},s}},363:function(e,t,n){"use strict";function u(e,t){for(var n=[],r={},o=0;o<t.length;o++){var i=t[o],s=i[0],a={id:e+":"+o,css:i[1],media:i[2],sourceMap:i[3]};r[s]?r[s].parts.push(a):n.push(r[s]={id:s,parts:[a]})}return n}n.r(t),n.d(t,"default",function(){return v});var r="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!r)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c={},o=r&&(document.head||document.getElementsByTagName("head")[0]),i=null,s=0,l=!1,a=function(){},d=null,f="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function v(s,e,t,n){l=t,d=n||{};var a=u(s,e);return h(a),function(e){for(var t=[],n=0;n<a.length;n++){var r=a[n];(o=c[r.id]).refs--,t.push(o)}e?h(a=u(s,e)):a=[];for(n=0;n<t.length;n++){var o;if(0===(o=t[n]).refs){for(var i=0;i<o.parts.length;i++)o.parts[i]();delete c[o.id]}}}}function h(e){for(var t=0;t<e.length;t++){var n=e[t],r=c[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(g(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var i=[];for(o=0;o<n.parts.length;o++)i.push(g(n.parts[o]));c[n.id]={id:n.id,refs:1,parts:i}}}}function m(){var e=document.createElement("style");return e.type="text/css",o.appendChild(e),e}function g(t){var n,r,e=document.querySelector("style["+f+'~="'+t.id+'"]');if(e){if(l)return a;e.parentNode.removeChild(e)}if(p){var o=s++;e=i||(i=m()),n=w.bind(null,e,o,!1),r=w.bind(null,e,o,!0)}else e=m(),n=function(e,t){var n=t.css,r=t.media,o=t.sourceMap;r&&e.setAttribute("media",r);d.ssrId&&e.setAttribute(f,t.id);o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,e),r=function(){e.parentNode.removeChild(e)};return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else r()}}var b,y=(b=[],function(e,t){return b[e]=t,b.filter(Boolean).join("\n")});function w(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(t,o);else{var i=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(i,s[t]):e.appendChild(i)}}},365:function(e,t,n){var o=n(366);e.exports=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(e){o(t,e,n[e])})}return t}},366:function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},396:function(e,t,n){var r=n(462);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,n(363).default)("656eeda7",r,!0,{})},461:function(e,t,n){"use strict";var r=n(396);n.n(r).a},462:function(e,t,n){(e.exports=n(362)(!1)).push([e.i,".listItem h1[data-v-065a0998] {\n  cursor: pointer;\n}\n",""])},496:function(e,t,n){"use strict";n.r(t);var r=n(90),o=n.n(r),i=n(365),s=n.n(i),a=n(122),u=n.n(a),c=n(364),l=n(89),d={components:{card:c.f,primaryTitle:c.t,listitem:c.q,dropdownindicator:c.n,dropdowncontent:c.m},data:function(){return{users:[]}},methods:{toDate:function(e){return new Date(e).toString()}},created:function(){var t=this;return u()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(l.e)(l.c.collection("users").limit(20).orderBy("lastLogin","desc"));case 2:e.sent.forEach(function(e){t.users.push(s()({},e,{open:!1}))});case 4:case"end":return e.stop()}},e)}))()}},f=(n(461),n(120)),p=Object(f.a)(d,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("card",[n("primaryTitle",[n("h1",[e._v("Users")])]),e._v(" "),n("div",e._l(e.users,function(t){return n("listitem",{key:t.uid},[n("h1",{on:{click:function(e){t.open=!t.open}}},[n("dropdownindicator",{attrs:{val:t.open}}),e._v(e._s(t.username))],1),e._v(" "),n("dropdowncontent",{attrs:{show:t.open}},[n("p",[n("b",[e._v("uid: ")]),e._v(" "+e._s(t.uid))]),e._v(" "),n("p",[n("b",[e._v("last login: ")]),e._v(" "+e._s(e.toDate(t.lastLogin)))]),e._v(" "),n("p",[n("b",[e._v("joined: ")]),e._v(" "+e._s(e.toDate(t.joined)))])])],1)}),1)],1)],1)},[],!1,null,"065a0998",null);t.default=p.exports}}]);