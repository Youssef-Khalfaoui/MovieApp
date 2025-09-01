import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAA_Ah0qlf8qqvhs1GBK9QNyytJZwTHeSo",
  authDomain: "movie-app-4c782.firebaseapp.com",
  projectId: "movie-app-4c782",
  storageBucket: "movie-app-4c782.firebasestorage.app",
  messagingSenderId: "1041027985970",
  appId: "1:1041027985970:web:82b6bdc828ea5399e4022b",
  measurementId: "G-1C35D9341C"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { db, auth, provider, storage, analytics };