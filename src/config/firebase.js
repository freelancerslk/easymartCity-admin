// src/firebase.js

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQzjJ00srSRl5NVMT1bVjcjgvTKfrtKbQ",
    authDomain: "easymartlk-93b8c.firebaseapp.com",
    databaseURL: "https://easymartlk-93b8c.firebaseio.com",
    projectId: "easymartlk-93b8c",
    storageBucket: "easymartlk-93b8c.appspot.com",
    messagingSenderId: "711781780063",
    appId: "1:711781780063:web:b68555093fae33558c69ea",
    measurementId: "G-DG1857BXVK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();