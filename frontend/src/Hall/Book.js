import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";

export default async function Book(
    BUid, datePicker, fName, lName, pNumber, email, hAddress
  ) {
    const res = await fetch("/api/user/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([BUid, datePicker, fName, lName, pNumber, email, hAddress]),
    });
    if (!res.ok) {
      console.log("bad thing happened");
      const error = await res.json();
      console.log(error);
      // setErrorMessage(error.code);
    } else {
      const response = await res.json();
      console.log("response data is", response);
    }
  }