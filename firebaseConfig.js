import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "cloudyday-d5587.firebaseapp.com",
  projectId: "cloudyday-d5587",
  storageBucket: "cloudyday-d5587.appspot.com",
  messagingSenderId: "983576855649",
  appId: "1:983576855649:web:3c48c7122ef131ca545620",
};

export const app = initializeApp(firebaseConfig);
