import React, { useContext, useEffect, useState } from "react";
import "./UserProfile.css";
import { AuthContext } from "../components/auth";
import Button from "@mui/material/Button";
import { storage } from "../Firebase/firebase";
import {
    getDownloadURL,
    listAll,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
  import { MuiFileInput } from "mui-file-input";
  import Swal from "sweetalert2";
  import { useNavigate } from "react-router-dom";
  import getUserInfo from "./getUserInfo";
  import updateUserInfo from "./updateUserInfo";

const UserProfile = () => {
    const { currentUser, setCurrentUser, image, setImage } =
    useContext(AuthContext);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState(null);

  let currentUserData = [];
  const navigate = useNavigate();

  //! Image upload
  const handleChange = (newFile) => {
    setImageUpload(newFile);
  };

  //! Update user info

  const update = async () => {
    const uName = document.getElementById("inputUsername").value;
    const fName = document.getElementById("inputFirstName").value;
    const lName = document.getElementById("inputLastName").value;
    const pNumber = document.getElementById("inputPhone").value;
    const birthday = document.getElementById("inputBirthday").value;
    updateUserInfo(currentUser.uid, uName, fName, lName, pNumber, birthday);
    Swal.fire({
      title: "The data has been updated!",
      icon: "success",
      timer: 3000,
    })
  };

  const uploadImage = async (e) => {
    if (uploadImage == null) return;
    setTimeout(5000);
    const imageRef = ref(
      storage,
      `images/${currentUser.uid}/${currentUser.uid}`
    );
    await uploadBytesResumable(imageRef, imageUpload).then(() => {
      Swal.fire({
        title: "Your profile picture has been updated!",
        icon: "success",
        timer: 2000,
      }).then(() => {
        location.reload();
      });
    });
  };

  useEffect(() => {
    if (localStorage.getItem("user") != "undefined" || null) {
      currentUserData = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(currentUserData);
      setImage(localStorage.getItem("imageUrl"));
      document.getElementById("profilePic").src =
        localStorage.getItem("imageUrl");
      getUserInfo(currentUserData);
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("user") != "undefined" || null) {
      currentUserData = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(currentUserData);
      const imageListRef = ref(storage, `images/${currentUserData.uid}`);
      listAll(imageListRef).then((res) => {
        res.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList(url);
            setImage(url);
            localStorage.setItem("imageUrl", url);
            document.getElementById("profilePic").src = url;
          });
        });
      });
    }
  }, []);
  return (
    <div className="container-xl px-4 mt-4">
      <div className="row">
        <div className="col-xl-4">
          {/* <!-- Profile picture card--> */}
          <div className="cardProfile mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              {/* <!-- Profile picture image--> */}
              <img
                id="profilePic"
                className="img-account-profile rounded-circle mb-2"
                src="http://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              />
              {/* <!-- Profile picture help block--> */}
              <div className="small font-italic text-muted mb-4">
                JPG or PNG no larger than 5 MB
              </div>
              {/* <!-- Profile picture upload button--> */}
              <MuiFileInput
                className="inputFile"
                value={imageUpload}
                inputRef={imageUpload}
                onChange={handleChange}
                style={{ color: "black" }}
              />
              <Button
                variant="contained"
                component="label"
                onClick={uploadImage}
                style={{ backgroundColor: "#112d32", marginTop: "35px" }}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          {/*  !<!-- Account details card--> */}
          <div className="cardProfile1 mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body1">
              <form
                className="profileForm"
                style={{ backgroundColor: "white" }}
              >
                {/* <!-- Form Group (username)--> */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    Username
                  </label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your username"
                    
                  />
                </div>
                {/* <!-- Form Row--> */}
                <div className="row gx-3 mb-3">
                  {/* <!-- Form Group (first name)--> */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputFirstName">
                      First name
                    </label>
                    <input
                      className="form-control1"
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter your first name"
                      
                    />
                  </div>
                  {/* <!-- Form Group (last name)--> */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputLastName">
                      Last name
                    </label>
                    <input
                      className="form-control1"
                      id="inputLastName"
                      type="text"
                      placeholder="Enter your last name"
                      
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    id="inputEmailAddress"
                    type="email"
                    placeholder="Enter your email address"
                    
                    disabled
                  />
                </div>
                {/* <!-- Form Row--> */}
                <div className="row gx-3 mb-3">
                  {/* <!-- Form Group (phone number)--> */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputPhone">
                      Phone number
                    </label>
                    <input
                      className="form-control1"
                      id="inputPhone"
                      type="tel"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {/* <!-- Form Group (birthday)--> */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputBirthday">
                      Birthday
                    </label>
                    <input
                      className="form-control1"
                      id="inputBirthday"
                      type="text"
                      name="birthday"
                      placeholder="Enter your birthday"
                    />
                  </div>
                </div>
                {/* <!-- Save changes button--> */}
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{ marginBottom: "30px", backgroundColor: "#112d32" }}
                  onClick={update}
                >
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile