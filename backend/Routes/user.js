import express from "express";
import {

    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
  } from "firebase/auth";
  import { auth, db } from "../Firebase/firebase.js";

  import {
    doc,
    setDoc,
  } from "firebase/firestore";

  export const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  const userData = req.body;
  try {
    const userCred = await signInWithEmailAndPassword(
      auth,
      userData[0],
      userData[1]
    );
    res.send(userCred.user);
  } catch (err) {
    console.error(err.message);
    res.status(403).send(err);
  }
});

//Register with email and password!

userRouter.post("/reg", async (req, res) => {
  const userData = req.body;
  console.log(userData);
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      userData[1],
      userData[2]
    );
    const user = response.user;
    await updateProfile(user, { displayName: userData[0] });

    const docRef = doc(db, "users", user.uid);
    await setDoc(
      docRef,
      {
        uid: user.uid,
        name: user.displayName,
        authProvider: "local",
        email: userData[1],
      },
      { merge: true }
    );
    // await addDoc(collection(db, "users"), {
    //   uid: user.uid,
    //   name: userData[0],
    //   authProvider: "local",
    //   email: userData[1],
    // });
    res.status(200).send(user);
  } catch (err) {
    console.error(err.message);
    res.status(403).send(err);
  }
});


userRouter.post("/update", async (req, res) => {
  const userData = req.body;
  try {
    
    const docRef = doc(db, "users", userData[0]);
    await setDoc(
      docRef,
      {
        uid: userData[0],
        name: userData[1],
        firstName: userData[2],
        lastName: userData[3],
        mobile: userData[4],
        birthday: userData[5]
      },
      { merge: true }
    );
    // await addDoc(collection(db, "users"), {
    //   uid: user.uid,
    //   name: userData[0],
    //   authProvider: "local",
    //   email: userData[1],
    // });
    res.status(200).send("Updated!");
  } catch (err) {
    console.error(err.message);
    res.status(403).send(err);
  }
});

userRouter.post("/book", async (req, res) => {
  const userData = req.body;
  try {
    
    const docRef = doc(db, "booking", userData[0]);
    await setDoc(
      docRef,
      {
        datePicker: userData[1],
        fName: userData[2],
        lName: userData[3],
        pNumber: userData[4],
        email: userData[5],
        hAddress: userData[6]
      },
      { merge: true }
    );
    
    res.status(200).send("Updated!");
  } catch (err) {
    console.error(err.message);
    res.status(403).send(err);
  }
});