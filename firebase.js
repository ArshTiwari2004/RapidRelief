import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Config
const firebaseConfig = {
  apiKey: "AIzaSyBqtBmrWgwa0ZFf2Q4Wr3wSnuKXsNErcDU",
  authDomain: "hackfrosh-app.firebaseapp.com",
  projectId: "hackfrosh-app",
  storageBucket: "hackfrosh-app.appspot.com",
  messagingSenderId: "492282259174",
  appId: "1:492282259174:web:1525e10f75e7dda7047d27",
  measurementId: "G-GY2PZN327T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);