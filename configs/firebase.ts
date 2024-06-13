// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1lAgRJoDUJQkDzoBGPtOyUY7SygJMWtk",
  authDomain: "dating-app-mobile.firebaseapp.com",
  projectId: "dating-app-mobile",
  storageBucket: "dating-app-mobile.appspot.com",
  messagingSenderId: "712630850994",
  appId: "1:712630850994:web:c6ed5c4a8ba53d62f200ab",
  measurementId: "G-DL5NLFTHHP",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
