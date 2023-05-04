import React, { useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "./Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./style.css";
import Swal from "sweetalert2";
import { AuthContext } from "./components/auth";
import Alert from '@mui/material/Alert';
import getProfilePic from "./user/getProfilePic";

const Login2 = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const container = document.getElementById("container");
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  
  
  
  
  //Registration
  // if (currentUser) {
  //   return <Redirect to="/" />;
  // }
const Register = async (e) => {
    e.preventDefault();
    if (!name) alert("Please enter name");
    const res = await fetch("/api/user/reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([name, email, password]),
    });
    if (!res.ok) {
      console.log("bad thing happened");
      const error = await res.json();
      setErrorMessage(error.code);
    } else {
      const response = await res.json();
      console.log("response data is", response);
      setCurrentUser(response);
      Swal.fire({
        title: "Registration Successful!",
        text: "Hi! " + response.displayName + ", Welcome to HallFinder!",
        icon: "success",
        timer: 3000,
      })
      .then(() => {
        navigate("/");
      });
    }
  };

  //Login with email and password
  const Login = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([email, password]),
    });
    if (!res.ok) {
      console.log("bad thing happened");
      const error = await res.json();
      setErrorMessage(error.code);
    } else {
      const response = await res.json();
      console.log("response data is", response);
      setCurrentUser(response);
      getProfilePic(response);
      Swal.fire({
        title: "Login Successful!",
        text: response.email,
        icon: "success",
        timer: 3000,
      }).then(() => {
        navigate("/");
      });
    }
  };

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(currentUser));
    
}, [currentUser])
  return (
    <>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={Register}>
            <h1>Create Account</h1>
            <div className="social-container"></div>
            <input
              type="text"
              className="register__textBox"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
            <input
              type="text"
              className="register__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
            <input
              type="password"
              className="register__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />{ errorMessage ? <Alert variant="outlined" severity="error" style={{marginBottom:"10px", fontSize:"20px", color:"#fc0303"}}>{errorMessage}</Alert>:""}

            <button
              type="submit"
              style={{
                backgroundColor: "#112d32",
                width: "10rem",
                margin: "20px 0 0 0",
              }}
              className="register__btn"
            >
              Sign Up
            </button>
            <div class="separator">OR</div>
            <button
              style={{
                backgroundColor: "#112d32",
                width: "17rem",
                textAlign: "start",
              }}
              className="register__btn register__google"
              onClick={signInWithGoogle}
            >
              <img
                style={{
                  padding: "5px 10px 5px 0px",
                  width: "33px",
                  height: "33px",
                }}
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
              Register with Google
            </button>
          </form>
          <div>
            Already have an account? <Link to="/">Login</Link> now.
          </div>
        </div>
        //Login with Email & Password // // //
        <div className="form-container sign-in-container">
          <form onSubmit={Login}>
            <h1>Sign in</h1>
            {/* <div className="social-container">
        <a href="#" className="social"><i className="far fa-user-circle"></i></a>
        </div> */}
            <span style={{ margin: "20px" }}>Enter your login info!</span>
            <input
              type="email"
              className="login__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
            <input
              type="password"
              className="login__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Link to="/reset">Forgot Password</Link>
            {/* <p style={{ color: "red" }}>{errorMessage}</p> */}
           { errorMessage ? <Alert variant="outlined" severity="error" style={{marginBottom:"10px", fontSize:"20px", color:"#fc0303"}}>{errorMessage}</Alert>:""}
            <button
              type="submit"
              style={{ backgroundColor: "#112d32", width: "10rem" }}
              className="login__btn"
            >
              Login
            </button>

            <div class="separator">OR</div>

            <button
              style={{
                backgroundColor: "#112d32",
                width: "15rem",
                textAlign: "start",
              }}
              className="login__btn login__google"
              onClick={signInWithGoogle}
            >
              <img
                style={{
                  padding: "5px 10px 5px 0px",
                  width: "33px",
                  height: "33px",
                }}
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
              Login with Google
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <img
                src="src/images/HallFinder-1 (6).png"
                width="300px"
                height="120px"
              />
              {/* <h1>Hall Finder!</h1> */}
              <p>Enter your login info to sign in!</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => {
                  container.classList.remove("right-panel-active");
                }}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <img
                src="src/images/HallFinder-1 (6).png"
                width="300px"
                height="120px"
              />

              {/* <h1>Hall Finder!</h1> */}
              <p>Enter your personal details and start your journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => {
                  container.classList.add("right-panel-active");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <script src="main.js"></script> */}
    </>
  )
}

export default Login2