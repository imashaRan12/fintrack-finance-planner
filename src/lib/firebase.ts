
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDozNmoM1M_9lRvkYCz6pvMPyzwFQ-lM-Q",
  authDomain: "fintrack-eb3ec.firebaseapp.com",
  projectId: "fintrack-eb3ec",
  storageBucket: "fintrack-eb3ec.firebasestorage.app",
  messagingSenderId: "680655926698",
  appId: "1:680655926698:web:eb2439e7919f48259de7d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// For debugging domain issues
const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
console.log("Current origin:", currentOrigin);
console.log("Authorized domains in Firebase:", ["localhost", "fintrack-eb3ec.firebaseapp.com", "fintrack-eb3ec.web.app"]);
console.log("To fix Google authentication, add this domain to Firebase Console: ", currentOrigin);

export { auth, db };
