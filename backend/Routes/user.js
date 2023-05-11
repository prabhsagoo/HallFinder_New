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

/* This code is defining a route for handling user login requests. When a POST request is made to the
"/login" endpoint, the function defined in the second argument is executed. The function extracts
the user's email and password from the request body, and then attempts to sign in the user using the
Firebase `signInWithEmailAndPassword` method. If the sign-in is successful, the user's information
is sent back in the response. If there is an error, the error message is logged to the console and a
403 status code is sent back in the response. */
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

/* This code is defining a route for handling user registration requests. When a POST request is made
to the "/reg" endpoint, the function defined in the second argument is executed. The function
extracts the user's name, email, and password from the request body, and then attempts to create a
new user using the Firebase `createUserWithEmailAndPassword` method. If the user creation is
successful, the user's display name is updated using the Firebase `updateProfile` method, and the
user's information is stored in the Firestore database using the `setDoc` method. If there is an
error, the error message is logged to the console and a 403 status code is sent back in the
response. */
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


/* This code is defining a route for handling user profile update requests. When a POST request is made
to the "/update" endpoint, the function defined in the second argument is executed. The function
extracts the user's updated profile information from the request body, and then updates the user's
information in the Firestore database using the `setDoc` method. If the update is successful, a 200
status code is sent back in the response with the message "Updated!". If there is an error, the
error message is logged to the console and a 403 status code is sent back in the response. */
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

/* This code is defining a route for handling booking requests. When a POST request is made to the
"/book" endpoint, the function defined in the second argument is executed. The function extracts the
booking information from the request body, and then stores the information in the Firestore database
using the `setDoc` method. If the booking is successful, a 200 status code is sent back in the
response with the message "Updated!". If there is an error, the error message is logged to the
console and a 403 status code is sent back in the response. */
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