import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2m6uOwJ8jeYo7RqiFL2eSFYKT-Sugmxg",
  authDomain: "karaoke-app-a5e66.firebaseapp.com",
  projectId: "karaoke-app-a5e66",
  storageBucket: "karaoke-app-a5e66.firebasestorage.app",
  messagingSenderId: "325077159657",
  appId: "1:325077159657:web:3649464144efcbe8482a78"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);