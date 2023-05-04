import { storage } from "../Firebase/firebase";

import { getDownloadURL, listAll, ref } from "firebase/storage";

export default function getProfilePic(res) {
  const imageListRef = ref(storage, `images/${res.uid}`);
  listAll(imageListRef).then((res) => {
    res.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        console.log("Hiiiiiii!" + url);
        localStorage.setItem("imageUrl", url);
        document.getElementById("profilePic").src = url;
      });
    });
  });
}