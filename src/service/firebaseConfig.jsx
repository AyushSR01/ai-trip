// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Corrected here

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlQVdTKpUUDS9o0IoVRq3X9sh6tv_7AaY",
  authDomain: "ai-trip-plannar-44af7.firebaseapp.com",
  projectId: "ai-trip-plannar-44af7",
  storageBucket: "ai-trip-plannar-44af7.firebasestorage.app",
  messagingSenderId: "1005374984261",
  appId: "1:1005374984261:web:19ae21aa264b191ace532c",
  measurementId: "G-ENWBT8LEFN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Corrected here
// const analytics = getAnalytics(app);
