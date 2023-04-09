// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import getFirestore to access the Firestore instance


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqGZSvStI-kkV2FIh5RxI58sa1RMNhF7Q",
  authDomain: "grubsnub-64d1e.firebaseapp.com",
  projectId: "grubsnub-64d1e",
  storageBucket: "grubsnub-64d1e.appspot.com",
  messagingSenderId: "780754803908",
  appId: "1:780754803908:web:4d3dc5c145bedb4c227d91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;