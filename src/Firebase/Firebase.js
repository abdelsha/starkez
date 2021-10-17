import firebase from "firebase"; 
import React from "react";

const firebaseConfig = {
    apiKey: "AIzaSyBecW8lIqJvRsdhjwXCw2j_rCIdM2GQJj0",
    authDomain: "starkez-6a472.firebaseapp.com",
    projectId: "starkez-6a472",
    storageBucket: "starkez-6a472.appspot.com",
    messagingSenderId: "865564202251",
    appId: "1:865564202251:web:e0ad8d4e3b0d44afc83e0e"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
const storage= firebase.storage();


export { auth,provider,storage};
export default db;