import { initializeApp } from "firebase/app";

import {
    getAuth, sendPasswordResetEmail
    
  } from "firebase/auth";
  import {
    getFirestore,
   
  } from "firebase/firestore";
  
  import { getStorage, ref } from "firebase/storage";
  
  const apiKey = "AIzaSyDYSiHH3HIjdIebo7HE9wGeAzQpiOF7EwM";
  const authDomain = "community-resources-3816b.firebaseapp.com";
  const projectId = "community-resources-3816b";
  const storageBucket = "community-resources-3816b.appspot.com";
  const messagingSenderId = "252130542906";
  const appId = "1:252130542906:web:49389961e353259f3afc03";
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const storageRef = ref(storage, 'images');
  
  //const auth = firebase.auth();
  const auth = getAuth(app);
  
  const db = getFirestore(app);
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  export {
    firebaseConfig,
    auth,
    db,
    storage,
    signInWithGoogle,
    sendPasswordReset
  };