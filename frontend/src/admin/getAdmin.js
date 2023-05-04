import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";


export default async function getAdmin(res)
{
    
    const docRef = doc(db, "booking", res.uid);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    return docSnap.data();

};