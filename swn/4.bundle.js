(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{362:function(e,n,t){"use strict";e.exports=function(t){var s=[];return s.toString=function(){return this.map(function(e){var n=function(e,n){var t=e[1]||"",r=e[3];if(!r)return t;if(n&&"function"==typeof btoa){var o=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(r),i=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[t].concat(i).concat([o]).join("\n")}return[t].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},s.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var t={},r=0;r<this.length;r++){var o=this[r][0];null!=o&&(t[o]=!0)}for(r=0;r<e.length;r++){var i=e[r];null!=i[0]&&t[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),s.push(i))}},s}},363:function(e,n,t){"use strict";function u(e,n){for(var t=[],r={},o=0;o<n.length;o++){var i=n[o],s=i[0],a={id:e+":"+o,css:i[1],media:i[2],sourceMap:i[3]};r[s]?r[s].parts.push(a):t.push(r[s]={id:s,parts:[a]})}return t}t.r(n),t.d(n,"default",function(){return v});var r="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!r)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c={},o=r&&(document.head||document.getElementsByTagName("head")[0]),i=null,s=0,f=!1,a=function(){},l=null,d="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function v(s,e,n,t){f=n,l=t||{};var a=u(s,e);return h(a),function(e){for(var n=[],t=0;t<a.length;t++){var r=a[t];(o=c[r.id]).refs--,n.push(o)}e?h(a=u(s,e)):a=[];for(t=0;t<n.length;t++){var o;if(0===(o=n[t]).refs){for(var i=0;i<o.parts.length;i++)o.parts[i]();delete c[o.id]}}}}function h(e){for(var n=0;n<e.length;n++){var t=e[n],r=c[t.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](t.parts[o]);for(;o<t.parts.length;o++)r.parts.push(g(t.parts[o]));r.parts.length>t.parts.length&&(r.parts.length=t.parts.length)}else{var i=[];for(o=0;o<t.parts.length;o++)i.push(g(t.parts[o]));c[t.id]={id:t.id,refs:1,parts:i}}}}function m(){var e=document.createElement("style");return e.type="text/css",o.appendChild(e),e}function g(n){var t,r,e=document.querySelector("style["+d+'~="'+n.id+'"]');if(e){if(f)return a;e.parentNode.removeChild(e)}if(p){var o=s++;e=i||(i=m()),t=w.bind(null,e,o,!1),r=w.bind(null,e,o,!0)}else e=m(),t=function(e,n){var t=n.css,r=n.media,o=n.sourceMap;r&&e.setAttribute("media",r);l.ssrId&&e.setAttribute(d,n.id);o&&(t+="\n/*# sourceURL="+o.sources[0]+" */",t+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}.bind(null,e),r=function(){e.parentNode.removeChild(e)};return t(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;t(n=e)}else r()}}var b,y=(b=[],function(e,n){return b[e]=n,b.filter(Boolean).join("\n")});function w(e,n,t,r){var o=t?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(n,o);else{var i=document.createTextNode(o),s=e.childNodes;s[n]&&e.removeChild(s[n]),s.length?e.insertBefore(i,s[n]):e.appendChild(i)}}},365:function(e,n,t){var o=t(366);e.exports=function(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},r=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.forEach(function(e){o(n,e,t[e])})}return n}},366:function(e,n){e.exports=function(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}},396:function(e,n,t){var r=t(460);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,t(363).default)("556169ce",r,!0,{})},459:function(e,n,t){"use strict";var r=t(396);t.n(r).a},460:function(e,n,t){(e.exports=t(362)(!1)).push([e.i,".listItem h1[data-v-78a5fa36] {\n  cursor: pointer;\n}\n",""])},490:function(e,n,t){"use strict";t.r(n);var r=t(119),o=t.n(r),i=t(365),s=t.n(i),a=t(122),u=t.n(a),c=t(364),f=t(89),l={components:{card:c.f,primaryTitle:c.t,listitem:c.q,dropdownindicator:c.n,dropdowncontent:c.m},data:function(){return{users:[]}},created:function(){var n=this;return u()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(f.e)(f.c.collection("users").limit(20).orderBy("lastLogin","desc"));case 2:e.sent.forEach(function(e){n.users.push(s()({},e,{open:!1}))});case 4:case"end":return e.stop()}},e)}))()}},d=(t(459),t(120)),p=Object(d.a)(l,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("card",[t("primaryTitle",[t("h1",[e._v("Users")])]),e._v(" "),t("div",e._l(e.users,function(n){return t("listitem",{key:n.uid},[t("h1",{on:{click:function(e){n.open=!n.open}}},[t("dropdownindicator",{attrs:{val:n.open}}),e._v(e._s(n.username))],1),e._v(" "),t("dropdowncontent",{attrs:{show:n.open}},[t("p",[t("b",[e._v("uid: ")]),e._v(" "+e._s(n.uid))]),e._v(" "),t("p",[t("b",[e._v("last login: ")]),e._v(" "+e._s(n.lastLogin))]),e._v(" "),t("p",[t("b",[e._v("joined: ")]),e._v(" "+e._s(n.joined))])])],1)}),1)],1)],1)},[],!1,null,"78a5fa36",null);n.default=p.exports}}]);