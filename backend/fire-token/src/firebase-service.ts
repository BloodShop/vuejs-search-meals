var admin = require("firebase-admin");

var serviceAccount = require("../fire-vuejs-firebase-adminsdk-s80ik-8185e2aba1.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;
