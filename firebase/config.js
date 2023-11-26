// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getfirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTl9x5vwn5MKckpaQr7lCJshHTZhQbH5w",
  authDomain: "carrito-app-f2d8d.firebaseapp.com",
  projectId: "carrito-app-f2d8d",
  storageBucket: "carrito-app-f2d8d.appspot.com",
  messagingSenderId: "445594714939",
  appId: "1:445594714939:web:526079614fe137eb986d1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getfirestore(app)