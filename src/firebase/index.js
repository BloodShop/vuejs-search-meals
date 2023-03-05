// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDJTxhLV0c0nC6L32GrYJBIXMluAVAwIOM",
    authDomain: "meals-planet.firebaseapp.com",
    projectId: "meals-planet",
    storageBucket: "meals-planet.appspot.com",
    messagingSenderId: "578239607577",
    appId: "1:578239607577:web:c80f567ec05ec9c4260b88",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
