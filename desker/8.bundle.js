(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{341:function(A,t,e){"use strict";e.d(t,"b",function(){return u}),e.d(t,"c",function(){return Q}),e.d(t,"a",function(){return c}),e.d(t,"e",function(){return w}),e.d(t,"d",function(){return p}),e.d(t,"f",function(){return B});var n=e(350),a=e.n(n),r=e(351),o=e.n(r),s=e(361),i=e.n(s),g=(e(363),e(364),e(342)),c=i.a,u=i.a.initializeApp({apiKey:"AIzaSyDlbJuDxwDbUEU60cQFa1EFBDgsuCuCUq4",authDomain:"desker-github.firebaseapp.com",databaseURL:"https://desker-github.firebaseio.com",projectId:"desker-github",storageBucket:"",messagingSenderId:"66093677129"}),p=i.a.firestore();p.settings({cacheSizeBytes:i.a.firestore.CACHE_SIZE_UNLIMITED}),p.enablePersistence();var Q=p.collection("desker").doc(g.a);u.auth;function w(A){return v.apply(this,arguments)}function v(){return(v=o()(a.a.mark(function A(t){var e;return a.a.wrap(function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,t.get();case 2:return e=A.sent,A.abrupt("return",e.docs.map(function(A){return Object.assign({__id:A.id},A.data())}));case 4:case"end":return A.stop()}},A)}))).apply(this,arguments)}function B(){return Q.collection("users").doc(Object(g.c)().uid)}},342:function(A,t,e){"use strict";e.d(t,"a",function(){return n}),e.d(t,"b",function(){return a}),e.d(t,"c",function(){return r});var n;e(341);function a(){return function(A,t){for(var e="",n=0;n<t;n++){e+=A[Math.floor(Math.random()*A.length)]}return e}("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",9)}function r(){var A=JSON.parse(sessionStorage.getItem("u"));return null===A?"":A}n=document.URL.includes("http://localhost:")?"dev":"pro"},408:function(A,t,e){var n=e(518);"string"==typeof n&&(n=[[A.i,n,""]]),n.locals&&(A.exports=n.locals);(0,e(340).default)("55dd38e4",n,!0,{})},409:function(A,t,e){var n=e(520);"string"==typeof n&&(n=[[A.i,n,""]]),n.locals&&(A.exports=n.locals);(0,e(340).default)("baeac13a",n,!0,{})},410:function(A,t,e){var n=e(522);"string"==typeof n&&(n=[[A.i,n,""]]),n.locals&&(A.exports=n.locals);(0,e(340).default)("5347db05",n,!0,{})},516:function(A,t){A.exports="data:image/png;base64,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"},517:function(A,t,e){"use strict";var n=e(408);e.n(n).a},518:function(A,t,e){(A.exports=e(339)(!1)).push([A.i,'div.barbtn[data-v-14a5ab1e]{padding:0px 20px;cursor:pointer}div.barbtn p[data-v-14a5ab1e]{color:#212121;font-size:18px;font-family:"Roboto",sans-serif;margin:0;position:relative;top:50%;transform:translateY(-50%)}div.barbtn p.current[data-v-14a5ab1e]{font-weight:bold}\n',""])},519:function(A,t,e){"use strict";var n=e(409);e.n(n).a},520:function(A,t,e){(A.exports=e(339)(!1)).push([A.i,".appbar[data-v-6ac6e72a]{width:100%;height:64px;position:relative;background-color:white;-webkit-box-shadow:0px 5px 10px 0px #e0e0e0;-moz-box-shadow:0px 5px 10px 0px #e0e0e0;box-shadow:0px 5px 10px 0px #e0e0e0}.appbar>div[data-v-6ac6e72a]{float:left;height:64px}.appbar .logo[data-v-6ac6e72a]{width:64px}.appbar .logo img[data-v-6ac6e72a]{width:70%;height:70%;position:relative;top:50%;left:50%;transform:translate(-50%, -50%)}.appbar .divider[data-v-6ac6e72a]{width:1px;background-color:rgba(0,0,0,0.1)}\n",""])},521:function(A,t,e){"use strict";var n=e(410);e.n(n).a},522:function(A,t,e){(A.exports=e(339)(!1)).push([A.i,"#mainView{width:100%;height:100%}#mainView>div.view{width:100%;height:calc(100% - 114px)}\n",""])},539:function(A,t,e){"use strict";e.r(t);var n=e(341),a=e(342),r=[function(){var A=this.$createElement,t=this._self._c||A;return t("div",{staticClass:"logo"},[t("img",{attrs:{src:e(516)}})])}],o={props:["title"],data:function(){return{current:!1}},watch:{$route:function(A){this.current=A.meta.title===this.title}},created:function(){this.current=this.$router.currentRoute.meta.title===this.title}},s=(e(517),e(95)),i={components:{barbtn:Object(s.a)(o,function(){var t=this,A=t.$createElement,e=t._self._c||A;return e("div",{staticClass:"barbtn",on:{click:function(A){return t.$emit("click")}}},[e("p",{class:{current:t.current}},[t._t("default")],2)])},[],!1,null,"14a5ab1e",null).exports},methods:{navTo:function(A){this.$router.push({path:"/".concat(A)})},prjNav:function(A){this.$router.push("/project/".concat(this.$route.params.prjid,"/").concat(A))},showPrjNav:function(){return this.$route.meta.title.includes("prj-")||this.$route.meta.title.includes("app-")}}},g=(e(519),Object(s.a)(i,function(){var t=this,A=t.$createElement,e=t._self._c||A;return e("div",{staticClass:"appbar"},[t._m(0),t._v(" "),e("barbtn",{attrs:{title:"dashboard"},on:{click:function(A){return t.navTo("dashboard")}}},[t._v("Dashboard")]),t._v(" "),e("barbtn",{attrs:{title:"projects"},on:{click:function(A){return t.navTo("projects")}}},[t._v("Projects")]),t._v(" "),e("barbtn",{attrs:{title:"settings"},on:{click:function(A){return t.navTo("settings")}}},[t._v("Settings")]),t._v(" "),t.showPrjNav()?e("div",{staticClass:"divider"}):t._e(),t._v(" "),t.showPrjNav()?e("barbtn",{attrs:{title:"prj-overview"},on:{click:function(A){return t.prjNav("overview")}}},[t._v("Overview")]):t._e(),t._v(" "),t.showPrjNav()?e("barbtn",{attrs:{title:"prj-timeline"},on:{click:function(A){return t.prjNav("timeline")}}},[t._v("Timeline")]):t._e(),t._v(" "),t.showPrjNav()?e("barbtn",{attrs:{title:"prj-tasks"},on:{click:function(A){return t.prjNav("tasks")}}},[t._v("Tasks")]):t._e(),t._v(" "),t.showPrjNav()?e("barbtn",{attrs:{title:"prj-apps"},on:{click:function(A){return t.prjNav("apps")}}},[t._v("Apps")]):t._e(),t._v(" "),t.showPrjNav()?e("barbtn",{attrs:{title:"prj-settings"},on:{click:function(A){return t.prjNav("settings")}}},[t._v("Settings")]):t._e()],1)},r,!1,null,"6ac6e72a",null).exports);function c(){dataLayer.push(arguments)}function u(e){n.b.auth().onAuthStateChanged(function(A){if(null===A)console.log("NO USER"),e.$router.push({path:"/login"});else{var t=e.user;t.username=A.displayName,t.icon=A.photoURL,t.email=A.email,sessionStorage.setItem("u",JSON.stringify({uid:A.uid,username:A.displayName,usericon:A.photoURL}))}}),e.barTitle=e.$route.meta.title,"pro"===a.a&&c("config","UA-102147810-4",{page_title:e.$route.meta.title,page_path:e.$route.fullPath})}window.dataLayer=window.dataLayer||[],c("js",new Date),c("config","UA-102147810-4");var p={components:{appbar:g},data:function(){return{user:{username:"",icon:"",email:""}}},watch:{$route:function(A,t){u(this)}},created:function(){u(this)}},Q=(e(521),Object(s.a)(p,function(){var A=this.$createElement,t=this._self._c||A;return t("div",{attrs:{id:"mainView"}},[t("appbar"),this._v(" "),t("router-view")],1)},[],!1,null,null,null));t.default=Q.exports}}]);