import React from "react"
import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "../components/auth/Login.jsx";
import { Register } from "../components/auth/Register.jsx";


export const Authorize = ({setIsLoggedIn}) => {

    return(
         <Routes>
         <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
         <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn}/>} />
         <Route path="*" element={<Navigate to="/login" />} />
         </Routes>
      );
    
   }