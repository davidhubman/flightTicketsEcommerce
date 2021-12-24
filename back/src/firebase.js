const admin = require("firebase-admin");
const firebase = require('firebase-admin');

const serviceAccount = require("./serviceAccountGoogle.json");

const firebaseConfig = {
  databaseUrl: "https://dev-sky-project-default-rtdb.firebaseio.com/",
  apiKey: "AIzaSyBSsYnNWVR7UflVcvwaAqdYs19x_rMhE3Y",
  authDomain: "dev-sky-project.firebaseapp.com",
  projectId: "dev-sky-project",
  storageBucket: "dev-sky-project.appspot.com",
  messagingSenderId: "53040925044",
  appId: "1:53040925044:web:fa0ccefaa8c5891759c421",
  credential: admin.credential.cert(serviceAccount),
};

const db = firebase.initializeApp(firebaseConfig);

module.exports = db;