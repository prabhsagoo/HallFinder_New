import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const apiKey = "AIzaSyDYSiHH3HIjdIebo7HE9wGeAzQpiOF7EwM";
const authDomain = "community-resources-3816b.firebaseapp.com";
const projectId = "community-resources-3816b";
const storageBucket = "community-resources-3816b.appspot.com";
const messagingSenderId = "252130542906";
const appId = "1:252130542906:web:49389961e353259f3afc03";

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const storageRef = ref(storage, 'images');

const auth = getAuth(app);

const db = getFirestore(app);

export {
    firebaseConfig,
    auth,
    db,
    storage,
  };