// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCApWKrBTgAkO0L_sEHoyCCLFQxfnYqxm4",
  authDomain: "bdaysite.firebaseapp.com",
  databaseURL:
    "https://bdaysite-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bdaysite",
  storageBucket: "bdaysite.firebasestorage.app",
  messagingSenderId: "381555277970",
  appId: "1:381555277970:web:ca4872268178d56e95264b",
  measurementId: "G-7D2WLRYFMN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
