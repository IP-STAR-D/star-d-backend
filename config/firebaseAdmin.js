var admin = require("firebase-admin");

var serviceAccount = require("./star-d-b36f2-firebase-adminsdk-wlnot-79728379f2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = admin;
