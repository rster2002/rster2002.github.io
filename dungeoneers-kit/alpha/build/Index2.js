import{S as t,i as e,s,Y as a,e as n,f as r,g as c,h as l,d as o,j as i,k as h,$ as f,a as u,l as d,x as $,X as m,J as p,K as v,a9 as g,al as E,am as b,t as w,c as y,n as N,b as x,a8 as S,N as I,O as k,P as T,Q as D,F as C,I as j,U as z,L as P,a3 as V,R as O,W as A,a2 as q,y as B,ab as _,V as H,ac as U,C as L,_ as M,an as G}from"./vendor.js";import{s as F,o as K,D as R,a6 as Y,E as J,a7 as W,a8 as X,G as Q,P as Z,c as tt,A as et,z as st,p as at,a9 as nt}from"./index.js";import{n as rt,g as ct}from"./Character.js";import{B as lt,S as ot}from"./SpaceBetween.js";import{F as it,G as ht}from"./GenericForm.js";function ft(t){let e,s,g,E,b,w,y,N;const x=t[6].default,S=a(x,t,t[5],null);return{c(){e=n("button"),s=n("span"),E=r(),S&&S.c(),this.h()},l(t){e=c(t,"BUTTON",{class:!0});var a=l(e);s=c(a,"SPAN",{class:!0}),l(s).forEach(o),E=i(a),S&&S.l(a),a.forEach(o),this.h()},h(){h(s,"class",g="mdi mdi-"+t[0]),h(e,"class",b=f(t[1]&&"isCurrentPath")+" svelte-1f4es6j")},m(a,n){u(a,e,n),d(e,s),d(e,E),S&&S.m(e,null),w=!0,y||(N=$(e,"click",t[2]),y=!0)},p(t,[a]){(!w||1&a&&g!==(g="mdi mdi-"+t[0]))&&h(s,"class",g),S&&S.p&&(!w||32&a)&&m(S,x,t,t[5],a,null,null),(!w||2&a&&b!==(b=f(t[1]&&"isCurrentPath")+" svelte-1f4es6j"))&&h(e,"class",b)},i(t){w||(p(S,t),w=!0)},o(t){v(S,t),w=!1},d(t){t&&o(e),S&&S.d(t),y=!1,N()}}}function ut(t,e,s){let a,n;g(t,E,(t=>s(4,n=t)));let{$$slots:r={},$$scope:c}=e;var{icon:l}=e,{path:o}=e;return t.$$set=t=>{"icon"in t&&s(0,l=t.icon),"path"in t&&s(3,o=t.path),"$$scope"in t&&s(5,c=t.$$scope)},t.$$.update=()=>{24&t.$$.dirty&&s(1,a="/"===o&&"/"===n||"/"!==o&&n.includes(o))},[l,a,function(){b(o)},o,n,c,r]}class dt extends t{constructor(t){super(),e(this,t,ut,ft,s,{icon:0,path:3})}}function $t(t){let e,s;return{c(){e=n("p"),s=w("This tool allows you to view your own JSON formatted 5e content and use it\n                in characters or campaigns. Go to settings to import your datasets.")},l(t){e=c(t,"P",{});var a=l(e);s=y(a,"This tool allows you to view your own JSON formatted 5e content and use it\n                in characters or campaigns. Go to settings to import your datasets."),a.forEach(o)},m(t,a){u(t,e,a),d(e,s)},d(t){t&&o(e)}}}function mt(t){let e,s,a,f,$,m,p,v;return{c(){e=n("p"),s=w("You are currently running a "),a=n("span"),f=w("beta"),$=w(" version\n                of Dungeoneer's Kit. This is a preview of candidates for full releases,\n                but may still contain bugs. Saved data is however updated between versions\n                unlike the alpha version."),m=r(),p=n("p"),v=w("Saved data is stored separately from other versions, so your data on the\n                stable version of the tool won't be effected by this version."),this.h()},l(t){e=c(t,"P",{});var n=l(e);s=y(n,"You are currently running a "),a=c(n,"SPAN",{class:!0});var r=l(a);f=y(r,"beta"),r.forEach(o),$=y(n," version\n                of Dungeoneer's Kit. This is a preview of candidates for full releases,\n                but may still contain bugs. Saved data is however updated between versions\n                unlike the alpha version."),n.forEach(o),m=i(t),p=c(t,"P",{});var h=l(p);v=y(h,"Saved data is stored separately from other versions, so your data on the\n                stable version of the tool won't be effected by this version."),h.forEach(o),this.h()},h(){h(a,"class","beta svelte-ecvsoj")},m(t,n){u(t,e,n),d(e,s),d(e,a),d(a,f),d(e,$),u(t,m,n),u(t,p,n),d(p,v)},d(t){t&&o(e),t&&o(m),t&&o(p)}}}function pt(t){let e,s,a,f,$,m,p,v;return{c(){e=n("p"),s=w("You are currently running an "),a=n("span"),f=w("alpha"),$=w(" version\n                of Dungeoneer's Kit. This means that that there are no guarentees.\n                Alpha often contains incomplete features and even work in progress\n                code which makes it very risky to use this tool right now. Saved\n                data is also not updated from one version to another."),m=r(),p=n("p"),v=w("Saved data is stored separately from other versions, so your data on the\n                stable version of the tool won't be effected by this version."),this.h()},l(t){e=c(t,"P",{});var n=l(e);s=y(n,"You are currently running an "),a=c(n,"SPAN",{class:!0});var r=l(a);f=y(r,"alpha"),r.forEach(o),$=y(n," version\n                of Dungeoneer's Kit. This means that that there are no guarentees.\n                Alpha often contains incomplete features and even work in progress\n                code which makes it very risky to use this tool right now. Saved\n                data is also not updated from one version to another."),n.forEach(o),m=i(t),p=c(t,"P",{});var h=l(p);v=y(h,"Saved data is stored separately from other versions, so your data on the\n                stable version of the tool won't be effected by this version."),h.forEach(o),this.h()},h(){h(a,"class","alpha svelte-ecvsoj")},m(t,n){u(t,e,n),d(e,s),d(e,a),d(a,f),d(e,$),u(t,m,n),u(t,p,n),d(p,v)},d(t){t&&o(e),t&&o(m),t&&o(p)}}}function vt(t){let e,s,a,f,$;var m;let p=("alpha"===(m=t)[0]?pt:"beta"===m[0]?mt:$t)(t);return{c(){e=n("section"),s=n("div"),a=n("h1"),f=w("Welcome"),$=r(),p.c(),this.h()},l(t){e=c(t,"SECTION",{class:!0});var n=l(e);s=c(n,"DIV",{class:!0});var r=l(s);a=c(r,"H1",{class:!0});var h=l(a);f=y(h,"Welcome"),h.forEach(o),$=i(r),p.l(r),r.forEach(o),n.forEach(o),this.h()},h(){h(a,"class","svelte-ecvsoj"),h(s,"class","box svelte-ecvsoj"),h(e,"class","svelte-ecvsoj")},m(t,n){u(t,e,n),d(e,s),d(s,a),d(a,f),d(s,$),p.m(s,null)},p:N,i:N,o:N,d(t){t&&o(e),p.d()}}}function gt(t){return["alpha"]}class Et extends t{constructor(t){super(),e(this,t,gt,vt,s,{})}}function bt(t){let e,s,a,f,m,p,v,g,E,b,S,I,k;return{c(){e=n("div"),s=n("div"),a=n("h1"),f=w(t[1]),m=r(),p=n("h2"),v=w(t[2]),g=r(),E=n("div"),b=n("button"),S=w("View"),this.h()},l(n){e=c(n,"DIV",{class:!0});var r=l(e);s=c(r,"DIV",{class:!0});var h=l(s);a=c(h,"H1",{class:!0});var u=l(a);f=y(u,t[1]),u.forEach(o),m=i(h),p=c(h,"H2",{class:!0});var d=l(p);v=y(d,t[2]),d.forEach(o),h.forEach(o),g=i(r),E=c(r,"DIV",{class:!0});var $=l(E);b=c($,"BUTTON",{class:!0});var w=l(b);S=y(w,"View"),w.forEach(o),$.forEach(o),r.forEach(o),this.h()},h(){h(a,"class","svelte-1jeksxa"),h(p,"class","svelte-1jeksxa"),h(s,"class","text"),h(b,"class","svelte-1jeksxa"),h(E,"class","buttons"),h(e,"class","characterGridItem svelte-1jeksxa")},m(n,r){u(n,e,r),d(e,s),d(s,a),d(a,f),d(s,m),d(s,p),d(p,v),d(e,g),d(e,E),d(E,b),d(b,S),I||(k=$(b,"click",t[3]),I=!0)},p(t,[e]){2&e&&x(f,t[1]),4&e&&x(v,t[2])},i:N,o:N,d(t){t&&o(e),I=!1,k()}}}function wt(t,e,s){let a,n,r,c=N,l=()=>(c(),c=S(o,(t=>s(4,r=t))),o);t.$$.on_destroy.push((()=>c()));var{character:o}=e;return l(),t.$$set=t=>{"character"in t&&l(s(0,o=t.character))},t.$$.update=()=>{16&t.$$.dirty&&s(1,a=r.getName()),16&t.$$.dirty&&s(2,n=r.getDescription())},[o,a,n,function(){location.href="#/character/"+o.getId()},r]}class yt extends t{constructor(t){super(),e(this,t,wt,bt,s,{character:0})}}function Nt(t,e,s){const a=t.slice();return a[1]=e[s],a}function xt(t){let e,s;return e=new yt({props:{character:t[1]}}),{c(){I(e.$$.fragment)},l(t){k(e.$$.fragment,t)},m(t,a){T(e,t,a),s=!0},p(t,s){const a={};1&s&&(a.character=t[1]),e.$set(a)},i(t){s||(p(e.$$.fragment,t),s=!0)},o(t){v(e.$$.fragment,t),s=!1},d(t){D(e,t)}}}function St(t){let e,s,a,f,m,g,E,b=t[0],N=[];for(let n=0;n<b.length;n+=1)N[n]=xt(Nt(t,b,n));const x=t=>v(N[t],1,1,(()=>{N[t]=null}));return{c(){e=n("section");for(let t=0;t<N.length;t+=1)N[t].c();s=r(),a=n("button"),f=w("New character"),this.h()},l(t){e=c(t,"SECTION",{class:!0});var n=l(e);for(let e=0;e<N.length;e+=1)N[e].l(n);s=i(n),a=c(n,"BUTTON",{class:!0});var r=l(a);f=y(r,"New character"),r.forEach(o),n.forEach(o),this.h()},h(){h(a,"class","svelte-1jgnklh"),h(e,"class","characters svelte-1jgnklh")},m(t,n){u(t,e,n);for(let s=0;s<N.length;s+=1)N[s].m(e,null);d(e,s),d(e,a),d(a,f),m=!0,g||(E=$(a,"click",rt),g=!0)},p(t,[a]){if(1&a){let n;for(b=t[0],n=0;n<b.length;n+=1){const r=Nt(t,b,n);N[n]?(N[n].p(r,a),p(N[n],1)):(N[n]=xt(r),N[n].c(),p(N[n],1),N[n].m(e,s))}for(C(),n=b.length;n<N.length;n+=1)x(n);j()}},i(t){if(!m){for(let t=0;t<b.length;t+=1)p(N[t]);m=!0}},o(t){N=N.filter(Boolean);for(let e=0;e<N.length;e+=1)v(N[e]);m=!1},d(t){t&&o(e),z(N,t),g=!1,E()}}}function It(t,e,s){let a;return s(0,a=ct()),[a]}class kt extends t{constructor(t){super(),e(this,t,It,St,s,{})}}function Tt(t,e,s){const a=t.slice();return a[10]=e[s],a}function Dt(t){let e,s=t[1],a=[];for(let n=0;n<s.length;n+=1)a[n]=Ct(Tt(t,s,n));return{c(){for(let t=0;t<a.length;t+=1)a[t].c();e=P()},l(t){for(let e=0;e<a.length;e+=1)a[e].l(t);e=P()},m(t,s){for(let e=0;e<a.length;e+=1)a[e].m(t,s);u(t,e,s)},p(t,n){if(34&n){let r;for(s=t[1],r=0;r<s.length;r+=1){const c=Tt(t,s,r);a[r]?a[r].p(c,n):(a[r]=Ct(c),a[r].c(),a[r].m(e.parentNode,e))}for(;r<a.length;r+=1)a[r].d(1);a.length=s.length}},d(t){z(a,t),t&&o(e)}}}function Ct(t){let e,s,a,f,m,p,v,g,E,b,N,S,I,k,T=t[10].name+"",D=t[10].getDescription()+"";function C(){return t[7](t[10])}return{c(){e=n("div"),s=n("div"),a=n("h1"),f=w(T),m=r(),p=n("h2"),v=w(D),g=r(),E=n("div"),b=n("button"),N=w("View"),S=r(),this.h()},l(t){e=c(t,"DIV",{class:!0});var n=l(e);s=c(n,"DIV",{class:!0});var r=l(s);a=c(r,"H1",{class:!0});var h=l(a);f=y(h,T),h.forEach(o),m=i(r),p=c(r,"H2",{class:!0});var u=l(p);v=y(u,D),u.forEach(o),r.forEach(o),g=i(n),E=c(n,"DIV",{class:!0});var d=l(E);b=c(d,"BUTTON",{class:!0});var $=l(b);N=y($,"View"),$.forEach(o),d.forEach(o),S=i(n),n.forEach(o),this.h()},h(){h(a,"class","svelte-1cqoalp"),h(p,"class","svelte-1cqoalp"),h(s,"class","text"),h(b,"class","svelte-1cqoalp"),h(E,"class","buttons"),h(e,"class","result svelte-1cqoalp")},m(t,n){u(t,e,n),d(e,s),d(s,a),d(a,f),d(s,m),d(s,p),d(p,v),d(e,g),d(e,E),d(E,b),d(b,N),d(e,S),I||(k=$(b,"click",C),I=!0)},p(e,s){t=e,2&s&&T!==(T=t[10].name+"")&&x(f,T),2&s&&D!==(D=t[10].getDescription()+"")&&x(v,D)},d(t){t&&o(e),I=!1,k()}}}function jt(t){let e,s,a;function n(e){t[8](e)}let r={entry:t[2]};return void 0!==t[3]&&(r.open=t[3]),e=new R({props:r}),A.push((()=>q(e,"open",n))),{c(){I(e.$$.fragment)},l(t){k(e.$$.fragment,t)},m(t,s){T(e,t,s),a=!0},p(t,a){const n={};4&a&&(n.entry=t[2]),!s&&8&a&&(s=!0,n.open=t[3],V((()=>s=!1))),e.$set(n)},i(t){a||(p(e.$$.fragment,t),a=!0)},o(t){v(e.$$.fragment,t),a=!1},d(t){D(e,t)}}}function zt(t){let e,s,a,f,m,g,E,b,w,y,N=t[4]&&Dt(t),x=t[3]&&jt(t);return{c(){e=n("main"),s=n("header"),a=n("input"),f=r(),m=n("section"),N&&N.c(),g=r(),x&&x.c(),E=P(),this.h()},l(t){e=c(t,"MAIN",{class:!0});var n=l(e);s=c(n,"HEADER",{class:!0});var r=l(s);a=c(r,"INPUT",{type:!0,placeholder:!0,class:!0}),r.forEach(o),f=i(n),m=c(n,"SECTION",{class:!0});var h=l(m);N&&N.l(h),h.forEach(o),n.forEach(o),g=i(t),x&&x.l(t),E=P(),this.h()},h(){h(a,"type","text"),h(a,"placeholder","Search everything"),h(a,"class","svelte-1cqoalp"),h(s,"class","svelte-1cqoalp"),h(m,"class","svelte-1cqoalp"),h(e,"class","svelte-1cqoalp")},m(n,r){u(n,e,r),d(e,s),d(s,a),O(a,t[0]),d(e,f),d(e,m),N&&N.m(m,null),u(n,g,r),x&&x.m(n,r),u(n,E,r),b=!0,w||(y=$(a,"input",t[6]),w=!0)},p(t,[e]){1&e&&a.value!==t[0]&&O(a,t[0]),t[4]?N?N.p(t,e):(N=Dt(t),N.c(),N.m(m,null)):N&&(N.d(1),N=null),t[3]?x?(x.p(t,e),8&e&&p(x,1)):(x=jt(t),x.c(),p(x,1),x.m(E.parentNode,E)):x&&(C(),v(x,1,1,(()=>{x=null})),j())},i(t){b||(p(x),b=!0)},o(t){v(x),b=!1},d(t){t&&o(e),N&&N.d(),t&&o(g),x&&x.d(t),t&&o(E),w=!1,y()}}}function Pt(t,e,s){let a,n;var r,c="",l=Object.values(F),o=!1;function i(t){s(2,r=t),s(3,o=!0)}return t.$$.update=()=>{1&t.$$.dirty&&s(1,n=K(l,c).filter((t=>t.score>0)).sort(((t,e)=>e.score-t.score)).slice(0,15)),3&t.$$.dirty&&s(4,a=0!==n.length&&""!==c)},[c,n,r,o,a,i,function(){c=this.value,s(0,c)},t=>i(t),function(t){s(3,o=t)}]}class Vt extends t{constructor(t){super(),e(this,t,Pt,zt,s,{})}}function Ot(t,e,s){const a=t.slice();return a[3]=e[s],a}function At(t){let e,s,a,f,m,p,v,g,E,b,N,S,I,k,T=t[3].name+"",D=t[3].id.toUpperCase()+"";function C(){return t[2](t[3])}return{c(){e=n("div"),s=n("div"),a=n("h1"),f=w(T),m=r(),p=n("h2"),v=w(D),g=r(),E=n("div"),b=n("button"),N=w("View"),S=r(),this.h()},l(t){e=c(t,"DIV",{class:!0});var n=l(e);s=c(n,"DIV",{class:!0});var r=l(s);a=c(r,"H1",{class:!0});var h=l(a);f=y(h,T),h.forEach(o),m=i(r),p=c(r,"H2",{class:!0});var u=l(p);v=y(u,D),u.forEach(o),r.forEach(o),g=i(n),E=c(n,"DIV",{class:!0});var d=l(E);b=c(d,"BUTTON",{class:!0});var $=l(b);N=y($,"View"),$.forEach(o),d.forEach(o),S=i(n),n.forEach(o),this.h()},h(){h(a,"class","svelte-6d4zla"),h(p,"class","svelte-6d4zla"),h(s,"class","text"),h(b,"class","svelte-6d4zla"),h(E,"class","buttons"),h(e,"class","book svelte-6d4zla")},m(t,n){u(t,e,n),d(e,s),d(s,a),d(a,f),d(s,m),d(s,p),d(p,v),d(e,g),d(e,E),d(E,b),d(b,N),d(e,S),I||(k=$(b,"click",C),I=!0)},p(e,s){t=e,1&s&&T!==(T=t[3].name+"")&&x(f,T),1&s&&D!==(D=t[3].id.toUpperCase()+"")&&x(v,D)},d(t){t&&o(e),I=!1,k()}}}function qt(t){let e,s=t[0],a=[];for(let n=0;n<s.length;n+=1)a[n]=At(Ot(t,s,n));return{c(){e=n("section");for(let t=0;t<a.length;t+=1)a[t].c();this.h()},l(t){e=c(t,"SECTION",{class:!0});var s=l(e);for(let e=0;e<a.length;e+=1)a[e].l(s);s.forEach(o),this.h()},h(){h(e,"class","svelte-6d4zla")},m(t,s){u(t,e,s);for(let n=0;n<a.length;n+=1)a[n].m(e,null)},p(t,[n]){if(3&n){let r;for(s=t[0],r=0;r<s.length;r+=1){const c=Ot(t,s,r);a[r]?a[r].p(c,n):(a[r]=At(c),a[r].c(),a[r].m(e,null))}for(;r<a.length;r+=1)a[r].d(1);a.length=s.length}},i:N,o:N,d(t){t&&o(e),z(a,t)}}}function Bt(t,e,s){let a;function n({id:t}){b(`/book/${t}`)}return s(0,a=Object.values(Y)),[a,n,t=>n(t)]}class _t extends t{constructor(t){super(),e(this,t,Bt,qt,s,{})}}function Ht(t,e,s){const a=t.slice();return a[10]=e[s],a}function Ut(t,e,s){const a=t.slice();return a[13]=e[s],a}function Lt(t,e,s){const a=t.slice();return a[10]=e[s],a}function Mt(t){let e,s,a,r=t[10].name+"";return{c(){e=n("option"),s=w(r),this.h()},l(t){e=c(t,"OPTION",{value:!0});var a=l(e);s=y(a,r),a.forEach(o),this.h()},h(){e.__value=a=t[10].name,e.value=e.__value},m(t,a){u(t,e,a),d(e,s)},p(t,n){1&n&&r!==(r=t[10].name+"")&&x(s,r),1&n&&a!==(a=t[10].name)&&(e.__value=a,e.value=e.__value)},d(t){t&&o(e)}}}function Gt(t){let e,s=t[0].contents,a=[];for(let n=0;n<s.length;n+=1)a[n]=Rt(Ht(t,s,n));return{c(){e=n("div");for(let t=0;t<a.length;t+=1)a[t].c();this.h()},l(t){e=c(t,"DIV",{class:!0});var s=l(e);for(let e=0;e<a.length;e+=1)a[e].l(s);s.forEach(o),this.h()},h(){h(e,"class","expanded svelte-1j5bdpa")},m(t,s){u(t,e,s);for(let n=0;n<a.length;n+=1)a[n].m(e,null)},p(t,n){if(17&n){let r;for(s=t[0].contents,r=0;r<s.length;r+=1){const c=Ht(t,s,r);a[r]?a[r].p(c,n):(a[r]=Rt(c),a[r].c(),a[r].m(e,null))}for(;r<a.length;r+=1)a[r].d(1);a.length=s.length}},d(t){t&&o(e),z(a,t)}}}function Ft(t){let e,s=t[10].headers,a=[];for(let n=0;n<s.length;n+=1)a[n]=Kt(Ut(t,s,n));return{c(){e=n("ul");for(let t=0;t<a.length;t+=1)a[t].c();this.h()},l(t){e=c(t,"UL",{class:!0});var s=l(e);for(let e=0;e<a.length;e+=1)a[e].l(s);s.forEach(o),this.h()},h(){h(e,"class","svelte-1j5bdpa")},m(t,s){u(t,e,s);for(let n=0;n<a.length;n+=1)a[n].m(e,null)},p(t,n){if(17&n){let r;for(s=t[10].headers,r=0;r<s.length;r+=1){const c=Ut(t,s,r);a[r]?a[r].p(c,n):(a[r]=Kt(c),a[r].c(),a[r].m(e,null))}for(;r<a.length;r+=1)a[r].d(1);a.length=s.length}},d(t){t&&o(e),z(a,t)}}}function Kt(t){let e,s,a,f,m,p,v=("object"==typeof t[13]?t[13].header:t[13])+"";function g(){return t[8](t[10],t[13])}return{c(){e=n("li"),s=n("a"),a=w(v),f=r(),this.h()},l(t){e=c(t,"LI",{});var n=l(e);s=c(n,"A",{href:!0,class:!0});var r=l(s);a=y(r,v),r.forEach(o),f=i(n),n.forEach(o),this.h()},h(){h(s,"href","javascript:void(0)"),h(s,"class","svelte-1j5bdpa")},m(t,n){u(t,e,n),d(e,s),d(s,a),d(e,f),m||(p=$(s,"click",g),m=!0)},p(e,s){t=e,1&s&&v!==(v=("object"==typeof t[13]?t[13].header:t[13])+"")&&x(a,v)},d(t){t&&o(e),m=!1,p()}}}function Rt(t){let e,s,a,f,m,p,v,g,E=t[10].name+"";function b(){return t[7](t[10])}let N=t[10].headers&&Ft(t);return{c(){e=n("section"),s=n("h4"),a=n("a"),f=w(E),m=r(),N&&N.c(),p=r(),this.h()},l(t){e=c(t,"SECTION",{class:!0});var n=l(e);s=c(n,"H4",{class:!0});var r=l(s);a=c(r,"A",{href:!0,class:!0});var h=l(a);f=y(h,E),h.forEach(o),r.forEach(o),m=i(n),N&&N.l(n),p=i(n),n.forEach(o),this.h()},h(){h(a,"href","javascript:void(0)"),h(a,"class","svelte-1j5bdpa"),h(s,"class","svelte-1j5bdpa"),h(e,"class","svelte-1j5bdpa")},m(t,n){u(t,e,n),d(e,s),d(s,a),d(a,f),d(e,m),N&&N.m(e,null),d(e,p),v||(g=$(a,"click",b),v=!0)},p(s,a){t=s,1&a&&E!==(E=t[10].name+"")&&x(f,E),t[10].headers?N?N.p(t,a):(N=Ft(t),N.c(),N.m(e,p)):N&&(N.d(1),N=null)},d(t){t&&o(e),N&&N.d(),v=!1,g()}}}function Yt(t){let e,s;return e=new J({props:{entries:[t[3]]}}),{c(){I(e.$$.fragment)},l(t){k(e.$$.fragment,t)},m(t,a){T(e,t,a),s=!0},p(t,s){const a={};8&s&&(a.entries=[t[3]]),e.$set(a)},i(t){s||(p(e.$$.fragment,t),s=!0)},o(t){v(e.$$.fragment,t),s=!1},d(t){D(e,t)}}}function Jt(t){let e,s,a,f,m,g,E,b,w,y,N,x,S,I=t[0].contents,k=[];for(let n=0;n<I.length;n+=1)k[n]=Mt(Lt(t,I,n));let T=t[2]&&Gt(t),D=t[3]&&Yt(t);return{c(){e=n("div"),s=n("header"),a=n("div"),f=n("select");for(let t=0;t<k.length;t+=1)k[t].c();m=r(),g=n("button"),E=n("span"),b=r(),T&&T.c(),w=r(),y=n("section"),D&&D.c(),this.h()},l(t){e=c(t,"DIV",{class:!0});var n=l(e);s=c(n,"HEADER",{class:!0});var r=l(s);a=c(r,"DIV",{class:!0});var h=l(a);f=c(h,"SELECT",{class:!0});var u=l(f);for(let e=0;e<k.length;e+=1)k[e].l(u);u.forEach(o),m=i(h),g=c(h,"BUTTON",{class:!0});var d=l(g);E=c(d,"SPAN",{class:!0}),l(E).forEach(o),d.forEach(o),h.forEach(o),b=i(r),T&&T.l(r),r.forEach(o),w=i(n),y=c(n,"SECTION",{class:!0});var $=l(y);D&&D.l($),$.forEach(o),n.forEach(o),this.h()},h(){h(f,"class","svelte-1j5bdpa"),void 0===t[1]&&B((()=>t[5].call(f))),h(E,"class","mdi mdi-view-dashboard-variant-outline"),h(g,"class","svelte-1j5bdpa"),h(a,"class","top svelte-1j5bdpa"),h(s,"class","svelte-1j5bdpa"),h(y,"class","svelte-1j5bdpa"),h(e,"class","book")},m(n,r){u(n,e,r),d(e,s),d(s,a),d(a,f);for(let t=0;t<k.length;t+=1)k[t].m(f,null);_(f,t[1]),d(a,m),d(a,g),d(g,E),d(s,b),T&&T.m(s,null),d(e,w),d(e,y),D&&D.m(y,null),N=!0,x||(S=[$(f,"change",t[5]),$(g,"click",t[6])],x=!0)},p(t,[e]){if(1&e){let s;for(I=t[0].contents,s=0;s<I.length;s+=1){const a=Lt(t,I,s);k[s]?k[s].p(a,e):(k[s]=Mt(a),k[s].c(),k[s].m(f,null))}for(;s<k.length;s+=1)k[s].d(1);k.length=I.length}3&e&&_(f,t[1]),t[2]?T?T.p(t,e):(T=Gt(t),T.c(),T.m(s,null)):T&&(T.d(1),T=null),t[3]?D?(D.p(t,e),8&e&&p(D,1)):(D=Yt(t),D.c(),p(D,1),D.m(y,null)):D&&(C(),v(D,1,1,(()=>{D=null})),j())},i(t){N||(p(D),N=!0)},o(t){v(D),N=!1},d(t){t&&o(e),z(k,t),T&&T.d(),D&&D.d(),x=!1,H(S)}}}function Wt(t,e,s){var a,n,{data:r}=e,c=!1;function l(t){let e=r.entries.find((e=>e.name.includes(t)));e&&(s(3,a=e),s(1,n=t))}function o(t,e){l(t),s(2,c=!1),e&&queueMicrotask((()=>{let t=W(e," ","-").toLowerCase(),s=document.getElementById(t);s&&s.scrollIntoView()}))}a=r.entries[0];return t.$$set=t=>{"data"in t&&s(0,r=t.data)},t.$$.update=()=>{2&t.$$.dirty&&l(n)},[r,n,c,a,o,function(){n=U(this),s(1,n),s(0,r)},()=>s(2,c=!c),t=>o(t.name),(t,e)=>o(t.name,"object"==typeof e?e.header:e)]}class Xt extends t{constructor(t){super(),e(this,t,Wt,Jt,s,{data:0})}}function Qt(t){let e,s;return{c(){e=n("h1"),s=w("No book with that id")},l(t){e=c(t,"H1",{});var a=l(e);s=y(a,"No book with that id"),a.forEach(o)},m(t,a){u(t,e,a),d(e,s)},p:N,i:N,o:N,d(t){t&&o(e)}}}function Zt(t){let e,s;return e=new Xt({props:{data:t[0]}}),{c(){I(e.$$.fragment)},l(t){k(e.$$.fragment,t)},m(t,a){T(e,t,a),s=!0},p(t,s){const a={};1&s&&(a.data=t[0]),e.$set(a)},i(t){s||(p(e.$$.fragment,t),s=!0)},o(t){v(e.$$.fragment,t),s=!1},d(t){D(e,t)}}}function te(t){let e,s,a,r,i;const f=[Zt,Qt],$=[];function m(t,e){return t[0]?0:1}return a=m(t),r=$[a]=f[a](t),{c(){e=n("section"),s=n("div"),r.c(),this.h()},l(t){e=c(t,"SECTION",{class:!0});var a=l(e);s=c(a,"DIV",{class:!0});var n=l(s);r.l(n),n.forEach(o),a.forEach(o),this.h()},h(){h(s,"class","lane svelte-64dgc2"),h(e,"class","svelte-64dgc2")},m(t,n){u(t,e,n),d(e,s),$[a].m(s,null),i=!0},p(t,[e]){let n=a;a=m(t),a===n?$[a].p(t,e):(C(),v($[n],1,1,(()=>{$[n]=null})),j(),r=$[a],r?r.p(t,e):(r=$[a]=f[a](t),r.c()),p(r,1),r.m(s,null))},i(t){i||(p(r),i=!0)},o(t){v(r),i=!1},d(t){t&&o(e),$[a].d()}}}function ee(t,e,s){let a;var{params:n}=e;return t.$$set=t=>{"params"in t&&s(1,n=t.params)},t.$$.update=()=>{2&t.$$.dirty&&s(0,a=Y[n.id]),1&t.$$.dirty&&console.log(a)},[a,n]}class se extends t{constructor(t){super(),e(this,t,ee,te,s,{params:1})}}function ae(t){let e;return{c(){e=w("View")},l(t){e=y(t,"View")},m(t,s){u(t,e,s)},d(t){t&&o(e)}}}function ne(t){let e,s,a,f,$,m,g,E,b,N,x,S,C,j,z,P,V,O,A,q,B,_,H,U,L,M,G,F,K,R,Y,J,W,X,Q,Z="be60d98f6259b6a13af535fe0f89b9094863158c".slice(0,7)+"";return N=new lt({props:{$$slots:{default:[ae]},$$scope:{ctx:t}}}),N.$on("click",t[1]),{c(){e=n("main"),s=n("section"),a=n("h1"),f=n("span"),$=w("\n            Data management"),m=r(),g=n("p"),E=w("Manage loaded datasets and available space."),b=r(),I(N.$$.fragment),x=r(),S=n("section"),C=n("h2"),j=n("span"),z=w(" Version"),P=r(),V=n("p"),O=n("b"),A=w("Version"),q=r(),B=w("v1.0.0-Alpha.57"),_=r(),H=n("p"),U=n("b"),L=w("Branch"),M=r(),G=n("span"),F=w(t[0]),K=r(),R=n("p"),Y=n("b"),J=w("Commit id"),W=r(),X=w(Z),this.h()},l(n){e=c(n,"MAIN",{class:!0});var r=l(e);s=c(r,"SECTION",{class:!0});var h=l(s);a=c(h,"H1",{class:!0});var u=l(a);f=c(u,"SPAN",{class:!0}),l(f).forEach(o),$=y(u,"\n            Data management"),u.forEach(o),m=i(h),g=c(h,"P",{class:!0});var d=l(g);E=y(d,"Manage loaded datasets and available space."),d.forEach(o),b=i(h),k(N.$$.fragment,h),h.forEach(o),x=i(r),S=c(r,"SECTION",{class:!0});var p=l(S);C=c(p,"H2",{class:!0});var v=l(C);j=c(v,"SPAN",{class:!0}),l(j).forEach(o),z=y(v," Version"),v.forEach(o),P=i(p),V=c(p,"P",{class:!0});var w=l(V);O=c(w,"B",{});var I=l(O);A=y(I,"Version"),I.forEach(o),q=i(w),B=y(w,"v1.0.0-Alpha.57"),w.forEach(o),_=i(p),H=c(p,"P",{class:!0});var T=l(H);U=c(T,"B",{});var D=l(U);L=y(D,"Branch"),D.forEach(o),M=i(T),G=c(T,"SPAN",{class:!0});var Q=l(G);F=y(Q,t[0]),Q.forEach(o),T.forEach(o),K=i(p),R=c(p,"P",{class:!0});var tt=l(R);Y=c(tt,"B",{});var et=l(Y);J=y(et,"Commit id"),et.forEach(o),W=i(tt),X=y(tt,Z),tt.forEach(o),p.forEach(o),r.forEach(o),this.h()},h(){h(f,"class","mdi mdi-database-outline"),h(a,"class","svelte-1n460wm"),h(g,"class","svelte-1n460wm"),h(s,"class","svelte-1n460wm"),h(j,"class","mdi mdi-flag"),h(C,"class","svelte-1n460wm"),h(V,"class","svelte-1n460wm"),h(G,"class","releaseType "+t[0]+" svelte-1n460wm"),h(H,"class","svelte-1n460wm"),h(R,"class","svelte-1n460wm"),h(S,"class","version svelte-1n460wm"),h(e,"class","svelte-1n460wm")},m(t,n){u(t,e,n),d(e,s),d(s,a),d(a,f),d(a,$),d(s,m),d(s,g),d(g,E),d(s,b),T(N,s,null),d(e,x),d(e,S),d(S,C),d(C,j),d(C,z),d(S,P),d(S,V),d(V,O),d(O,A),d(V,q),d(V,B),d(S,_),d(S,H),d(H,U),d(U,L),d(H,M),d(H,G),d(G,F),d(S,K),d(S,R),d(R,Y),d(Y,J),d(R,W),d(R,X),Q=!0},p(t,[e]){const s={};4&e&&(s.$$scope={dirty:e,ctx:t}),N.$set(s)},i(t){Q||(p(N.$$.fragment,t),Q=!0)},o(t){v(N.$$.fragment,t),Q=!1},d(t){t&&o(e),D(N)}}}function re(t){return["alpha",()=>b("/settings/data")]}class ce extends t{constructor(t){super(),e(this,t,re,ne,s,{})}}function le(t){let e;return{c(){e=w("Saving...")},l(t){e=y(t,"Saving...")},m(t,s){u(t,e,s)},p:N,i:N,o:N,d(t){t&&o(e)}}}function oe(t){let e,s,a,h,f,d,$;return e=new ht({props:{shape:t[2],value:t[0]}}),a=new lt({props:{$$slots:{default:[ie]},$$scope:{ctx:t}}}),a.$on("click",t[4]),d=new lt({props:{$$slots:{default:[he]},$$scope:{ctx:t}}}),d.$on("click",t[3]),{c(){I(e.$$.fragment),s=r(),h=n("div"),I(a.$$.fragment),f=r(),I(d.$$.fragment),this.h()},l(t){k(e.$$.fragment,t),s=i(t),h=c(t,"DIV",{style:!0});var n=l(h);k(a.$$.fragment,n),f=i(t),k(d.$$.fragment,t),this.h()},h(){M(h,"display","contents"),M(h,"--accentColor","#ff3030")},m(t,n){T(e,t,n),u(t,s,n),u(t,h,n),T(a,h,null),u(t,f,n),T(d,t,n),$=!0},p(t,s){const n={};1&s&&(n.value=t[0]),e.$set(n);const r={};64&s&&(r.$$scope={dirty:s,ctx:t}),a.$set(r);const c={};64&s&&(c.$$scope={dirty:s,ctx:t}),d.$set(c)},i(t){$||(p(e.$$.fragment,t),p(a.$$.fragment,t),p(d.$$.fragment,t),$=!0)},o(t){v(e.$$.fragment,t),v(a.$$.fragment,t),v(d.$$.fragment,t),$=!1},d(t){D(e,t),t&&o(s),t&&o(h),D(a,t),t&&o(f),D(d,t)}}}function ie(t){let e,s;return{c(){e=n("span"),s=w("Remove"),this.h()},l(t){e=c(t,"SPAN",{class:!0});var a=l(e);s=y(a,"Remove"),a.forEach(o),this.h()},h(){h(e,"class","mdi mdi-delete-outline")},m(t,a){u(t,e,a),d(e,s)},d(t){t&&o(e)}}}function he(t){let e,s;return{c(){e=n("span"),s=w("\n            Save"),this.h()},l(t){e=c(t,"SPAN",{class:!0}),l(e).forEach(o),s=y(t,"\n            Save"),this.h()},h(){h(e,"class","mdi mdi-content-save-outline")},m(t,a){u(t,e,a),u(t,s,a)},d(t){t&&o(e),t&&o(s)}}}function fe(t){let e,s,a,n;const r=[oe,le],c=[];function l(t,e){return t[1]?1:0}return e=l(t),s=c[e]=r[e](t),{c(){s.c(),a=P()},l(t){s.l(t),a=P()},m(t,s){c[e].m(t,s),u(t,a,s),n=!0},p(t,n){let o=e;e=l(t),e===o?c[e].p(t,n):(C(),v(c[o],1,1,(()=>{c[o]=null})),j(),s=c[e],s?s.p(t,n):(s=c[e]=r[e](t),s.c()),p(s,1),s.m(a.parentNode,a))},i(t){n||(p(s),n=!0)},o(t){v(s),n=!1},d(t){c[e].d(t),t&&o(a)}}}function ue(t){let e,s;return e=new ot({props:{$$slots:{default:[fe]},$$scope:{ctx:t}}}),{c(){I(e.$$.fragment)},l(t){k(e.$$.fragment,t)},m(t,a){T(e,t,a),s=!0},p(t,[s]){const a={};67&s&&(a.$$scope={dirty:s,ctx:t}),e.$set(a)},i(t){s||(p(e.$$.fragment,t),s=!0)},o(t){v(e.$$.fragment,t),s=!1},d(t){D(e,t)}}}function de(t,e,s){const a=L();var{dataset:n}=e;let r=!1;const c=[{key:"name",type:it.TEXT,label:"Name"}];return t.$$set=t=>{"dataset"in t&&s(0,n=t.dataset)},[n,r,c,async function(){let t=new X;s(1,r=!0),await t.updateDataset(n),s(1,r=!1),a("saved")},async function(){if(confirm("Are you sure you want to remove this dataset? Any characters or campaigns that use this data might stop working")){let t=new X,e=await t.getCurrentDataset();await t.deleteDataset(e),location.reload()}}]}class $e extends t{constructor(t){super(),e(this,t,de,ue,s,{dataset:0})}}function me(t){let e,s;return e=new $e({props:{dataset:t[1]}}),e.$on("saved",t[4]),{c(){I(e.$$.fragment)},l(t){k(e.$$.fragment,t)},m(t,a){T(e,t,a),s=!0},p(t,s){const a={};2&s&&(a.dataset=t[1]),e.$set(a)},i(t){s||(p(e.$$.fragment,t),s=!0)},o(t){v(e.$$.fragment,t),s=!1},d(t){D(e,t)}}}function pe(t){let e,s,a,n,c;function l(e){t[5](e)}e=new Q({props:{headers:t[3],items:t[0]}});let h={min:!0,$$slots:{default:[me]},$$scope:{ctx:t}};return void 0!==t[2]&&(h.open=t[2]),a=new Z({props:h}),A.push((()=>q(a,"open",l))),{c(){I(e.$$.fragment),s=r(),I(a.$$.fragment)},l(t){k(e.$$.fragment,t),s=i(t),k(a.$$.fragment,t)},m(t,n){T(e,t,n),u(t,s,n),T(a,t,n),c=!0},p(t,[s]){const r={};1&s&&(r.items=t[0]),e.$set(r);const c={};70&s&&(c.$$scope={dirty:s,ctx:t}),!n&&4&s&&(n=!0,c.open=t[2],V((()=>n=!1))),a.$set(c)},i(t){c||(p(e.$$.fragment,t),p(a.$$.fragment,t),c=!0)},o(t){v(e.$$.fragment,t),v(a.$$.fragment,t),c=!1},d(t){D(e,t),t&&o(s),D(a,t)}}}function ve(t,e,s){var{datasets:a}=e;let n,r=!1;const c=[{header:"Dataset",type:tt.SUBTEXT,alignment:et.LEFT,text:t=>t.name,subtext:t=>`Version ${t.version} • ${t.hash}`},{type:tt.ICON_BUTTON,icon:()=>"pencil",onClick:async t=>{s(1,n=t),s(2,r=!0)}}];return t.$$set=t=>{"datasets"in t&&s(0,a=t.datasets)},[a,n,r,c,()=>s(2,r=!1),function(t){r=t,s(2,r)}]}class ge extends t{constructor(t){super(),e(this,t,ve,pe,s,{datasets:0})}}function Ee(t){let e;return{c(){e=w("Loading")},l(t){e=y(t,"Loading")},m(t,s){u(t,e,s)},p:N,d(t){t&&o(e)}}}function be(t){let e,s,a;return{c(){e=w(t[0]),s=w(" / "),a=w(t[1])},l(n){e=y(n,t[0]),s=y(n," / "),a=y(n,t[1])},m(t,n){u(t,e,n),u(t,s,n),u(t,a,n)},p(t,s){1&s&&x(e,t[0]),2&s&&x(a,t[1])},d(t){t&&o(e),t&&o(s),t&&o(a)}}}function we(t){let e,s,a,f,$;function m(t,e){return t[0]&&t[1]?be:Ee}let p=m(t),v=p(t);return{c(){e=n("div"),s=n("h1"),v.c(),a=r(),f=n("h2"),$=w(t[2]),this.h()},l(n){e=c(n,"DIV",{class:!0});var r=l(e);s=c(r,"H1",{class:!0});var h=l(s);v.l(h),h.forEach(o),a=i(r),f=c(r,"H2",{class:!0});var u=l(f);$=y(u,t[2]),u.forEach(o),r.forEach(o),this.h()},h(){h(s,"class","svelte-26hbdt"),h(f,"class","svelte-26hbdt"),h(e,"class","storage")},m(t,n){u(t,e,n),d(e,s),v.m(s,null),d(e,a),d(e,f),d(f,$)},p(t,[e]){p===(p=m(t))&&v?v.p(t,e):(v.d(1),v=p(t),v&&(v.c(),v.m(s,null))),4&e&&x($,t[2])},i:N,o:N,d(t){t&&o(e),v.d()}}}function ye(t,e,s){var a,n,r;const c=["B","KB","MB","GB"];function l(t){let e="";for(let s=0;s<c.length;s++)t>1024&&(e=c[s+1],t/=1024);return`${t.toFixed(2)}${e}`}return async function(){let t=await navigator.storage.estimate();s(0,a=l(t.usage)),s(1,n=l(t.quota));let e=t.usage/t.quota*100;s(2,r=`${e.toFixed(2)}%`)}(),[a,n,r]}class Ne extends t{constructor(t){super(),e(this,t,ye,we,s,{})}}function xe(t,e,s){const a=t.slice();return a[10]=e[s],a}function Se(t){let e,s;return{c(){e=n("span"),s=w("\n            Import"),this.h()},l(t){e=c(t,"SPAN",{class:!0}),l(e).forEach(o),s=y(t,"\n            Import"),this.h()},h(){h(e,"class","mdi mdi-upload")},m(t,a){u(t,e,a),u(t,s,a)},d(t){t&&o(e),t&&o(s)}}}function Ie(t){let e,s,a,r=t[10].name+"";return{c(){e=n("option"),s=w(r),this.h()},l(t){e=c(t,"OPTION",{value:!0});var a=l(e);s=y(a,r),a.forEach(o),this.h()},h(){e.__value=a=t[10].hash,e.value=e.__value},m(t,a){u(t,e,a),d(e,s)},p(t,n){8&n&&r!==(r=t[10].name+"")&&x(s,r),8&n&&a!==(a=t[10].hash)&&(e.__value=a,e.value=e.__value)},d(t){t&&o(e)}}}function ke(t){let e,s,a,h,f=t[3],$=[];for(let n=0;n<f.length;n+=1)$[n]=Ie(xe(t,f,n));return{c(){e=n("option"),s=w("Select dataset"),a=r();for(let t=0;t<$.length;t+=1)$[t].c();h=P(),this.h()},l(t){e=c(t,"OPTION",{value:!0,disabled:!0});var n=l(e);s=y(n,"Select dataset"),n.forEach(o),a=i(t);for(let e=0;e<$.length;e+=1)$[e].l(t);h=P(),this.h()},h(){e.__value=null,e.value=e.__value,e.disabled=!0},m(t,n){u(t,e,n),d(e,s),u(t,a,n);for(let e=0;e<$.length;e+=1)$[e].m(t,n);u(t,h,n)},p(t,e){if(8&e){let s;for(f=t[3],s=0;s<f.length;s+=1){const a=xe(t,f,s);$[s]?$[s].p(a,e):($[s]=Ie(a),$[s].c(),$[s].m(h.parentNode,h))}for(;s<$.length;s+=1)$[s].d(1);$.length=f.length}},d(t){t&&o(e),t&&o(a),z($,t),t&&o(h)}}}function Te(t){let e,s;return{c(){e=n("span"),s=w("\n            Save"),this.h()},l(t){e=c(t,"SPAN",{class:!0}),l(e).forEach(o),s=y(t,"\n            Save"),this.h()},h(){h(e,"class","mdi mdi-content-save-outline")},m(t,a){u(t,e,a),u(t,s,a)},d(t){t&&o(e),t&&o(s)}}}function De(t){let e,s;return{c(){e=n("span"),s=w("\n            Clear"),this.h()},l(t){e=c(t,"SPAN",{class:!0}),l(e).forEach(o),s=y(t,"\n            Clear"),this.h()},h(){h(e,"class","mdi mdi-delete-outline")},m(t,a){u(t,e,a),u(t,s,a)},d(t){t&&o(e),t&&o(s)}}}function Ce(t){let e,s,a,f,$,m,p;return{c(){e=n("div"),s=n("div"),a=n("h2"),f=w("Importing dataset..."),$=r(),m=n("p"),p=w("This could take some time."),this.h()},l(t){e=c(t,"DIV",{class:!0});var n=l(e);s=c(n,"DIV",{class:!0});var r=l(s);a=c(r,"H2",{class:!0});var h=l(a);f=y(h,"Importing dataset..."),h.forEach(o),$=i(r),m=c(r,"P",{class:!0});var u=l(m);p=y(u,"This could take some time."),u.forEach(o),r.forEach(o),n.forEach(o),this.h()},h(){h(a,"class","svelte-1bhizqz"),h(m,"class","svelte-1bhizqz"),h(s,"class","box svelte-1bhizqz"),h(e,"class","importing svelte-1bhizqz")},m(t,n){u(t,e,n),d(e,s),d(s,a),d(a,f),d(s,$),d(s,m),d(m,p)},d(t){t&&o(e)}}}function je(t){let e,s,a,f,$,m,g,E,b,N,x,S,C,j,z,O,B,_,H,U,L,M,G,F,K,R,Y,J,W,X,Q,Z,tt,et,at,nt,rt,ct,ot,it,ht,ft,ut;function dt(e){t[9](e)}b=new lt({props:{$$slots:{default:[Se]},$$scope:{ctx:t}}}),b.$on("click",t[5]);let $t={label:"Current dataset",$$slots:{default:[ke]},$$scope:{ctx:t}};void 0!==t[2]&&($t.value=t[2]),O=new st({props:$t}),A.push((()=>q(O,"value",dt))),H=new lt({props:{$$slots:{default:[Te]},$$scope:{ctx:t}}}),H.$on("click",t[6]),R=new ge({props:{datasets:t[3]}}),tt=new Ne({}),it=new lt({props:{$$slots:{default:[De]},$$scope:{ctx:t}}}),it.$on("click",t[7]);let mt=t[1]&&Ce();return{c(){e=n("main"),s=n("section"),a=n("h2"),f=n("span"),$=w("\n            Import dataset"),m=r(),g=n("input"),E=r(),I(b.$$.fragment),N=r(),x=n("section"),S=n("h2"),C=n("span"),j=w("\n            Current dataset"),z=r(),I(O.$$.fragment),_=r(),I(H.$$.fragment),U=r(),L=n("section"),M=n("h2"),G=n("span"),F=w("\n            Datasets"),K=r(),I(R.$$.fragment),Y=r(),J=n("section"),W=n("h2"),X=n("span"),Q=w("\n            Used storage"),Z=r(),I(tt.$$.fragment),et=r(),at=n("section"),nt=n("h2"),rt=n("span"),ct=w("\n            Clear caches"),ot=r(),I(it.$$.fragment),ht=r(),mt&&mt.c(),ft=P(),this.h()},l(t){e=c(t,"MAIN",{class:!0});var n=l(e);s=c(n,"SECTION",{class:!0});var r=l(s);a=c(r,"H2",{class:!0});var h=l(a);f=c(h,"SPAN",{class:!0}),l(f).forEach(o),$=y(h,"\n            Import dataset"),h.forEach(o),m=i(r),g=c(r,"INPUT",{type:!0,accept:!0}),E=i(r),k(b.$$.fragment,r),r.forEach(o),N=i(n),x=c(n,"SECTION",{class:!0});var u=l(x);S=c(u,"H2",{class:!0});var d=l(S);C=c(d,"SPAN",{class:!0}),l(C).forEach(o),j=y(d,"\n            Current dataset"),d.forEach(o),z=i(u),k(O.$$.fragment,u),_=i(u),k(H.$$.fragment,u),u.forEach(o),U=i(n),L=c(n,"SECTION",{class:!0});var p=l(L);M=c(p,"H2",{class:!0});var v=l(M);G=c(v,"SPAN",{class:!0}),l(G).forEach(o),F=y(v,"\n            Datasets"),v.forEach(o),K=i(p),k(R.$$.fragment,p),p.forEach(o),Y=i(n),J=c(n,"SECTION",{class:!0});var w=l(J);W=c(w,"H2",{class:!0});var I=l(W);X=c(I,"SPAN",{class:!0}),l(X).forEach(o),Q=y(I,"\n            Used storage"),I.forEach(o),Z=i(w),k(tt.$$.fragment,w),w.forEach(o),et=i(n),at=c(n,"SECTION",{class:!0});var T=l(at);nt=c(T,"H2",{class:!0});var D=l(nt);rt=c(D,"SPAN",{class:!0}),l(rt).forEach(o),ct=y(D,"\n            Clear caches"),D.forEach(o),ot=i(T),k(it.$$.fragment,T),T.forEach(o),n.forEach(o),ht=i(t),mt&&mt.l(t),ft=P(),this.h()},h(){h(f,"class","mdi mdi-database-plus-outline"),h(a,"class","svelte-1bhizqz"),h(g,"type","file"),h(g,"accept",".zip"),h(s,"class","svelte-1bhizqz"),h(C,"class","mdi mdi-database-check-outline"),h(S,"class","svelte-1bhizqz"),h(x,"class","svelte-1bhizqz"),h(G,"class","mdi mdi-database-outline"),h(M,"class","svelte-1bhizqz"),h(L,"class","wide svelte-1bhizqz"),h(X,"class","mdi mdi-database-outline"),h(W,"class","svelte-1bhizqz"),h(J,"class","svelte-1bhizqz"),h(rt,"class","mdi mdi-database-refresh-outline"),h(nt,"class","svelte-1bhizqz"),h(at,"class","svelte-1bhizqz"),h(e,"class","svelte-1bhizqz")},m(n,r){u(n,e,r),d(e,s),d(s,a),d(a,f),d(a,$),d(s,m),d(s,g),t[8](g),d(s,E),T(b,s,null),d(e,N),d(e,x),d(x,S),d(S,C),d(S,j),d(x,z),T(O,x,null),d(x,_),T(H,x,null),d(e,U),d(e,L),d(L,M),d(M,G),d(M,F),d(L,K),T(R,L,null),d(e,Y),d(e,J),d(J,W),d(W,X),d(W,Q),d(J,Z),T(tt,J,null),d(e,et),d(e,at),d(at,nt),d(nt,rt),d(nt,ct),d(at,ot),T(it,at,null),u(n,ht,r),mt&&mt.m(n,r),u(n,ft,r),ut=!0},p(t,[e]){const s={};8192&e&&(s.$$scope={dirty:e,ctx:t}),b.$set(s);const a={};8200&e&&(a.$$scope={dirty:e,ctx:t}),!B&&4&e&&(B=!0,a.value=t[2],V((()=>B=!1))),O.$set(a);const n={};8192&e&&(n.$$scope={dirty:e,ctx:t}),H.$set(n);const r={};8&e&&(r.datasets=t[3]),R.$set(r);const c={};8192&e&&(c.$$scope={dirty:e,ctx:t}),it.$set(c),t[1]?mt||(mt=Ce(),mt.c(),mt.m(ft.parentNode,ft)):mt&&(mt.d(1),mt=null)},i(t){ut||(p(b.$$.fragment,t),p(O.$$.fragment,t),p(H.$$.fragment,t),p(R.$$.fragment,t),p(tt.$$.fragment,t),p(it.$$.fragment,t),ut=!0)},o(t){v(b.$$.fragment,t),v(O.$$.fragment,t),v(H.$$.fragment,t),v(R.$$.fragment,t),v(tt.$$.fragment,t),v(it.$$.fragment,t),ut=!1},d(s){s&&o(e),t[8](null),D(b),D(O),D(H),D(R),D(tt),D(it),s&&o(ht),mt&&mt.d(s),s&&o(ft)}}}function ze(t,e,s){let a,n,r=!1,c=at.getInstance();g(t,c,(t=>s(3,a=t)));let l=(new X).getCurrentDatasetHash();return[n,r,l,a,c,async function(){let[t]=n.files;if(t){s(1,r=!0);let e=new X;await e.importDataset(t),s(1,r=!1),location.reload()}},function(){(new X).setCurrentDataset(l),location.reload()},async function(){await nt.getInstance().clearCache(),location.reload()},function(t){A[t?"unshift":"push"]((()=>{n=t,s(0,n)}))},function(t){l=t,s(2,l)}]}class Pe extends t{constructor(t){super(),e(this,t,ze,je,s,{})}}function Ve(t){let e;return{c(){e=w("Dashboard")},l(t){e=y(t,"Dashboard")},m(t,s){u(t,e,s)},d(t){t&&o(e)}}}function Oe(t){let e;return{c(){e=w("Characters")},l(t){e=y(t,"Characters")},m(t,s){u(t,e,s)},d(t){t&&o(e)}}}function Ae(t){let e;return{c(){e=w("Campaigns")},l(t){e=y(t,"Campaigns")},m(t,s){u(t,e,s)},d(t){t&&o(e)}}}function qe(t){let e;return{c(){e=w("Search content")},l(t){e=y(t,"Search content")},m(t,s){u(t,e,s)},d(t){t&&o(e)}}}function Be(t){let e;return{c(){e=w("Books")},l(t){e=y(t,"Books")},m(t,s){u(t,e,s)},d(t){t&&o(e)}}}function _e(t){let e;return{c(){e=w("Settings")},l(t){e=y(t,"Settings")},m(t,s){u(t,e,s)},d(t){t&&o(e)}}}function He(t){let e,s,a;return{c(){e=n("div"),this.h()},l(t){e=c(t,"DIV",{class:!0}),l(e).forEach(o),this.h()},h(){h(e,"class","scim svelte-fa48oc")},m(n,r){u(n,e,r),s||(a=$(e,"click",t[4]),s=!0)},p:N,d(t){t&&o(e),s=!1,a()}}}function Ue(t){let e,s,a,m,g,E,b,w,y,N,x,S,C,j,z,P,V,O,A,q,B,_,U,L,M=Object.values(Y).length>0;m=new dt({props:{icon:"view-dashboard-outline",path:"/",$$slots:{default:[Ve]},$$scope:{ctx:t}}}),E=new dt({props:{icon:"account",path:"/characters",$$slots:{default:[Oe]},$$scope:{ctx:t}}}),w=new dt({props:{icon:"bookmark",path:"/campaigns",$$slots:{default:[Ae]},$$scope:{ctx:t}}}),N=new dt({props:{icon:"map-search-outline",path:"/search",$$slots:{default:[qe]},$$scope:{ctx:t}}});let F=M&&function(t){let e,s;return e=new dt({props:{icon:"book-open-outline",path:"/books",$$slots:{default:[Be]},$$scope:{ctx:t}}}),{c(){I(e.$$.fragment)},l(t){k(e.$$.fragment,t)},m(t,a){T(e,t,a),s=!0},i(t){s||(p(e.$$.fragment,t),s=!0)},o(t){v(e.$$.fragment,t),s=!1},d(t){D(e,t)}}}(t);C=new dt({props:{icon:"cog-outline",path:"/settings",$$slots:{default:[_e]},$$scope:{ctx:t}}});let K=t[0]&&He(t);return B=new G({props:{routes:t[1],prefix:Le}}),{c(){e=n("main"),s=n("nav"),a=n("div"),I(m.$$.fragment),g=r(),I(E.$$.fragment),b=r(),I(w.$$.fragment),y=r(),I(N.$$.fragment),x=r(),F&&F.c(),S=r(),I(C.$$.fragment),z=r(),P=n("button"),V=n("span"),O=r(),K&&K.c(),A=r(),q=n("div"),I(B.$$.fragment),this.h()},l(t){e=c(t,"MAIN",{class:!0});var n=l(e);s=c(n,"NAV",{class:!0});var r=l(s);a=c(r,"DIV",{});var h=l(a);k(m.$$.fragment,h),g=i(h),k(E.$$.fragment,h),b=i(h),k(w.$$.fragment,h),y=i(h),k(N.$$.fragment,h),x=i(h),F&&F.l(h),S=i(h),k(C.$$.fragment,h),h.forEach(o),r.forEach(o),z=i(n),P=c(n,"BUTTON",{class:!0});var f=l(P);V=c(f,"SPAN",{class:!0}),l(V).forEach(o),f.forEach(o),O=i(n),K&&K.l(n),A=i(n),q=c(n,"DIV",{class:!0});var u=l(q);k(B.$$.fragment,u),u.forEach(o),n.forEach(o),this.h()},h(){h(s,"class",j=f(t[0]&&"open")+" svelte-fa48oc"),h(V,"class","mdi mdi-menu"),h(P,"class","svelte-fa48oc"),h(q,"class","content svelte-fa48oc"),h(e,"class","svelte-fa48oc")},m(n,r){u(n,e,r),d(e,s),d(s,a),T(m,a,null),d(a,g),T(E,a,null),d(a,b),T(w,a,null),d(a,y),T(N,a,null),d(a,x),F&&F.m(a,null),d(a,S),T(C,a,null),d(e,z),d(e,P),d(P,V),d(e,O),K&&K.m(e,null),d(e,A),d(e,q),T(B,q,null),_=!0,U||(L=[$(a,"click",t[2]),$(P,"click",t[3])],U=!0)},p(t,[a]){const n={};32&a&&(n.$$scope={dirty:a,ctx:t}),m.$set(n);const r={};32&a&&(r.$$scope={dirty:a,ctx:t}),E.$set(r);const c={};32&a&&(c.$$scope={dirty:a,ctx:t}),w.$set(c);const l={};32&a&&(l.$$scope={dirty:a,ctx:t}),N.$set(l);const o={};32&a&&(o.$$scope={dirty:a,ctx:t}),C.$set(o),(!_||1&a&&j!==(j=f(t[0]&&"open")+" svelte-fa48oc"))&&h(s,"class",j),t[0]?K?K.p(t,a):(K=He(t),K.c(),K.m(e,A)):K&&(K.d(1),K=null)},i(t){_||(p(m.$$.fragment,t),p(E.$$.fragment,t),p(w.$$.fragment,t),p(N.$$.fragment,t),p(F),p(C.$$.fragment,t),p(B.$$.fragment,t),_=!0)},o(t){v(m.$$.fragment,t),v(E.$$.fragment,t),v(w.$$.fragment,t),v(N.$$.fragment,t),v(F),v(C.$$.fragment,t),v(B.$$.fragment,t),_=!1},d(t){t&&o(e),D(m),D(E),D(w),D(N),F&&F.d(),D(C),K&&K.d(),D(B),U=!1,H(L)}}}const Le="";function Me(t,e,s){var a=!1;return[a,{"/characters":kt,"/search":Vt,"/books":_t,"/book/:id":se,"/settings/data":Pe,"/settings":ce,"/":Et},()=>s(0,a=!1),()=>s(0,a=!0),()=>s(0,a=!1)]}export default class extends t{constructor(t){super(),e(this,t,Me,Ue,s,{})}}
