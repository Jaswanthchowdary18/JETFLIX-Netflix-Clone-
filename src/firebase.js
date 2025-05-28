import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAmYkI1-o_-hc4ESVWAyMWH-rPEkkPj4fc",
  authDomain: "jetflix-31dc9.firebaseapp.com",
  projectId: "jetflix-31dc9",
  storageBucket: "jetflix-31dc9.appspot.com",
  messagingSenderId: "917447812874",
  appId: "1:917447812874:web:04c9ce7c066053c1467cf3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup Function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    toast.success("Signup successful!");
    return true;
  } catch (error) {
    console.error(error.code);
    toast.error(error.code.split('/')[1].split('-').join(" "));
    return false;
  }
};

// Login Function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
    return true;
  } catch (error) {
    console.error(error.code);
    toast.error(error.code.split('/')[1].split('-').join(" "));
    return false;
  }
};

// Updated Logout Function
const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully!");
  } catch (error) {
    console.error(error.code);
    toast.error("Logout failed.");
  }
};

export { auth, db, signup, login, logout };
