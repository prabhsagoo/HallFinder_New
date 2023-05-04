import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AuthContext } from "../components/auth";
import getAdmin from "./getAdmin";

const Admin = () => {
    const { currentUser, setCurrentUser, image, setImage } = useContext(AuthContext);
  const res = JSON.parse(localStorage.getItem("user"));
  let resData = getAdmin(res);
  fetch(resData.url).then((a)=>{a.json().then((b)=>{console.log(b)})}); 

  useEffect(() => {
    if (localStorage.getItem("user") != "undefined" || null) {
      let currentUserData = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(currentUserData);
      setImage(localStorage.getItem("imageUrl"));
    }
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, marginTop: "150px", width: "70%" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Date of booking</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Contact</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={resData.email}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {resData.datePicker}
            </TableCell>
            <TableCell align="right">
              {resData.fName + " " + resData.lName}
            </TableCell>
            <TableCell align="right">{resData.pNumber}</TableCell>
            <TableCell align="right">{resData.email}</TableCell>
            <TableCell align="right">{resData.hAddress}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Admin