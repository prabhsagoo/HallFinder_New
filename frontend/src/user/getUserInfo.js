import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";

export default async function getUserInfo(res)
{
    
    const docRef = doc(db, "users", res.uid);
    const docSnap = await getDoc(docRef);
    
    document.getElementById("inputUsername").value =
    docSnap.data().name;
    docSnap.data().firstName !=undefined?document.getElementById("inputFirstName").value =
    docSnap.data().firstName:"";
    docSnap.data().lastName!=undefined?document.getElementById("inputLastName").value =
    docSnap.data().lastName:"";
    document.getElementById("inputEmailAddress").value =
    docSnap.data().email;
    docSnap.data().mobile!=undefined?document.getElementById("inputPhone").value =
    docSnap.data().mobile:"";
    docSnap.data().birthday!=undefined?document.getElementById("inputBirthday").value =
    docSnap.data().birthday:"";

};