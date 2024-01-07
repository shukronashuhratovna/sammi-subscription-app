import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDIvy8Z19U7mXWMaUkY8aR62tQoqpAnzAo",
    authDomain: "movie-app-baff2.firebaseapp.com",
    projectId: "movie-app-baff2",
    storageBucket: "movie-app-baff2.appspot.com",
    messagingSenderId: "978577844488",
    appId: "1:978577844488:web:9c623c669e0af0c03824bd",
    measurementId: "G-C9NJ1YF1FR"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth();

export default app;
export { db, auth };
