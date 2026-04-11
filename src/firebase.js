import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuqwXSYJXT-XUlTC_SMmJv0CwU-FqdHtI",
  authDomain: "finance-app-972ae.firebaseapp.com",
  projectId: "finance-app-972ae",
  storageBucket: "finance-app-972ae.firebasestorage.app",
  messagingSenderId: "290010635888",
  appId: "1:290010635888:web:cee7e8ca68e593eaba9eb5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();