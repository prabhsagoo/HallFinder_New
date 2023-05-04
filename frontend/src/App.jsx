import React, { useRef, useEffect, useState, useContext } from 'react';
import Map from './map';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login2 from "./Login2";
import Reset from "./Reset";
import { AuthProvider } from './components/auth';
import HomeIcon from '@mui/icons-material/Home';
import "./index.css";
import ReactDOM from "react-dom/client";
import { AuthContext } from "./components/auth";
import LoginIcon from './components/LoginIcons';
import LogoutIcon from './components/LogoutIcons';
import UserProfile from './user/UserProfile';
import Slideshow from './slideshow/Slideshow';
// import Footer from './footer/footer';
import BookingForm from './Hall/BookingForm';
import Admin from './admin/Admin';

const style = {
  border: "2px solid purple",
  margin: 12,
  padding: 8,
};


function App() {
  const { currentUser, setCurrentUser, image, setImage } = useContext(AuthContext);
  const [imageList, setImageList] = useState(null);

  useEffect(()=>{

    if(localStorage.getItem("user")!="undefined" && null){
      const a = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(a);
      }
      if(localStorage.getItem("imageUrl")!= null){
        const a = localStorage.getItem("imageUrl");
        setImageList(a);
        }

  },[]);

  return (
    <>
    <div className="abc">
      <a width="300px"
        height="80px"
        style={{ margin: "auto 40px" }} href="/">

      <img
        src="src/images/HallFinder-1 (6).png"
        width="300px"
        height="80px"
        style={{ margin: "auto 40px" }}
      /></a>
      <nav>
        <ul>
          <li>
            <a className="nav-item" href="/"><HomeIcon fontSize="medium" style={{marginTop:"-5px"}}>
              Home</HomeIcon>
            </a>
          </li>
          <li>
            <a className="nav-item" href="#">
              Events
            </a>
          </li>
          <li>
            <a className="nav-item" href="#">
              About
            </a>
          </li>
          <li>
            <a className="nav-item" href="#">
              Contact
            </a>
          </li>
        </ul>
      </nav>
     {!currentUser ?<LoginIcon />:<LogoutIcon currentUser = {currentUser} image={image} />}
    </div>
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Map />} />
          <Route exact path="/login" element={<Login2 />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/viewhall" element={<BookingForm />} />
          <Route exact path="/admin" element={<Admin />} />
          
          <Route exact path="/profile" element={<UserProfile />} />

        </Routes>
      </Router>
          </div>
          {/* <Footer /> */}
          </>
  )
}

export default App
