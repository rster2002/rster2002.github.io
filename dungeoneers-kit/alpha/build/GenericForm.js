import{S as e,i as t,s as n,W as l,a2 as a,N as s,O as r,P as i,a3 as o,J as u,K as c,Q as f,e as $,t as d,g as p,h as m,c as v,d as h,k as g,a as b,l as w,b as x,f as E,j as y,x as T,n as B,L as N,F as k,I as C,U as q,as as O}from"./vendor.js";import{i as S,r as j,u as A,t as I}from"./index.js";import{C as R}from"./SpaceBetween.js";var X,D;function H(e){let t,n,$;function d(t){e[2](t)}let p={label:e[1].label};return void 0!==e[0]&&(p.value=e[0]),t=new S({props:p}),l.push((()=>a(t,"value",d))),{c(){s(t.$$.fragment)},l(e){r(t.$$.fragment,e)},m(e,n){i(t,e,n),$=!0},p(e,[l]){const a={};2&l&&(a.label=e[1].label),!n&&1&l&&(n=!0,a.value=e[0],o((()=>n=!1))),t.$set(a)},i(e){$||(u(t.$$.fragment,e),$=!0)},o(e){c(t.$$.fragment,e),$=!1},d(e){f(t,e)}}}function J(e,t,n){var{field:l}=t,{value:a}=t;return e.$$set=e=>{"field"in e&&n(1,l=e.field),"value"in e&&n(0,a=e.value)},[a,l,function(e){n(0,a=e)}]}(D=X||(X={})).TEXT="text",D.NUMBER="number",D.CHECKBOX="checkbox",D.DATA_ENTRY="dataEntry",D.OBJECT="object";class K extends e{constructor(e){super(),t(this,e,J,H,n,{field:1,value:0})}}function U(e){let t,n,$;function d(t){e[2](t)}let p={label:e[1].label,type:"number"};return void 0!==e[0]&&(p.value=e[0]),t=new S({props:p}),l.push((()=>a(t,"value",d))),{c(){s(t.$$.fragment)},l(e){r(t.$$.fragment,e)},m(e,n){i(t,e,n),$=!0},p(e,[l]){const a={};2&l&&(a.label=e[1].label),!n&&1&l&&(n=!0,a.value=e[0],o((()=>n=!1))),t.$set(a)},i(e){$||(u(t.$$.fragment,e),$=!0)},o(e){c(t.$$.fragment,e),$=!1},d(e){f(t,e)}}}function _(e,t,n){var{field:l}=t,{value:a}=t;return e.$$set=e=>{"field"in e&&n(1,l=e.field),"value"in e&&n(0,a=e.value)},[a,l,function(e){n(0,a=e)}]}class F extends e{constructor(e){super(),t(this,e,_,U,n,{field:1,value:0})}}function M(e){let t,n,l=e[1].label+"";return{c(){t=$("h6"),n=d(l),this.h()},l(e){t=p(e,"H6",{class:!0});var a=m(t);n=v(a,l),a.forEach(h),this.h()},h(){g(t,"class","svelte-12c4nt1")},m(e,l){b(e,t,l),w(t,n)},p(e,t){2&t&&l!==(l=e[1].label+"")&&x(n,l)},d(e){e&&h(t)}}}function P(e){let t,n,$,d,p=e[1].label&&M(e);function m(t){e[2](t)}let v={shape:e[1].items};return void 0!==e[0]&&(v.value=e[0]),n=new $e({props:v}),l.push((()=>a(n,"value",m))),{c(){p&&p.c(),t=E(),s(n.$$.fragment)},l(e){p&&p.l(e),t=y(e),r(n.$$.fragment,e)},m(e,l){p&&p.m(e,l),b(e,t,l),i(n,e,l),d=!0},p(e,[l]){e[1].label?p?p.p(e,l):(p=M(e),p.c(),p.m(t.parentNode,t)):p&&(p.d(1),p=null);const a={};2&l&&(a.shape=e[1].items),!$&&1&l&&($=!0,a.value=e[0],o((()=>$=!1))),n.$set(a)},i(e){d||(u(n.$$.fragment,e),d=!0)},o(e){c(n.$$.fragment,e),d=!1},d(e){p&&p.d(e),e&&h(t),f(n,e)}}}function Y(e,t,n){var{field:l}=t,{value:a={}}=t;return e.$$set=e=>{"field"in e&&n(1,l=e.field),"value"in e&&n(0,a=e.value)},[a,l,function(e){n(0,a=e)}]}class G extends e{constructor(e){super(),t(this,e,Y,P,n,{field:1,value:0})}}function L(e){let t,n,l,a,s=e[2].name+"";return{c(){t=$("span"),l=E(),a=d(s),this.h()},l(e){t=p(e,"SPAN",{class:!0}),m(t).forEach(h),l=y(e),a=v(e,s),this.h()},h(){g(t,"class",n="mdi mdi-"+e[2].getIcon()+" svelte-1whlq2b")},m(e,n){b(e,t,n),b(e,l,n),b(e,a,n)},p(e,l){4&l&&n!==(n="mdi mdi-"+e[2].getIcon()+" svelte-1whlq2b")&&g(t,"class",n),4&l&&s!==(s=e[2].name+"")&&x(a,s)},d(e){e&&h(t),e&&h(l),e&&h(a)}}}function Q(e){let t;return{c(){t=d("Select an item")},l(e){t=v(e,"Select an item")},m(e,n){b(e,t,n)},p:B,d(e){e&&h(t)}}}function V(e){let t,n,l,a;function s(e,t){return e[4]?L:Q}let r=s(e),i=r(e);return{c(){t=$("div"),i.c(),this.h()},l(e){t=p(e,"DIV",{class:!0});var n=m(t);i.l(n),n.forEach(h),this.h()},h(){g(t,"class",n="input "+(e[4]&&"selected")+" svelte-1whlq2b")},m(n,s){b(n,t,s),i.m(t,null),l||(a=T(t,"click",e[9]),l=!0)},p(e,l){r===(r=s(e))&&i?i.p(e,l):(i.d(1),i=r(e),i&&(i.c(),i.m(t,null))),16&l&&n!==(n="input "+(e[4]&&"selected")+" svelte-1whlq2b")&&g(t,"class",n)},d(e){e&&h(t),i.d(),l=!1,a()}}}function W(e){let t,n,$,d,p;function m(t){e[10](t)}t=new j({props:{label:e[1],focus:e[3],content:!0,$$slots:{default:[V]},$$scope:{ctx:e}}});let v={constraints:e[0]};return void 0!==e[3]&&(v.open=e[3]),$=new A({props:v}),l.push((()=>a($,"open",m))),$.$on("select",e[5]),{c(){s(t.$$.fragment),n=E(),s($.$$.fragment)},l(e){r(t.$$.fragment,e),n=y(e),r($.$$.fragment,e)},m(e,l){i(t,e,l),b(e,n,l),i($,e,l),p=!0},p(e,[n]){const l={};2&n&&(l.label=e[1]),8&n&&(l.focus=e[3]),2076&n&&(l.$$scope={dirty:n,ctx:e}),t.$set(l);const a={};1&n&&(a.constraints=e[0]),!d&&8&n&&(d=!0,a.open=e[3],o((()=>d=!1))),$.$set(a)},i(e){p||(u(t.$$.fragment,e),u($.$$.fragment,e),p=!0)},o(e){c(t.$$.fragment,e),c($.$$.fragment,e),p=!1},d(e){f(t,e),e&&h(n),f($,e)}}}function z(e,t,n){let l,a;var s,{value:r}=t,{constraints:i=[]}=t,{label:o=""}=t,{wide:u=!1}=t;let c=!1;return e.$$set=e=>{"value"in e&&n(6,r=e.value),"constraints"in e&&n(0,i=e.constraints),"label"in e&&n(1,o=e.label),"wide"in e&&n(7,u=e.wide)},e.$$.update=()=>{320&e.$$.dirty&&n(2,l=null!==n(8,s=I[r])&&void 0!==s?s:null),4&e.$$.dirty&&n(4,a=null!==l)},[i,o,l,c,a,function({detail:e}){e&&n(6,r=e.hash),n(3,c=!1)},r,u,s,()=>n(3,c=!0),function(e){c=e,n(3,c)}]}class Z extends e{constructor(e){super(),t(this,e,z,W,n,{value:6,constraints:0,label:1,wide:7})}}function ee(e){let t,n,$;function d(t){e[2](t)}let p={label:e[1].label,constraints:e[1].constraints||[]};return void 0!==e[0]&&(p.value=e[0]),t=new Z({props:p}),l.push((()=>a(t,"value",d))),{c(){s(t.$$.fragment)},l(e){r(t.$$.fragment,e)},m(e,n){i(t,e,n),$=!0},p(e,[l]){const a={};2&l&&(a.label=e[1].label),2&l&&(a.constraints=e[1].constraints||[]),!n&&1&l&&(n=!0,a.value=e[0],o((()=>n=!1))),t.$set(a)},i(e){$||(u(t.$$.fragment,e),$=!0)},o(e){c(t.$$.fragment,e),$=!1},d(e){f(t,e)}}}function te(e,t,n){var{field:l}=t,{value:a=""}=t;return e.$$set=e=>{"field"in e&&n(1,l=e.field),"value"in e&&n(0,a=e.value)},[a,l,function(e){n(0,a=e)}]}class ne extends e{constructor(e){super(),t(this,e,te,ee,n,{field:1,value:0})}}function le(e){let t,n=e[1].label+"";return{c(){t=d(n)},l(e){t=v(e,n)},m(e,n){b(e,t,n)},p(e,l){2&l&&n!==(n=e[1].label+"")&&x(t,n)},d(e){e&&h(t)}}}function ae(e){let t,n,$;function d(t){e[2](t)}let p={$$slots:{default:[le]},$$scope:{ctx:e}};return void 0!==e[0]&&(p.value=e[0]),t=new R({props:p}),l.push((()=>a(t,"value",d))),{c(){s(t.$$.fragment)},l(e){r(t.$$.fragment,e)},m(e,n){i(t,e,n),$=!0},p(e,[l]){const a={};10&l&&(a.$$scope={dirty:l,ctx:e}),!n&&1&l&&(n=!0,a.value=e[0],o((()=>n=!1))),t.$set(a)},i(e){$||(u(t.$$.fragment,e),$=!0)},o(e){c(t.$$.fragment,e),$=!1},d(e){f(t,e)}}}function se(e,t,n){var{field:l}=t,{value:a=!1}=t;return e.$$set=e=>{"field"in e&&n(1,l=e.field),"value"in e&&n(0,a=e.value)},[a,l,function(e){n(0,a=e)}]}class re extends e{constructor(e){super(),t(this,e,se,ae,n,{field:1,value:0})}}const{Boolean:ie}=O;function oe(e,t,n){const l=e.slice();return l[6]=t[n],l[7]=t,l[8]=n,l}function ue(e){let t,n,$,d;function p(t){e[3](t,e[6])}var m=e[6].component;function v(e){let t={field:e[6].field};return void 0!==e[0][e[6].field.key]&&(t.value=e[0][e[6].field.key]),{props:t}}return m&&(t=new m(v(e)),l.push((()=>a(t,"value",p)))),{c(){t&&s(t.$$.fragment),$=N()},l(e){t&&r(t.$$.fragment,e),$=N()},m(e,n){t&&i(t,e,n),b(e,$,n),d=!0},p(r,d){e=r;const h={};if(2&d&&(h.field=e[6].field),!n&&3&d&&(n=!0,h.value=e[0][e[6].field.key],o((()=>n=!1))),m!==(m=e[6].component)){if(t){k();const e=t;c(e.$$.fragment,1,0,(()=>{f(e,1)})),C()}m?(t=new m(v(e)),l.push((()=>a(t,"value",p))),s(t.$$.fragment),u(t.$$.fragment,1),i(t,$.parentNode,$)):t=null}else m&&t.$set(h)},i(e){d||(t&&u(t.$$.fragment,e),d=!0)},o(e){t&&c(t.$$.fragment,e),d=!1},d(e){e&&h($),t&&f(t,e)}}}function ce(e){let t,n,l=e[1],a=[];for(let r=0;r<l.length;r+=1)a[r]=ue(oe(e,l,r));const s=e=>c(a[e],1,1,(()=>{a[e]=null}));return{c(){t=$("section");for(let e=0;e<a.length;e+=1)a[e].c();this.h()},l(e){t=p(e,"SECTION",{class:!0});var n=m(t);for(let t=0;t<a.length;t+=1)a[t].l(n);n.forEach(h),this.h()},h(){g(t,"class","form svelte-9262qr")},m(e,l){b(e,t,l);for(let n=0;n<a.length;n+=1)a[n].m(t,null);n=!0},p(e,[n]){if(3&n){let r;for(l=e[1],r=0;r<l.length;r+=1){const s=oe(e,l,r);a[r]?(a[r].p(s,n),u(a[r],1)):(a[r]=ue(s),a[r].c(),u(a[r],1),a[r].m(t,null))}for(k(),r=l.length;r<a.length;r+=1)s(r);C()}},i(e){if(!n){for(let e=0;e<l.length;e+=1)u(a[e]);n=!0}},o(e){a=a.filter(ie);for(let t=0;t<a.length;t+=1)c(a[t]);n=!1},d(e){e&&h(t),q(a,e)}}}function fe(e,t,n){let l;var{shape:a}=t,{value:s}=t;const r={[X.TEXT]:K,[X.NUMBER]:F,[X.OBJECT]:G,[X.CHECKBOX]:re,[X.DATA_ENTRY]:ne};return e.$$set=e=>{"shape"in e&&n(2,a=e.shape),"value"in e&&n(0,s=e.value)},e.$$.update=()=>{4&e.$$.dirty&&n(1,l=a.map((e=>({field:e,component:r[e.type]}))).filter(Boolean))},[s,l,a,function(t,l){e.$$.not_equal(s[l.field.key],t)&&(s[l.field.key]=t,n(0,s))}]}class $e extends e{constructor(e){super(),t(this,e,fe,ce,n,{shape:2,value:0})}}export{X as F,$e as G};