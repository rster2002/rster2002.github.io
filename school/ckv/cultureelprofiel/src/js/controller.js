// Initialize Firebase
var config = {
    apiKey: "AIzaSyDCgnh6ezKcNkcpAUtGXuiN77jxlDbLPck",
    authDomain: "dewebsite-bae27.firebaseapp.com",
    databaseURL: "https://dewebsite-bae27.firebaseio.com",
    projectId: "dewebsite-bae27",
    storageBucket: "dewebsite-bae27.appspot.com",
    messagingSenderId: "437303961105"
};
firebase.initializeApp(config);
var firestore = firebase.firestore().settings({
    timestampsInSnapshots: true
});

var vueInstance = new Vue({
    el: "#app",
    
})




firestore.collection("school").doc("ckv-controller").onSnapshot(doc => {
    if (doc && doc.exists) {
        var data = doc.data();

    }
});
