import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// For debugging domain issues
const currentOrigin =
  typeof window !== "undefined" ? window.location.origin : "";
console.log("Current origin:", currentOrigin);
console.log("Authorized domains in Firebase:", [
  "localhost",
  "fintrack-eb3ec.firebaseapp.com",
  "fintrack-eb3ec.web.app",
]);
console.log(
  "To fix Google authentication, add this domain to Firebase Console: ",
  currentOrigin
);

export { auth, db };
