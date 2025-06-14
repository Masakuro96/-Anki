
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore/lite'; // Changed this line

// IMPORTANT: Replace these placeholder values with your actual Firebase project configuration.
// You can find these details in the Firebase console:
// Project settings > General > Your apps > Firebase SDK snippet > Config.
// For security, it's best practice to store sensitive credentials in environment variables
// and configure your build process to make them available to your application.
const firebaseConfig = {
  apiKey: "AIzaSyA5RGDhueKi-9Ku4ZZZo6-C0drCboZl6Bc",
  authDomain: "antmst-7a5cc.firebaseapp.com",
  projectId: "antmst-7a5cc",
  storageBucket: "antmst-7a5cc.firebasestorage.app",
  messagingSenderId: "168428069576",
  appId: "1:168428069576:web:283aae756d721e20863bfd"
};

let app: FirebaseApp | undefined = undefined;
let auth: Auth | undefined = undefined;
let db: Firestore | undefined = undefined;
let firebaseInitializationError: Error | null = null;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  // Initialize Firebase Authentication and Firestore
  auth = getAuth(app);
  db = getFirestore(app);
  console.log("Firebase app, Auth, and Firestore initialized successfully from src/firebase.ts.");
} catch (error) {
  console.error("Firebase initialization failed in src/firebase.ts:", error);
  firebaseInitializationError = error instanceof Error ? error : new Error(String(error));
  // If initialization fails, app, auth, and db will remain undefined.
}

export { app, auth, db, firebaseInitializationError };
