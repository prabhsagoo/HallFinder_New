import React, { useEffect, useState } from "react";
//import './Style.css'
//import "./style.css";
import "./HallPage.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { MuiFileInput } from "mui-file-input";
import Book from "./Book"; 
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { storage } from "../Firebase/firebase";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import Carousel from "./Carousel";



const BookingForm = () => {
  console.log("I am in Hall Data");
  const {state} = useLocation();
  console.log(state);
 
  const [imageUpload, setImageUpload] = useState(null);
  const [date, setDate] = useState("");

  const handleChange = (newFile) => {
    setImageUpload(newFile);
  };

  const book = async () => {
    const BUid = "BedFYSUGHiMDOxpJrjLFeAkZB2x2";
    const datePicker = date
    const fName = document.getElementById("BFirstName").value;
    const lName = document.getElementById("BLastName").value;
    const pNumber = document.getElementById("BPhoneNumber").value;
    const email = document.getElementById("BEmailAddress").value;
    const hAddress = document.getElementById("BHomeAddress").value;
    Book(BUid, datePicker, fName, lName, pNumber, email, hAddress);
    const imageRef = ref(
      storage,
      `booking/${BUid}/${BUid}`
    );
    await uploadBytesResumable(imageRef, imageUpload);
    Swal.fire({
      title: "The hall has been booked!",
      icon: "success",
      timer: 3000,
    }).then(() => {
      location.reload()});
  };
  return (
<>
<div><Carousel state = {state} /></div>
    <div className="col-xl-9">
      {/*  !<!-- Account details card--> */}
      <div className="cardProfile2 mb-4">
        <div className="card-header1">Booking Form</div>
        <div className="card-body2">
          <form className="profileForm1" style={{ backgroundColor: "white" }}>
            <div className="mb-3">
              <label className="small mb-1" htmlFor="BFirstName">
                Date
              </label>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            
              <DatePicker
                className="form-control2"
                id="datePicker"
                disablePast onChange={(e, event)=>{
                  const arr = JSON.stringify(e.$d);
                  setDate(arr.slice(1,11))}}
              />
            </LocalizationProvider>
            {/* <!-- Form Group (username)--> */}
            <div className="mb-3">
              <label className="small mb-1" htmlFor="BFirstName">
                First name
              </label>
              <input
                className="form-control2"
                id="BFirstName"
                type="text"
                placeholder="Enter your first name"
              />
            </div>
            {/* <!-- Form Row--> */}

            {/* <!-- Form Group (first name)--> */}
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="BLastName">
                Last name
              </label>
              <input
                className="form-control2"
                id="BLastName"
                type="text"
                placeholder="Enter your last name"
              />
            </div>
            {/* <!-- Form Group (last name)--> */}
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="BPhoneNumber">
                Phone number
              </label>
              <input
                className="form-control2"
                id="BPhoneNumber"
                type="text"
                placeholder="Enter your Phone number"
              />
            </div>

            <div className="mb-3">
              <label className="small mb-1" htmlFor="BEmailAddress">
                Email address
              </label>
              <input
                className="form-control2"
                id="BEmailAddress"
                type="email"
                placeholder="Enter your email address"
              />
            </div>
            {/* <!-- Form Row--> */}
            {/* <!-- Form Group (phone number)--> */}
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="BHomeAddress">
                Home address
              </label>
              <input
                className="form-control2"
                id="BHomeAddress"
                type="tel"
                placeholder="Enter your Home address"
              />
            </div>
            {/* <!-- Form Group (birthday)--> */}
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="inputBirthday">
                Photo ID
              </label>
            </div>
            <MuiFileInput
              placeholder="Upload Photo Id"
              className="inputFile1"
              value={imageUpload}
              inputRef={imageUpload}
              onChange={handleChange}
              style={{ color: "black" }}
            />

            {/* <!-- Save changes button--> */}
            <button
              className="btn btn-primary"
              type="button"
              style={{ marginBottom: "30px", backgroundColor: "#112d32" }}
              onClick={book}
            >
              Book
            </button>
          </form>
        </div>
      </div>
    </div></>
  )
}

export default BookingForm