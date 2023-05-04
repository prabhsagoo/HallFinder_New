export default async function updateUserInfo(
    uid,
    uName,
    fName,
    lName,
    pNumber,
    birthday,
    currentUser
  ) {
    const res = await fetch("/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([uid, uName, fName, lName, pNumber, birthday]),
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
  