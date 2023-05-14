import "./App.css";

import "./components/boosted/css/boosted.min.css";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./components/Register/Register";
import NavBarAll from "./components/NavBar/NavBarAll";
import Login from "./components/Login/Login";
import React, { useState } from "react";
import IssuerHome from "./components/IssuerHome/IssuerHome";
import HolderHome from "./components/HolderHome/HolderHome";
import NavBarIssuer from "./components/NavBar/NavBarIssuer";
function App() {
  const [userRole, setUserRole] = useState(""); 
  return (

    <div>
      <BrowserRouter>

      {/* conditionally render navbar based on user role */}
      {userRole === "Issuer" ? (
          <NavBarIssuer setUserRole={setUserRole} />
        ) : (
          <NavBarAll setUserRole={setUserRole} />
        )}
        {/* <NavBarAll /> */}
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUserRole={setUserRole} />} />
          <Route path="/issuer-home" element={<IssuerHome />} />
          <Route path="/holder-home" element={<HolderHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
