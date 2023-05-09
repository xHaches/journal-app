// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVLx0TVYnSPDrzS7CjrXAYVFVpeMytm1A",
  authDomain: "react-cursos-8d840.firebaseapp.com",
  projectId: "react-cursos-8d840",
  storageBucket: "react-cursos-8d840.appspot.com",
  messagingSenderId: "9645325088",
  appId: "1:9645325088:web:e2bc5f496be1fa2cecb545"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);