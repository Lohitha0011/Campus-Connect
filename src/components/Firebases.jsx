import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage'; // Import storage module for handling images
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAdI2Gbno7_McJjmfU4m2UWGFlCLnOGHU",
  authDomain: "reactproject-977ac.firebaseapp.com",
  projectId: "reactproject-977ac",
  storageBucket: "reactproject-977ac.appspot.com",
  messagingSenderId: "79060418023",
  appId: "1:79060418023:web:99ca23b1636bfd5ff99142",
  measurementId: "G-CQV11XS7F5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const database = firebase.database();
const storage = firebase.storage();

export const dataRef = database;
export const storageRef = storage.ref(); // Reference to the Firebase Storage
export const auth = getAuth();
export const messagesRef = database.ref('messages'); // Add this line
export default firebase;