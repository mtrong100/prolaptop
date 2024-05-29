import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCtVLKtq87_zfZ6uV2N4NFUKAGsB9mkIKM",
  authDomain: "prolaptop-81ef9.firebaseapp.com",
  projectId: "prolaptop-81ef9",
  storageBucket: "prolaptop-81ef9.appspot.com",
  messagingSenderId: "718264946122",
  appId: "1:718264946122:web:a3cba5cd64df25b6815333",
  measurementId: "G-9W774YQVS4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
