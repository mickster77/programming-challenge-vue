// npm install firebase --save

import firebase from 'firebase'
// tidbits
const firebaseConfig = {
    apiKey: "AIzaSyCFILP-uSyQEvjp1mqcjadbWCkR0j5iMPw",
    authDomain: "the-director-s-cup.firebaseapp.com",
    projectId: "the-director-s-cup",
    storageBucket: "the-director-s-cup.appspot.com",
    messagingSenderId: "409428751128",
    appId: "1:409428751128:web:e8a092dd7ceba08b6fa46d",
    measurementId: "G-FK4Q4HT3HH"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp
// export let db = firebaseApp.firestore(), storage = firebaseApp.storage()
