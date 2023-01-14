// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLf97N2t1eHOTODv4RMger2cEKvAQNVxY",
  authDomain: "wunmexpo-61a57.firebaseapp.com",
  projectId: "wunmexpo-61a57",
  storageBucket: "wunmexpo-61a57.appspot.com",
  messagingSenderId: "848065333842",
  appId: "1:848065333842:web:fe4b1a9d173783176ded8b",
  measurementId: "G-KCCGM699Z0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);