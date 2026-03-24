import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDLykcQXvkMnijHknnBG3d6erqFk2CVRYY",
    authDomain: "unibcomp-9ef88.firebaseapp.com",
    projectId: "unibcomp-9ef88",
    storageBucket: "unibcomp-9ef88.firebasestorage.app",
    messagingSenderId: "224343532966",
    appId: "1:224343532966:web:9f2a1ecff09313c89a1b67",
    measurementId: "G-8VKN0QG5E9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();