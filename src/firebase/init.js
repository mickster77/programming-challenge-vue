// npm install firebase --save

import firebase from 'firebase'
// tidbits
const firebaseConfig = {
    apiKey: "AIzaSyBImaT0czV-OgeMNIzafcaOUVM7hlsaifY",
    authDomain: "nr-programming-challenge-460b8.firebaseapp.com",
    databaseURL: "https://nr-programming-challenge-460b8.firebaseio.com",
    projectId: "nr-programming-challenge-460b8",
    storageBucket: "nr-programming-challenge-460b8.appspot.com",
    messagingSenderId: "1044972327010",
    appId: "1:1044972327010:web:e6e5d6b55be5dd7fcfc13b",
    measurementId: "G-11XK0YH0GY"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp
// export let db = firebaseApp.firestore(), storage = firebaseApp.storage()
