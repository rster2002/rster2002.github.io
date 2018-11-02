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
var firestore = firebase.firestore()

firestore.settings({
    timestampsInSnapshots: true
});

var vueInstance = new Vue({
    el: "#app",
    data: {
        slide: 0
    },
    computed: {
        updatedStyle() {
            return `translateX(${this.slide * 100}%)`;
        }
    }
})




firestore.collection("school").doc("ckv-controller").onSnapshot(doc => {
    if (doc && doc.exists) {
        var data = doc.data();

    }
});
