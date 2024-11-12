// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmpS4YNdCOvOtUnmpsaKplCotnNbIjjwI",
  authDomain: "educational-app-3f7b4.firebaseapp.com",
  projectId: "educational-app-3f7b4",
  storageBucket: "educational-app-3f7b4.firebasestorage.app",
  messagingSenderId: "1052853920241",
  appId: "1:1052853920241:web:005a4698108a1bb6b46450",
  measurementId: "G-P463M5YX0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);