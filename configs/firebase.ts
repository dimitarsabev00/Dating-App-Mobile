// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore();
const timestamp = serverTimestamp();

export { auth, db, timestamp };
