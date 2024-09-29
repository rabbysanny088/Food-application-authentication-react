// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC44pQV-FmB42-pHvZJ8GTLGypgtPyvSJQ",
  authDomain: "ecommerce-87f5c.firebaseapp.com",
  projectId: "ecommerce-87f5c",
  storageBucket: "ecommerce-87f5c.appspot.com",
  messagingSenderId: "429994505117",
  appId: "1:429994505117:web:4d3c3eebed22a8a50ff574",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
