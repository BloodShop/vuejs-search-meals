import { createApp } from "vue";
import router from "./router";
import store from "./store";
import "./style.css";
import App from "./App.vue";
import * as filters from "./filters";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDJTxhLV0c0nC6L32GrYJBIXMluAVAwIOM",
    authDomain: "meals-planet.firebaseapp.com",
    projectId: "meals-planet",
    storageBucket: "meals-planet.appspot.com",
    messagingSenderId: "578239607577",
    appId: "1:578239607577:web:c80f567ec05ec9c4260b88",
};

initializeApp(firebaseConfig);

let app;
onAuthStateChanged(getAuth(), (user) => {
    console.log(user);
    if (!app) {
        app = createApp(App);
        app.use(store).use(router).mount("#app");
        app.config.globalProperties.$filters = filters;
        app.config.productionTip = false;
    }
});

// https://www.themealdb.com/api.php
