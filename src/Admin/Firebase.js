
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCjpSe78d-0RjgS6ghv14nDQHvma1SGOns",
  authDomain: "luminous-wears.firebaseapp.com",
  projectId: "luminous-wears",
  storageBucket: "luminous-wears.appspot.com",
  messagingSenderId: "578268688885",
  appId: "1:578268688885:web:0b1b15df35305f5b04b0bc",
  measurementId: "G-H3CJL8E0FG"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage ,auth};