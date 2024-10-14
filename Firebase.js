// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw3LadobAFQCsebz8VE55TwU6Iv_LJlEQ",
  authDomain: "appcorosal.firebaseapp.com",
  projectId: "appcorosal",
  storageBucket: "appcorosal.appspot.com",
  messagingSenderId: "957666173526",
  appId: "1:957666173526:web:8634c69efb649be67311f7"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);

export {app, firebase}