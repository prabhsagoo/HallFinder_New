import React from 'react'
import LoginIcon from "@mui/icons-material/Login";
import Tooltip from '@mui/material/Tooltip';
import "/src/index.css"


const LoginIcons = () => {
  return (
    <div><Tooltip title="Login"><a alt="Login" className="nav-item" href="login" style={{margin: "20px 50px 0px 0px"}}>
    <LoginIcon fontSize="large" style={{margin:"25px 40px 0 0"}} />
    </a></Tooltip></div>
  )
}

export default LoginIcons