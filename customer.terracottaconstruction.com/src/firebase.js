import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmReO7b5fTWUVLkhPH8MDwPLB94vrIMSM",
  authDomain: "customerportal-e8be1.firebaseapp.com",
  projectId: "customerportal-e8be1",
  storageBucket: "customerportal-e8be1.firebasestorage.app",
  messagingSenderId: "73729856891",
  appId: "1:73729856891:web:a16ecb2320cb5c006f99de"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
