// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9oJfDJzBj4xJouZCh4BMnX-btg5VJemA",
  authDomain: "entrega2coder.firebaseapp.com",
  projectId: "entrega2coder",
  storageBucket: "entrega2coder.appspot.com",
  messagingSenderId: "176545121543",
  appId: "1:176545121543:web:e3be17ccf1060a7cbbb1a2",
  measurementId: "G-N579FTXBR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)
export const storage = getStorage(app)