(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{362:function(e,t,o){"use strict";e.exports=function(o){var s=[];return s.toString=function(){return this.map(function(e){var t=function(e,t){var o=e[1]||"",i=e[3];if(!i)return o;if(t&&"function"==typeof btoa){var r=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(i),n=i.sources.map(function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"});return[o].concat(n).concat([r]).join("\n")}return[o].join("\n")}(e,o);return e[2]?"@media "+e[2]+"{"+t+"}":t}).join("")},s.i=function(e,t){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];null!=r&&(o[r]=!0)}for(i=0;i<e.length;i++){var n=e[i];null!=n[0]&&o[n[0]]||(t&&!n[2]?n[2]=t:t&&(n[2]="("+n[2]+") and ("+t+")"),s.push(n))}},s}},363:function(e,t,o){"use strict";function c(e,t){for(var o=[],i={},r=0;r<t.length;r++){var n=t[r],s=n[0],a={id:e+":"+r,css:n[1],media:n[2],sourceMap:n[3]};i[s]?i[s].parts.push(a):o.push(i[s]={id:s,parts:[a]})}return o}o.r(t),o.d(t,"default",function(){return v});var i="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!i)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var l={},r=i&&(document.head||document.getElementsByTagName("head")[0]),n=null,s=0,u=!1,a=function(){},h=null,p="data-vue-ssr-id",d="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function v(s,e,t,o){u=t,h=o||{};var a=c(s,e);return f(a),function(e){for(var t=[],o=0;o<a.length;o++){var i=a[o];(r=l[i.id]).refs--,t.push(r)}e?f(a=c(s,e)):a=[];for(o=0;o<t.length;o++){var r;if(0===(r=t[o]).refs){for(var n=0;n<r.parts.length;n++)r.parts[n]();delete l[r.id]}}}}function f(e){for(var t=0;t<e.length;t++){var o=e[t],i=l[o.id];if(i){i.refs++;for(var r=0;r<i.parts.length;r++)i.parts[r](o.parts[r]);for(;r<o.parts.length;r++)i.parts.push(m(o.parts[r]));i.parts.length>o.parts.length&&(i.parts.length=o.parts.length)}else{var n=[];for(r=0;r<o.parts.length;r++)n.push(m(o.parts[r]));l[o.id]={id:o.id,refs:1,parts:n}}}}function y(){var e=document.createElement("style");return e.type="text/css",r.appendChild(e),e}function m(t){var o,i,e=document.querySelector("style["+p+'~="'+t.id+'"]');if(e){if(u)return a;e.parentNode.removeChild(e)}if(d){var r=s++;e=n||(n=y()),o=w.bind(null,e,r,!1),i=w.bind(null,e,r,!0)}else e=y(),o=function(e,t){var o=t.css,i=t.media,r=t.sourceMap;i&&e.setAttribute("media",i);h.ssrId&&e.setAttribute(p,t.id);r&&(o+="\n/*# sourceURL="+r.sources[0]+" */",o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");if(e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}.bind(null,e),i=function(){e.parentNode.removeChild(e)};return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else i()}}var g,b=(g=[],function(e,t){return g[e]=t,g.filter(Boolean).join("\n")});function w(e,t,o,i){var r=o?"":i.css;if(e.styleSheet)e.styleSheet.cssText=b(t,r);else{var n=document.createTextNode(r),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(n,s[t]):e.appendChild(n)}}},395:function(e,t,o){var i=o(461);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,o(363).default)("0b24b3b8",i,!0,{})},460:function(e,t,o){"use strict";var i=o(395);o.n(i).a},461:function(e,t,o){(e.exports=o(362)(!1)).push([e.i,"h1,\nh2,\nh3 {\n  padding: 0px 16px;\n  font-family: 'Roboto', sans-serif;\n}\nol,\nul {\n  font-family: 'Roboto', sans-serif;\n}\n.card {\n  max-width: 95%;\n}\n",""])},501:function(e,t,o){"use strict";o.r(t);var i={components:{card:o(364).f}},r=(o(460),o(120)),n=Object(r.a)(i,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("card",[o("h1",[e._v("Welcome to our Privacy Policy")]),e._v(" "),o("h3",[e._v("Your privacy is critically important to us.")]),e._v(" "),o("p",[e._v("It is SWN Tools's policy to respect your privacy regarding any information we may collect while operating our website. This Privacy Policy applies to "),o("a",{attrs:{href:"https://rster2002.github.io/swn"}},[e._v("https://rster2002.github.io/swn")]),e._v(' (hereinafter, "us", "we", or "https://rster2002.github.io/swn"). We respect your privacy and are committed to protecting personally identifiable information you may provide us through the Website. We have adopted this privacy policy ("Privacy Policy") to explain what information may be collected on our Website, how we use this information, and under what circumstances we may disclose the information to third parties. This Privacy Policy applies only to information we collect through the Website and does not apply to our collection of information from other sources.')]),e._v(" "),o("p",[e._v("This Privacy Policy, together with the Terms and conditions posted on our Website, set forth the general rules and policies governing your use of our Website. Depending on your activities when visiting our Website, you may be required to agree to additional terms and conditions.")]),e._v(" "),o("h2",[e._v("Website Visitors")]),e._v(" "),o("p",[e._v("Like most website operators, SWN Tools collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. SWN Tools's purpose in collecting non-personally identifying information is to better understand how SWN Tools's visitors use its website. From time to time, SWN Tools may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of its website.")]),e._v(" "),o("p",[e._v("SWN Tools stored the (user) names of the people who use this website.")]),e._v(" "),o("h2",[e._v("Gathering of Personally-Identifying Information")]),e._v(" "),o("p",[e._v("Certain visitors to SWN Tools's websites choose to interact with SWN Tools in ways that require SWN Tools to gather personally-identifying information. The amount and type of information that SWN Tools gathers depends on the nature of the interaction. For example, we ask visitors who sign up at https://rster2002.github.io/swn to provide a username and email address.")]),e._v(" "),o("h2",[e._v("Security")]),e._v(" "),o("p",[e._v("The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.")]),e._v(" "),o("h2",[e._v("Links To External Sites")]),e._v(" "),o("p",[e._v("Our Service may contain links to external sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy and terms and conditions of every site you visit.")]),e._v(" "),o("p",[e._v("We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites, products or services.")]),e._v(" "),o("h2",[e._v("Aggregated Statistics")]),e._v(" "),o("p",[e._v("SWN Tools may collect statistics about the behavior of visitors to its website. SWN Tools may display this information publicly or provide it to others. However, SWN Tools does not disclose your personally-identifying information.")]),e._v(" "),o("h2",[e._v("Cookies")]),e._v(" "),o("p",[e._v('To enrich and perfect your online experience, SWN Tools uses "Cookies", similar technologies and services provided by others to display personalized content, appropriate advertising and store your preferences on your computer.')]),e._v(" "),o("p",[e._v("A cookie is a string of information that a website stores on a visitor's computer, and that the visitor's browser provides to the website each time the visitor returns. SWN Tools uses cookies to help SWN Tools identify and track visitors, their usage of https://rster2002.github.io/swn, and their website access preferences. SWN Tools visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using SWN Tools's websites, with the drawback that certain features of SWN Tools's websites may not function properly without the aid of cookies.")]),e._v(" "),o("p",[e._v("By continuing to navigate our website without changing your cookie settings, you hereby acknowledge and agree to SWN Tools's use of cookies.")]),e._v(" "),o("h2",[e._v("Privacy Policy Changes")]),e._v(" "),o("p",[e._v("Although most changes are likely to be minor, SWN Tools may change its Privacy Policy from time to time, and in SWN Tools's sole discretion. SWN Tools encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.")]),e._v(" "),o("h2",[e._v("Credit & Contact Information")]),e._v(" "),o("p",[e._v("This privacy policy was created at "),o("a",{staticStyle:{color:"inherit","text-decoration":"none"},attrs:{href:"https://termsandconditionstemplate.com/privacy-policy-generator/",title:"Privacy policy template generator",target:"_blank"}},[e._v("termsandconditionstemplate.com")]),e._v(". If you have any questions about this Privacy Policy, please contact us via "),o("a",{attrs:{href:"mailto:rster2002dev@gmail.com"}},[e._v("email")]),e._v(".")])])],1)},[],!1,null,null,null);t.default=n.exports}}]);