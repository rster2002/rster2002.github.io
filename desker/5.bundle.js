(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{341:function(t,e,r){"use strict";r.d(e,"b",function(){return p}),r.d(e,"c",function(){return f}),r.d(e,"a",function(){return d}),r.d(e,"e",function(){return h}),r.d(e,"d",function(){return l}),r.d(e,"f",function(){return x});var o=r(350),n=r.n(o),a=r(351),s=r.n(a),i=r(361),c=r.n(i),u=(r(363),r(364),r(342)),d=c.a,p=c.a.initializeApp({apiKey:"AIzaSyDlbJuDxwDbUEU60cQFa1EFBDgsuCuCUq4",authDomain:"desker-github.firebaseapp.com",databaseURL:"https://desker-github.firebaseio.com",projectId:"desker-github",storageBucket:"",messagingSenderId:"66093677129"}),l=c.a.firestore();l.settings({cacheSizeBytes:c.a.firestore.CACHE_SIZE_UNLIMITED}),l.enablePersistence();var f=l.collection("desker").doc(u.a);p.auth;function h(t){return b.apply(this,arguments)}function b(){return(b=s()(n.a.mark(function t(e){var r;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.get();case 2:return r=t.sent,t.abrupt("return",r.docs.map(function(t){return Object.assign({__id:t.id},t.data())}));case 4:case"end":return t.stop()}},t)}))).apply(this,arguments)}function x(){return f.collection("users").doc(Object(u.c)().uid)}},342:function(t,e,r){"use strict";r.d(e,"a",function(){return o}),r.d(e,"b",function(){return n}),r.d(e,"c",function(){return a});var o;r(341);function n(){return function(t,e){for(var r="",o=0;o<e;o++){r+=t[Math.floor(Math.random()*t.length)]}return r}("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",9)}function a(){var t=JSON.parse(sessionStorage.getItem("u"));return null===t?"":t}o=document.URL.includes("http://localhost:")?"dev":"pro"},343:function(t,e,r){var o=r(357);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,r(340).default)("39e577b2",o,!0,{})},356:function(t,e,r){"use strict";var o=r(343);r.n(o).a},357:function(t,e,r){(t.exports=r(339)(!1)).push([t.i,".card[data-v-84d60fc6]{background-color:#fff;-webkit-box-shadow:0px 5px 10px 0px #e0e0e0;-moz-box-shadow:0px 5px 10px 0px #e0e0e0;box-shadow:0px 5px 10px 0px #e0e0e0;border-radius:5px;padding:24px 16px;display:inline-block}\n",""])},358:function(t,e,r){"use strict";var o={},n=(r(356),r(95)),a=Object(n.a)(o,function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"card",on:{click:function(t){return e.$emit("click")}}},[e._t("default")],2)},[],!1,null,"84d60fc6",null);e.a=a.exports},360:function(t,e){t.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}},369:function(t,e,r){var o=r(412);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,r(340).default)("39978105",o,!0,{})},411:function(t,e,r){"use strict";var o=r(369);r.n(o).a},412:function(t,e,r){(t.exports=r(339)(!1)).push([t.i,'.popup{position:fixed;top:0px;left:0px;z-index:6;height:100%;width:100%;background-color:rgba(0,0,0,0.2)}.popup .popupCard{position:relative;top:50%;left:50%;transform:translate(-50%, -50%);width:70%;height:70%;max-width:935px;background-color:#fff;background-color:#fff;-webkit-box-shadow:0px 5px 10px 0px #e0e0e0;-moz-box-shadow:0px 5px 10px 0px #e0e0e0;box-shadow:0px 5px 10px 0px #e0e0e0;border-radius:5px;padding:32px}.popup .popupCard h1{margin:0;font-family:"Roboto",sans-serif;font-size:48px}\n',""])},415:function(t,e,r){"use strict";r.d(e,"a",function(){return i});var o=r(360),n=r.n(o),a=r(342),s=r(341);function i(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};s.c.collection("projects").doc(t).update(function(e){for(var t=1;t<arguments.length;t++)if(t%2){var r=null!=arguments[t]?arguments[t]:{},o=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),o.forEach(function(t){n()(e,t,r[t])})}else Object.defineProperties(e,Object.getOwnPropertyDescriptors(arguments[t]));return e}({lastActivity:Date.now(),lastActivityBy:Object(a.c)()},e))}},416:function(t,e,r){var o=r(528);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,r(340).default)("87ffbe08",o,!0,{})},421:function(t,e,r){"use strict";var o={props:["value"],methods:{close:function(){this.$emit("input",!1)}}},n=(r(411),r(95)),a=Object(n.a)(o,function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.value?r("div",{staticClass:"popup",on:{click:function(t){return t.target!==t.currentTarget?null:e.close()}}},[r("div",{staticClass:"popupCard"},[e._t("default")],2)]):e._e()},[],!1,null,null,null);e.a=a.exports},527:function(t,e,r){"use strict";var o=r(416);r.n(o).a},528:function(t,e,r){(t.exports=r(339)(!1)).push([t.i,'.view.tasks .grid{padding:0px 48px;width:calc(100% - 94px)}.view.tasks .card{float:left;width:calc(25% - 65px);margin:16px;padding-bottom:10px !important;cursor:pointer}.view.tasks .card h1:not(.material-icons){font-size:24px;margin:0;font-family:"Roboto",sans-serif;color:#000}.view.tasks .card p{font-family:"Roboto",sans-serif;font-size:16px;margin:0;margin-top:16px;margin-bottom:8px;color:rgba(0,0,0,0.7)}.view.tasks .card .bar{width:100%;height:8px;border-radius:4px;background-color:rgba(0,0,0,0.1)}.view.tasks .card .bar .progress{height:8px;min-width:8px;border-radius:4px;background-color:#212121}.view.tasks .card .footer{height:32px;width:100%;margin-top:8px}.view.tasks .card .footer .text{width:calc(100% - 32px);height:100%;float:left}.view.tasks .card .footer .text p{margin:0;font-size:16px;font-family:"Roboto",sans-serif;position:relative;top:50%;transform:translateY(-50%)}.view.tasks .card .footer .user{width:32px;height:100%;float:left}.view.tasks .card .footer .user img{border-radius:50%;height:100%;width:100%}.view.tasks .card.add{height:120px;background-color:transparent;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;border:2px solid rgba(0,0,0,0.3);cursor:pointer}.view.tasks .card.add h1{color:rgba(0,0,0,0.3);text-align:center;width:100%;margin:0;font-size:48px;position:relative;top:50%;transform:translateY(-50%)}\n',""])},545:function(t,e,r){"use strict";r.r(e);var o=r(350),n=r.n(o),a=r(351),s=r.n(a),i=r(358),c=(r(421),r(342)),u=r(341),d=r(415),p=u.a.firestore.FieldValue.increment(1),l={components:{card:i.a},data:function(){return{tasks:[]}},methods:{newTask:function(){var t=this,e=Object(c.b)(),r=u.c.collection("projects").doc(this.$route.params.prjid).collection("tasks").doc(e),o=u.c.collection("projects").doc(this.$route.params.prjid).collection("projectData").doc("tasks"),n=u.d.batch();n.set(r,{id:e,createdBy:Object(c.c)(),lastModifiedBy:Object(c.c)(),layer:0,parent:"root",rootParents:[],createdAt:Date.now(),lastModifiedAt:Date.now(),tags:[],dueBy:null,subtasks:0,subtasksDone:0,body:{title:"New task",description:""}}),n.set(o,{current:p,totalEver:p},{merge:!0}),n.commit().then(function(){Object(d.a)(t.$route.params.prjid),t.$router.push("/project/".concat(t.$route.params.prjid,"/task/").concat(e))})},progress:function(t){return 0===t.subtasksDone?"0%":Math.round(t.subtasksDone/t.subtasks*100)+"%"},activity:function(t){var e=Date.now()-t.lastModifiedAt,r="ms";return 1e3<=e&&(e=Math.round(e/1e3),r="second"),60<=e&&"second"==r&&(e=Math.round(e/60),r="minute"),60<=e&&"minute"==r&&(e=Math.round(e/60),r="hour"),24<=e&&"hour"==r&&(e=Math.round(e/24),r="day"),7<=e&&"day"==r&&(e=Math.round(e/7),r="week"),4<=e&&"week"==r&&(e=Math.round(e/4),r="month"),12<=e&&"month"==r&&(e=Math.round(e/12),r="year"),1<e&&(r+="s"),e+" "+r},opentask:function(t){sessionStorage.setItem("::temp",JSON.stringify(t));var e="./task/".concat(t.id);console.log(e),this.$router.push(e)}},created:function(){var o=this;return s()(n.a.mark(function t(){var e,r;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=o.$route.params.prjid,t.next=3,Object(u.e)(u.c.collection("projects").doc(e).collection("tasks").where("parent","==","root"));case 3:r=t.sent,o.tasks=r;case 5:case"end":return t.stop()}},t)}))()}},f=(r(527),r(95)),h=Object(f.a)(l,function(){var r=this,t=r.$createElement,o=r._self._c||t;return o("div",{staticClass:"view tasks"},[o("h1",[r._v("Tasks")]),r._v(" "),o("div",{staticClass:"grid"},[r._l(r.tasks,function(e){return o("card",{key:e.id,on:{click:function(t){return r.opentask(e)}}},[""===e.body.title?o("h1",[r._v("Untitled task")]):o("h1",[r._v(r._s(e.body.title))]),r._v(" "),o("p",[r._v("Progress")]),r._v(" "),o("div",{staticClass:"bar"},[o("div",{staticClass:"progress",style:{width:r.progress(e)}})]),r._v(" "),o("div",{staticClass:"footer"},[o("div",{staticClass:"text"},[o("p",[r._v("Last activity was "+r._s(r.activity(e))+" ago by")])]),r._v(" "),o("div",{staticClass:"user"},[o("img",{attrs:{src:e.lastModifiedBy.usericon}})])])])}),r._v(" "),o("card",{staticClass:"add",on:{click:r.newTask}},[o("h1",{staticClass:"material-icons"},[r._v("add")])])],2)])},[],!1,null,null,null);e.default=h.exports}}]);