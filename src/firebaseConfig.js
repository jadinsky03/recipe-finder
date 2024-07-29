// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzwfj9EShD5AQX7yx6Mt4r79IoXOForAs",
  authDomain: "fir-101-c7139.firebaseapp.com",
  projectId: "fir-101-c7139",
  storageBucket: "fir-101-c7139.appspot.com",
  messagingSenderId: "146075157875",
  appId: "1:146075157875:web:d87c6fb5470ed32e7bf106",
  measurementId: "G-JW3Q9LYVJH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
