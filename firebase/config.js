// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALgZymGdTS9wTTn8iLwzZfoP6r29a14Js",
  authDomain: "finalcoderhouse-77efd.firebaseapp.com",
  projectId: "finalcoderhouse-77efd",
  storageBucket: "finalcoderhouse-77efd.appspot.com",
  messagingSenderId: "467476982265",
  appId: "1:467476982265:web:a508a747bc2a207916b528",
  measurementId: "G-GG8LB1B4QQ"
};
if (typeof window !== "undefined") {
  const analytics = getAnalytics(app);
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db= getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth (app)