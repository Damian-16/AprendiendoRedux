import firebase from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCqppNlIGciWrShI10ovFvUG4GLXn6uLBE",
    authDomain: "proyecto1-c3225.firebaseapp.com",
    projectId: "proyecto1-c3225",
    storageBucket: "proyecto1-c3225.appspot.com",
    messagingSenderId: "397580515056",
    appId: "1:397580515056:web:455ba185f82c3765a6b435"
}
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export default {auth,firebase}